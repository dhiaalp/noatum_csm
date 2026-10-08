import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "terminals_services" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_terminals_services";
  CREATE TYPE "public"."enum_terminals_services" AS ENUM('container-services', 'general-cargo-services', 'ro-ro-services', 'breakbulk-and-project-cargo', 'dry-bulk-services', 'warehousing-solutions');
  ALTER TABLE "terminals_services" ALTER COLUMN "value" SET DATA TYPE "public"."enum_terminals_services" USING "value"::"public"."enum_terminals_services";
  ALTER TABLE "terminals" ADD COLUMN "terminal_details_facilities" varchar;
  ALTER TABLE "terminals" ADD COLUMN "terminal_details_connectivity" varchar;
  ALTER TABLE "terminals" ADD COLUMN "terminal_details_expansion" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_terminals_services" ADD VALUE 'cold-chain-logistics';
  ALTER TABLE "terminals" DROP COLUMN "terminal_details_facilities";
  ALTER TABLE "terminals" DROP COLUMN "terminal_details_connectivity";
  ALTER TABLE "terminals" DROP COLUMN "terminal_details_expansion";`)
}
