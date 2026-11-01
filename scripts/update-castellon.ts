import { getPayload } from 'payload'
import config from '../payload.config'

const dir = '/images/terminals/castellon-terminal/'
const gallery: [string, string][] = [
  ['aerial-container-yard', 'Aerial view of the container yard'],
  ['warehouse-interior', 'Covered warehouse storage'],
  ['gate-canopy', 'Terminal gate and inspection canopy'],
  ['heavy-haul-transport', 'Heavy-haul transport at the terminal'],
  ['reach-stacker', 'Reach stacker handling a container'],
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'castellon-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Castellon terminal not found')
  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: `${dir}vessel-at-berth.webp`,
      bannerImage: `${dir}aerial-quay-overview.webp`,
      terminalDetails: { ...(terminal.terminalDetails ?? {}), overviewImage: `${dir}vessel-at-berth.webp` },
      gallery: gallery.map(([name, caption]) => ({ image: `${dir}${name}.webp`, caption })),
    },
  })
  console.log(`Updated Castellon terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
