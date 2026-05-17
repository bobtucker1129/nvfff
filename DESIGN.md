> **Impeccable skill context** — Updated after layout, bolder, colorize, typeset, and polish passes.

## Visual Direction

Warm, earthy, outdoorsy. Dark mode by default (stone-950 background). Green and amber accents evoking moss, water, and autumn leaves. Typography uses DM Serif Display for headlines (distinctive, editorial feel) and Inter for body text. No gradients in hero — flat warm background with subtle paper texture. No side-tab borders on quotes — uses large decorative quotation mark instead.

## Color Palette

- Background: #121110 (warm near-black, not pure black)
- Surface: #1a1917 (slightly lighter for cards/modals)
- Surface raised: #242320 (hover states, elevated elements)
- Border: #2d2a26 (warm, not gray)
- Border hover: #3a3630
- Text primary: #e7e5e4
- Text secondary: #a8a094 (warm gray, not neutral gray)
- Text muted: #6b6359
- Green: #2d5a3d (muted forest green)
- Green bright: #3a7a4f (hover states)
- Green muted: #1a3d28
- Amber: #c4953a (warm gold)
- Amber muted: #8a6b2a

## Typography

- Headlines: DM Serif Display, Georgia fallback — bold, leading-[1.05]
- Body: Inter, system-ui fallback — regular weight, leading-relaxed
- Mono: JetBrains Mono — for IDs, code, data
- Labels/captions: Inter medium, uppercase, tracking-widest

## Spacing

- Section padding: py-28 (generous vertical rhythm)
- Content max-width: max-w-6xl (72rem)
- Card padding: p-6 to p-8
- Gap between elements: gap-4 to gap-8

## Component Patterns

- Buttons: rounded (not rounded-lg), bg-green-700 hover:bg-green-600, transition-all duration-200, hover:shadow
- Cards: bg-stone-900 border border-stone-700 rounded-xl
- Inputs: bg-stone-800 border border-stone-600 rounded-lg, focus:border-green-600 focus:ring-1
- Tables: border border-stone-700 rounded-lg overflow-hidden, header bg-stone-900/70
- Modals: fixed inset-0 z-50, bg-stone-950/80 backdrop, centered card
- Tabs: bg-stone-900 border border-stone-700 rounded-lg p-1, active bg-green-700

## Motion

- All transitions: duration-200 (snappy, not sluggish)
- Hover states: transition-all with shadow on buttons
- Loading: animate-pulse on skeletons, animate-spin on spinners
- Focus: outline-2 outline-green-600 outline-offset-2
- No bounce easing anywhere

## Anti-Patterns Eliminated

- No side-tab borders (replaced with decorative quote marks)
- No pure black backgrounds (warm stone-950)
- No gray-on-color text (all text has warm tint)
- No gradients in hero (flat background with texture)
- No identical card grids (varied layouts per section)
- No bounce easing
- No emojis in UI (replaced with text labels)
