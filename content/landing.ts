/**
 * Starter content for the Fuchs Labs landing page.
 *
 * Used twice, so the two can never drift:
 *  - cms/src/seed.ts loads it into Payload the first time.
 *  - web/ falls back to it when Payload isn't reachable at build time,
 *    so the site still builds (and still looks finished) without the CMS.
 *
 * Once Payload is seeded, edit content in the admin, not here.
 */

export type AppStatus = 'live' | 'beta' | 'building'
export type AppGlyph = 'family-betz' | 'fuchs-bucks' | 'kept' | 'nota' | 'none'
export type Platform = 'web' | 'ios' | 'android'

export interface StarterApp {
  name: string
  slug: string
  tagline: string
  description: string
  status: AppStatus
  platforms: Platform[]
  url?: string
  iconColor: string
  glyph: AppGlyph
  order: number
}

export const starterApps: StarterApp[] = [
  {
    name: 'Family Betz',
    slug: 'family-betz',
    tagline: 'Prediction markets for family gatherings.',
    description:
      'Bet points on whether the turkey is dry or who cries first at the wedding. No money, a kid mode with stars instead of bets, and an awards ceremony when the books close.',
    status: 'live',
    platforms: ['web'],
    iconColor: '#141C2E',
    glyph: 'family-betz',
    order: 1,
  },
  {
    name: 'Fuchs Bucks',
    slug: 'fuchs-bucks',
    tagline: 'A personal ledger that doesn’t lecture you.',
    description:
      'Accounts, spending, and where it all went, with numbers that actually line up. The fox mascot has opinions. It keeps them to itself.',
    status: 'live',
    platforms: ['web'],
    iconColor: '#17352A',
    glyph: 'fuchs-bucks',
    order: 2,
  },
  {
    name: 'Kept',
    slug: 'kept',
    tagline: 'Everything the house needs, in one place.',
    description:
      'Maintenance schedules, shopping lists, expenses, and the filter size you swore you’d remember. On the web and on iPhone.',
    status: 'live',
    platforms: ['web', 'ios'],
    iconColor: '#292D3C',
    glyph: 'kept',
    order: 3,
  },
  {
    name: 'Nota',
    slug: 'nota',
    tagline: 'Notes, minus the clutter.',
    description: 'Write it down, find it later. That’s the whole pitch. Still on the workbench.',
    status: 'building',
    platforms: ['web'],
    iconColor: '#2B2433',
    glyph: 'nota',
    order: 4,
  },
]

export interface StarterLanding {
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  appsSection: { heading: string; intro: string }
  principles: { heading: string; items: { title: string; body: string }[] }
  about: { heading: string; body: string }
  contact: { heading: string; body: string; email: string }
  seo: { title: string; description: string }
}

export const starterLanding: StarterLanding = {
  hero: {
    eyebrow: 'Fuchs Labs · app studio',
    heading: 'Software for the parts of life *nobody* makes software for.',
    subheading:
      'A small studio building small, opinionated apps for families and households. Fewer features, better defaults, no ads.',
    primaryCta: { label: 'See the apps', href: '#apps' },
    secondaryCta: { label: 'Say hello', href: '#contact' },
  },
  appsSection: {
    heading: 'The apps',
    intro: 'Different jobs, same studio. Each one does one thing and tries not to make a fuss about it.',
  },
  principles: {
    heading: 'How the studio works',
    items: [
      {
        title: 'Small on purpose',
        body: 'Each app does one job. If a feature needs a tutorial, it doesn’t ship.',
      },
      {
        title: 'Tested on a real family',
        body: 'Everything gets used at home first. The testers are unpaid and file bug reports at dinner.',
      },
      {
        title: 'You’re the customer',
        body: 'No ads, no growth hacks, no notifications begging you to come back. The apps earn the next open.',
      },
    ],
  },
  about: {
    heading: 'Why “Fuchs”',
    body: 'Fuchs is German for fox. That was the entire naming process. The studio grew out of twenty years of building digital products for other people and a growing list of things the household needed that nobody was making.',
  },
  contact: {
    heading: 'Got an idea, a bug, or a family that needs refereeing?',
    body: 'Feature requests, bug reports, and partnership notes all land in the same inbox. Replies are human and occasionally prompt.',
    email: 'hello@example.com',
  },
  seo: {
    title: 'Fuchs Labs · small apps for real households',
    description:
      'Fuchs Labs builds small, opinionated apps for families and households: Family Betz, Fuchs Bucks, Kept, and Nota.',
  },
}
