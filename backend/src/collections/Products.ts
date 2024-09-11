import { CollectionConfig } from "payload/types";
import { richTextBlock, richTextFields } from "../fields/blocks/richtextBlock";

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        singular: 'Product',
        plural: 'Products',
    },

    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name'],

    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Hoofdinfomatie',
                    fields: [
                        {
                            label: 'Productnaam',
                            name: 'name',
                            type: 'text',
                            required: true,
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            label: 'Omschrijving',
                            required: true,
                        },
                        {
                            label: 'Afbeeldingen',
                            name: 'images',
                            type: 'array',
                            maxRows: 5,
                            minRows: 1,
                            fields: [
                                {
                                    label: 'Afbeelding',
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                }
                            ]
                        },
                        richTextFields
                    ]
                },
                {
                    label: 'Extra informatie',
                    name: 'blocks',
                    fields: [
                        {
                            type: 'blocks',
                            name: 'content',
                            label: 'Extra informatie',
                            blocks: [
                                richTextBlock,                          
                            ]
                        }
                    ]
                }
            ],
        },
        {
            type: 'relationship',
            name: 'category',
            label: 'Categorie',
            hasMany: true,
            relationTo: 'category',
            admin: {
                position: 'sidebar',
            }
        }
    ]
};
