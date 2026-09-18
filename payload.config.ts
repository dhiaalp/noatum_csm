import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './src/collections/Users'
import { News } from './src/collections/News'
import { Terminals } from './src/collections/Terminals'
import { SiteContent } from './src/collections/SiteContent'
import { Media } from './src/collections/Media'
export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, News, Terminals, SiteContent, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
  // Allow the public site (a different origin in dev) to read the admin's
  // session cookie and make authenticated write requests for the front-end
  // click-to-edit feature. The CMS's own origin must be listed too —
  // Payload's CSRF check rejects the auth cookie for any request whose
  // Origin header isn't in this allowlist, including same-origin requests
  // from the admin UI itself (the browser sends Origin on state-changing
  // requests even same-origin), which otherwise fail with "You are not
  // allowed to perform this action" on every save inside /admin.
  cors: [process.env.SITE_URL || 'http://localhost:3000', process.env.CMS_URL || 'http://localhost:3001'],
  csrf: [process.env.SITE_URL || 'http://localhost:3000', process.env.CMS_URL || 'http://localhost:3001'],
})
