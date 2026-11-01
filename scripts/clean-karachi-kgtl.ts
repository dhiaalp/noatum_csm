import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Strips Karachi Container Terminal's `terminalDetails` down to exactly what
 * "Noatum Ports_DECK 2.pdf" page 06 shows for KARACHI CONTAINER TERMINAL --
 * `craneCount`/`teuCapacity` aren't given there (the deck page shows icons +
 * counts only, no TEU figure), and `overviewImage` had drifted to an
 * unrelated Singapore stock photo -- point it back at the terminal's own
 * hero shot instead.
 */
async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'karachi-kgtl-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Karachi Container Terminal not found')

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    data: {
      terminalDetails: {
        ...(terminal.terminalDetails ?? {}),
        craneCount: null,
        teuCapacity: null,
        overviewImage: '/images/terminals/karachi-kgtl-terminal/hero-aerial.webp',
      },
    },
  })
  console.log(`Cleaned Karachi Container Terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
