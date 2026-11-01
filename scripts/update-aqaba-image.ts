import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'aqaba-multipurpose-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Aqaba terminal not found')
  await payload.update({ collection: 'terminals', id: terminal.id, data: { bannerImage: '/images/terminals/aqaba-multipurpose-terminal/aerial-terminal.webp' } })
  console.log(`Updated Aqaba terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
