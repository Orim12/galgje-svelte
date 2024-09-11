import { button } from "../../../fields/blocks/sub-fields/Button";
import { generateTemplate } from "../generateTemplate";

export const registerTemplate = generateTemplate({
    name: 'registerTemplate',
    label: 'Registratie',
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
                description: 'Als je emalig bent ingelogd, verwijst deze link je door naar een andere pagina.',
            },
            relationTo: 'pages',
        },
        button({ haveType: false, label: 'Terug naar login', name: 'login', defaultValue: 'Terug naar login'}),
    ],
})