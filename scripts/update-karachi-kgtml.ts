import { getPayload } from 'payload'
import config from '../payload.config'

const gallery = [
  { image: '/images/terminals/karachi-kgtml-terminal/hero-aerial.webp', caption: 'Karachi Multipurpose Terminal aerial view' },
  { image: '/images/terminals/karachi-kgtml-terminal/ro-ro-operations.webp', caption: 'Ro-ro operations at Karachi Multipurpose Terminal' },
  { image: '/images/terminals/karachi-kgtml-terminal/vessel-at-berth.webp', caption: 'Vessel at berth' },
  { image: '/images/terminals/karachi-kgtml-terminal/quay-operations.webp', caption: 'Quayside operations' },
  { image: '/images/terminals/karachi-kgtml-terminal/terminal-waterfront.webp', caption: 'Terminal waterfront view' },
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'karachi-kgtml-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Karachi Multipurpose Terminal not found')

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: gallery[0].image,
      bannerImage: gallery[0].image,
      blurb: 'A multipurpose terminal at Karachi Port handling ro-ro, general cargo, dry bulk, and grain through versatile quayside operations.',
      description: 'Karachi Multipurpose Terminal (KGTML) handles ro-ro, general cargo, dry bulk, and grain at Karachi Port, supported by versatile berths, storage areas, and a Smart Bag Counting System.',
      gallery,
    },
  })
  console.log(`Updated Karachi Multipurpose Terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
