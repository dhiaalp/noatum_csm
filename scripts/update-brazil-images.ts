import { getPayload } from 'payload'
import config from '../payload.config'

const terminals: Record<string, { hero: string; banner: string; aerials: [string, string][]; gallery: [string, string][] }> = {
  'cli-sul-santos-terminal': {
    hero: 'vessel-at-berth',
    banner: 'aerial-terminal-overview',
    aerials: [['aerial-vessel-berth', 'Aerial view of a vessel at berth']],
    gallery: [
      ['shiploader', 'Shiploader at CLI Sul'],
      ['rail-unloading-warehouse', 'Rail unloading inside the grain warehouse'],
      ['grain-discharge', 'Grain discharge at the terminal'],
      ['truck-gate', 'Truck access at CLI Sul'],
      ['wheel-loader-rail', 'Wheel loader working alongside rail wagons'],
    ],
  },
  'cli-norte-itaqui-terminal': {
    hero: 'vessel-conveyor',
    banner: 'aerial-silos-and-conveyor',
    aerials: [['aerial-storage-warehouses', 'Aerial view of the storage warehouses']],
    gallery: [
      ['shiploader-vessel', 'Shiploader loading a vessel at Itaqui'],
      ['truck-unloading', 'Truck unloading building'],
      ['grain-storage', 'Grain storage warehouse'],
      ['grain-loading', 'Grain loading operations'],
      ['soybeans', 'Soybeans handled at CLI Norte'],
    ],
  },
}

async function main() {
  const payload = await getPayload({ config })
  for (const [slug, { hero, banner, aerials, gallery }] of Object.entries(terminals)) {
    const result = await payload.find({ collection: 'terminals', where: { slug: { equals: slug } }, limit: 1 })
    const terminal = result.docs[0]
    if (!terminal) throw new Error(`${slug} not found`)
    const path = (name: string) => `/images/terminals/${slug}/${name}.webp`
    await payload.update({
      collection: 'terminals',
      id: terminal.id,
      data: {
        image: path(hero),
        bannerImage: path(banner),
        heroVideo: null,
        terminalDetails: { ...(terminal.terminalDetails ?? {}), overviewImage: path(hero) },
        gallery: [...aerials, ...gallery].map(([name, caption]) => ({ image: path(name), caption })),
      },
    })
    console.log(`Updated ${slug}`)
  }
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
