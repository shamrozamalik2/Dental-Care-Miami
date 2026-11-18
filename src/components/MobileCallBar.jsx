import { Phone, CalendarCheck, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../config/site.js'

/** Floating action bar on mobile: Call Now + Book. WhatsApp only if configured. */
export default function MobileCallBar() {
  const { pathname } = useLocation()
  const onBooking = pathname === '/book-appointment'

  return (
    <>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.9 }}
        className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="flex gap-2 rounded-full border border-navy/[0.06] bg-white/90 p-1.5 shadow-lift backdrop-blur-xl">
          <a
            href={site.phoneHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-teal px-4 py-3.5 text-[15px] font-semibold text-white active:scale-[.98]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
          </a>
          {!onBooking && (
            <Link
              to="/book-appointment"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-[15px] font-semibold text-white active:scale-[.98]"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book
            </Link>
          )}
        </div>
      </motion.div>

      {site.whatsapp && (
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105 md:bottom-6 md:right-6"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
    </>
  )
}
