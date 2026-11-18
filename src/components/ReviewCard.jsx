import { Quote, BadgeCheck } from 'lucide-react'
import Stars from './Stars.jsx'
import { GoogleG } from './GoogleRating.jsx'

/**
 * Shows an exact quote when available. If only a summary exists, it is
 * labelled as a summary so it's never mistaken for the reviewer's own words.
 */
export default function ReviewCard({ review, large = false }) {
  const isQuote = Boolean(review.quote)
  return (
    <figure className={`card relative flex h-full flex-col ${large ? 'p-8 sm:p-10' : 'p-7 sm:p-8'}`}>
      <Quote aria-hidden="true" className="absolute right-7 top-7 h-10 w-10 text-brand-100" strokeWidth={1.5} />
      <div className="flex items-center gap-3">
        <Stars value={review.rating} />
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{review.tag}</span>
      </div>

      {isQuote ? (
        <blockquote className={`mt-6 flex-1 font-display leading-snug text-navy ${large ? 'text-2xl sm:text-[1.7rem]' : 'text-xl'}`}>
          “{review.quote}”
        </blockquote>
      ) : (
        <div className="mt-6 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-300">Review summary</p>
          <p className={`mt-2 font-display leading-snug text-navy ${large ? 'text-2xl sm:text-[1.7rem]' : 'text-xl'}`}>
            A patient {review.summary.charAt(0).toLowerCase() + review.summary.slice(1)}
          </p>
        </div>
      )}

      <figcaption className="mt-8 flex items-center justify-between border-t border-navy/[0.06] pt-5">
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft">
            <GoogleG className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold">{review.author}</span>
            <span className="block text-xs text-navy-500">{review.rating}-star review on Google</span>
          </span>
        </span>
        <BadgeCheck className="h-5 w-5 text-teal" aria-label="Review from Google" />
      </figcaption>
    </figure>
  )
}
