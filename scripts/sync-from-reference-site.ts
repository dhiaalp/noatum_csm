import { getPayload } from 'payload'
import config from '../payload.config'

// Syncs homepage copy and news with the reference site
// (https://paleturquoise-wren-936000.hostingersite.com/).
// Run with: npx tsx scripts/sync-from-reference-site.ts

const intro =
  'Noatum Ports, the international ports and terminals arm of AD Ports Group, is a leading global port operator, facilitating trade and enhancing connectivity across three continents with a network of 28 strategically located terminals and 3 digital assets. Our operations span multipurpose, container, and general and bulk and Ro-Ro cargoes within our multipurpose terminals, serving both international trade and local economies.'

const siteContent: Record<string, string> = {
  'home.hero.headline': 'Enabling Global Trade',
  'home.hero.subtext': intro,
  'home.stats.stat1.value': '28',
  'home.stats.stat1.label': 'Terminals Worldwide',
  'home.who-we-are.leadText':
    'Noatum Ports aims to expand its presence across five continents, offering a state-of-the-art terminal network that delivers efficient, sustainable, and technology-driven solutions. We are committed to strategic growth, operational excellence, and forging strong partnerships, ensuring that our host nations become global trade and logistics hubs.',
  'home.ports-network.leadText':
    'Noatum Ports has 28 ports and terminals around the world, including 10 in Spain, 5 in Egypt, 2 in Brazil, 2 in Pakistan and one each in Angola, Congo-Brazzaville, Cameroon, Tanzania, Jordan, Syria, Iraq, Georgia, and Khazakstan. With its global focus on ports and terminals outside the UAE, Noatum Ports is positioned along strategic trade routes to provide seamless connectivity, multimodal solutions, and hub advantages, enabling efficient cargo movement and logistics integration. The service quality and competitive advantage offered by Noatum Ports enhances trade corridors and strengthens supply chains, ensuring unmatched flexibility and efficiency for businesses worldwide.',
}

const cliNews = {
  slug: 'ad-ports-group-successfully-completes-acquisition-of-brazils-cli-upon-receiving-full-regulatory-approvals',
  title: 'AD Ports Group Successfully Completes Acquisition of Brazil’s CLI Upon Receiving Full Regulatory Approvals',
  date: '2026-10-02',
  category: 'Terminals',
  excerpt:
    'Abu Dhabi, UAE / São Paulo, Brazil – 02 October 2026: AD Ports Group (ADX: ADPORTS), through its international ports operating arm Noatum Ports, today announced the successful completion of the financial closing of its acquisition of Corredor Logística e Infraestrutura (CLI), Brazil’s leading independent agri-bulk port terminal operator, following regulatory and antitrust approvals. CLI operates two of Brazil’s strategically important sugar and grain export terminals at the Ports of Itaqui and Santos.',
}

async function main() {
  const payload = await getPayload({ config })

  for (const [key, value] of Object.entries(siteContent)) {
    const existing = await payload.find({ collection: 'site-content', where: { key: { equals: key } }, limit: 1 })
    if (existing.docs[0]) {
      await payload.update({ collection: 'site-content', id: existing.docs[0].id, data: { value } })
    } else {
      await payload.create({ collection: 'site-content', data: { key, type: 'text', value } })
    }
    console.log(`site-content ${key}`)
  }

  const news = await payload.find({ collection: 'news', where: { slug: { equals: cliNews.slug } }, limit: 1 })
  if (!news.docs[0]) {
    await payload.create({ collection: 'news', data: cliNews })
    console.log('news: created CLI article')
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
