import { getPayload } from 'payload'
import config from '../payload.config'

const dir = '/images/terminals/sagunto-terminal/'
const gallery: [string, string][] = [
  ['aerial-shiploaders-over-holds', 'Top-down view of the grabs working vessel holds'],
  ['heavy-haul-load', 'Heavy-haul load on a trailer at the terminal'],
  ['bulk-in-vessel-hold', 'Bulk cargo inside a vessel hold'],
  ['lhm-550-crane', 'Liebherr LHM 550 mobile harbour crane'],
  ['truck-warehouse-loading', 'Truck loading at the terminal warehouse'],
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'sagunto-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Sagunto terminal not found')
  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: `${dir}profile-heavy-lift.webp`,
      bannerImage: `${dir}aerial-quay-overview.webp`,
      terminalDetails: { ...(terminal.terminalDetails ?? {}), overviewImage: `${dir}profile-heavy-lift.webp` },
      gallery: gallery.map(([name, caption]) => ({ image: `${dir}${name}.webp`, caption })),
    },
  })
  console.log(`Updated Sagunto terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
