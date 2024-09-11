import { Plugin } from "payload/config";
import type { CollectionMetaConfig, CollectionSettings } from "./types";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import getItemInNestObject from "./utilities/getItemInNestedObject";
import { plugin } from "./plugin";

export const CollectionMeta = (args: CollectionMetaConfig): Plugin[] => {
    const collections = applyDefaultCollectionSettings(args);

    return [
        plugin(collections, args),
        nestedDocs({
            collections: collections.filter((c) => c.hasParent).map(collection => collection.name),
            generateLabel: (_, doc: any) => getItemInNestObject(doc.slugField ?? 'title', doc) as string,
            generateURL: (docs: Record<string, any>) => {
                return docs.reduce((url, doc) => `${url}/${doc.slug}`, "")
            }
        })
    ];

}

const applyDefaultCollectionSettings = (args: CollectionMetaConfig): CollectionSettings[] => {
    const collections = args.collections.map(collection => {
        const overrides = args.overrides?.[collection];
        return {
            name: collection,
            slugField: overrides?.slugField ?? 'title',
            hasParent: overrides?.hasParent ?? true,
            prefix: overrides?.prefix ?? undefined,
        }
    });

    return collections;
}