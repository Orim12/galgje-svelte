import { Tab } from "payload/types";

export const formGeneralTab: Tab = {
    label: {
        en: 'General',
        nl: 'Algemeen',
    },
    fields: [
        {
            name: 'title',
            label: 'Titel',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Beschrijving',
            type: 'textarea',
            required: true,
        },
        {
            name: 'formSubmissionTitle',
            label: 'Titel van form submission',
            type: 'text',
            required: true,
            defaultValue: 'Form submission',
            admin: {
                description: 'De titel van de form submission die wordt opgeslagen in de database, je kan hier ook velden van het formulier gebruiken door de naam van het veld tussen accolades te zetten, bijvoorbeeld: "Formulier aanvraag van {name}"',
            }
        }
    ],
};