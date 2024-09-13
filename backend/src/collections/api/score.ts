import { CollectionConfig } from 'payload/types';

const scores: CollectionConfig = {
  slug: 'scores',
  fields: [
    {
      name: 'score',
      type: 'number',
      required: true,
    },
    {
      name: 'plrname',
      type: 'text',
      required: true,
    }
  ],
};

export default scores;
