import { generateTemplate } from "../generateTemplate";

export const collectionOverviewTemplate = generateTemplate({
    name: 'collectionOverviewTemplate',
    label: 'Collectie overzichtspagina',
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Titel',
            required: true,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Introductie filters',
        },
        {
            type: 'array',
            name: 'categories',
            label: 'Categorieën filter groep',
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: ({ data, index, path }) => {
                        return data.name ? data.name : `Kolom ${index}`;
                    }
                },
            },
            fields: [
                {
                    type: 'text',
                    name: 'name',
                    label: 'Naam',
                    required: true,
                },
                {
                    type: 'relationship',
                    name: 'category',
                    relationTo: 'category',
                    label: 'Categorie',
                    hasMany: true,
                    required: true,
                },
            ]
        }
    ],
})