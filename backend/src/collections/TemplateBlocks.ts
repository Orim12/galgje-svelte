import { CollectionConfig } from 'payload/types';
import sectionList from '../fields/blocks/section-list';

const TemplateBlocks: CollectionConfig = {
    slug: 'template-blocks',
    labels: {
        singular: 'Template Block',
        plural: 'Template Blocks',
    },
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Titel',
            required: true,
        },
        {
            name: 'blocks',
            label: 'Blocks',
            type: 'blocks',
            minRows: 0,
            maxRows: 0,
            blocks: sectionList
        },
    ],
};

export default TemplateBlocks;