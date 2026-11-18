import { Clock, Info, Phone } from 'lucide-react'
import { site } from '../config/site.js'

/** Opening hours. Shows a clear "pending confirmation" state until site.hours.verified = true. */
export default function HoursCard({ id }) {
  const { hours } = site
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  return (
    <div id={id} className="card scroll-mt-28 p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
          <Clock className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold">Opening Hours</h3>
      </div>

      {!hours.verified && (
        <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold">Hours pending confirmation.</strong> {hours.listedNote} {hours.pendingNote}
          </p>
        </div>
      )}

      <dl className="mt-5 divide-y divide-navy/[0.06]">
        {hours.schedule.map((row) => (
          <div
            key={row.day}
            className={`flex justify-between py-2.5 text-[15px] ${row.day === todayName ? 'font-semibold text-brand' : ''}`}
          >
            <dt>
              {row.day}
              {row.day === todayName && <span className="ml-2 text-xs font-medium text-teal-700">Today</span>}
            </dt>
            <dd className={hours.verified ? '' : 'text-navy-300'}>{row.time}</dd>
          </div>
        ))}
      </dl>

      <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-700">
        <Phone className="h-4 w-4" aria-hidden="true" /> Call to confirm: {site.phoneDisplay}
      </a>
    </div>
  )
}
