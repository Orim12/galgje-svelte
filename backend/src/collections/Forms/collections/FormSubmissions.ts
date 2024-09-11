import { CollectionConfig } from "payload/types";

export const FormSubmissions: CollectionConfig = {
    slug: 'form-submissions',
    admin: {
        useAsTitle: 'title',
        group: 'Form Builder',
        defaultColumns: ['title', 'createdAt', 'form'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            hasMany: false,
            required: true,
            admin: {
                readOnly: true,
            }
        },
        {
            name: 'title',
            type: 'text',
            label: 'Titel',
            required: true,
            admin: {
                readOnly: true,
            }
        },
        {
            type: 'array',
            name: 'fields',
            label: 'Velden',
            fields: [
                {
                    type: 'text',
                    name: 'label',
                    label: 'Label',
                    required: true,
                },
                {
                    type: 'text',
                    name: 'value',
                    label: 'Waarde',
                    required: true,
                },
            ],
            admin: {
                readOnly: true,
                initCollapsed: true,
                components: {
                    RowLabel: ({ data }) => data.label,
                }
            },
        },
    ],
}