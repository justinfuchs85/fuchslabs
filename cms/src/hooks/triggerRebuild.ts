import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * The Astro site is static, so content changes need a rebuild.
 * Set DEPLOY_HOOK_URL to a Vercel/Netlify/Cloudflare deploy hook and every
 * publish in the admin kicks one off. Unset, this does nothing.
 */
async function ping(req: PayloadRequest, reason: string): Promise<void> {
  const url = process.env.DEPLOY_HOOK_URL
  if (!url) return
  try {
    const res = await fetch(url, { method: 'POST' })
    req.payload.logger.info(`Site rebuild requested (${reason}): ${res.status}`)
  } catch (err) {
    // A failed rebuild ping should never block an editor from saving.
    req.payload.logger.error({ err }, `Site rebuild request failed (${reason})`)
  }
}

export const rebuildAfterChange: CollectionAfterChangeHook = async ({ doc, req, collection }) => {
  await ping(req, `${collection.slug} changed`)
  return doc
}

export const rebuildAfterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  await ping(req, `${collection.slug} deleted`)
  return doc
}

export const rebuildAfterGlobalChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  await ping(req, `${global.slug} changed`)
  return doc
}
