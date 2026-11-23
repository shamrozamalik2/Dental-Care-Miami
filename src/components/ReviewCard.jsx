import { Quote, ArrowUpRight } from 'lucide-react'
import { GoogleG } from './GoogleRating.jsx'
import { site } from '../config/site.js'

/**
 * An excerpt from a Google review. No reviewer name, star score or date is shown
 * because they weren't supplied. The card links to the full reviews on Google.
 */
export default function ReviewCard({ review, large = false, dark = false }) {
  return (
    <figure
      className={`relative flex h-full flex-col rounded-3xl border p-7 sm:p-8 ${
        dark ? 'border-white/10 bg-white/[0.06] text-white backdrop-blur' : 'border-navy/[0.06] bg-white shadow-soft'
      }`}
    >
      <Quote aria-hidden="true" className={`h-9 w-9 ${dark ? 'text-teal' : 'text-brand-200'}`} strokeWidth={1.5} />
      <blockquote
        className={`mt-5 flex-1 font-display leading-snug ${large ? 'text-2xl sm:text-[1.75rem]' : 'text-xl sm:text-[1.4rem]'} ${
          dark ? '!text-white' : 'text-navy'
        }`}
      >
        “{review.excerpt}”
      </blockquote>
      <figcaption className={`mt-8 flex items-center justify-between border-t pt-5 ${dark ? 'border-white/10' : 'border-navy/[0.06]'}`}>
        <span className="flex items-center gap-3">
          <span className={`grid h-10 w-10 place-items-center rounded-full ${dark ? 'bg-white' : 'bg-sky-soft'}`}>
            <GoogleG className="h-5 w-5" />
          </span>
          <span>
            <span className={`block text-sm font-semibold ${dark ? 'text-white' : ''}`}>Google review excerpt</span>
            <span className={`block text-xs ${dark ? 'text-white/60' : 'text-navy-500'}`}>Patient review</span>
          </span>
        </span>
        <a
          href={site.googleProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read full reviews on Google"
          className={`grid h-9 w-9 place-items-center rounded-full transition ${
            dark ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-navy-300 hover:bg-brand-50 hover:text-brand'
          }`}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  )
}
