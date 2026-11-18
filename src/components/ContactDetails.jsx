import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { site } from '../config/site.js'

function Row({ icon: Icon, label, children, href, external }) {
  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy-300">{label}</span>
        <span className="mt-1 block font-semibold text-navy">{children}</span>
      </span>
      {href && <ArrowUpRight className="h-5 w-5 text-navy-300 transition group-hover:text-brand" aria-hidden="true" />}
    </>
  )
  const cls = 'group flex items-center gap-4 rounded-2xl p-3 -mx-3 transition hover:bg-sky-soft'
  return href ? (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}

export default function ContactDetails() {
  return (
    <div className="space-y-2">
      <Row icon={Phone} label="Call us" href={site.phoneHref}>
        {site.phoneDisplay}
      </Row>
      <Row icon={MapPin} label="Visit us" href={site.mapsDirectionsUrl} external>
        {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
      </Row>
      {site.email && (
        <Row icon={Mail} label="Email" href={`mailto:${site.email}`}>
          {site.email}
        </Row>
      )}
      {site.whatsapp && (
        <Row icon={MessageCircle} label="WhatsApp" href={`https://wa.me/${site.whatsapp}`} external>
          Message us on WhatsApp
        </Row>
      )}
    </div>
  )
}
