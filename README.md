# Dinesh Prasad — Portfolio (Task 1)

A premium, cinematic personal developer portfolio for **Dinesh Prasad** (Aspiring Software Engineer · Cyber Security Enthusiast). Dark editorial design built around a black `#080808` + red `#FF2028` identity, with Instrument Sans / Instrument Serif typography, scroll-driven reveals, an auto-adapting custom cursor, and buttery micro-interactions.

**🔴 Live:** [https://dineshprasad7564.github.io/dinesh-prasad-portfolio/](https://dineshprasad7564.github.io/dinesh-prasad-portfolio/)

![Tech](https://img.shields.io/badge/React%2018-Vite%205-080808?logo=react) ![Motion](https://img.shields.io/badge/Framer%20Motion-Lucide%20Icons-FF2028) ![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Actions-FF2028?logo=github)

---

## Internship Tasks — all live builds

| Task | Project | Repo | Live Demo |
| ---- | ------- | ---- | --------- |
| 1 | **Personal Portfolio Website** (this site) | [dinesh-prasad-portfolio](https://github.com/dineshprasad7564/dinesh-prasad-portfolio) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-portfolio/) |
| 2 | AI Landing Page | [dinesh-prasad-landing-page](https://github.com/dineshprasad7564/dinesh-prasad-landing-page) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-landing-page/) |
| 3 | Google Homepage Clone | [dineshprasad7564/dinesh-prasad-google-clone](https://github.com/dineshprasad7564/dinesh-prasad-google-clone) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-google-clone/) |
| 4 | Contact Form with JavaScript Validation | [dinesh-prasad-contact-form](https://github.com/dineshprasad7564/dinesh-prasad-contact-form) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-contact-form/) |
| 5 | Dinesh Blog | [dinesh-prasad-blog](https://github.com/dineshprasad7564/dinesh-prasad-blog) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-blog/) |
| 6 | Dinesh Gallery | [dinesh-prasad-gallery](https://github.com/dineshprasad7564/dinesh-prasad-gallery) | [Open](https://dineshprasad7564.github.io/dinesh-prasad-gallery/) |

Tasks 2–6 are also linked directly in the site's **Projects** section (small pill row under the GitHub/LinkedIn CTAs).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Requires **Node.js 18+**.

## Deployment (GitHub Pages)

The site is served from the **`gh-pages` branch** (Pages source: *deploy from branch* `gh-pages`, root). To redeploy after changes:

```bash
npm run build
npx gh-pages -d dist --nojekyll
```

> `deploy.yml` (GitHub Actions deployment) is included in this project but not yet pushed — pushing workflow files requires a token with `workflow` scope (`gh auth refresh -h github.com -s workflow`). Once pushed, set Pages → Source to **GitHub Actions** and every push to `main` will build and deploy automatically. The Vite `base` is `/dinesh-prasad-portfolio/` for production builds only — local dev stays at `/`.

## Tech stack

| Layer     | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | React 18 + Vite 5 (JavaScript)                |
| Animation | Framer Motion (transforms/opacity, spring 3D tilt, scroll reveals) |
| Icons     | Lucide React                                  |
| Type      | Instrument Sans (UI) · Instrument Serif italic (emphasis words) |

### Project structure

```
├── index.html                  # SEO, Open Graph, favicon, fonts
├── public/
│   ├── resume.pdf              # placeholder → replace with your real resume
│   └── og-image.png            # social preview card → replace with your own
├── scripts/
│   └── generate-assets.mjs     # regenerates the two placeholder files above
├── .github/workflows/deploy.yml # GitHub Pages deployment
└── src/
    ├── App.jsx                 # loader state + section composition
    ├── main.jsx
    ├── index.css               # full design system + responsive rules
    └── components/
        ├── Loader.jsx          # cinematic "DINESH PRASAD." intro
        ├── Navbar.jsx          # fixed bar, scroll-spy, mobile overlay menu
        ├── Hero.jsx            # orbs, grid, floating tiles, PLAY REEL card
        ├── About.jsx           # red sheet: portrait card + social rail + chips
        ├── Skills.jsx          # 6 category cards, hover lift/glow
        ├── Projects.jsx        # 3D-tilt cards + CTAs + internship task links
        ├── Experience.jsx      # alternating red-sheet timeline
        ├── Certifications.jsx  # 3 editable certificate cards
        ├── Contact.jsx         # big mailto CTA + social pills
        ├── Footer.jsx
        ├── CustomCursor.jsx    # dot + easing ring, auto color-adapting, desktop only
        └── Reveal.jsx          # shared <Reveal>/<Stagger>/<Item> + easing
```

---

## Things to replace before going live

All placeholders are marked with `TODO` comments in the code.

| What                        | Where                                                        |
| --------------------------- | ------------------------------------------------------------ |
| **Resume**                  | Drop your real file at `public/resume.pdf` (same name = zero code changes) |
| **Instagram URL**           | Search for `TODO: add real Instagram URL` in `About.jsx`, `Contact.jsx`, `Footer.jsx` |
| **Project links**           | `Projects.jsx` → `PROJECTS` array (currently linked to your GitHub profile) |
| **Certificate links/issuers** | `Certifications.jsx` → `CERTS` array (issuer/date placeholders + `View Certificate` href) |
| **Portrait photo**          | `About.jsx` — swap the `.portrait` placeholder markup for an `<img>` |
| **Experience entries**      | `Experience.jsx` → `JOBS` array                              |
| **OG image / favicon**      | `public/og-image.png`, and the inline SVG favicon in `index.html` |

---

## Design system

| Token         | Value     | Usage                          |
| ------------- | --------- | ------------------------------ |
| Background    | `#080808` | page, cards `#0d0d0d`          |
| Accent        | `#FF2028` | highlights, sheets, glows      |
| Text          | `#F7F7F2` | headings, primary copy         |
| Muted         | `#999999` | secondary copy                 |
| Border        | `#292929` | hairlines, card edges          |
| Easing        | `cubic-bezier(.2,.8,.2,1)` | every animation |

Fonts are loaded from Google Fonts in `index.html`. Colors/tokens live in `:root` at the top of `src/index.css` — change them there and the whole site follows.

---

## Performance & accessibility notes

- Animations animate **only** `transform` and `opacity`; the hero glows are pre-blurred radial gradients (no CSS `filter: blur`), and the custom cursor runs in a single `requestAnimationFrame` loop.
- Scroll reveals use IntersectionObserver (via Framer Motion's `whileInView`) and fire once.
- The custom cursor auto-adapts its color to the surface under the pointer (red on dark, black on red) and is fully disabled on touch devices.
- `prefers-reduced-motion` disables the loader curtain, orbs, tilt, and large movements.
- Semantic landmarks (`header`/`main`/`section`/`footer`), visible `:focus-visible` outlines, `aria-label`s on icon links, keyboard-safe navigation, and external links use `target="_blank" rel="noopener noreferrer"`.

---

© 2026 Dinesh Prasad · [GitHub](https://github.com/dineshprasad7564) · [LinkedIn](https://www.linkedin.com/in/dinesh-prashad-9a3227427/)
