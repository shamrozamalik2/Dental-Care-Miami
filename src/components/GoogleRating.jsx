import { site } from '../config/site.js'
import Stars from './Stars.jsx'

export function GoogleG({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.300-.1-2.400-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.300-.1-2.400-.4-3.5z" />
    </svg>
  )
}

/** "5.0 ★★★★★ · 2 Google reviews" — links to the clinic's Google listing. */
export default function GoogleRating({ variant = 'card', light = false, className = '' }) {
  const { value, count } = site.rating
  const label = `${count} Google review${count === 1 ? '' : 's'}`

  if (variant === 'inline') {
    return (
      <a
        href={site.googleProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm ${className}`}
      >
        <GoogleG className="h-5 w-5" />
        <span className={`font-bold ${light ? 'text-white' : ''}`}>{value.toFixed(1)}</span>
        <Stars value={value} />
        <span className={`underline-offset-2 hover:underline ${light ? 'text-white/75' : 'text-navy-500'}`}>{label}</span>
      </a>
    )
  }

  return (
    <a
      href={site.googleProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`card flex items-center gap-4 p-4 pr-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift ${className}`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-soft">
        <GoogleG className="h-6 w-6" />
      </span>
      <span>
        <span className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold leading-none">{value.toFixed(1)}</span>
          <Stars value={value} />
        </span>
        <span className="mt-1 block text-xs font-medium text-navy-500">Google rating · {label}</span>
      </span>
    </a>
  )
}
