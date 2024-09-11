import { generateTemplate } from "../generateTemplate";
import sectionList from "../../../fields/blocks/section-list";

export const homeTemplate = generateTemplate({
    name: 'homeTemplate',
    label: 'Home',
    fields: [
        {
            name: 'description',
            type: 'richText',
            label: 'Beschrijving',
            required: true,
        },
        {
            name: 'blocks',
            type: 'blocks',
            label: 'Blokken',
            blocks: sectionList,
        }
    ],
})