import { CollectionConfig } from "payload/types";

export const Galgje: CollectionConfig = {
    slug: 'galgje',
    access: {
            read: () => true,
            create: () => true,
            update: () => true,
          },
    fields: [
        {
            name: 'wordList',
            label: 'Woordenlijst',
            type: 'array',
            minRows: 5,
            fields: [{
                name: 'word',
                label: 'woord',
                type: 'text',
            }]
        }

    ]
}