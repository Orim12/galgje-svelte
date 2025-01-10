import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'roles',
      type: 'array',
      label: 'Roles',
      fields: [
        {
          type: 'text',
          name: 'role',
          label: 'Role',
        },
      ],
    },
  ],
}

export default Users
