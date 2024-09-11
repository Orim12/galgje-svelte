import { button } from "../../../fields/blocks/sub-fields/Button";
import { generateTemplate } from "../generateTemplate";

export const dashboardTemplate = generateTemplate({
    name: 'dashboardTemplate',
    label: 'Customer - Dashboard',
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            required: true,
        },
        {
            type: 'array',
            name: 'buttons',
            label: 'Knopen',
            maxRows: 3,
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: ({ data, index, path }) => data.button.label || `Knop ${index}`,
                },
            },
            fields: [
                button({})
            ]
        }
    ]
})