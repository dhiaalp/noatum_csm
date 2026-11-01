import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'terminals', where: { slug: { equals: 'luanda-terminal' } }, limit: 1 })
  const terminal = result.docs[0]
  if (!terminal) throw new Error('Luanda terminal not found')
  await payload.update({ collection: 'terminals', id: terminal.id, data: { heroVideo: '/videos/terminals/luanda-terminal/hero.mp4' } })
  console.log(`Updated Luanda terminal ${terminal.id}`)
  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
