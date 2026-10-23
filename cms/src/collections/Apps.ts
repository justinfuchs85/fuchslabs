import type { CollectionConfig } from 'payload'

import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/triggerRebuild'

export const Apps: CollectionConfig = {
  slug: 'apps',
  labels: { singular: 'App', plural: 'Apps' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'platforms', 'order'],
    description: 'The apps shown on the landing page, in "Order" order.',
  },
  defaultSort: 'order',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [rebuildAfterChange],
    afterDelete: [rebuildAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Lowercase, dashes. Used as the card anchor.' },
    },
    { name: 'tagline', type: 'text', required: true, maxLength: 80 },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'building',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Beta', value: 'beta' },
        { label: 'Building', value: 'building' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'platforms',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['web'],
      options: [
        { label: 'Web', value: 'web' },
        { label: 'iPhone', value: 'ios' },
        { label: 'Android', value: 'android' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'url',
      type: 'text',
      admin: { description: 'Where "Open" goes. Leave blank to hide the button.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'iconColor',
          type: 'text',
          required: true,
          defaultValue: '#1B2232',
          validate: (value: string | null | undefined) =>
            /^#[0-9a-fA-F]{6}$/.test(value ?? '') || 'Use a 6-digit hex color, like #141C2E.',
          admin: { description: 'The app icon’s dark background.' },
        },
        {
          name: 'glyph',
          type: 'select',
          required: true,
          defaultValue: 'none',
          options: [
            { label: 'Family Betz', value: 'family-betz' },
            { label: 'Fuchs Bucks', value: 'fuchs-bucks' },
            { label: 'Kept', value: 'kept' },
            { label: 'Nota', value: 'nota' },
            { label: 'None (ember dot only)', value: 'none' },
          ],
          admin: { description: 'Icon drawing from the Fuchs Labs kit.' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Lower shows first.' },
    },
  ],
}
