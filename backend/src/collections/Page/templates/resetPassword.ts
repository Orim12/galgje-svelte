import { generateTemplate } from "../generateTemplate";

export const resetPasswordTemplate = generateTemplate({
    name: 'resetPasswordTemplate',
    label: 'Wachtwoord instellen',
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'text',
            name: 'description',
            label: 'Description',
            required: true,
        },
        {
            type: 'relationship',
            name: 'referralLink',
            label: 'Doorverwijslink',
            admin: {
                description: 'Als je eenmaal bent ingelogd, verwijst deze link je door naar een andere pagina.',
            },
            relationTo: 'pages',
        },
    ],
})