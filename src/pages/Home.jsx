import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  PhoneCall,
  Clock,
  Navigation,
  Sparkle,
  Quote,
} from 'lucide-react'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { GoogleG } from '../components/GoogleRating.jsx'
import Stars from '../components/Stars.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import HoursCard from '../components/HoursCard.jsx'
import { ConcernPicker, EmergencyRibbon, Faq } from '../components/Conversion.jsx'
import {
  Counter,
  DrawPath,
  EASE,
  Magnetic,
  Marquee,
  RevealImage,
  ScrollRevealText,
  Stagger,
  StaggerItem,
  Word,
  wordContainer,
} from '../components/motion.jsx'
import { reviews, services, site } from '../config/site.js'
import { todayISO } from '../lib/validation.js'
import { useSeo } from '../lib/useSeo.js'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

const Eyebrow = ({ children, light = false }) => (
  <span className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? 'text-teal' : 'text-brand'}`}>
    <span className={`h-px w-10 ${light ? 'bg-teal' : 'bg-brand'}`} aria-hidden="true" />
    {children}
  </span>
)

/* ════════════════════════ HERO ════════════════════════ */

/** Horizontal booking bar: starts a request and pre-fills the full form. */
function BookingBar() {
  const navigate = useNavigate()
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (service) q.set('service', service)
    if (date) q.set('date', date)
    navigate(`/book-appointment${q.toString() ? `?${q}` : ''}`)
  }
  const field = 'w-full appearance-none bg-transparent text-[15px] font-semibold text-white outline-none [color-scheme:dark]'
  return (
    <form
      onSubmit={submit}
      aria-label="Start an appointment request"
      className="grid gap-2 rounded-[2rem] border border-white/15 bg-white/[0.07] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:grid-cols-[1.3fr_1fr_auto] md:rounded-full"
    >
      <label className="flex items-center gap-4 rounded-full px-5 py-3 transition hover:bg-white/[0.06]">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-teal">
          <Sparkle className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Service</span>
          <select value={service} onChange={(e) => setService(e.target.value)} className={field}>
            <option value="" className="text-navy">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="text-navy">{s.title}</option>
            ))}
          </select>
        </span>
      </label>
      <label className="flex items-center gap-4 rounded-full px-5 py-3 transition hover:bg-white/[0.06] md:border-l md:border-white/10">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-teal">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Preferred date</span>
          <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </span>
      </label>
      <button
        type="submit"
        className="group flex items-center justify-center gap-2 rounded-full bg-teal px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-navy"
      >
        Request a visit
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  )
}

/** Text that rotates around a circle. */
function RotatingBadge({ text, className = '' }) {
  return (
    <div className={`relative grid h-32 w-32 place-items-center ${className}`}>
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-white text-[10.5px] font-semibold uppercase tracking-[0.3em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-teal text-white">
        <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
      </span>
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const archY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const circleY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy" style={{ marginTop: 'calc(var(--header-h) * -1)' }}>
      {/* Living background: drifting colour fields + fine grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-mesh absolute -left-[10%] top-[5%] h-[42rem] w-[42rem] rounded-full bg-brand/50 blur-[140px]" />
        <div className="animate-mesh-slow absolute -right-[5%] bottom-[-10%] h-[36rem] w-[36rem] rounded-full bg-teal/35 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 20%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-x relative" style={{ paddingTop: 'calc(var(--header-h) + 3.5rem)' }}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: textY }}>
            <motion.div
              {...fadeUp(0.3)}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 backdrop-blur"
            >
              <span className="rounded-full bg-teal px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">Miami, FL</span>
              <span className="text-sm text-white/70">Dental care for the whole smile</span>
            </motion.div>

            <motion.h1
              className="h-display mt-8 text-[3.1rem] leading-[0.95] !text-white sm:text-7xl lg:text-[6rem]"
              initial="hidden"
              animate="show"
              variants={wordContainer(0.45, 0.08)}
              aria-label="Creating Healthier Smiles, One Visit at a Time."
            >
              <span aria-hidden="true">
                <Word>Creating</Word>{' '}
                <span className="relative inline-block">
                  <Word className="italic text-teal">Healthier</Word>
                  <DrawPath d="M2 9c30-6 80-8 116-3" viewBox="0 0 120 12" delay={1.3} className="absolute -bottom-2 left-0 h-3.5 w-full text-teal/70" />
                </span>{' '}
                <Word>Smiles,</Word>{' '}
                <Word className="text-white/45">One</Word> <Word className="text-white/45">Visit</Word>{' '}
                <Word className="text-white/45">at</Word> <Word className="text-white/45">a</Word>{' '}
                <Word className="text-white/45">Time.</Word>
              </span>
            </motion.h1>

            <motion.p {...fadeUp(1.1)} className="mt-9 max-w-md text-lg leading-relaxed text-white/70">
              Discover professional dental care in Miami. Explore our services and contact our team to request your
              appointment.
            </motion.p>

            <motion.div {...fadeUp(1.25)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button to="/book-appointment" variant="accent" size="lg" className="group w-full">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={site.phoneHref} variant="ghostLight" size="lg" className="w-full">
                  <Phone className="h-5 w-5" aria-hidden="true" /> Call Our Office
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Visual composition */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <motion.div
              style={reduce ? undefined : { y: archY }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-b-[2.5rem] rounded-t-[999px] bg-brand-800"
            >
              <motion.picture className="block h-full w-full" style={reduce ? undefined : { scale: imgScale }}>
                <source media="(min-width: 768px)" srcSet="/images/hero-1920.webp" />
                <img
                  src="/images/hero-900.webp"
                  alt="Bright, modern dental treatment room with a turquoise dental chair"
                  width="1920"
                  height="1080"
                  fetchpriority="high"
                  className="h-full w-full object-cover object-[60%_50%]"
                />
              </motion.picture>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </motion.div>

            {/* Secondary circular photo */}
            <motion.div
              style={reduce ? undefined : { y: circleY }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.4 }}
              className="absolute -left-2 bottom-10 h-36 w-36 overflow-hidden rounded-full border-[6px] border-navy shadow-2xl sm:h-44 sm:w-44 lg:-left-10"
            >
              <img src="/images/consultation.webp" alt="" className="h-full w-full object-cover" />
            </motion.div>

            {/* Google rating chip */}
            <motion.a
              href={site.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.7 }}
              className="absolute -right-2 top-[16%] flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-navy shadow-2xl sm:-right-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-soft">
                <GoogleG className="h-5 w-5" />
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <span className="font-display text-2xl font-semibold leading-none">{site.rating.value.toFixed(1)}</span>
                  <Stars value={site.rating.value} className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1 block text-xs text-navy-500">{site.rating.count} Google reviews</span>
              </span>
            </motion.a>

            {/* Rotating badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.9 }}
              className="absolute -bottom-6 right-2 hidden sm:block"
            >
              <Link to="/book-appointment" aria-label="Book an appointment" data-cursor="Book" className="block rounded-full">
                <RotatingBadge text="Book a visit • Miami Dental Clinic • " className="rounded-full bg-navy/70 backdrop-blur-md" />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div {...fadeUp(1.5)} className="relative z-10 mt-16 pb-28 lg:mt-20 lg:pb-32">
          <BookingBar />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/55">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
              <PhoneCall className="h-4 w-4 text-teal" aria-hidden="true" /> {site.phoneDisplay}
            </a>
            <a href={site.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <Navigation className="h-4 w-4 text-teal" aria-hidden="true" /> {site.addressOneLine}
            </a>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal" aria-hidden="true" /> Please call to confirm hours
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════ STATEMENT ════════════════════════ */
function Statement() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Welcome to {site.name}</Eyebrow>
        </Reveal>
        <ScrollRevealText
          as="p"
          text="We focus on what matters most to our patients: feeling comfortable, being listened to, and clearly understanding their care, one visit at a time."
          className="h-display mt-8 max-w-5xl text-[2rem] leading-[1.15] sm:text-5xl lg:text-[3.6rem]"
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-12">
          <RevealImage
            src="/images/clinic-miami.webp"
            alt="Dental treatment room with large windows looking out onto palm trees"
            loading="lazy"
            width="1100"
            height="900"
            parallax={10}
            className="aspect-[4/3] rounded-4xl lg:col-span-7 lg:aspect-auto lg:h-[34rem]"
          />
          <div className="flex flex-col gap-6 lg:col-span-5">
            <RevealImage
              src="/images/consultation.webp"
              alt="Dentist explaining a dental scan on a screen to a patient"
              loading="lazy"
              width="1100"
              height="900"
              parallax={10}
              delay={150}
              className="aspect-[16/10] rounded-4xl lg:aspect-auto lg:h-[19rem]"
            />
            <Reveal delay={250} className="flex flex-1 flex-col justify-between rounded-4xl bg-sky-soft p-8">
              <p className="text-lg leading-relaxed text-navy-500">
                Whether you’re due for a routine visit or have a concern you’d like checked, our team is here to help
                you look after your oral health.
              </p>
              <Link to="/about" className="group mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                Get to know us
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════ SERVICES (pinned horizontal gallery) ════════════════════════ */
function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setMatch(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return match
}

function ServicePanel({ service, index }) {
  return (
    <Link
      to={`/services#${service.slug}`}
      data-cursor="View"
      className="group relative isolate flex h-[26rem] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] bg-navy p-7 sm:w-[24rem] lg:h-[min(36rem,68vh)] lg:w-[27rem] lg:p-9"
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/30 to-navy/10 transition-opacity duration-500" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-navy/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-brand/40" />

      <div className="absolute inset-x-7 top-7 flex items-start justify-between lg:inset-x-9 lg:top-9">
        <span className="font-display text-6xl font-medium leading-none text-white/25 transition-colors duration-500 group-hover:text-teal">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-colors duration-500 group-hover:bg-teal">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
      </div>

      <h3 className="font-display text-3xl font-medium leading-tight !text-white lg:text-[2.1rem]">{service.title}</h3>
      <p className="mt-3 max-w-xs text-white/70">{service.short}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
        <span className="h-px w-8 bg-teal transition-all duration-500 group-hover:w-14" aria-hidden="true" />
        Learn more
      </span>
    </Link>
  )
}

