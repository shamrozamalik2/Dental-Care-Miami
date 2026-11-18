import { ArrowUpRight, PenLine } from 'lucide-react'
import { motion } from 'framer-motion'
import { Counter, EASE } from '../components/motion.jsx'
import PageHero from '../components/PageHero.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Stars from '../components/Stars.jsx'
import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { GoogleG } from '../components/GoogleRating.jsx'
import { reviews, site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

function Breakdown() {
  const counts = [5, 4, 3, 2, 1].map((star) => ({ star, n: reviews.filter((r) => r.rating === star).length }))
  const total = reviews.length || 1
  return (
    <ul className="space-y-2">
      {counts.map(({ star, n }) => (
        <li key={star} className="flex items-center gap-3 text-sm">
          <span className="w-10 text-navy-500">{star} star</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-navy/[0.06]">
            <motion.span
              className="block h-full origin-left rounded-full bg-amber-400"
              style={{ width: `${(n / total) * 100}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 + (5 - star) * 0.08 }}
            />
          </span>
          <span className="w-4 text-right font-medium">{n}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Reviews() {
  useSeo({
    title: 'Patient Reviews | Dental Care Miami LLC — 5.0 on Google',
    description: `Read Google reviews for Dental Care Miami LLC in Miami, FL — rated ${site.rating.value.toFixed(1)} stars from ${site.rating.count} reviews.`,
  })
  return (
    <>
      <PageHero
        crumb="Reviews"
        eyebrow="Patient Reviews"
        title="Hear it from our patients"
        intro="Every review shown here comes from our Google Business Profile."
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="card sticky top-28 p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-soft">
                  <GoogleG className="h-6 w-6" />
                </span>
                <span className="font-semibold">Google Reviews</span>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <Counter value={site.rating.value} decimals={1} className="font-display text-7xl font-semibold leading-none" />
                <span className="pb-1.5">
                  <Stars value={site.rating.value} className="h-5 w-5" />
                  <span className="mt-1 block text-sm text-navy-500">
                    Based on {site.rating.count} reviews
                  </span>
                </span>
              </div>
              <div className="mt-7">
                <Breakdown />
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button href={site.googleProfileUrl} variant="outline">
                  See us on Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href={site.googleProfileUrl} variant="primary">
                  <PenLine className="h-4 w-4" aria-hidden="true" /> Leave a review
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="grid content-start gap-6 lg:col-span-8">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 120}>
                <ReviewCard review={r} large />
              </Reveal>
            ))}
            <Reveal className="rounded-3xl border border-dashed border-navy/15 p-8 text-center">
              <p className="font-display text-xl">Been to our clinic?</p>
              <p className="mx-auto mt-2 max-w-md text-navy-500">
                Your feedback helps other Miami families find the right dental care. We’d be grateful if you shared your
                experience on Google.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner title="Experience it for yourself" />
    </>
  )
}
