import { Condition, GroupField } from "payload/types";
import { Config } from "../payload-types";

type ButtonRelationTo = keyof Config['collections']

type ButtonArgs = {
    relationTo?: ButtonRelationTo[],
    required?: boolean,
    label?: string,
    name?: string,
    defaultValue?: string,
    enableGutter?: true,
    type?: 'button' | 'hyperlink',
    condition?: Condition,
}

export const button = ({ relationTo, required, label, name, defaultValue, enableGutter, type, condition }: ButtonArgs): GroupField => {
    return {
        type: 'group',
        interfaceName: 'Button',
        name: name || 'button',
        label: label || false,
        admin: {
            hideGutter: !enableGutter || true,
            condition,
        },
        fields: [
            {
                type: 'text',
                name: 'label',
                label: 'Label',
                defaultValue: defaultValue || 'Button tekst',
                required: required || false,
                localized: true,
            },
            {
                type: 'select',
                name: 'buttonType',
                label: 'Knop type',
                defaultValue: type || 'button',
                admin: {
                    hidden: type !== undefined,
                },
                options: [
                    {
                        label: 'Button',
                        value: 'button',
                    },
                    {
                        label: 'Hyperlink',
                        value: 'hyperlink',
                    }
                ],
            },
            {
                type: 'row',
                fields: [
                    {
                        type: 'select',
                        name: 'linkType',
                        label: 'Link type',
                        defaultValue: 'internal',
                        options: [
                            {
                                label: 'Geen link',
                                value: 'none',
                            },
                            {
                                label: 'Interne link',
                                value: 'internal',
                            },
                            {
                                label: 'Externe link',
                                value: 'external',
                            },
                            {
                                label: 'Externe link in nieuw tabblad',
                                value: 'externalNewTab',
                            },
                            {
                                label: 'Scroll naar',
                                value: 'scroll',
                            },
                        ],
                    },
                    {
                        relationTo: relationTo || ['pages'],
                        type: 'relationship',
                        name: 'linkInternal',
                        label: 'Link',
                        required,
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'internal',
                        },
                        localized: true,
                    },
                    {
                        type: 'text',
                        name: 'linkExternal',
                        label: 'Link',
                        required,
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'external' || siblingData.linkType === 'externalNewTab',
                        },
                    },
                    {
                        type: 'text',
                        name: 'linkScroll',
                        label: 'Link',
                        required: required,
                        localized: true,
                        admin: {
                            description: 'Vul hier de id in van het element waar je naar wilt scrollen',
                            condition: (_, siblingData) => siblingData.linkType === 'scroll',
                        },
                    },
                ]
            },
        ]
    }
}