// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  // Static output: content is pulled from Payload at build time.
  // Payload's DEPLOY_HOOK_URL triggers a rebuild whenever content changes.
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:4321',
})
