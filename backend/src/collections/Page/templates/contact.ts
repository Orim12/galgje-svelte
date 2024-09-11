import { generateTemplate } from "../generateTemplate";
import sectionList from "../../../fields/blocks/section-list";

export const contactTemplate = generateTemplate({
    name: 'contactTemplate',
    label: 'Contact',
    fields: [
        {
            name: 'blocks',
            type: 'blocks',
            label: 'Blokken',
            blocks: sectionList,
        }
    ],
})