import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Apps } from './collections/Apps'
import { Users } from './collections/Users'
import { Landing } from './globals/Landing'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const webOrigin = process.env.WEB_ORIGIN || 'http://localhost:4321'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Fuchs Labs' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Apps, Users],
  globals: [Landing],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [webOrigin],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
})
