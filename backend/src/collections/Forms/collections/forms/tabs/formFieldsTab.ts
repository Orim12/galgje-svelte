import { Field, Tab } from "payload/types";

export const formField: Field = {
    type: 'group',
    name: 'value',
    interfaceName: 'FormField',
    label: false,
    fields: [
        {
            name: 'name',
            label: 'Naam',
            type: 'text',
            required: true,
        },
        {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
        },
        {
            name: 'type',
            label: 'Type',
            type: 'select',
            options: [
                {
                    label: 'Tekst',
                    value: 'text'
                },
                {
                    label: 'Tekstveld',
                    value: 'textarea'
                },
                {
                    label: 'E-mail',
                    value: 'email'
                },
                {
                    label: 'Telefoonnummer',
                    value: 'tel'
                },
            ],
            required: true,
        },
        {
            name: 'required',
            label: 'Verplicht',
            type: 'checkbox',
        }
    ]
}


export const formFieldsTab: Tab = {
    label: {
        en: 'Fields',
        nl: 'Velden',
    },
    fields: [
        {
            type: 'array',
            name: 'fields',
            label: 'Velden',
            fields: [formField],
            validate: (value, { data, t }) => {
                if (!value) {
                    return t('validation:required')
                }

                const unique = new Set(value?.map((item: any) => item.value.name)).size === value.length;
                if (!unique) {
                    return t('form:namesMustBeUnique')
                }
            },
            admin: {
                components: {
                    RowLabel: ({ data, index, path }) => data.value.label || `Veld ${index}`,
                },
                initCollapsed: true,
            }
        }
    ]
}

export const formTranslations = {
    en: {
        form: {
            mustBeEmailField: 'The entered field must be a valid email field',
            namesMustBeUnique: 'The field names must be unique',
        }
    },
    nl: {
        form: {
            mustBeEmailField: 'Het ingevoerde veld moet een geldig e-mailveld zijn',
            namesMustBeUnique: 'De veldnamen moeten uniek zijn',
        }
    }
}