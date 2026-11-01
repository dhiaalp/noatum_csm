import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Second-pass fixes against "Noatum Ports_DECK 2.pdf" (AD Ports Group
 * International Ports Network deck), on top of what scripts/update-from-deck.ts
 * already applied. Two kinds of fix:
 *
 * 1. A handful of terminals (Brazil's two CLI terminals, Aqaba, Tbilisi Dry
 *    Port) had STS/RTG/reefer-plug numbers in terminalDetails that the deck
 *    does not support -- those terminals use shiploaders, mobile harbour
 *    cranes, or reach stackers instead. `clear: true` on a field wipes it
 *    (set to null) rather than leaving stale data merged in.
 * 2. A few fields the deck gives but the first pass missed (shiploaders,
 *    warehousing/reach-stacker facilities notes, and the Castellon/Malaga
 *    `type` correction from "Multi-Purpose" to "Container").
 */
type Fix = {
  slug: string
  type?: string
  terminalDetails?: {
    stsCranes?: string | null
    mobileCranes?: string | null
    rtgCranes?: string | null
    reeferPlugs?: string | null
    shipLoaders?: string | null
    facilities?: string | null
  }
}

const fixes: Fix[] = [
  // Deck: "Container" hub terminals, not Multi-Purpose.
  { slug: 'castellon-terminal', type: 'Container' },
  { slug: 'malaga-terminal', type: 'Container' },

  // Deck: Safaga has 1 Shiploader alongside its STS/RTG/MHC.
  { slug: 'safaga-terminal', terminalDetails: { shipLoaders: '1 unit' } },

  // Deck: El Dekheila and Adabiya both list "Warehousing" as equipment.
  { slug: 'dekheila-acch-terminal', terminalDetails: { facilities: 'Warehousing' } },
  { slug: 'tci-adabiya-terminal', terminalDetails: { facilities: 'Warehousing' } },

  // Deck: Santander/Sagunto/Tarragona equipment is "X MHC, Warehousing" --
  // add the warehouse size the deck gives (no dedicated schema field for it).
  { slug: 'santander-terminal', terminalDetails: { facilities: 'Warehousing (53,000 sqm)' } },
  { slug: 'sagunto-terminal', terminalDetails: { facilities: 'Warehousing (48,000 sqm)' } },
  { slug: 'tarragona-terminal', terminalDetails: { facilities: 'Warehousing (71,000 sqm)' } },

  // Deck: Umm Qasr / Kismayo run on reach stackers only -- no STS/RTG/MHC.
  { slug: 'umm-qasr-terminal', terminalDetails: { facilities: 'Reach Stacker Operations' } },
  { slug: 'kismayo-terminal', terminalDetails: { facilities: 'Reach Stacker Operations' } },

  // Deck: Aqaba Multi-Purpose Terminal is "2 MHC, Warehousing" -- NO STS/RTG.
  // The CMS record had stale STS/RTG/reefer numbers; clear them.
  {
    slug: 'aqaba-multipurpose-terminal',
    terminalDetails: {
      stsCranes: null,
      rtgCranes: null,
      reeferPlugs: null,
      facilities: 'Warehousing, Grain Silos',
    },
  },

  // Deck: Tbilisi Dry Port runs 3 reach stackers + 2 locomotives -- NO STS/RTG.
  {
    slug: 'tbilisi-dry-port',
    terminalDetails: {
      stsCranes: null,
      rtgCranes: null,
      reeferPlugs: null,
      facilities: '3 Reach Stackers, Warehousing (2,500 sqm), 2 Locomotives',
    },
  },

  // Deck: CLI Sul (Santos) is a white-flag agri-bulk terminal -- 3
  // Shiploaders, NO STS/RTG. The CMS record had stale container-terminal
  // crane numbers; clear them and set shiploaders instead (the bug the
  // user flagged by name).
  {
    slug: 'cli-sul-santos-terminal',
    terminalDetails: {
      stsCranes: null,
      mobileCranes: null,
      rtgCranes: null,
      reeferPlugs: null,
      shipLoaders: '3 units',
      facilities: 'Annual Capacity 20M Tons',
    },
  },

  // Deck: CLI Norte (Itaqui) -- 2 Shiploaders, NO STS/RTG/MHC.
  {
    slug: 'cli-norte-itaqui-terminal',
    terminalDetails: {
      stsCranes: null,
      mobileCranes: null,
      rtgCranes: null,
      reeferPlugs: null,
      shipLoaders: '2 units',
      facilities: 'Annual Capacity 5M Tons',
    },
  },
]

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  let skipped = 0

  for (const fix of fixes) {
    const result = await payload.find({
      collection: 'terminals',
      where: { slug: { equals: fix.slug } },
      limit: 1,
    })

    const terminal = result.docs[0]
    if (!terminal) {
      console.warn(`Skipped (not found in CMS): ${fix.slug}`)
      skipped++
      continue
    }

    const data: Record<string, unknown> = {}
    if (fix.type) data.type = fix.type
    if (fix.terminalDetails) {
      data.terminalDetails = { ...(terminal.terminalDetails ?? {}), ...fix.terminalDetails }
    }

    await payload.update({ collection: 'terminals', id: terminal.id, data })
    console.log(`Fixed ${fix.slug}`)
    updated++
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped.`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
