import { Block } from "payload/types";

export const Galgje: Block = {
    slug: 'galgje',
    interfaceName: 'GalgjeBlock',
    imageURL: '/media/block-preview/hero.png',
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            defaultValue: '{Lava Core:} Where Innovation Meets Eruption!',
            admin: {
                description: 'use { youre word } to make the text underlined'
            }
        },
        {
            name: 'image',
            label: 'Achtergrond afbeelding',
            relationTo: 'media',
            type: 'upload',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'firstBlockText',
                    type: 'text',
                    label: 'Eerste blok tekst'
                },
                {
                    name: 'secondBlockText',
                    type: 'text',
                    label: 'Tweede blok tekst'
                },
            ]
        },
        {
            type: 'array',
            name: 'wordsForBanner',
            label: 'Woorden voor de banner',
            minRows: 1,
            fields: [
                {
                    name: 'word',
                    type: 'text',
                    label: 'Woord',
                    required: true,
                },
            ]
        }
    ]
}