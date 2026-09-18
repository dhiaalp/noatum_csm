import type { CollectionConfig } from 'payload'

/**
 * Generic key/value content store backing the public site's front-end
 * click-to-edit feature. Any text, image path, or video path on the site
 * can be overridden here by key, without needing a dedicated field in a
 * purpose-built collection. The site falls back to its own hardcoded
 * content when a key has no row here.
 */
export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  admin: { useAsTitle: 'key' },
  access: { read: () => true },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true, admin: { readOnly: true } },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'text',
      options: ['text', 'image', 'video', 'icon'],
    },
    { name: 'value', type: 'textarea', required: true },
  ],
}
