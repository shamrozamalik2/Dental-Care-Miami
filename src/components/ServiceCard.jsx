import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ServiceIcon from './ServiceIcon.jsx'
import { Tilt } from './motion.jsx'

/** Compact service card for the homepage grid — 3D tilt + cursor spotlight on hover. */
export default function ServiceCard({ service, index = 0 }) {
  return (
    <Tilt className="h-full rounded-3xl">
      <Link
        to={`/services#${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/[0.06] bg-white p-7 shadow-soft transition-[box-shadow,border-color] duration-500 hover:border-brand/20 hover:shadow-lift"
      >
        <span
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 transition-transform duration-700 ease-out group-hover:scale-[2.4]"
        />
        <span className="relative flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-10px_rgba(8,127,181,0.8)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-teal">
            <ServiceIcon name={service.icon} />
          </span>
          <span className="font-display text-sm text-navy-300 transition-colors group-hover:text-brand">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>
        <h3 className="relative mt-7 text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="relative mt-3 flex-1 leading-relaxed text-navy-500">{service.short}</p>
        <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          <span className="bg-gradient-to-r from-brand to-brand bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
            Learn more
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </Tilt>
  )
}
