import { RichTextField } from "payload/types";
import video from "./rich-text/video";
import { slateEditor } from '@payloadcms/richtext-slate';

export const RichText = (name: string, label: string = undefined): RichTextField => {
    return {
        name: name,
        label: label,
        type: 'richText',
        required: true,
        editor: slateEditor({
            admin: {
                elements: [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'blockquote',
                    'upload',
                    'link',
                    'ol',
                    'ul',
                    video,
                ],
                leaves: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                ],
                link: {
                    fields: [
                        {
                            name: 'style',
                            label: 'Stijl',
                            type: 'select',
                            defaultValue: 'default',
                            options: [
                                {
                                    label: 'Standaard',
                                    value: 'default',
                                },
                                {
                                    label: 'Inline',
                                    value: 'inline',
                                },
                                {
                                    label: 'Gele knop',
                                    value: 'yellow',
                                },
                            ]
                        }
                    ]
                }
            }
        })
    }
}