function ServicesIntro() {
  return (
    <div className="w-[82vw] shrink-0 sm:w-[24rem] lg:w-[30rem] lg:pr-10">
      <Eyebrow>Dental services</Eyebrow>
      <h2 className="h-display mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
        Care for every part <span className="italic text-brand">of your smile</span>
      </h2>
      <p className="mt-6 max-w-sm text-lg text-navy-500">
        From preventive visits to orthodontic consultations, explore the care you can ask our team about.
      </p>
      <Button to="/services" variant="outline" className="group mt-8">
        View all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Button>
      {!site.servicesConfirmed && (
        <p className="mt-8 max-w-xs text-sm text-navy-500">
          Treatment availability may vary.{' '}
          <a href={site.phoneHref} className="font-semibold text-brand hover:underline">Call {site.phoneDisplay}</a> to
          confirm a specific service.
        </p>
      )}
    </div>
  )
}

function Services() {
  const desktop = useMedia('(min-width: 1024px)')
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const pinned = desktop && !reduce

  useEffect(() => {
    if (!pinned) return
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 64))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  if (!pinned) {
    return (
      <section className="section overflow-hidden bg-sky-soft">
        <div className="container-x">
          <ServicesIntro />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 [scrollbar-width:none]">
          {services.map((s, i) => (
            <div key={s.slug} className="snap-start">
              <ServicePanel service={s} index={i} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative bg-sky-soft" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[calc(var(--header-h)-1.5rem)]">
        <motion.div ref={track} style={{ x }} className="flex items-center gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-16">
          <ServicesIntro />
          {services.map((s, i) => (
            <ServicePanel key={s.slug} service={s} index={i} />
          ))}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-brand to-teal" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════ MARQUEE ════════════════════════ */
function BigMarquee() {
  return (
    <section aria-hidden="true" className="overflow-hidden bg-white py-14">
      <Marquee duration={40}>
        {['Healthier smiles', 'Patient-centered care', 'Clear communication', 'Miami, Florida'].map((t) => (
          <span key={t} className="mx-8 flex shrink-0 items-center gap-16 font-display text-6xl font-medium text-navy sm:text-8xl">
            <span className="whitespace-nowrap [-webkit-text-stroke:1.5px_#17324A] [color:transparent]">{t}</span>
            <span className="h-4 w-4 rounded-full bg-teal" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/* ════════════════════════ WHY CHOOSE US ════════════════════════ */
function WhyChooseUs() {
  const points = [
    { title: 'Patient-centered care', text: 'Your needs, questions and comfort guide every visit, from your first call onward.' },
    { title: 'A comfortable experience', text: 'We aim to make each appointment feel calm, welcoming and unhurried.' },
    { title: 'Clear communication', text: 'We explain your options in plain language before anything happens.' },
    { title: 'Commitment to oral health', text: 'We help you look after your smile today and in the long run.' },
  ]
  return (
    <section className="section relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/30 blur-[120px]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow light>Why choose us</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-6 text-[2.5rem] leading-[1.05] !text-white sm:text-6xl">
                What you can expect <span className="italic text-teal">when you visit</span>
              </h2>
            </Reveal>
            <RevealImage
              src="/images/general.webp"
              alt="Clean, bright dental treatment room"
              loading="lazy"
              width="900"
              height="700"
              parallax={8}
              delay={200}
              className="mt-10 hidden aspect-[4/3] rounded-4xl lg:block"
            />
          </div>
        </div>
        <ol className="lg:col-span-7">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="group border-t border-white/10 py-9 last:border-b sm:py-11">
              <div className="flex gap-6 sm:gap-10">
                <span className="font-display text-5xl font-medium text-teal/70 transition-colors duration-500 group-hover:text-teal sm:text-6xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-2xl font-medium !text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-white/65">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ════════════════════════ PROCESS (sticky stacking cards) ════════════════════════ */
const steps = [
  {
    title: 'Send a request',
    text: 'Use the online form or call our office. It only takes a minute, and you can tell us what you’d like help with.',
    image: '/images/consultation.webp',
    bg: 'bg-brand',
    cta: { to: '/book-appointment', label: 'Start your request' },
  },
  {
    title: 'We confirm with you',
    text: 'Our team contacts you to arrange a date and time that suits you. Nothing is booked until we’ve spoken.',
    image: '/images/preventive.webp',
    bg: 'bg-teal-700',
    cta: { href: site.phoneHref, label: `Call ${site.phoneDisplay}` },
  },
  {
    title: 'Visit the clinic',
    text: `Come see us at ${site.address.street}, ${site.address.city}. We’ll walk you through your care in plain language.`,
    image: '/images/clinic-miami.webp',
    bg: 'bg-navy',
    cta: { href: site.mapsDirectionsUrl, label: 'Get directions', ext: true },
  },
]

function StepCard({ step, index, total, progress }) {
  const target = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, [index / total, 1], [1, target])
  const reduce = useReducedMotion()
  return (
    <div className="sticky flex h-[85vh] items-start justify-center pt-4" style={{ top: `calc(var(--header-h) + ${index * 28}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale }}
        className={`relative grid w-full origin-top overflow-hidden rounded-[2.25rem] text-white shadow-[0_-20px_60px_-30px_rgba(23,50,74,0.5)] md:grid-cols-2 ${step.bg}`}
      >
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Step {index + 1} of {total}
            </span>
          </div>
          <div className="mt-16 md:mt-0">
            <span className="font-display text-[7rem] font-medium leading-none text-white/15 sm:text-[9rem]">0{index + 1}</span>
            <h3 className="h-display -mt-6 text-4xl !text-white sm:text-5xl">{step.title}</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">{step.text}</p>
            {step.cta.to ? (
              <Link to={step.cta.to} className="group mt-8 inline-flex items-center gap-3 font-semibold">
                {step.cta.label}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ) : (
              <a
                href={step.cta.href}
                {...(step.cta.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group mt-8 inline-flex items-center gap-3 font-semibold"
              >
                {step.cta.label}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            )}
          </div>
        </div>
        <div className="relative hidden min-h-[30rem] md:block">
          <img src={step.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </motion.article>
    </div>
  )
}

function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="bg-white pt-20 sm:pt-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Appointments</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-6 max-w-2xl text-[2.6rem] leading-[1.02] sm:text-6xl">
                Requesting a visit is <span className="italic text-brand">simple</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="max-w-sm text-lg text-navy-500">
            Three easy steps from your first message to your visit.
          </Reveal>
        </div>
        <div ref={ref} className="relative mt-6 pb-16">
          {steps.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════ TESTIMONIALS ════════════════════════ */
function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = reviews.length
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <section className="section relative overflow-hidden bg-sky-soft">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Patient reviews</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl">In our patients’ words</h2>
            </Reveal>
            <Reveal delay={200} className="mt-10 flex items-center gap-5">
              <Counter value={site.rating.value} decimals={1} className="font-display text-7xl font-medium leading-none" />
              <div>
                <Stars value={site.rating.value} className="h-5 w-5" />
                <p className="mt-2 text-sm text-navy-500">
                  out of 5 · {site.rating.count} reviews on Google
                </p>
              </div>
            </Reveal>
            <Reveal delay={250} className="mt-8 flex flex-wrap gap-3">
              <Button to="/reviews" variant="outline" size="sm">Reviews page</Button>
              <Button href={site.googleProfileUrl} variant="outline" size="sm">
                All reviews on Google <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>

          <Reveal
            variant="scale"
            className="relative lg:col-span-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-lift sm:p-14">
              <Quote aria-hidden="true" className="h-14 w-14 text-teal" strokeWidth={1.25} />
              <div className="relative mt-6 min-h-[9rem] sm:min-h-[11rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={reviews[i].id}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="font-display text-3xl leading-[1.2] text-navy sm:text-[2.75rem]"
                  >
                    “{reviews[i].excerpt}”
                  </motion.blockquote>
                </AnimatePresence>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-navy/[0.07] pt-6">
                <span className="flex items-center gap-3 text-sm text-navy-500">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft">
                    <GoogleG className="h-5 w-5" />
                  </span>
                  Google review excerpt · dates vary
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5" role="tablist" aria-label="Choose review">
                    {reviews.map((r, idx) => (
                      <button
                        key={r.id}
                        role="tab"
                        aria-selected={idx === i}
                        aria-label={`Review ${idx + 1}`}
                        onClick={() => setI(idx)}
                        className={`h-2 rounded-full transition-all duration-500 ${idx === i ? 'w-8 bg-brand' : 'w-2 bg-navy/15 hover:bg-navy/30'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setI((i - 1 + n) % n)}
                    aria-label="Previous review"
                    className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setI((i + 1) % n)}
                    aria-label="Next review"
                    className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════ CTA ════════════════════════ */
function ImageCta() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <section ref={ref} className="px-3 py-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy sm:rounded-[2.5rem]">
        <motion.img
          src="/images/emergency.webp"
          alt=""
          loading="lazy"
          style={reduce ? undefined : { y, scale: 1.25 }}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/80" />
        <div className="container-x py-24 text-center sm:py-32">
          <Reveal>
            <Eyebrow light>Your next visit</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="h-display mx-auto mt-6 max-w-3xl text-[2.6rem] leading-[1.04] !text-white sm:text-7xl">
              Ready for a <span className="italic text-teal">healthier smile?</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Request an appointment online, or call our office and speak with our team.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Button to="/book-appointment" variant="accent" size="lg" className="w-full">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.phoneHref} variant="ghostLight" size="lg" className="w-full">
                <Phone className="h-5 w-5" aria-hidden="true" /> {site.phoneDisplay}
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════ LOCATION ════════════════════════ */
function Location() {
  return (
    <section className="section bg-white" aria-labelledby="visit-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Location &amp; contact</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 id="visit-heading" className="h-display mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl">
                Find our Miami clinic
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button href={site.mapsDirectionsUrl} variant="outline" className="group">
              <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal variant="scale" className="lg:col-span-8">
            <MapEmbed className="h-[420px] lg:h-full" />
          </Reveal>
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Reveal delay={100} className="rounded-4xl bg-navy p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Visit us</p>
              <p className="mt-3 font-display text-2xl leading-snug">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <a href={site.phoneHref} className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6 text-lg font-semibold hover:text-teal">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                {site.phoneDisplay}
              </a>
            </Reveal>
            <Reveal delay={200}>
              <HoursCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useSeo({
    title: 'Dentist in Miami, FL | Miami Dental Clinic',
    description:
      'Miami Dental Clinic at 201 Northwest Dr, Miami, FL 33126. Explore dental services including teeth cleaning, cosmetic dentistry and braces consultations, and request an appointment online.',
  })
  return (
    <>
      <Hero />
      <EmergencyRibbon />
      <ConcernPicker />
      <Statement />
      <Services />
      <BigMarquee />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Faq />
      <ImageCta />
      <Location />
    </>
  )
}
