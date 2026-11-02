import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "terminals" ADD COLUMN IF NOT EXISTS "terminal_details_ship_loaders" varchar;
   ALTER TABLE "terminals" ADD COLUMN IF NOT EXISTS "terminal_details_reach_stackers" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "terminals" DROP COLUMN IF EXISTS "terminal_details_reach_stackers";`)
}
