import sectionList from "../../../fields/blocks/section-list";
import { generateTemplate } from "../generateTemplate";

export const defaultTemplate = generateTemplate({
    name: 'defaultTemplate',
    label: 'Standaard',
    fields: [
        {
            required: true,
            name: 'blocks',
            type: 'blocks',
            blocks: sectionList
        },
    ],
})