import { generateTemplate } from "../generateTemplate";

export const editAccountTemplate = generateTemplate({
    name: 'editAccountTemplate',
    label: 'Account - Gegevens bewerken',
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            required: true,
        },
    ]
})