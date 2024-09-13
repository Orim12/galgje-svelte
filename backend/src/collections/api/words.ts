import { CollectionConfig } from 'payload/types';

const Words: CollectionConfig = {
  slug: 'words',
  fields: [
    {
      name: 'word',
      type: 'text',
      required: true,
    },
  ],
};

export default Words;
