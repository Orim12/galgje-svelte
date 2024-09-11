import { GlobalConfig } from "payload/types";

export const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            defaultValue: 'Powered by volcano',
        }
    ]
}