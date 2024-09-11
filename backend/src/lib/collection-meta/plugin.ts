import { SlugField } from "@nouance/payload-better-fields-plugin";
import { Config, Plugin } from "payload/config";
import { CollectionConfig, Field, PayloadRequest } from "payload/types";
import { CollectionMetaConfig, CollectionSettings } from "./types";

export const plugin = (collections: CollectionSettings[], args: CollectionMetaConfig): Plugin => (incomingConfig: Config) => {
    const config: Config = {
        ...incomingConfig,
        collections: incomingConfig.collections.map(collection => {
            const collectionHasMeta = collections.find((c) => c.name === collection.slug);
            if (!collectionHasMeta) return collection;

            return {
                ...collection,
                admin: {
                    ...collection.admin,
                    hooks: {
                        beforeDuplicate: async (args) => {
                            const data = await collection.admin.hooks?.beforeDuplicate(args) ?? args.data;
                            let slug = data.slug

                            const slugNumber = slug.match(/-\d+$/);
                            if (slugNumber) {
                                const number = parseInt(slugNumber[0].replace('-', ''));
                                slug = slug.replace(`-${number}`, `-${number + 1}`);
                            } else {
                                slug = `${slug}-1`;
                            }

                            return {
                                ...data,
                                slug,
                                editSlug: true,
                                isHome: false,
                            }
                        }
                    }
                },
                fields: addMetaFields(collection, collectionHasMeta),
            }
        }) || []
    }

    return config;
}

const addMetaFields = (collection: CollectionConfig, settings: CollectionSettings): Field[] => {
    let fields = collection.fields;

    const collectionHasTitle = collection.fields.find((field: any) => field?.name === 'title') !== undefined;
    const hasDifferentSlugField = settings.slugField !== 'title';

    // Add title field
    if (!collectionHasTitle && !hasDifferentSlugField) {
        fields.push({
            name: 'title',
            label: 'Title',
            type: 'text',
            localized: true,
            required: true,
        });
    }

    fields.push({
        name: 'slugField',
        type: 'text',
        defaultValue: settings.slugField,
        localized: true,
        admin: {
            hidden: true
        }
    });

    // Add slug field
    fields.push(
        ...SlugField({
            name: 'slug',
            admin: {
                position: 'sidebar',
            },
            localized: true,
            unique: false,
        }, {
            useFields: [settings.slugField],

        })
    );

    // Add url field
    fields.push({
        name: 'url',
        label: 'URL',
        type: 'text',
        index: true,
        unique: true,
        localized: true,
        admin: {
            readOnly: true,
            position: 'sidebar',
        },
        hooks: {
            beforeChange: [
                ({ data, req }) => generateUrl(data, settings, req)
            ]
        }
    });

    fields.push({
        name: 'urls',
        label: 'URLs',
        type: 'array',
        fields: [],
        admin: {
            hidden: true,
        },
        hooks: {
            beforeChange: [
                ({ siblingData }) => {
                    siblingData.urls = undefined;
                }
            ],
            afterRead: [
                async ({ data, context, req }) => {
                    if (context['recursive']) return [];
                    context['recursive'] = true;

                    if (req.payload?.config?.localization === false) return [];
                    if (req.collection?.config?.slug === undefined) return [];

                    const locales = req.payload.config.localization?.locales || [];
                    const fetchUrls = locales.map(async (locale) => {
                        return {
                            locale,
                            url: await req.payload.findByID({
                                collection: req.collection?.config?.slug as any,
                                id: data.id,
                                context,
                                locale: locale.code,
                            }).then((doc: any) => doc.url)
                        }
                    })

                    const urls = await Promise.all(fetchUrls).catch((err) => {
                        return [];
                    })

                    return urls;
                }
            ]
        }
    })

    fields.push({
        name: 'isHome',
        type: 'checkbox',
        label: 'Is homepage',
        defaultValue: false,
        admin: {
            position: 'sidebar',
        }
    })

    return fields;
}

const generateUrl = (data: Record<string, any>, settings: CollectionSettings, req: PayloadRequest): string => {
    const prefix = settings.prefix ? `/${settings.prefix.join('/')}` : undefined;
    const fallbackLocale = req.payload.config.localization !== false ? req.payload.config.localization.defaultLocale : undefined;
    const locale = fallbackLocale && req.locale !== fallbackLocale ? req.locale : undefined

    if (data.isHome) {
        return concatUrl([locale, prefix]);
    }
    if (!data?.breadcrumbs || data.breadcrumbs?.length < 1) {
        return concatUrl([locale, prefix, data.slug]);
    }
    return concatUrl([locale, prefix, [...data.breadcrumbs].pop().url]);
}

function concatUrl(parts: (string | undefined)[]) {
    return parts.reduce((prev: string, part: undefined | string) => {
        if (!part || part === '') return prev
        if (part.startsWith('/') && prev.endsWith('/')) return `${prev}${part.slice(1)}`
        return part.startsWith('/') || prev.endsWith('/') ? `${prev}${part}` : `${prev}/${part}`
    }, '/');
}