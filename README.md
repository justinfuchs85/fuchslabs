# Fuchs Labs site

The studio landing page. Astro renders it, Payload holds the words, TypeScript keeps the two honest with each other.

```
fuchs-labs-site/
├── web/       Astro site (static). Pulls content from Payload at build time.
├── cms/       Payload 3 admin + REST API (Next.js, Postgres).
├── content/   Starter copy. Seeds Payload, and is the fallback when Payload isn't set.
└── brand/     The Fuchs Labs kit: tokens, fox mark, style + voice guide.
```

## Quick start (no CMS)

```bash
npm install
npm run dev            # http://localhost:4321, starter content
```

Without `PAYLOAD_URL`, the site builds from `content/landing.ts`. Good for design work.

## With Payload

```bash
cp cms/.env.example cms/.env      # set DATABASE_URL (Supabase works) and PAYLOAD_SECRET
npm run seed                       # loads the starter content; set SEED_ADMIN_* to make the first admin
npm run dev:cms                    # admin at http://localhost:3000/admin

cp web/.env.example web/.env      # PAYLOAD_URL=http://localhost:3000
npm run dev
```

Payload pushes schema changes to the database automatically in dev. Before the first production deploy, run `npm run migrate:create -w cms` and commit the migration.

### What's editable

- **Landing page** (global): hero, apps intro, principles, about, contact email, SEO. Wrap a word in `*asterisks*` in the hero heading to highlight it in ember.
- **Apps** (collection): name, tagline, description, status (live / beta / building), platforms, link, icon color, icon drawing, sort order.

### Types

`web/src/lib/payload.ts` imports `cms/src/payload-types.ts`, so changing a field in Payload breaks `astro check` until the page is updated. That's the point. Regenerate after schema changes:

```bash
npm run generate:types -w cms
```

## Deploying

- **web** is plain static output (`web/dist`). Vercel, Netlify, or Cloudflare Pages. Set `PAYLOAD_URL` and `SITE_URL`.
- **cms** is a Next.js app. Vercel works; point `DATABASE_URL` at Supabase's session pooler.
- Set `DEPLOY_HOOK_URL` on the CMS to the web project's deploy hook, and every publish rebuilds the site.
- With `PAYLOAD_URL` set, a web build fails if Payload is unreachable. That's deliberate: better a failed deploy than quietly shipping old copy.

## Before launch

- Replace `hello@example.com` in the Contact tab (or `content/landing.ts` before seeding).
- Add each app's `url` so the cards get an "Open" link.
- The copy is a first draft in the studio voice (see `brand/README.md`). Edit freely.
