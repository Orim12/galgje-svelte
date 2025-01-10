import { CollectionConfig } from "payload/types";

export const Galgje: CollectionConfig = {
    slug: 'galgje',
    access: {
        read: () => true,
        create: ({ req: { user } }) => user?.roles?.includes('admin') || user?.roles?.includes('word-adder'),
        update: ({ req: { user } }) => user?.roles?.includes('admin') || user?.roles?.includes('word-adder'),
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