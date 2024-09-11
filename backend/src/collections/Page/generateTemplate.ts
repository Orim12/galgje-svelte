import { Field, GroupField } from "payload/types";

type GenerateTemplateArgs = {
    name: string;
    label: string;
    fields: Field[];
}

export type PageTemplate = {
    name: string;
    label: string;
    field: GroupField;
}

export const generateTemplate = ({ name, label, fields }: GenerateTemplateArgs): PageTemplate => ({
    name,
    label,
    field: {
        name,
        type: 'group',
        label: false,
        admin: {
            condition: (_, siblingData) => siblingData.template === name,
            hideGutter: true,
        },
        fields,
    }
})