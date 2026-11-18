import { Navigation } from 'lucide-react'
import { site } from '../config/site.js'

export default function MapEmbed({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-navy/[0.06] bg-sky-soft shadow-soft ${className}`}>
      <iframe
        title={`Map showing ${site.name} at ${site.addressOneLine}`}
        src={site.mapsEmbedUrl}
        className="h-full min-h-[340px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={site.mapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-lift transition hover:text-brand"
      >
        <Navigation className="h-4 w-4 text-brand" aria-hidden="true" /> Get directions
      </a>
    </div>
  )
}
