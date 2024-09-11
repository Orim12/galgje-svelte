import { CollectionConfig, FieldHook } from 'payload/types';

export const Events: CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'Evenement',
        plural: 'Evenementen',
    },
    access: {
        read: () => true,
    },
    versions: {
        drafts: true
    },
    admin: {
        useAsTitle: 'title',
        listSearchableFields: ['title', 'url', 'slug', 'kindOfEvent', 'date'],
        defaultColumns: ['date', 'title', 'kindOfEvent', 'url'],
        hideAPIURL: process.env.NODE_ENV === 'production',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Algemeen',
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
                            type: 'richText',
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'date',
                                    label: 'Datum',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            displayFormat: 'd MMMM yyyy',
                                            pickerAppearance: 'dayOnly'
                                        },
                                    },
                                },
                                {
                                    name: 'startTime',
                                    label: 'Starttijd',
                                    type: 'date',
                                    required: true,
                                    admin: {
                                        date: {
                                            pickerAppearance: 'timeOnly',
                                            timeFormat: 'HH:mm',
                                            displayFormat: 'HH:mm'
                                        }
                                    },
                                },
                                {
                                    name: 'endTime',
                                    label: 'Eindtijd',
                                    type: 'date',
                                    admin: {
                                        date: {
                                            pickerAppearance: 'timeOnly',
                                            timeFormat: 'HH:mm',
                                            displayFormat: 'HH:mm'
                                        }
                                    },
                                },
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'location',
                                    label: 'Locatie',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'streetAndHouseNumber',
                                    label: 'Straat en huisnummer',
                                    type: 'text',
                                },
                                {
                                    name: 'city',
                                    label: 'Stad',
                                    type: 'text',
                                }
                            ]
                        },
                        {
                            name: 'image',
                            label: 'Afbeelding',
                            relationTo: 'media',
                            type: 'upload',
                            required: true,
                        },
                    ]
                },
            ]
        },
    ]
}