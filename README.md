# Noatum Ports CMS

Standalone Payload CMS for the Noatum Ports website. Configure `DATABASE_URI` and `PAYLOAD_SECRET`, then run `npm install && npm run dev`. The admin UI will be available at `/admin`.

## Local development

Create a PostgreSQL database named `noatum_cms`, copy `.env.example` to `.env`, and use `DATABASE_URI=postgresql://postgres:postgres@localhost:5432/noatum_cms`. Start the CMS on port 3001 with `npm run dev -- --port 3001`.

## Railway deployment

Create a PostgreSQL service and connect its `DATABASE_URL` to this service as `DATABASE_URI` (or set `DATABASE_URI` directly). Set a strong `PAYLOAD_SECRET`, `CMS_URL` to the CMS public URL, and `SITE_URL` to the frontend public URL. Attach a Railway volume at `/app/media` and set `MEDIA_DIR=/app/media` so uploaded media survives deploys. Railway runs `npm run migrate` before each deploy and serves `/health` for health checks.

### Railway variables

Use `.env.railway.example` in the CMS service's Variables → Raw Editor. These references are Railway syntax, not a local dotenv configuration.

1. Add Postgres in the same project and environment. Update `Postgres` in the reference if your database service has another name.
2. Generate public domains for both application services under Settings → Networking.
3. Replace `SITE_URL` with the exact frontend HTTPS origin (no trailing slash). Use a literal URL here to avoid a circular deployment dependency with the frontend.
4. Replace `PAYLOAD_SECRET` with a stable random secret generated with `openssl rand -hex 32`. Keep the actual value only in Railway; do not commit it.
5. Attach a volume to the CMS at `/app/media`. Setting `MEDIA_DIR` alone does not create a volume. Copy existing uploads into the volume if migrating existing content.
6. Apply the variables and deploy. The pre-deploy command applies the committed database migrations. Open `/admin` to create the first administrator.

The initial migration targets an empty database. Existing databases created using development schema push need a separate baseline/import plan; do not apply the initial migration blindly to them. Existing local content is not copied by a Git push.

To apply the curated Safaga photography to a deployed CMS database, run `npm run update:safaga` with that service's `DATABASE_URI` and `PAYLOAD_SECRET` variables. The referenced media paths are served by the frontend service, so deploy the frontend assets first.

For later schema changes, run `npm run migrate:create -- descriptive-name`, review and commit the generated migration. `/health` checks the HTTP server; verify `/api/news` and `/admin` after deployment to check the database integration too.
