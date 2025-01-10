import { CollectionConfig } from "payload/types";

export const Galgje: CollectionConfig = {
    slug: 'galgje',
    access: {
        read: () => true,
        create: ({ req: { user } }) => {
            console.log('Create access check:', user);
            return user?.roles?.some(roleObj => roleObj.role === 'admin' || roleObj.role === 'word-adder');
        },
        update: ({ req: { user } }) => {
            console.log('Update access check:', user);
            return user?.roles?.some(roleObj => roleObj.role === 'admin' || roleObj.role === 'word-adder');
        },
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