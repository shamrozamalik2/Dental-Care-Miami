# Miami Dental Clinic — Website

React 18 + Vite 6 + Tailwind CSS 3 + Lucide icons + React Router, with Framer Motion animations and Lenis smooth scrolling.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Pages

| Route | Page |
|---|---|
| `/` | Hero, quick contact, introduction, services, why choose us, booking steps, review excerpts, CTA, location |
| `/services` | All 8 service categories with anchors (e.g. `/services#braces-consultation`) |
| `/about` | Clinic introduction and approach |
| `/book-appointment` | Appointment request form. `?service=<slug>` pre-selects a service |
| `/reviews` | Google rating (3.7 / 5, 12 reviews) and review excerpts |
| `/contact` | Contact details, contact form, hours, Google Map, directions |

## Edit business info in one place

**`src/config/site.js`** holds the phone, address, hours, services, rating, review excerpts, and the optional dentist, WhatsApp and email fields.

## ⚠️ Verify before launch

The details come from the clinic's Google Business Profile, which may be out of date.

1. **Phone number.** `+1 239-499-6242` uses a Southwest Florida area code (239 = Fort Myers/Naples), not a Miami one (305/786). Confirm it's the clinic's current number.
2. **Address.** Confirm `201 Northwest Dr, Miami, FL 33126` and that the Google Maps pin is correct.
3. **Hours.** Google lists a 9 PM closing time. The site says this and asks visitors to call. Once the hours are confirmed, fill `hours.schedule` and set `hours.verified: true`.
4. **Services.** These are proposed categories only. Confirm them, edit or remove entries, then set `servicesConfirmed: true`.
5. **Dentist.** An older review mentions *Dr. Sotomayor*. Nothing is shown until the clinic confirms; then set `site.dentist`.
6. **Rating.** It's shown exactly as listed (3.7 / 5, 12 reviews). Update `rating` whenever it changes on Google.
7. **Review excerpts.** They're shown without names, dates or per-review stars, because those weren't supplied.
8. **Form delivery.** Set `VITE_FORM_ENDPOINT` (e.g. a Formspree URL). Without it, forms show a "preview mode" notice and **send nothing**.
9. **Domain.** Set `VITE_SITE_URL`. It's used for canonical URLs, Open Graph tags, structured data, `sitemap.xml` and `robots.txt`.
10. **Photos.** These are licensed Unsplash stock photos used for illustration. Replace them with real photos of the clinic when available.
11. **WhatsApp.** It stays hidden unless `site.whatsapp` is set. Only set it if the clinic confirms it uses WhatsApp.

The structured data in `index.html` includes only the name, address and phone. Add opening hours once confirmed.
The rating is deliberately left out of the structured data, because Google ignores star ratings a business publishes about itself.

## Deploy on Render

`render.yaml` sets up a **Static Site** with build command `npm ci && npm run build`, publish directory `dist`,
and a rewrite of `/*` to `/index.html` so links like `/services` work on refresh.
In the Render dashboard, set `VITE_SITE_URL` and `VITE_FORM_ENDPOINT`. These values are built into the site, so redeploy after changing them.
`vercel.json` and `public/_redirects` cover Vercel and Netlify.

## Motion

The reusable animation pieces are in `src/components/motion.jsx`: `SplitText`/`Word`, `Counter`, `Tilt`, `Magnetic`, `RevealImage`, `Stagger`, `Marquee`, `ScrollProgress`, `DrawPath` and `Blob`.
Lenis is in `src/lib/smoothScroll.jsx`, and page transitions are in `src/components/Layout.jsx`.
Visitors who turn on "reduce motion" in their device settings get no smooth scrolling and no moving or sliding effects.
