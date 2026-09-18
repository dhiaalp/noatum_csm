import type { CollectionConfig } from 'payload'

/**
 * Uploaded images and videos for the public site's front-end click-to-edit
 * feature — backs the "Upload" option next to every image/video field.
 * Stored on local disk (no S3/cloud adapter configured) and served publicly
 * so the site can render them directly.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'filename' },
  access: { read: () => true },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [{ name: 'alt', type: 'text' }],
}
