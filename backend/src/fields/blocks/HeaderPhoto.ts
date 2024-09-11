import { Block } from "payload/types";

export const HeaderPhoto: Block = {
    slug: 'headerPhoto',
    interfaceName: 'headerPhotoSection',
    imageURL: '/media/block-preview/headerPhoto.png',
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: false,
            defaultValue: 'The best starter template you ever need!',
        },
        {
            name: 'image',
            label: 'Achtergrond afbeelding',
            relationTo: 'media',
            type: 'upload',
            required: true,
        },
        {
            name: 'height',
            label: 'Height',
            type: 'text',
            required: true,
            defaultValue: '608',
        },
    ]
}