import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'author', 'status'],
    useAsTitle: 'title',
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'content',
      type: 'richText'
    },
  ],
}

export default Posts;