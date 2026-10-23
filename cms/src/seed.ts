/**
 * Loads the starter content into Payload. Safe to re-run: apps are matched by
 * slug and updated, the landing global is overwritten.
 *
 *   npm run seed -w cms
 *
 * Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to also create the first admin.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { starterApps, starterLanding } from '../../content/landing'

const payload = await getPayload({ config })

for (const app of starterApps) {
  const existing = await payload.find({
    collection: 'apps',
    where: { slug: { equals: app.slug } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'apps', id: existing.docs[0].id, data: app })
    payload.logger.info(`Updated app: ${app.name}`)
  } else {
    await payload.create({ collection: 'apps', data: app })
    payload.logger.info(`Created app: ${app.name}`)
  }
}

await payload.updateGlobal({ slug: 'landing', data: starterLanding })
payload.logger.info('Landing page content loaded')

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD
if (email && password) {
  const users = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!users.docs[0]) {
    await payload.create({ collection: 'users', data: { email, password } })
    payload.logger.info(`Created admin: ${email}`)
  }
}

process.exit(0)
