import type { AppGlyph } from '../../../content/landing'

/**
 * App icon drawings from the Fuchs Labs kit (brand/README.md, icons.mjs),
 * on the shared 1024 grid: warm-white strokes plus exactly one ember dot.
 */
export const GLYPHS: Record<AppGlyph, { lines: string[]; dot: [number, number, number] }> = {
  'family-betz': {
    lines: ['M232 676 L424 470 L566 572 L776 340'],
    dot: [788, 328, 58],
  },
  'fuchs-bucks': {
    lines: [
      'M248 420 H704 Q776 420 776 492 V676 Q776 748 704 748 H320 Q248 748 248 676 Z',
      'M248 560 H776',
    ],
    dot: [512, 282, 58],
  },
  kept: {
    lines: [
      'M404 270 L215 408 Q168 442 168 502 L168 700 Q168 752 220 752 L448 752',
      'M404 270 L594 408 Q641 442 641 502 L641 614',
      'M232 614 C310 743 404 760 448 752 S727 622 856 416',
    ],
    dot: [856, 416, 50],
  },
  nota: {
    lines: [
      'M332 236 H600 L716 352 V724 Q716 788 652 788 H332 Q268 788 268 724 V300 Q268 236 332 236 Z',
      'M600 236 V352 H716',
      'M372 520 H612',
      'M372 640 H540',
    ],
    dot: [636, 640, 46],
  },
  none: { lines: [], dot: [512, 512, 72] },
}

export const STATUS_LABEL = { live: 'Live', beta: 'Beta', building: 'Building' } as const
export const PLATFORM_LABEL = { web: 'Web', ios: 'iPhone', android: 'Android' } as const
