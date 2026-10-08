import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Terminal specs and taglines pulled from "Noatum Ports_DECK 2.pdf" (AD Ports
 * Group International Ports Network deck). Only terminals that actually have
 * a spec slide in that deck are listed here -- terminals absent from it are
 * left untouched (the kiosk app marks those as unavailable to select).
 */
const updates: Array<{
  slug: string
  blurb: string
  terminalDetails: {
    berths?: string
    area?: string
    waterDepth?: string
    stsCranes?: string
    mobileCranes?: string
    rtgCranes?: string
    reeferPlugs?: string
    facilities?: string
    connectivity?: string
    expansion?: string
  }
}> = [
  {
    slug: 'castellon-terminal',
    blurb: 'Leading hub for renewable energy and the ceramic industry.',
    terminalDetails: {
      berths: '1150 m quay',
      area: '17 hectares',
      waterDepth: '13 m alongside',
      stsCranes: '3 units',
      mobileCranes: '4 units',
      reeferPlugs: '144 units',
    },
  },
  {
    slug: 'malaga-terminal',
    blurb: "Leading West Mediterranean container hub and the gateway to Andalucia region.",
    terminalDetails: {
      berths: '723 m quay',
      area: '37 hectares',
      waterDepth: '16 m alongside',
      stsCranes: '5 units',
      rtgCranes: '8 units',
      mobileCranes: '1 unit',
      reeferPlugs: '816 units',
    },
  },
  {
    slug: 'santander-terminal',
    blurb: "Northern Spain's premier industrial gateway.",
    terminalDetails: {
      berths: '300 m quay',
      waterDepth: '13 m alongside',
      mobileCranes: '2 units',
    },
  },
  {
    slug: 'sagunto-terminal',
    blurb: "Gateway to Valencia's industrial ecosystem.",
    terminalDetails: {
      berths: '910 m quay',
      waterDepth: '10-12 m alongside',
      mobileCranes: '6 units',
    },
  },
  {
    slug: 'tarragona-terminal',
    blurb: "Catalunya's preeminent agri-bulk hub.",
    terminalDetails: {
      berths: '300 m quay',
      waterDepth: '12-16 m alongside',
      mobileCranes: '3 units',
    },
  },
  {
    slug: 'karachi-kgtl-terminal',
    blurb: 'Gateway port for Pakistan and Central Asia.',
    terminalDetails: {
      berths: '800 m quay',
      area: '28 hectares',
      waterDepth: '16 m alongside',
      stsCranes: '6 units',
      rtgCranes: '20 units',
      reeferPlugs: '600 units',
    },
  },
  {
    slug: 'karachi-kgtml-terminal',
    blurb: 'Gateway port for Pakistan and Central Asia.',
    terminalDetails: {
      berths: '1525 m quay',
      area: '48 hectares',
      waterDepth: '16 m alongside',
      facilities: 'Container Freight Station, 14 Grain Silos Under Construction, Warehouses Under Construction',
      connectivity: 'Rail Connected',
    },
  },
  {
    slug: 'dar-es-salaam-teagtl-terminal',
    blurb: 'Gateway container terminal connecting Tanzania and Eastern Africa to the world.',
    terminalDetails: {
      berths: '725 m quay',
      area: '29 hectares',
      waterDepth: '12.2 m alongside',
      stsCranes: '6 units',
      rtgCranes: '21 units',
      expansion: 'Water Depth 15 m, Additional Quay Length 100 m',
      connectivity: 'Rail Connected (Tanzania-Zambia Rail Network)',
    },
  },
  {
    slug: 'safaga-terminal',
    blurb: 'Gateway to Upper Egypt and Golden Triangle Industrial Region.',
    terminalDetails: {
      berths: '1100 m quay',
      area: '81 hectares',
      waterDepth: '17 m alongside',
      stsCranes: '3 units',
      rtgCranes: '6 units',
      mobileCranes: '1 unit',
      reeferPlugs: '400 units',
    },
  },
  {
    slug: 'alexandria-acch-terminal',
    blurb: "Egypt's premier gateway terminal.",
    terminalDetails: {
      berths: '531 m quay',
      area: '17 hectares',
      waterDepth: '12 m alongside',
      stsCranes: '4 units',
      rtgCranes: '12 units',
      reeferPlugs: '1050 units',
    },
  },
  {
    slug: 'dekheila-acch-terminal',
    blurb: "Egypt's premier gateway terminal.",
    terminalDetails: {
      berths: '1040 m quay',
      area: '41 hectares',
      waterDepth: '16 m alongside',
      stsCranes: '10 units',
      rtgCranes: '18 units',
      reeferPlugs: '1500 units',
    },
  },
  {
    slug: 'tci-adabiya-terminal',
    blurb: "Gateway terminal to Egypt's Red Sea industrial ecosystem.",
    terminalDetails: {
      berths: '400 m quay',
      area: '7 hectares',
      waterDepth: '12 m alongside',
      mobileCranes: '2 units',
    },
  },
  {
    slug: 'sokhna-terminal',
    blurb: "Gateway terminal to Egypt's Red Sea industrial ecosystem.",
    terminalDetails: {
      berths: '676 m quay',
      area: '34 hectares',
      waterDepth: '18 m alongside',
      mobileCranes: '4 units',
      expansion: 'Warehouses Under Construction',
    },
  },
  {
    slug: 'pointe-noire-terminal',
    blurb: 'Gateway to Western and Central Africa.',
    terminalDetails: {
      berths: '416 m quay',
      area: '33 hectares',
      waterDepth: '16 m alongside',
      stsCranes: '3 units',
      rtgCranes: '9 units',
      reeferPlugs: '500 units',
      expansion: 'Yard Space 50 hectares, Additional Quay Length 450 m',
    },
  },
  {
    slug: 'luanda-terminal',
    blurb: "Gateway to Angola's dynamic economic heartland.",
    terminalDetails: {
      berths: '516 m quay',
      area: '19 hectares',
      waterDepth: '16 m alongside',
      stsCranes: '3 units',
      rtgCranes: '8 units',
      reeferPlugs: '300 units',
      connectivity: 'Rail Connected',
    },
  },
  {
    slug: 'umm-qasr-terminal',
    blurb: 'Gateway to Iraq.',
    terminalDetails: {
      berths: '200 m quay',
      area: '10 hectares',
      waterDepth: '12.5 m alongside',
    },
  },
  {
    slug: 'cli-sul-santos-terminal',
    blurb: "Largest white flag agri-bulk network in Brazil.",
    terminalDetails: {
      berths: '600 m quay',
      waterDepth: '14 m alongside',
      connectivity: 'Rail Connected',
    },
  },
  {
    slug: 'cli-norte-itaqui-terminal',
    blurb: "Largest white flag agri-bulk network in Brazil.",
    terminalDetails: {
      berths: '571 m quay',
      waterDepth: '15 m alongside',
      connectivity: 'Rail Connected',
    },
  },
  {
    slug: 'aqaba-multipurpose-terminal',
    blurb: 'Gateway for non-containerized cargo to Jordan and Iraq.',
    terminalDetails: {
      berths: '2000 m quay',
      area: '43 hectares',
      waterDepth: '13.5 m alongside',
      mobileCranes: '2 units',
      facilities: 'Grain Silos',
    },
  },
  {
    slug: 'tbilisi-dry-port',
    blurb: "Serving Georgia's industrial hub and connecting Asia's Middle Corridor.",
    terminalDetails: {
      area: '19 hectares',
      connectivity: 'Rail Connected',
    },
  },
  // Not in the kiosk's static roster, but present in the deck -- kept in sync
  // for when/if it's added to data/ports.ts.
  {
    slug: 'kismayo-terminal',
    blurb: 'Strategic gateway to Jubaland region.',
    terminalDetails: {
      berths: '635 m quay',
      area: '3 hectares',
      waterDepth: '9.5 m alongside',
    },
  },
]

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  let skipped = 0

  for (const entry of updates) {
    const result = await payload.find({
      collection: 'terminals',
      where: { slug: { equals: entry.slug } },
      limit: 1,
    })

    const terminal = result.docs[0]
    if (!terminal) {
      console.warn(`Skipped (not found in CMS): ${entry.slug}`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'terminals',
      id: terminal.id,
      data: {
        blurb: entry.blurb,
        terminalDetails: { ...(terminal.terminalDetails ?? {}), ...entry.terminalDetails },
      },
    })

    console.log(`Updated ${entry.slug}`)
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
