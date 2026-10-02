import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Data-only migration (no schema changes) capturing the Phase 1 content
 * pack updates applied directly to `site_content` and `terminals` during
 * content review: homepage "Noatum Ports" / "Strategic Connectivity"
 * copy, Port Services and Digital Solutions copy fixes, the Careers hero
 * title, "Why Work for Us" title, and "Join Noatum Ports" CTA, plus
 * description/spec updates for the Luanda, Safaga, and both Karachi
 * terminals, and Karachi Multipurpose's service list.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const siteContent: Array<{ key: string; value: string }> = [
    {
      key: 'home.who-we-are.title',
      value: 'Noatum Ports',
    },
    {
      key: 'home.who-we-are.leadText',
      value:
        "Noatum Ports, the international ports and terminals arm of AD Ports Group, is a leading global port operator, facilitating trade and enhancing connectivity across three continents with a network of 27 strategically located terminals and 3 digital assets. Our operations span multipurpose, container, and general and bulk and Ro-Ro terminals, serving both international trade and local economies.\n\nNoatum Ports aims to expand its presence across five continents, offering a state-of-the-art terminal network that delivers efficient, sustainable, and technology-driven solutions. We are committed to strategic growth, operational excellence, and forging strong partnerships, ensuring that our host nations become global trade and logistics hubs.",
    },
    {
      key: 'home.ports-network.leadText',
      value:
        'Noatum Ports has 27 ports and terminals around the world, including 12 in Spain, 2 in Brazil, 2 in Pakistan and one each in Angola, Congo-Brazzaville, Cameroon, Jordan, Syria, Tanzania, and Khazakstan. With its global focus on ports and terminals outside the UAE, Noatum Ports is positioned along strategic trade routes to provide seamless connectivity, multimodal solutions, and hub advantages, enabling efficient cargo movement and logistics integration. The service quality and competitive advantage offered by Noatum Ports enhances trade corridors and strengthens supply chains, ensuring unmatched flexibility and efficiency for businesses worldwide.',
    },
    {
      key: 'home.why.title',
      value: "Noatum Ports's Unique Edge",
    },
    {
      key: 'services.port-services.hero.leadText',
      value:
        'Noatum Ports delivers comprehensive, high-performance port and logistics solutions across key global trade corridors. As a leading port operator, we provide efficient cargo handling, seamless intermodal connectivity, and integrated supply chain solutions, ensuring smooth and reliable operations for our customers.',
    },
    {
      key: 'services.port-services.capabilities.leadText',
      value:
        'Our expertise spans container handling, and bulk and general cargo, in addition to multipurpose terminal services. We support end-to-end logistics through vessel loading and discharging, storage and distribution, reefer monitoring, and container freight station services. Leveraging advanced technology and automation, we optimise port efficiency, cargo security, and supply chain visibility.\n\nWith a commitment to operational excellence and sustainability, Noatum Ports continuously enhances its capabilities to meet the evolving demands of global trade. Our strategic locations, multimodal transport solutions, and long-term partnerships empower businesses to expand their reach with confidence.',
    },
    {
      key: 'services.port-services.overview.body',
      value:
        'Our expertise spans container handling, and bulk and general cargo, in addition to multipurpose terminal services. We support end-to-end logistics through vessel loading and discharging, storage and distribution, reefer monitoring, and container freight station services. Leveraging advanced technology and automation, we optimise port efficiency, cargo security, and supply chain visibility.',
    },
    {
      key: 'services.port-services.overview.title',
      value: 'Integrated Port Services',
    },
    {
      key: 'services.digital-solutions.overview.body',
      value:
        "Maqta Ayla is a leading trade technology enabler, paving the next era of trade with exponential technologies and unmatched sector expertise. Maqta Ayla operates Aqaba's Port Community System (PCS) & Truck control system (TCS) and delivers advanced digital solutions to digitalise trade, optimise logistics, and streamline and enhance port and landside operations, supporting Aqaba's transformation into a regional smart port and logistics hub.",
    },
    {
      key: 'services.digital-solutions.solutions.leadText',
      value:
        "To establish Aqaba as a leading smart port and logistics hub in the region by delivering a fully digitalised, integrated, and customer-centric Single Window Platform that enhances trade efficiency, transparency, and sustainability. To transform Aqaba's Port operations through a single-window digital platform that connects all stakeholders, including shipping agents, customs, terminals, and traders, enabling seamless data exchange, optimised workflows, and real-time visibility, while fostering collaboration and compliance with global best practices.",
    },
    {
      key: 'cta.careers.title',
      value: 'Join Noatum Ports',
    },
    {
      key: 'cta.careers.description',
      value:
        'Empowering Talent, Enabling Growth – Join Noatum Ports and be part of a global leader in trade, logistics, and port operations.',
    },
    {
      key: 'careers.why.title',
      value: 'Why Work for Us',
    },
    {
      key: 'careers.hero.title',
      value: 'Careers',
    },
  ]

  for (const { key, value } of siteContent) {
    await db.execute(sql`
      INSERT INTO site_content (key, value, type, created_at, updated_at)
      VALUES (${key}, ${value}, 'text', now(), now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
    `)
  }

  const terminals: Array<{
    id: number
    description: string
    area?: string
    waterDepth: string
    berths: string
    craneCount?: string
    teuCapacity?: string
  }> = [
    {
      id: 15, // Luanda Terminal
      description:
        "The Luanda Terminal benefits from access to the Multiparques Viana off-dock bonded facility, enabling more efficient cargo handling, and will continue operating nearby during redevelopment, with full completion expected in the second half of 2026. Located within the Port of Luanda, handling over 76% of national container and general cargo loads, the terminal plays a central role in Angola's trade. It supports regional connectivity as a key transshipment hub for Central-West Africa, linking landlocked markets such as the Democratic Republic of Congo and Zambia. Positioned along major Asia–Africa shipping routes, it is well placed to capture future growth and accommodate larger vessels post-redevelopment.",
      waterDepth: '9.5m alongside',
      berths: '536m quay',
      craneCount: '3 STS cranes, 8 RTGs',
    },
    {
      id: 13, // Safaga Terminal
      description:
        "Noatum Ports Safaga Terminal is a new greenfield multipurpose facility on Egypt's Red Sea coast, set to open in second half of 2026. As part of Noatum Ports, it offers a strategic location with direct access to key trade routes across the Middle East, East Africa, and Asia. Designed to handle containers, dry bulk, general cargo and Ro-Ro cargo, the terminal provides flexible logistics solutions. It connects to key industrial, agricultural, and mining zones in Upper Egypt and will serve the planned Golden Triangle economic zone. The terminal is backed by strong government and industry collaboration, and is being developed with a focus on innovation, regional connectivity, and environmental responsibility—aligned with AD Ports Group's vision for smart and sustainable infrastructure.",
      waterDepth: '18m alongside',
      berths: '1,000m quay',
      craneCount: '3 STS cranes, 6 Hybrid RTGs, 2 MHCs',
      teuCapacity: '450,000 TEU / year',
    },
    {
      id: 17, // Karachi Multipurpose Terminal (KGTML)
      description:
        "Noatum Ports Karachi Multipurpose Terminal is a multipurpose terminal at Berths 11 to 17, East Wharf, Karachi Port, supporting Pakistan's trade through bulk, general cargo and integrated terminal operations. Established under a 25-year concession agreement, the terminal is designed to strengthen cargo handling capability, improve connectivity, and reinforce Karachi Port's role in regional trade. Strategically positioned at Karachi Port's East Wharf, the terminal strengthens Karachi's role in the maritime sector.",
      area: '59 hectares',
      waterDepth: '13.5m alongside',
      berths: '1,525 m quay',
    },
    {
      id: 18, // Karachi Container Terminal (KGTL)
      description:
        "Noatum Ports Karachi Container Terminal is a leading container handling terminal located at Berths 6 to 10, East Wharf, Karachi Port, on Pakistan's southern coastline. As part of Noatum Ports, the terminal supports regional and international trade through modern container operations, infrastructure development, and enhanced port connectivity. Established under a 50-year concession agreement, the terminal is designed to strengthen container handling capacity and support the continued growth of regional and global trade. It is positioned to reinforce Karachi's role as a key maritime and logistics hub, with a focus on growth, service capability, and future development.",
      waterDepth: '13.5m alongside',
      berths: '800 m quay',
      teuCapacity: '750,000 TEU / year',
    },
  ]

  for (const t of terminals) {
    await db.execute(sql`
      UPDATE terminals SET
        description = ${t.description},
        terminal_details_area = COALESCE(${t.area ?? null}, terminal_details_area),
        terminal_details_water_depth = ${t.waterDepth},
        terminal_details_berths = ${t.berths},
        terminal_details_crane_count = COALESCE(${t.craneCount ?? null}, terminal_details_crane_count),
        terminal_details_teu_capacity = COALESCE(${t.teuCapacity ?? null}, terminal_details_teu_capacity)
      WHERE id = ${t.id};
    `)
  }

  // Karachi Multipurpose Terminal services: swap General Cargo for Breakbulk & Project Cargo
  // to match "Clean Bulk, Project Cargo, Ro-Ro" from the Phase 1 content pack.
  await db.execute(sql`
    DELETE FROM terminals_services WHERE parent_id = 17 AND value = 'general-cargo-services';
  `)
  await db.execute(sql`
    INSERT INTO terminals_services (parent_id, value, "order")
    SELECT 17, 'breakbulk-and-project-cargo', 2
    WHERE NOT EXISTS (
      SELECT 1 FROM terminals_services WHERE parent_id = 17 AND value = 'breakbulk-and-project-cargo'
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const siteContentRestore: Array<{ key: string; value: string }> = [
    {
      key: 'home.who-we-are.title',
      value: 'A leader In Global Maritime Infrastructure',
    },
    {
      key: 'home.who-we-are.leadText',
      value:
        "Noatum Ports is one of the fast-growing Multipurpose Port Operators in the world. We take great pride in transforming maritime infrastructure and positioning host nations as premier logistics, transport, and trade hubs through our diverse portfolio of services and activities. Our ports and terminals are located, designed and calibrated to optimally meet the logistics needs of each port's industrial hinterland. We offer highly professional management, backed by cutting-edge technology, a blend of global and local experience, and a commitment to operational excellence, ensuring our partners and customers receive world-class service tailored to their needs.",
    },
    {
      key: 'home.ports-network.leadText',
      value:
        "Noatum Ports is the international ports arm of AD Ports Group, which has 31 ports and terminals around the world, including 11 in the United Arab Emirates operating under the Abu Dhabi Ports brand. With its global focus, Noatum Ports is positioned along strategic trade routes to provide seamless connectivity, multimodal solutions, and hub advantages, enabling efficient cargo movement and logistics integration. The service quality and competitive advantage offered by Noatum Ports enhances trade corridors and strengthens supply chains, ensuring unmatched flexibility and efficiency for businesses worldwide. In the UAE, Noatum Ports operates Autoterminal Khalifa Port (ATK).",
    },
    {
      key: 'services.port-services.hero.leadText',
      value: 'Noatum Ports delivers comprehensive, high-performance port and logistics solutions across key global trade corridors.',
    },
    {
      key: 'services.port-services.capabilities.leadText',
      value:
        'Our expertise spans container handling, Ro-Ro operations, bulk and general cargo, in addition to multipurpose terminal services. We support end-to-end logistics through vessel loading and discharging, storage and distribution, reefer monitoring, and container freight station services. Leveraging advanced technology and automation, we optimise port efficiency, cargo security, and supply chain visibility.\n\nWith a commitment to operational excellence and sustainability, Noatum Ports continuously enhances its capabilities to meet the evolving demands of global trade. Our strategic locations, multimodal transport solutions, and long-term partnerships empower businesses to expand their reach with confidence.',
    },
    {
      key: 'services.port-services.overview.body',
      value:
        'Our expertise spans container handling, Ro-Ro operations, bulk and general cargo, in addition to multipurpose terminal services. We support end-to-end logistics through vessel loading and discharging, storage and distribution, reefer monitoring, and container freight station services. Leveraging advanced technology and automation, we optimise port efficiency, cargo security, and supply chain visibility.',
    },
    {
      key: 'services.port-services.overview.title',
      value: 'Integrated Port Services (new)',
    },
    {
      key: 'services.digital-solutions.overview.body',
      value:
        "Maqta Ayla is a leading trade technology enabler, paving the next era of trade with exponential technologies and unmatched sector expertise. Maqta Ayla operates Aqaba's Port Community System (PCS) & Truck control system (TCS) and delivers advanced digital solutions to digitalise trade, optimise logistics, and streamline and enhance port and landside operations, supporting Aqaba's transformation into a regional smart portand logistics hub.",
    },
    {
      key: 'services.digital-solutions.solutions.leadText',
      value:
        "To establish Aqaba as a leading smart port and logistics hub in the region by delivering a fully digitalised, integrated, and customer-centric Single Window Platform that enhances trade efficiency, transparency, and sustainability. To transform Aqaba's port Port's operations through a single-window digital platform that connects all stakeholders, including shipping agents, customs, terminals, and traders, enabling seamless data exchange, optimiszed workflows, and real-time visibility, while fostering collaboration and compliance with global best practices.",
    },
    {
      key: 'cta.careers.title',
      value: 'Find Where You Fit (new)',
    },
    {
      key: 'careers.why.title',
      value: 'One Network. Endless Room to Grow. (new)',
    },
    {
      key: 'careers.hero.title',
      value: 'Careers That Move With Trade (new)',
    },
  ]

  for (const { key, value } of siteContentRestore) {
    await db.execute(sql`
      UPDATE site_content SET value = ${value}, updated_at = now() WHERE key = ${key};
    `)
  }

  await db.execute(sql`
    DELETE FROM site_content WHERE key IN ('home.why.title', 'cta.careers.description');
  `)

  const terminalsRestore: Array<{
    id: number
    description: string
    waterDepth: string
    berths: string
    craneCount?: string
    area?: string
  }> = [
    {
      id: 15,
      description:
        "Luanda Terminal handles multipurpose cargo at Angola's main port, serving West African import and export flows.",
      waterDepth: '16 m alongside',
      berths: '366 m quay (containers), 150 m (GC & Ro-Ro)',
      craneCount: '3 STS cranes, 9 RTGs',
    },
    {
      id: 13,
      description:
        "Safaga Terminal connects Egypt's Red Sea trade corridor to global markets with efficient ship-to-shore operations, container handling, and round-the-clock terminal capability.",
      waterDepth: '17 m alongside',
      berths: '1,100 m quay',
      craneCount: '3 STS cranes, 6 RTGs, 1 MHC',
    },
    {
      id: 17,
      description:
        'Karachi Multipurpose Terminal (KGTML) handles ro-ro, general cargo, dry bulk, and grain at Karachi Port, supported by versatile berths, storage areas, and a Smart Bag Counting System.',
      area: '47.78 hectares',
      waterDepth: '16 m alongside',
      berths: '1,525 m quay',
    },
    {
      id: 18,
      description:
        "Karachi Container Terminal (KGTL) handles container traffic at Karachi Port with ship-to-shore operations, efficient yard handling, and direct access to Pakistan's principal trade gateway.",
      waterDepth: '16 m alongside',
      berths: '800 m quay',
    },
  ]

  for (const t of terminalsRestore) {
    await db.execute(sql`
      UPDATE terminals SET
        description = ${t.description},
        terminal_details_area = COALESCE(${t.area ?? null}, terminal_details_area),
        terminal_details_water_depth = ${t.waterDepth},
        terminal_details_berths = ${t.berths},
        terminal_details_crane_count = COALESCE(${t.craneCount ?? null}, terminal_details_crane_count),
        terminal_details_teu_capacity = 'N/A'
      WHERE id = ${t.id};
    `)
  }

  await db.execute(sql`
    DELETE FROM terminals_services WHERE parent_id = 17 AND value = 'breakbulk-and-project-cargo';
  `)
  await db.execute(sql`
    INSERT INTO terminals_services (parent_id, value, "order")
    SELECT 17, 'general-cargo-services', 2
    WHERE NOT EXISTS (
      SELECT 1 FROM terminals_services WHERE parent_id = 17 AND value = 'general-cargo-services'
    );
  `)
}
