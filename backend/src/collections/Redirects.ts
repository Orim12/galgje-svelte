import payload from "payload";
import { CollectionConfig, Field } from "payload/types";
import Pages from "./Page";

const resolveLink = async (linkData: any) => {
    if (linkData.type === "internal") {
        const title = await payload.findByID({
            collection: linkData?.internal?.relationTo,
            id: linkData?.internal?.value,
        }).then((data) => data?.url ?? '/')
        return title
    }
    return linkData.external
}

const redirectLink = (name: string, type: "both" | "external" = "both"): Field => ({
    name,
    type: "group",
    fields: [
        {
            name: "internal",
            label: "Interne Link",
            type: "relationship",
            relationTo: [Pages.slug],
            hasMany: false,
            required: true,
            admin: {
                condition: (data, siblingData) => type !== "external" && siblingData.type === "internal",
            }
        },
        {
            name: "external",
            label: "Externe Link",
            type: "text",
            required: true,
            admin: {
                condition: (data, siblingData) => type === "external" || siblingData.type === "external",
            }
        },
        {
            name: "type",
            type: "radio",
            required: true,
            options: [
                {
                    label: "Intern",
                    value: "internal",
                },
                {
                    label: "Extern",
                    value: "external",
                },
            ],
            admin: {
                condition: () => type === "both",
            },
            defaultValue: type === "both" ? "internal" : "external",
        },
    ],
});
export const Redirects: CollectionConfig = {
    slug: "redirects",
    labels: {
        singular: "Redirect",
        plural: "Redirects",
    },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "type"],
        listSearchableFields: ["type"],
        group: "Instellingen",
        pagination: {
            defaultLimit: 100,
        },
        hideAPIURL: process.env.NODE_ENV === 'production',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            admin: {
                hidden: true,
            },
            hooks: {
                beforeChange: [
                    async ({ data }) => {
                        const to = resolveLink(data.to)
                        const from = resolveLink(data.from)

                        return await Promise.all([to, from]).then(([to, from]) => {
                            return `Redirect "${from}" to "${to}"`
                        })
                    }
                ]
            }
        },
        {
            type: "row",
            fields: [
                redirectLink("from", "external"),
                redirectLink("to"),
            ],
        },
        {
            name: "type",
            type: "select",
            required: true,
            options: [
                {
                    label: "301 - Moved Permanently",
                    value: "301",
                },
                {
                    label: "302 - Found",
                    value: "302",
                },
            ],
            defaultValue: "301",
        }
    ],
}