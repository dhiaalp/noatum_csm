import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * These 8 terminals have no spec slide in "Noatum Ports_DECK 2.pdf" (AD
 * Ports Group International Ports Network deck) -- their terminalDetails
 * equipment/capability numbers (area, waterDepth, berths, craneCount,
 * stsCranes, mobileCranes, rtgCranes, reeferPlugs) were placeholder seed
 * data with no real source. Clearing them so the app only shows verified
 * figures. `overviewImage` is just a photo, not a capability claim -- left
 * alone.
 */
const slugs = [
  'slp-bilbao-terminal',
  'tmg-a-coruna-terminal',
  'tmg-ferrol-terminal',
  'tmv-villagarcia-terminal',
  'tmc-cartagena-terminal',
  'kuryk-terminal',
  'lattakia-terminal',
  'douala-terminal',
]

const clearedFields = {
  area: null,
  waterDepth: null,
  berths: null,
  craneCount: null,
  stsCranes: null,
  mobileCranes: null,
  rtgCranes: null,
  reeferPlugs: null,
}

async function main() {
  const payload = await getPayload({ config })

  for (const slug of slugs) {
    const { docs } = await payload.find({ collection: 'terminals', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`[skip] no terminal found with slug "${slug}"`)
      continue
    }
    await payload.update({
      collection: 'terminals',
      id: doc.id,
      data: { terminalDetails: { ...doc.terminalDetails, ...clearedFields } },
    })
    console.log(`[cleared] ${doc.name} (${slug})`)
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
