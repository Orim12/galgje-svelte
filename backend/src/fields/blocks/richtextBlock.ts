import { Block, GroupField } from "payload/types";
import { RichText } from "./sub-fields/richText";


export const richTextBlock: Block = {
    slug: "richTextblock",
    labels: {
        singular: "Tekst blok",
        plural: "Tekst blokken",
    },
    interfaceName: "richTextBlock",
    imageURL: "/media/block-previews/richtextBlock.png",
    imageAltText: "Een afbeelding blok",
    fields: [
        RichText('content', 'Inhoud'),
    ]
}

export const richTextFields: GroupField = {
    name: "richTextFields",
    type: "group",
    label: "Product Beschrijving",
    interfaceName: "richTextFields",

    fields: [
        RichText('content', 'Inhoud'),
    ]
}