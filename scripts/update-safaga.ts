import { getPayload } from 'payload'
import config from '../payload.config'

const gallery = [
  { image: '/images/terminals/safaga-terminal/quay-overview.webp', caption: 'Safaga Terminal quay and vessel operations' },
  { image: '/images/terminals/safaga-terminal/container-handling.webp', caption: 'Container handling at Safaga Terminal' },
  { image: '/images/terminals/safaga-terminal/ship-to-shore-cranes.webp', caption: 'Ship-to-shore crane operations' },
  { image: '/images/terminals/safaga-terminal/night-operations.webp', caption: 'Safaga Terminal night operations' },
  { image: '/images/terminals/safaga-terminal/reefer-transport.webp', caption: 'Reefer container transport' },
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'terminals',
    where: { slug: { equals: 'safaga-terminal' } },
    limit: 1,
  })

  const terminal = result.docs[0]
  if (!terminal) throw new Error('Safaga terminal not found')

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: gallery[0].image,
      bannerImage: gallery[0].image,
      heroVideo: '/videos/terminals/safaga-terminal/hero.mp4',
      blurb: "A strategic multipurpose gateway on Egypt's Red Sea coast, connecting regional and international trade through modern cargo-handling infrastructure.",
      description: "Safaga Terminal connects Egypt's Red Sea trade corridor to global markets with efficient ship-to-shore operations, container handling, and round-the-clock terminal capability.",
      gallery,
    },
  })

  console.log(`Updated Safaga terminal ${terminal.id}`)
  await payload.destroy()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
