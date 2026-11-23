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
  ChevronDown,
  Quote,
} from 'lucide-react'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import { GoogleG } from '../components/GoogleRating.jsx'
import Stars from '../components/Stars.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import HoursCard from '../components/HoursCard.jsx'
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

/** Small glass panel that starts a booking request and pre-fills the full form. */
function QuickBook() {
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
  const field =
    'w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/50 focus:border-teal focus:bg-white/15 [color-scheme:dark]'
  return (
    <form
      onSubmit={submit}
      aria-label="Start an appointment request"
      className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-7"
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl text-white">Request a visit</p>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-1.5 text-sm text-white/60">Pick a service and a day. We’ll confirm the details with you.</p>
      <div className="mt-6 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Service</span>
          <select value={service} onChange={(e) => setService(e.target.value)} className={field}>
            <option value="" className="text-navy">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="text-navy">{s.title}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Preferred date</span>
          <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </label>
      </div>
      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-navy transition hover:bg-teal hover:text-white"
      >
        Continue to booking
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
      <p className="mt-4 text-center text-xs text-white/50">
        or call{' '}
        <a href={site.phoneHref} className="font-semibold text-white hover:text-teal">
          {site.phoneDisplay}
        </a>
      </p>
    </form>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy"
      style={{ marginTop: 'calc(var(--header-h) * -1)' }}
    >
      {/* Photo + scrim */}
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
        <motion.picture
          className="block h-full w-full"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: EASE }}
        >
          <source media="(min-width: 768px)" srcSet="/images/hero-1920.webp" />
          <img
            src="/images/hero-900.webp"
            alt="Bright, modern dental treatment room with a turquoise dental chair"
            width="1920"
            height="1080"
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
        </motion.picture>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/30 max-lg:bg-navy/75" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy to-transparent" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative flex flex-1 flex-col justify-center pb-10"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12" style={{ paddingTop: 'calc(var(--header-h) + 3rem)' }}>
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0.3)}>
              <Eyebrow light>Dental clinic · Miami, Florida</Eyebrow>
            </motion.div>

            <motion.h1
              className="h-display mt-7 text-[3rem] leading-[0.98] !text-white sm:text-7xl lg:text-[5.6rem]"
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
                <Word>Smiles,</Word> <Word>One</Word> <Word>Visit</Word> <Word>at</Word> <Word>a</Word> <Word>Time.</Word>
              </span>
            </motion.h1>

            <motion.p {...fadeUp(1.1)} className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Discover professional dental care in Miami. Explore our services and contact our team to request your
              appointment.
            </motion.p>

            <motion.div {...fadeUp(1.25)} className="mt-10 flex flex-col gap-3 sm:flex-row">
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
          </div>

          <motion.div
            className="hidden lg:col-span-5 lg:block"
            initial={{ opacity: 0, y: 50, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1 }}
            style={{ transformPerspective: 1200 }}
          >
            <div className="ml-auto max-w-sm">
              <QuickBook />
            </div>
          </motion.div>
        </div>

        {/* Info strip */}
        <motion.div
          {...fadeUp(1.5)}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:mt-20"
        >
          {[
            { icon: PhoneCall, label: 'Call our office', value: site.phoneDisplay, href: site.phoneHref },
            { icon: Navigation, label: 'Find us', value: site.addressOneLine, href: site.mapsDirectionsUrl, ext: true },
            { icon: Clock, label: 'Opening hours', value: 'Please call to confirm', href: site.phoneHref },
          ].map(({ icon: Icon, label, value, href, ext }) => (
            <a
              key={label}
              href={href}
              {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 bg-navy/40 p-5 backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-teal transition group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.16em] text-white/50">{label}</span>
                <span className="mt-0.5 block truncate font-semibold text-white">{value}</span>
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/50 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
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

/* ════════════════════════ SERVICES (bento) ════════════════════════ */
const bentoLayout = [
  'lg:col-span-2 lg:row-span-2', // 0 large
  '',
  '',
  '',
  '',
  'lg:col-span-2', // 5 wide
  '',
  '',
]

function ServiceTile({ service, index, className }) {
  const big = index === 0
  return (
    <StaggerItem className={`h-full ${className}`}>
      <Link
        to={`/services#${service.slug}`}
        className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-4xl bg-navy p-6 sm:p-7 ${
          big ? 'min-h-[26rem] lg:min-h-0' : 'min-h-[19rem]'
        }`}
      >
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent transition-colors duration-500 group-hover:from-brand-800/95 group-hover:via-brand-800/40" />

        <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-teal sm:left-7 sm:top-7">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-navy sm:right-7 sm:top-7">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="font-display text-sm text-white/50">{String(index + 1).padStart(2, '0')}</span>
        <h3 className={`mt-1 font-display font-medium leading-tight !text-white ${big ? 'text-4xl sm:text-5xl' : 'text-2xl'}`}>
          {service.title}
        </h3>
        <p
          className={`mt-3 text-white/75 transition-all duration-500 ${
            big ? 'max-w-md text-lg' : 'max-h-0 overflow-hidden text-sm opacity-0 group-hover:max-h-24 group-hover:opacity-100 max-lg:max-h-24 max-lg:opacity-100'
          }`}
        >
          {service.short}
        </p>
      </Link>
    </StaggerItem>
  )
}

function Services() {
  return (
    <section className="section bg-sky-soft">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Dental services</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl">
                Care for every part <span className="italic text-brand">of your smile</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="max-w-sm">
            <p className="text-lg text-navy-500">
              From preventive visits to orthodontic consultations, explore the care you can ask our team about.
            </p>
            <Button to="/services" variant="outline" className="group mt-6">
              View all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid auto-rows-[19rem] gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {services.map((s, i) => (
            <ServiceTile key={s.slug} service={s} index={i} className={bentoLayout[i]} />
          ))}
        </Stagger>

        {!site.servicesConfirmed && (
          <Reveal className="mt-8 text-center text-sm text-navy-500">
            Treatment availability may vary.{' '}
            <a href={site.phoneHref} className="font-semibold text-brand hover:underline">
              Call {site.phoneDisplay}
            </a>{' '}
            to confirm a specific service.
          </Reveal>
        )}
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

/* ════════════════════════ PROCESS ════════════════════════ */
function Process() {
  const steps = [
    { title: 'Send a request', text: 'Use the online form or call our office. It only takes a minute.' },
    { title: 'We confirm with you', text: 'Our team contacts you to arrange a date and time that suits you.' },
    { title: 'Visit the clinic', text: `Come see us at ${site.address.street}, Miami.` },
  ]
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Appointments</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl">Requesting a visit is simple</h2>
            </Reveal>
            <Reveal delay={200}>
              <Button to="/book-appointment" className="group mt-8">
                Start your request <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
          <Stagger as="ol" className="grid gap-4 sm:grid-cols-3 lg:col-span-8" stagger={0.15}>
            {steps.map((s, i) => (
              <StaggerItem
                as="li"
                key={s.title}
                className="group relative overflow-hidden rounded-4xl border border-navy/[0.07] bg-sky-soft p-7 transition-colors duration-500 hover:bg-brand"
              >
                <span className="font-display text-7xl font-medium text-brand/20 transition-colors duration-500 group-hover:text-white/25">
                  0{i + 1}
                </span>
                <h3 className="mt-10 text-xl font-semibold transition-colors duration-500 group-hover:!text-white">{s.title}</h3>
                <p className="mt-2 text-navy-500 transition-colors duration-500 group-hover:text-white/80">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
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
      <Statement />
      <Services />
      <BigMarquee />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <ImageCta />
      <Location />
    </>
  )
}
