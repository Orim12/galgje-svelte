import { Block } from "payload/types";
import { button } from "./sub-fields/Button";

export const GoTo: Block = {
    slug: 'goTo',
    interfaceName: 'GoToBlock',
    imageURL: '/media/block-preview/goTo.png',
    fields: [
        {
            name: 'niks',
            type: 'text',
        }
    ]
}