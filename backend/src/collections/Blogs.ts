import { CollectionConfig } from 'payload/types';

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    defaultColumns: ['title'],
    useAsTitle: 'title',
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'first_block',
      label: 'Head Block',
      type: 'group',
      admin: {
        description: 'First Fifty-Fifty block is used to filter and display information on the products page'
      },
      fields: [
        {
          type: 'checkbox',
          name: 'imageOnLeft',
          label: 'Image on left',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          label: 'Achtergrond afbeelding',
          relationTo: 'media',
          type: 'upload',
          required: true,
        },
      ]
    },
    {
      name: 'other_blocks',
      label: 'Blocks',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, path, index }) => {
            return data?.title || `Block ${index}`;
          }
        },
      },
      fields: [
        {
          type: 'checkbox',
          name: 'imageOnLeft',
          label: 'Image on left',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          label: 'Achtergrond afbeelding',
          relationTo: 'media',
          type: 'upload',
          required: true,
        },
      ]
    },
  ],
}

export default Blogs;