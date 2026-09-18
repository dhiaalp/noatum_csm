import type { CollectionConfig } from 'payload'

/**
 * Source of truth for every terminal/port on the site. The public site's
 * Ports Network pages (listing, country pages, and each terminal's detail
 * page) read from this collection instead of the old static data/ports.ts
 * file — publish or edit a terminal here and it appears on the site with no
 * code change.
 */
export const Terminals: CollectionConfig = {
  slug: 'terminals',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'country', 'type'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'countrySlug', type: 'text', required: true, admin: { description: 'Matches a country slug on the Ports Network map (e.g. "spain").' } },
    { name: 'country', type: 'text', required: true },
    { name: 'flag', type: 'text' },
    { name: 'type', type: 'text', admin: { description: 'Short operational tag, e.g. "Multi-Purpose", "Container".' } },
    { name: 'latitude', type: 'number', required: true },
    { name: 'longitude', type: 'number', required: true },
    { name: 'blurb', type: 'textarea', admin: { description: 'Short copy shown on terminal cards and the map popup.' } },
    { name: 'description', type: 'textarea', admin: { description: 'Longer copy shown on the terminal detail page.' } },
    { name: 'image', type: 'text', admin: { description: 'Primary photo URL.' } },
    { name: 'bannerImage', type: 'text', admin: { description: 'Overrides `image` for the detail page hero banner only.' } },
    { name: 'heroVideo', type: 'text', admin: { description: 'Optional background video URL for the detail page hero.' } },
    { name: 'established', type: 'text' },
    {
      name: 'terminalDetails',
      type: 'group',
      label: 'Terminal Details',
      fields: [
        {
          name: 'overviewImage',
          type: 'text',
          admin: {
            description: 'Aerial/overview photo for the terminal explorer section. Falls back to the primary photo above if left blank.',
            components: { Field: '/src/fields/UploadableImageField.tsx#default' },
          },
        },
        { name: 'area', type: 'text', admin: { description: 'e.g. "45 hectares"' } },
        { name: 'waterDepth', type: 'text', admin: { description: 'e.g. "14.5m alongside"' } },
        { name: 'berths', type: 'text', admin: { description: 'e.g. "3 berths, 850m quay"' } },
        { name: 'craneCount', type: 'text', admin: { description: 'e.g. "4 STS cranes, 8 RTGs"' } },
        { name: 'teuCapacity', type: 'text', admin: { description: 'e.g. "1.2M TEU / year"' } },
        {
          type: 'row',
          fields: [
            { name: 'stsCranes', type: 'text', admin: { description: 'e.g. "4 units"', width: '25%' } },
            { name: 'mobileCranes', type: 'text', admin: { description: 'e.g. "1 unit"', width: '25%' } },
            { name: 'rtgCranes', type: 'text', admin: { description: 'e.g. "1 unit"', width: '25%' } },
            { name: 'reeferPlugs', type: 'text', admin: { description: 'e.g. "1 unit"', width: '25%' } },
          ],
        },
      ],
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Container Services', value: 'container-services' },
        { label: 'General Cargo Services', value: 'general-cargo-services' },
        { label: 'Ro-Ro Services', value: 'ro-ro-services' },
        { label: 'Breakbulk & Project Cargo', value: 'breakbulk-and-project-cargo' },
        { label: 'Dry Bulk Services', value: 'dry-bulk-services' },
        { label: 'Warehousing Solutions', value: 'warehousing-solutions' },
        { label: 'Cold Chain Logistics', value: 'cold-chain-logistics' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Gallery' },
      admin: {
        className: 'gallery-photos-field',
        description: 'Displays as a row of cards. Drag a card\'s handle to reorder.',
      },
      fields: [
        {
          name: 'image',
          type: 'text',
          required: true,
          admin: {
            components: { Field: '/src/fields/UploadableImageField.tsx#default' },
          },
        },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'certificates',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuedBy', type: 'text' },
        { name: 'image', type: 'text', admin: { description: 'Badge/logo image URL.' } },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'fileUrl', type: 'text', required: true },
      ],
    },
  ],
}
