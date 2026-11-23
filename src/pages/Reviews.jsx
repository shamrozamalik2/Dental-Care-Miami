import { ArrowUpRight, PenLine, Info } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Stars from '../components/Stars.jsx'
import Button from '../components/Button.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { GoogleG } from '../components/GoogleRating.jsx'
import { Counter } from '../components/motion.jsx'
import { reviews, site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

export default function Reviews() {
  useSeo({
    title: 'Patient Reviews | Miami Dental Clinic — Miami, FL',
    description: `Read what patients say about Miami Dental Clinic in Miami, FL. Rated ${site.rating.value.toFixed(1)} out of 5 from ${site.rating.count} Google reviews.`,
  })
  return (
    <>
      <PageHero
        crumb="Reviews"
        image="/images/cleaning.webp"
        eyebrow="Patient Reviews"
        title="What patients say"
        intro="Our Google rating and selected excerpts from patient reviews, shown as they appear on Google."
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="card sticky top-28 p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-soft">
                  <GoogleG className="h-6 w-6" />
                </span>
                <span className="font-semibold">Google Rating</span>
              </div>
              <div className="mt-6 flex items-end gap-3">
                <Counter value={site.rating.value} decimals={1} className="font-display text-7xl font-semibold leading-none" />
                <span className="pb-1.5">
                  <Stars value={site.rating.value} className="h-5 w-5" />
                  <span className="mt-1 block text-sm text-navy-500">
                    out of 5 · {site.rating.count} reviews
                  </span>
                </span>
              </div>
              <p className="mt-6 flex gap-2 rounded-2xl bg-sky-soft p-4 text-xs leading-relaxed text-navy-500">
                <Info className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                This is the overall rating shown on our Google Business Profile. Read every review, including dates,
                on Google.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={site.googleProfileUrl} variant="outline">
                  Read all reviews on Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href={site.googleProfileUrl} variant="primary">
                  <PenLine className="h-4 w-4" aria-hidden="true" /> Leave a review
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="grid content-start gap-6 lg:col-span-8">
            <Reveal>
              <h2 className="h-display text-3xl">Selected review excerpts</h2>
              <p className="mt-2 text-navy-500">Short excerpts from Google reviews. Review dates vary.</p>
            </Reveal>
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 120}>
                <ReviewCard review={r} large />
              </Reveal>
            ))}
            <Reveal className="rounded-3xl border border-dashed border-navy/15 p-8 text-center">
              <p className="font-display text-xl">Visited us recently?</p>
              <p className="mx-auto mt-2 max-w-md text-navy-500">
                Your feedback helps us improve and helps other patients in Miami decide. We’d appreciate it if you shared
                your experience on Google.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner title="Ready to schedule your visit?" />
    </>
  )
}
