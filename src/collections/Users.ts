import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  fields: [{ name: 'name', type: 'text' }],
}
