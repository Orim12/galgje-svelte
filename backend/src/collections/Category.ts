import { CollectionConfig } from "payload/types";
import slugify from "slugify";


export const Category: CollectionConfig = {
    slug: 'category',
    labels: {
        singular: 'Categorie',
        plural: 'Categorieën',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title'],

    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [
            ({ data }) => {
                if (data.title) {
                    const slug = slugify(data.title, {
                        lower: true,    
                        strict: true,
                        trim: true        
                    });
              
                    data.slug = slug;
                }
                return data;
            }
        ],
    },
    fields: [
        {
            label: 'Categorie',
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
                readOnly: true
            },
            
        }
    ]
};
