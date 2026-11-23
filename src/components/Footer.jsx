import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'
import GoogleRating from './GoogleRating.jsx'
import { nav, services, site } from '../config/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-navy pb-28 text-white/70 md:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed">
            Patient-centered dental care in Miami, Florida. Request an appointment online or call our office directly.
          </p>
          <div className="mt-6 inline-block rounded-2xl bg-white p-1">
            <GoogleRating variant="inline" className="px-3 py-2 text-navy" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Explore</h2>
          <ul className="mt-5 space-y-3">
            {[...nav, { to: '/book-appointment', label: 'Book an Appointment' }].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition hover:text-teal">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="transition hover:text-teal">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Visit Us</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-teal">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 font-semibold text-white transition hover:text-teal">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              <span>
                {site.hours.verified ? (
                  <Link to="/contact#hours" className="hover:text-teal">See opening hours</Link>
                ) : (
                  <>Google lists closing at 9 PM. Please call ahead to confirm hours.</>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="container-x relative select-none overflow-hidden">
        <p className="whitespace-nowrap font-display text-[9.6vw] font-medium leading-[0.95] tracking-tight text-white/[0.07] xl:text-[8.4rem]">
          Miami Dental Clinic
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <a href={site.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-teal">
            View us on Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
