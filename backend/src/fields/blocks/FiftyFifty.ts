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
            type: "tabs",
            tabs: [
                {
                    label: "Tekst",
                    fields: [
                        {
                            name: "textAlignment",
                            label: "Tekst uitlijning",
                            type: "radio",
                            defaultValue: "left",
                            options: [
                                {
                                    label: "Links",
                                    value: "left",
                                },
                                {
                                    label: "Rechts",
                                    value: "right",
                                },
                            ],
                        },
                        {
                            name: "title",
                            label: "Titel",
                            type: "text",
                            defaultValue: "Titel",
                            required: true,
                        },
                        {
                            name: "description",
                            label: "Beschrijving",
                            type: "textarea",
                            defaultValue: "Beschrijving van het onderwerp",
                            required: true,
                        },
                    ]
                },
                {
                    label: "Media",
                    fields: [
                        {
                            name: "mediaType",
                            label: "Type",
                            type: "radio",
                            defaultValue: "image",
                            options: [
                                {
                                    label: "Afbeelding",
                                    value: "image",
                                },
                                {
                                    label: "Video",
                                    value: "video",
                                },
                            ]
                        },
                        {
                            name: "media",
                            label: "Media",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.mediaType === "image",
                            },
                        },
                        {
                            name: "videoPlatform",
                            label: "Video platform",
                            type: "select",
                            required: true,
                            defaultValue: "youtube",
                            admin: {
                                condition: (_, siblingData) => siblingData.mediaType === "video",
                            },
                            options: [
                                {
                                    label: "YouTube",
                                    value: "youtube",
                                },
                                {
                                    label: "Vimeo",
                                    value: "vimeo",
                                },
                            ]
                        },
                        {
                            name: "vimeoId",
                            label: "Vimeo ID",
                            type: "text",
                            required: true,
                            admin: {
                                condition: (_, siblingData) =>
                                    siblingData.mediaType === "video" &&
                                    siblingData.videoPlatform === "vimeo",
                            },
                        },
                        {
                            name: "youtubeId",
                            label: "YouTube ID",
                            type: "text",
                            required: true,
                            admin: {
                                condition: (_, siblingData) =>
                                    siblingData.mediaType === "video" &&
                                    siblingData.videoPlatform === "youtube",
                            },
                        },
                    ]
                },
                {
                    label: "Call to action",
                    fields: [
                        {
                            name: "hasCallToAction",
                            label: "Call to action weergeven",
                            type: "checkbox",
                            defaultValue: false,
                        },
                        button({
                            name: 'callToAction',
                            relationTo: ["pages"],
                            required: true,
                            type: 'button',
                            condition: (_, siblingData) => siblingData?.hasCallToAction === true,
                        }),
                    ]
                }
            ]
        }
    ]
}