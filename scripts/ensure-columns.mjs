// Idempotent schema patch run at start: the live database was created without Payload's migration
// records, so `payload migrate` cannot be used. Only adds columns that are missing.
import pg from 'pg'

const url = process.env.DATABASE_URI || process.env.DATABASE_URL
if (!url) process.exit(0)

const client = new pg.Client({ connectionString: url })
try {
  await client.connect()
  await client.query('ALTER TABLE "terminals" ADD COLUMN IF NOT EXISTS "terminal_details_ship_loaders" varchar')
  await client.query('ALTER TABLE "terminals" ADD COLUMN IF NOT EXISTS "terminal_details_reach_stackers" varchar')
  console.log('ensure-columns: ok')
} catch (error) {
  console.error('ensure-columns failed (continuing):', error.message)
} finally {
  await client.end().catch(() => {})
}
