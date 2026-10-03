/**
 * Generates branded placeholder cover art for the WorksWheel showcase:
 *   public/works/<slug>.svg — 640x442 (card ratio 1.45), black/red identity
 *
 * Swap these for real project screenshots (same filenames) whenever ready —
 * or edit the MOTIFS map and re-run: node scripts/generate-works-art.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'works')
mkdirSync(outDir, { recursive: true })

const MOTIFS = {
  'codeguard-ai': `
    <path d="M320 128 l74 30 v64 c0 54-32 88-74 104 c-42-16-74-50-74-104 v-64 z"/>
    <path d="M290 224 l22 22 46-46"/>`,
  dineverse: `
    <circle cx="320" cy="228" r="78"/>
    <path d="M300 194 l72 34 -72 34 z"/>`,
  'ai-data-analytics': `
    <path d="M232 306 v-58" stroke-width="16"/>
    <path d="M284 306 v-98" stroke-width="16"/>
    <path d="M336 306 v-140" stroke-width="16"/>
    <path d="M388 306 v-182" stroke-width="16"/>`,
  'iot-lab': `
    <circle cx="222" cy="172" r="16"/>
    <circle cx="418" cy="172" r="16"/>
    <circle cx="320" cy="308" r="16"/>
    <path d="M236 184 L306 296 M404 184 L334 296 M238 172 L402 172"/>`,
  'landing-page': `
    <path d="M170 300 L470 148"/>
    <path d="M190 322 L490 170"/>
    <path d="M210 344 L510 192"/>`,
  'google-clone': `
    <circle cx="296" cy="222" r="58"/>
    <path d="M340 268 L424 352"/>
    <circle cx="472" cy="222" r="9"/>
    <circle cx="472" cy="264" r="9"/>
    <circle cx="472" cy="306" r="9"/>`,
  'contact-form': `
    <rect x="204" y="158" width="232" height="144" rx="12"/>
    <path d="M210 172 L320 252 L430 172"/>`,
  blog: `
    <path d="M218 168 H422"/>
    <path d="M218 212 H462"/>
    <path d="M218 256 H396"/>
    <path d="M218 300 H438"/>`,
  gallery: `
    <rect x="196" y="146" width="112" height="82" rx="8"/>
    <rect x="332" y="146" width="112" height="82" rx="8"/>
    <rect x="196" y="252" width="112" height="82" rx="8"/>
    <rect x="332" y="252" width="112" height="82" rx="8"/>`,
}

const TITLES = {
  'codeguard-ai': 'CodeGuard AI',
  dineverse: 'DineVerse',
  'ai-data-analytics': 'Data Analytics',
  'iot-lab': 'IoT Lab',
  'landing-page': 'Landing Page',
  'google-clone': 'Google Clone',
  'contact-form': 'Contact Form',
  blog: 'Blog',
  gallery: 'Gallery',
}

const pad = (n) => String(n).padStart(2, '0')

let i = 0
for (const [slug, motif] of Object.entries(MOTIFS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="442" viewBox="0 0 640 442">
  <rect width="640" height="442" fill="#0d0d0d"/>
  <rect x="1" y="1" width="638" height="440" fill="none" stroke="#242424" stroke-width="2"/>
  <g stroke="#FF2028" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${motif}</g>
  <text x="600" y="66" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#FF2028" text-anchor="end">${pad(i + 1)}</text>
  <text x="36" y="58" font-family="Verdana, sans-serif" font-size="11" letter-spacing="4" fill="#8a8a8a">DINESH PRASAD — PORTFOLIO</text>
  <text x="36" y="398" font-family="Georgia, serif" font-style="italic" font-size="42" fill="#F7F7F2">${TITLES[slug]}</text>
</svg>
`
  writeFileSync(join(outDir, `${slug}.svg`), svg)
  i += 1
}

console.log(`Generated ${i} covers in public/works/`)
