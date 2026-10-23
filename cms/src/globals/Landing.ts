import type { Field, GlobalConfig } from 'payload'

import { rebuildAfterGlobalChange } from '../hooks/triggerRebuild'

const link = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, admin: { description: 'A URL or #section' } },
      ],
    },
  ],
})

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Landing page',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [rebuildAfterGlobalChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            { name: 'eyebrow', type: 'text', required: true },
            {
              name: 'heading',
              type: 'textarea',
              required: true,
              admin: { description: 'Wrap a word in *asterisks* to highlight it in ember.' },
            },
            { name: 'subheading', type: 'textarea', required: true },
            link('primaryCta', 'Primary button'),
            link('secondaryCta', 'Secondary button'),
          ],
        },
        {
          label: 'Apps section',
          name: 'appsSection',
          description: 'The app cards themselves live in the Apps collection.',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'intro', type: 'textarea' },
          ],
        },
        {
          label: 'Principles',
          name: 'principles',
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              labels: { singular: 'Principle', plural: 'Principles' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'About',
          name: 'about',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
          ],
        },
        {
          label: 'Contact',
          name: 'contact',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'textarea' },
            { name: 'email', type: 'email', required: true },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            { name: 'title', type: 'text', required: true, maxLength: 70 },
            { name: 'description', type: 'textarea', required: true, maxLength: 170 },
          ],
        },
      ],
    },
  ],
}
