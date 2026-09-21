import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'karachi-kgtl-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Karachi Container Terminal not found')

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: '/images/terminals/karachi-kgtl-terminal/hero-aerial.webp',
      bannerImage: '/images/terminals/karachi-kgtl-terminal/hero-aerial.webp',
      blurb: "A modern container terminal at Karachi Port, connecting Pakistan's principal trade gateway with global shipping routes.",
      description: "Karachi Container Terminal (KGTL) handles container traffic at Karachi Port with ship-to-shore operations, efficient yard handling, and direct access to Pakistan's principal trade gateway.",
      gallery: [
        { image: '/images/terminals/karachi-kgtl-terminal/hero-aerial.webp', caption: 'Karachi Container Terminal aerial view' },
        { image: '/images/terminals/karachi-kgtl-terminal/quay-operations.webp', caption: 'Quay operations at Karachi Container Terminal' },
        { image: '/images/terminals/karachi-kgtl-terminal/container-yard.webp', caption: 'Container yard operations' },
        { image: '/images/terminals/karachi-kgtl-terminal/vessel-operations.webp', caption: 'Vessel operations at Karachi Port' },
        { image: '/images/terminals/karachi-kgtl-terminal/night-aerial.webp', caption: 'Karachi Container Terminal at night' },
      ],
    },
  })
  console.log(`Updated Karachi Container Terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
