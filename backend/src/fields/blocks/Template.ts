import { Block } from "payload/types";

export const TemplateSection: Block = {
    slug: "template",
    fields: [
        {
            name: "template",
            label: "Template Block",
            type: "relationship",
            relationTo: "template-blocks",
            hasMany: false,
            required: true
        },
    ],
};