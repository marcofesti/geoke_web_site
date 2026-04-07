# Brand
> Read this when: writing CSS · styling components · using the logo · animations

---

## Logo

**File:** `src/assets/logo/Logo-geoke.svg`
**Never modify it. Never substitute it with a `<div>`.**

| Usage | How |
|-------|-----|
| Nav (full wordmark) | `<img src="assets/logo/Logo-geoke.svg" alt="Geoke" height="22">` |
| Footer / favicon (icon only) | Inline SVG — petals only, no wordmark |

Logo anatomy:
- **6 elliptical petals** · gradient `#40FFB1` → `#0A9E46` · opacity 0.65 each
- **Wordmark** GEOKE in white
- **Tagline** "AI SEES YOU" — omit in nav, optional elsewhere

---

## CSS Custom Properties
**File:** `src/styles/tokens.css` — import this, never redeclare tokens elsewhere.

```css
:root {
  /* Backgrounds — "quasi-nero saturo di verde, non nero pieno" */
  --bg-0:        #04090A;   /* deepest canvas */
  --bg-1:        #070E0C;   /* page base */
  --bg-2:        #0A1510;   /* surface */
  --bg-3:        #0D1B14;   /* card */
  --bg-4:        #112118;   /* card hover */
  --bg-5:        #152819;   /* card active */

  /* Brand green — from Logo-geoke.svg gradient */
  --mint:        #40FFB1;   /* primary accent */
  --mint-dim:    #28E899;   /* hover */
  --green:       #0A9E46;   /* deep end */
  --green-light: #0CC452;

  /* Glow */
  --glow:        rgba(64,255,177,.13);
  --glow-sm:     rgba(64,255,177,.07);
  --glow-xs:     rgba(64,255,177,.04);

  /* Text */
  --tx:          #DFF2EA;   /* primary */
  --tx-2:        #6B9E84;   /* secondary */
  --tx-3:        #3A5E47;   /* muted */
  --tx-4:        #1F3629;   /* faint */

  /* Borders */
  --b:           rgba(64,255,177,.09);
  --b-hover:     rgba(64,255,177,.20);
  --b-strong:    rgba(64,255,177,.38);

  /* Type */
  --font:        'Plus Jakarta Sans', system-ui, sans-serif;
  --mono:        'JetBrains Mono', monospace;

  /* Radii */
  --r:           7px;
  --r-lg:        13px;
  --r-xl:        20px;
}
```

---

## Typography scale

| Use | Size | Weight | Font |
|-----|------|--------|------|
| Hero H1 | clamp(48px, 6.2vw, 80px) | 800 | --font |
| Section H2 | clamp(26px, 3.5vw, 42px) | 800 | --font |
| Card H3 | 16–17px | 700 | --font |
| Body | 15–17px | 400 | --font |
| Labels / eyebrows | 10.5px | 700 | --mono |
| Monospace tags | 10–12px | 500–600 | --mono |

Letter-spacing on headings: `-.035em` to `-.04em`
Line-height on headings: `1.04`–`1.1`

---

## Brand decisions (final, do not reopen)

- ✅ Dark mode only
- ✅ Background: near-black saturated with green, never pure black
- ✅ Single accent: mint (`--mint`) — no secondary accent colors
- ✅ Gradient on hero H1 accent word only (`background-clip: text`)
- ✅ No gradients on backgrounds except radial glows
- ✅ No stock photos, no hero images
- ✅ Inspiration: Railway.app — minimal, bold type, dark

---

## CSS rules

- All styles scoped to component (`styleUrls`) — no global styles except `tokens.css`, `reset.css`, `typography.css`
- Use CSS Grid and Flexbox — no floats
- No third-party animation libraries (no GSAP, Framer, etc.)
- Animations: `@keyframes` + CSS `transition` only
- Scroll reveal: `IntersectionObserver` via `RevealDirective` (shared directive)
- All interactive elements: `:hover` + `:focus-visible` + `:active` states required

### Breakpoints (mobile-first)
```css
/* mobile  */ @media (max-width: 600px)  { }
/* tablet  */ @media (max-width: 960px)  { }
/* desktop */ /* default — >= 961px */
```

### Standard interactive states
```css
/* Button primary (CTA) */
.btn-cta {
  color: var(--bg-0);
  background: var(--mint);
  border-radius: var(--r);
  transition: transform .15s, box-shadow .2s, background .15s;
}
.btn-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(64,255,177,.3);
  background: #52FFB8;
}

/* Button outline */
.btn-outline {
  border: 1px solid var(--b-hover);
  color: var(--tx-2);
  background: transparent;
}
.btn-outline:hover {
  border-color: var(--b-strong);
  background: var(--glow-sm);
  color: var(--tx);
}

/* Card */
.card {
  background: var(--bg-3);
  border: 1px solid var(--b);
  border-radius: var(--r-lg);
  transition: background .2s, border-color .2s;
}
.card:hover {
  background: var(--bg-4);
  border-color: var(--b-hover);
}
```

### Grain overlay (applied globally via body::before)
```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* fractalNoise */
  opacity: .025;
  pointer-events: none;
  z-index: 9999;
}
```

### Scroll reveal pattern
```css
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .55s ease, transform .55s ease;
}
.reveal.in { opacity: 1; transform: translateY(0); }
.d1 { transition-delay: .08s; }
.d2 { transition-delay: .16s; }
.d3 { transition-delay: .24s; }
```
```typescript
// RevealDirective — applies .in when element enters viewport
// Uses IntersectionObserver, threshold 0.1, rootMargin '0px 0px -30px 0px'
```
