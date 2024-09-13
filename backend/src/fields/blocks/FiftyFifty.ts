import { Block } from "payload/types";
import { button } from "../button";

export const fiftyFiftyBlock: Block = {
    slug: "fiftyFiftyBlock",
    labels: {
        singular: "Fifty Fifty blok",
        plural: "Fifty Fifty blokken",
    },
    interfaceName: "FiftyFiftyBlock",
    imageURL: "/media/block-previews/fiftyFiftyBlock.png",
    imageAltText: "Een fifty fifty blok",
    fields: [
        {
            name : "title",
            type: "text",
        }
    ]
}