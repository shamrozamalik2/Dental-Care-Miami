# Dental Care Miami LLC — Website

React 18 + Vite 6 + Tailwind CSS 3 + Lucide icons + React Router.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, highlights, featured services, why choose us, booking steps, reviews, location, CTA |
| `/services` | All 8 services with anchors (`/services#wisdom-tooth-extraction`) and an emergency callout |
| `/about` | Clinic introduction and approach |
| `/book-appointment` | Appointment request form. `?service=<slug>` pre-selects a service |
| `/reviews` | Google rating summary and the 2 real reviews |
| `/contact` | Contact details, contact form, hours, Google Map |

## Motion & animation

- **Framer Motion** handles all animation. The reusable pieces are in `src/components/motion.jsx`:
  `SplitText`/`Word` (word-by-word reveals), `Counter` (count-up numbers), `Tilt` (3D hover with a cursor spotlight),
  `Magnetic` (buttons that pull toward the cursor), `RevealImage` (unmask on scroll plus parallax), `Stagger`/`StaggerItem`, `Marquee`,
  `ScrollProgress`, `DrawPath` (self-drawing SVG lines) and `Blob` (slowly drifting background shapes).
  `src/components/Reveal.jsx` fades content in as you scroll (`variant`: up, left, right, scale or fade).
- **Lenis** (`src/lib/smoothScroll.jsx`) provides smooth, inertia-style scrolling. Anchor links and page changes scroll through it.
- **Page transitions** use `AnimatePresence` in `src/components/Layout.jsx`.
- **Reduced motion:** with “reduce motion” turned on in the visitor's device settings, Lenis is switched off, movement animations are skipped
  (`<MotionConfig reducedMotion="user">`), and CSS animations are cut to near-zero.

## Edit business info in one place

**`src/config/site.js`** holds the phone, address, hours, services, reviews, WhatsApp and email.

## ⚠️ Before launch checklist

1. **Form delivery.** Set `VITE_FORM_ENDPOINT` in `.env.production` (e.g. a Formspree/Basin URL, or your own API).
   Until you do, forms validate and show the confirmation screen with a visible “preview mode” notice, but **no data is sent**.
2. **Domain.** Set `VITE_SITE_URL` (e.g. `https://www.example.com`). This is used for the canonical URL, OG tags,
   JSON-LD, `sitemap.xml` and `robots.txt`, which are generated at build time.
3. **Hours.** Google lists “Open 24 hours”, which is unverified. Confirm the hours, fill `hours.schedule` and set `hours.verified: true`.
4. **Services.** Confirm the list with the clinic, edit or remove entries, then set `servicesConfirmed: true` to hide the availability notice.
5. **Review #2.** Only a summary was available, and it is displayed as a *summary*, not a quote. Paste the exact Google text into `reviews[1].quote`.
6. **Photos.** The images in `public/images/` are licensed Unsplash stock photos, used for illustration. Replace them with real photos of the clinic when you have them (keep them WebP, about 900–1600px wide).
7. **WhatsApp / email.** Set these only if official ones exist. The WhatsApp button and email row appear automatically.
8. **Structured data** (`index.html`) contains verified fields only. Add `openingHoursSpecification` once the hours are confirmed.
   The self-hosted star rating is intentionally left out of the schema, because Google does not show review stars a business publishes about itself.

## Deploy

Static SPA. `vercel.json` (Vercel) and `public/_redirects` (Netlify) route all paths to `index.html`.
For other hosts, configure a fallback to `index.html`.
