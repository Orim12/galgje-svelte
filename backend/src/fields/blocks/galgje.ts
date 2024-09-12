import { Block } from "payload/types";

export const Galgje: Block = {
    slug: 'galgje',
    interfaceName: 'GalgjeBlock',
    imageURL: '/media/block-preview/hero.png',
    fields: [
        {
            name: 'easyMode',
            label: 'Makkelijke modus',
            type: 'checkbox',
        },
        {
            name: 'wordList',
            label: 'Woordenlijst',
            type: 'array',
            minRows: 5,
            fields: [{
                name: 'word',
                label: 'woord',
                type: 'text',
            }]
        }

    ]
}