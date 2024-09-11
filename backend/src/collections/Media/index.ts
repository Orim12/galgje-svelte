import { CollectionConfig } from "payload/dist/collections/config/types";
import { adminThumbnailFallback } from "./hooks/admin";
import { ImageUploadFormatOptions } from "payload/dist/uploads/types";
import { FocusImageComponent } from "../../fields/focus-image/FocusImageComponent";


const webpFormatOptions: ImageUploadFormatOptions = {
    format: 'webp',
}

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'id',
        hideAPIURL: process.env.NODE_ENV === 'production',
        group: 'Bestanden',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt',
            type: 'text',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'focusX',
                    type: 'number',
                    defaultValue: 50,
                },
                {
                    name: 'focusY',
                    type: 'number',
                    defaultValue: 50,
                },
            ],
            admin: {
                components: {
                    Field: FocusImageComponent
                }
            },
        },
    ],
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        focalPoint: false,
        imageSizes: [
            {
                name: 'original',
            },
            {
                name: 'fullSize',
                formatOptions: webpFormatOptions,

            },
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                crop: 'centre',
                formatOptions: webpFormatOptions,
            },
            {
                name: 'card',
                width: 768,
                crop: 'centre',
                formatOptions: webpFormatOptions,
            },
            {
                name: 'tablet',
                width: 1024,
                crop: 'centre',
                formatOptions: webpFormatOptions,
            },
            {
                name: 'desktop',
                width: 1240,
                height: 800,
                crop: 'centre',
                fit: 'contain',
                formatOptions: webpFormatOptions,
            },
            {
                name: 'fullscreen',
                width: 2400,
                height: 1600,
                crop: 'centre',
                formatOptions: webpFormatOptions,
            }
        ],
        formatOptions: webpFormatOptions,
        adminThumbnail: adminThumbnailFallback,
        mimeTypes: [
            'image/jpeg',
            'image/png',
            // 'image/svg+xml', // Only enable if we trust the uploader
            'image/webp',
            'application/pdf',
            'image/jpg',
        ],
    }
}

export default Media