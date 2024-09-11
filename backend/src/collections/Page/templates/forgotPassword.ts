import { button } from "../../../fields/blocks/sub-fields/Button";
import { generateTemplate } from "../generateTemplate";

export const forgotPasswordTemplate = generateTemplate({
    name: 'forgotPasswordTemplate',
    label: 'Vergeten wachtwoord',
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
        button({ haveType: false, label: 'registreren', name: 'register', defaultValue: 'Registreren'}),
        button({ haveType: false, label: 'Terug naar login', name: 'login', defaultValue: 'Terug naar login'}),
    ],
})