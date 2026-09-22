import { getPayload } from 'payload'
import config from '../payload.config'

const gallery = [
  { image: '/images/terminals/malaga-terminal/hero-quay.webp', caption: 'Noatum Ports Malaga Terminal quay' },
  { image: '/images/terminals/malaga-terminal/container-handling.webp', caption: 'Container handling in Malaga' },
  { image: '/images/terminals/malaga-terminal/crane-spreader.webp', caption: 'Crane and spreader operations' },
  { image: '/images/terminals/malaga-terminal/waterside-terminal.webp', caption: 'Malaga terminal waterside view' },
  { image: '/images/terminals/malaga-terminal/night-operations.webp', caption: 'Malaga terminal night operations' },
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'malaga-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Malaga terminal not found')

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: { image: gallery[0].image, bannerImage: gallery[0].image, gallery },
  })
  console.log(`Updated Malaga terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
