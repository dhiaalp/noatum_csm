# Noatum Ports CMS

Standalone Payload CMS for the Noatum Ports website. Configure `DATABASE_URI` and `PAYLOAD_SECRET`, then run `npm install && npm run dev`. The admin UI will be available at `/admin`.

## Local development

Create a PostgreSQL database named `noatum_cms`, copy `.env.example` to `.env`, and use `DATABASE_URI=postgresql://postgres:postgres@localhost:5432/noatum_cms`. Start the CMS on port 3001 with `npm run dev -- --port 3001`.

## Railway deployment

Create a PostgreSQL service and connect its `DATABASE_URL` to this service as `DATABASE_URI` (or set `DATABASE_URI` directly). Set a strong `PAYLOAD_SECRET`, `CMS_URL` to the CMS public URL, and `SITE_URL` to the frontend public URL. Attach a Railway volume at `/app/media` and set `MEDIA_DIR=/app/media` so uploaded media survives deploys. Railway runs `npm run migrate` before each deploy and serves `/health` for health checks.
