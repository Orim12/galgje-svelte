import { CollectionConfig } from 'payload/types';

const scores: CollectionConfig = {
  slug: 'scores',
  fields: [
    {
      name: 'score',
      type: 'text',
      required: true,
    },
  ],
};

export default scores;
