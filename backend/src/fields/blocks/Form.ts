import { Block } from "payload/types";

export const Form: Block = {
    slug: 'form',
    interfaceName: 'formBlock',
    imageURL: '/media/block-preview/form.png',
    fields: [
        {
            type: 'relationship',
            name: 'form',
            label: 'Formulier',
            relationTo: 'forms',
            required: true,
        }
    ]
}