# Noatum Ports CMS

Standalone Payload CMS for the Noatum Ports website. Configure `DATABASE_URI` and `PAYLOAD_SECRET`, then run `npm install && npm run dev`. The admin UI will be available at `/admin`.

## Local development

Create a PostgreSQL database named `noatum_cms`, copy `.env.example` to `.env`, and use `DATABASE_URI=postgresql://postgres:postgres@localhost:5432/noatum_cms`. Start the CMS on port 3001 with `npm run dev -- --port 3001`.
