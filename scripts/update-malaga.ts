import { getPayload } from 'payload'
import config from '../payload.config'

const dir = '/images/terminals/malaga-terminal/'
const gallery: [string, string][] = [
  ['aerial-vessel-arriving', 'Aerial view of a vessel entering Malaga port'],
  ['rtg-container-lift', 'RTG gantry lifting a container'],
  ['reefer-stacks', 'Reefer container stacks'],
  ['container-yard', 'Container yard with STS cranes'],
  ['noatum-crane-detail', 'Noatum Ports crane at Malaga'],
  ['sts-cranes', 'Twin ship-to-shore cranes'],
  ['vessel-at-sea', 'Container vessel arriving at Malaga'],
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'malaga-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Malaga terminal not found')

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
  console.log(`Updated Malaga terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
