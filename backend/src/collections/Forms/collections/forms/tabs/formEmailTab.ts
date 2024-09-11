import { Tab } from "payload/types";
import { isLoggedIn } from "../../../field-access/isLoggedIn";

export const formEmailTab: Tab = {
    label: {
        en: 'E-mail settings',
        nl: 'E-mail instellingen',
    },
    fields: [
        {
            type: 'array',
            name: 'emails',
            label: 'E-mails',
            access: {
                read: isLoggedIn,
            },
            fields: [
                {
                    type: 'radio',
                    name: 'sendTo',
                    label: 'Verstuur naar',
                    defaultValue: 'submitter',
                    required: true,
                    options: [
                        {
                            label: 'Indiener',
                            value: 'submitter',
                        },
                        {
                            label: 'Aangepast e-mailadres',
                            value: 'custom',
                        },
                    ]
                },
                {
                    type: 'text',
                    name: 'emailField',
                    label: 'E-mailveld',
                    required: true,
                    admin: {
                        description: 'Het veld van het formulier waar het e-mailadres van de indiener staat. Zorg ervoor dat de veldnaam overeenkomt met de naam van het veld.',
                        condition: (_, siblingData) => siblingData.sendTo === 'submitter',
                    },
                    validate: (value, { data, t }) => {
                        if (value && data.fields?.filter((field: any) => field.value.name === value && field.value.type === 'email')?.length === 0) {
                            return t('form:mustBeEmailField')
                        }

                        if (!value) {
                            return t('validation:required')
                        }
                    },
                },
                {
                    type: 'text',
                    name: 'email',
                    label: 'E-mail',
                    required: true,
                    admin: {
                        condition: (_, siblingData) => siblingData.sendTo === 'custom',
                    },
                },
                {
                    type: 'text',
                    name: 'subject',
                    label: 'Onderwerp',
                    required: true,
                },
                {
                    type: 'textarea',
                    name: 'body',
                    label: 'Bericht',
                    required: true,
                    admin: {
                        description: 'Gebruik de veldnamen van het formulier om de waardes van de velden in te voegen. Bijvoorbeeld: Beste {name},'
                    }
                },
            ],
            admin: {
                components: {
                    RowLabel: ({ data, index, path }) => data.subject || `E-mail ${index}`,
                }
            }
        }
    ]
}