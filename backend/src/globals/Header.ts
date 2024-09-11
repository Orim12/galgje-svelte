import { GlobalConfig } from "payload/types";

export const Header: GlobalConfig = {
    slug: 'header',
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Menu',
                    fields: [
                        {
                            name: 'menu',
                            label: 'Menu',
                            type: 'array',
                            minRows: 1,
                            maxRows: 6,
                            fields: [
                                {
                                    name: 'label',
                                    label: 'Label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'page',
                                    label: 'Pagina',
                                    type: 'relationship',
                                    relationTo: 'pages',
                                    hasMany: false,
                                    required: true,
                                }
                            ]
                        },
                    ]
                },
                {
                    label: 'Talen',
                    fields: [
                        {
                            type: 'select',
                            name: 'locales',
                            label: 'Talen',
                            hasMany: true,
                            required: true,
                            options: [
                                {
                                    label: 'Nederlands',
                                    value: 'nl',
                                },
                                {
                                    label: 'Engels',
                                    value: 'en',
                                },
                            ],
                        }
                    ]
                }
            ]
        }

    ]
}