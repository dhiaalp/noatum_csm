import { getPayload } from 'payload'
import config from '../payload.config'

const dir = '/images/terminals/luanda-terminal/'
const gallery: [string, string][] = [
  ['aerial-vessel-cargo', 'Aerial view of a vessel discharging cargo at Luanda'],
  ['bulk-bags-crane', 'Bulk bags lifted from the vessel hold'],
  ['vessel-at-berth', 'Vessel moored alongside the quay'],
  ['steel-in-hold', 'Steel cargo inside a vessel hold'],
  ['vehicle-discharge', 'Vehicles discharged from the vessel'],
  ['project-cargo-crane', 'Project cargo lifted by mobile crane'],
  ['site-vehicle', 'Noatum Ports site vehicle on the quay'],
]

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'luanda-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Luanda terminal not found')
  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      image: `${dir}profile.webp`,
      bannerImage: `${dir}aerial-terminal-overview.webp`,
      terminalDetails: { ...(terminal.terminalDetails ?? {}), overviewImage: `${dir}profile.webp` },
      gallery: gallery.map(([name, caption]) => ({ image: `${dir}${name}.webp`, caption })),
    },
  })
  console.log(`Updated Luanda terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
