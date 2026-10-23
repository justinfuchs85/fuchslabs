import type { App, Landing } from '../../../cms/src/payload-types'
import {
  starterApps,
  starterLanding,
  type StarterApp,
  type StarterLanding,
} from '../../../content/landing'

/** What the page renders. Same shape whether it came from Payload or the starter file. */
export type SiteApp = StarterApp
export type SiteLanding = StarterLanding

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL?.replace(/\/$/, '')

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}${path}`, { signal: AbortSignal.timeout(10_000) })
  if (!res.ok) throw new Error(`Payload ${path} returned ${res.status}`)
  return (await res.json()) as T
}

function toSiteApp(doc: App): SiteApp {
  return {
    name: doc.name,
    slug: doc.slug,
    tagline: doc.tagline,
    description: doc.description,
    status: doc.status,
    platforms: doc.platforms,
    url: doc.url ?? undefined,
    iconColor: doc.iconColor,
    glyph: doc.glyph,
    order: doc.order,
  }
}

function toSiteLanding(doc: Landing): SiteLanding {
  const s = starterLanding
  return {
    hero: {
      eyebrow: doc.hero.eyebrow,
      heading: doc.hero.heading,
      subheading: doc.hero.subheading,
      primaryCta: doc.hero.primaryCta ?? s.hero.primaryCta,
      secondaryCta: doc.hero.secondaryCta ?? s.hero.secondaryCta,
    },
    appsSection: { heading: doc.appsSection.heading, intro: doc.appsSection.intro ?? '' },
    principles: {
      heading: doc.principles.heading,
      items: (doc.principles.items ?? []).map(({ title, body }) => ({ title, body })),
    },
    about: { heading: doc.about.heading, body: doc.about.body },
    contact: { heading: doc.contact.heading, body: doc.contact.body ?? '', email: doc.contact.email },
    seo: { title: doc.seo.title, description: doc.seo.description },
  }
}

export interface SiteContent {
  landing: SiteLanding
  apps: SiteApp[]
  source: 'payload' | 'starter'
}

/**
 * Loads page content from Payload's REST API at build time.
 * No PAYLOAD_URL → starter content (handy for design work).
 * PAYLOAD_URL set but unreachable → the build fails instead of shipping stale copy.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!PAYLOAD_URL) {
    console.warn('[fuchs-labs] PAYLOAD_URL not set; building with starter content.')
    return { landing: starterLanding, apps: starterApps, source: 'starter' }
  }
  const [landing, apps] = await Promise.all([
    get<Landing>('/api/globals/landing?depth=0'),
    get<{ docs: App[] }>('/api/apps?sort=order&limit=100&depth=0'),
  ])
  return { landing: toSiteLanding(landing), apps: apps.docs.map(toSiteApp), source: 'payload' }
}

/** `*word*` in CMS text becomes an ember highlight. Everything else is escaped. */
export function emphasize(text: string): string {
  const escaped = text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>')
}
