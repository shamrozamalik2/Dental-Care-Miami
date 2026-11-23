import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X, Phone, MapPin, CalendarCheck, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { EASE, Magnetic } from './motion.jsx'
import { useLenis } from '../lib/smoothScroll.jsx'
import { nav, site } from '../config/site.js'

const mobileLinks = [...nav, { to: '/book-appointment', label: 'Book an Appointment' }]
// Pages that open with a dark photo hero: the header is transparent over them until you scroll.
const OVERLAY_ROUTES = ['/', '/services', '/about', '/book-appointment', '/reviews', '/contact']

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (lenis) open ? lenis.stop() : lenis.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  const overlay = OVERLAY_ROUTES.includes(pathname) && !scrolled && !open

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`hidden text-white/75 transition-colors duration-500 lg:block ${
          overlay ? 'border-b border-white/10 bg-transparent' : 'bg-navy'
        }`}
      >
        <div className="container-x flex h-10 items-center justify-between text-[13px]">
          <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <MapPin className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
            {site.addressOneLine}
          </a>
          <div className="flex items-center gap-6">
            <NavLink to="/book-appointment" className="flex items-center gap-1.5 hover:text-white">
              <CalendarCheck className="h-3.5 w-3.5 text-teal" aria-hidden="true" /> Request an appointment online
            </NavLink>
            <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-white hover:text-teal">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-500 ${
          overlay
            ? 'border-white/10 bg-transparent'
            : 'border-navy/[0.06] bg-white/85 shadow-soft backdrop-blur-xl'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
            <Logo light={overlay} />
          </motion.div>

          <motion.nav
            aria-label="Main"
            className="hidden items-center gap-1 lg:flex"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          >
            {nav.map((item) => (
              <motion.div key={item.to} variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                      overlay
                        ? isActive ? 'text-white' : 'text-white/75 hover:text-white'
                        : isActive ? 'text-brand' : 'text-navy-700 hover:text-brand'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 rounded-full transition-colors duration-300 ${overlay ? 'bg-white/15' : 'bg-brand-50'}`}
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="hidden items-center gap-3 lg:flex"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <Button href={site.phoneHref} variant={overlay ? 'ghostLight' : 'outline'} size="sm" className="!py-2.5">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call Our Office
            </Button>
            <Magnetic strength={0.2}>
              <Button to="/book-appointment" variant={overlay ? 'accent' : 'primary'} size="sm" className="!py-2.5">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book an Appointment
              </Button>
            </Magnetic>
          </motion.div>

          <button
            type="button"
            className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              overlay ? 'border-white/30 text-white' : 'border-navy/10 text-navy'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            style={{ top: scrolled ? 64 : 80 }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.55, ease: EASE } }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.35, ease: 'easeIn' } }}
          >
            <motion.nav
              aria-label="Mobile"
              className="container-x flex flex-col py-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {mobileLinks.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.5 } } }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-navy/[0.06] py-4 font-display text-2xl ${
                        isActive ? 'text-brand' : 'text-navy'
                      }`
                    }
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-navy-300" aria-hidden="true" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div className="mt-8 space-y-3" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
                <Button href={site.phoneHref} variant="accent" size="lg" className="w-full">
                  <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phoneDisplay}
                </Button>
                <Button to="/book-appointment" size="lg" className="w-full">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
                </Button>
              </motion.div>
              <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 flex items-start gap-2 text-sm text-navy-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {site.addressOneLine}
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
