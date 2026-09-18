import type { CollectionConfig } from 'payload'
export const News: CollectionConfig = {
  slug: 'news',
  admin: { useAsTitle: 'title' },
  // Public site reads published news anonymously; only logged-in CMS users can write.
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date' },
    { name: 'category', type: 'text' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'text' },
  ],
}
