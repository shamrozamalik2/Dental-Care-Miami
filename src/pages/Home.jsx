import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  Users,
  HeartHandshake,
  MessagesSquare,
  Sparkles,
  MapPin,
  PhoneCall,
  ClipboardList,
  Smile,
  Star,
  Plus,
} from 'lucide-react'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import GoogleRating, { GoogleG } from '../components/GoogleRating.jsx'
import Stars from '../components/Stars.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import ContactDetails from '../components/ContactDetails.jsx'
import HoursCard from '../components/HoursCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import {
  Blob,
  Counter,
  DrawPath,
  EASE,
  Magnetic,
  Marquee,
  RevealImage,
  Stagger,
  StaggerItem,
  Tilt,
  Word,
  wordContainer,
} from '../components/motion.jsx'
import { reviews, services, site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-sky-soft via-sky-soft/60 to-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Blob className="-left-40 top-20 h-[30rem] w-[30rem] bg-brand/15" duration={22} range={60} />
        <Blob className="right-0 top-0 h-[26rem] w-[26rem] bg-teal/15" duration={17} range={50} />
        {/* Floating sparkles */}
        {[
          'left-[8%] top-[18%]',
          'left-[46%] top-[12%]',
          'left-[40%] bottom-[22%]',
        ].map((pos, i) => (
          <motion.span
            key={pos}
            className={`absolute ${pos} hidden text-brand/30 lg:block`}
            animate={{ y: [0, -14, 0], rotate: [0, 90, 180], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </motion.span>
        ))}
      </div>

      <div className="container-x relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
        <motion.div className="lg:col-span-6" style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.span {...fadeUp(0.1)} className="eyebrow bg-white shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Dental clinic in Miami, Florida
          </motion.span>

          <motion.h1
            className="h-display mt-6 text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem]"
            initial="hidden"
            animate="show"
            variants={wordContainer(0.25, 0.08)}
            aria-label="Your Smile Deserves the Best Dental Care."
          >
            <span aria-hidden="true">
              <Word>Your</Word> <Word>Smile</Word> <Word>Deserves</Word> <Word>the</Word>{' '}
              <span className="relative inline-block">
                <Word className="italic text-brand">Best</Word>
                <DrawPath
                  d="M2 9c30-6 80-8 116-3"
                  viewBox="0 0 120 12"
                  delay={1.05}
                  className="absolute -bottom-1 left-0 h-3 w-full text-teal"
                />
              </span>{' '}
              <Word>Dental</Word> <Word>Care.</Word>
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.85)} className="mt-7 max-w-xl text-lg leading-relaxed text-navy-500 sm:text-xl">
            Professional, patient-focused dentistry at {site.name}. Friendly people, clear communication, and a smooth
            experience from your first call to your visit.
          </motion.p>

          <motion.div {...fadeUp(1)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Button to="/book-appointment" size="lg" className="group w-full">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.phoneHref} variant="outline" size="lg" className="w-full">
                <Phone className="h-5 w-5" aria-hidden="true" /> Call Now
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div {...fadeUp(1.15)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <GoogleRating />
            <a href={site.phoneHref} className="group flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white">
                <PhoneCall className="h-5 w-5 group-hover:animate-[wiggle_0.5s_ease-in-out]" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-medium text-navy-500">Speak with our team</span>
                <span className="block font-semibold">{site.phoneDisplay}</span>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <motion.div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand/25 to-teal/25"
              initial={{ rotate: 0, opacity: 0, scale: 0.9 }}
              animate={{ rotate: 2.5, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            />
            <motion.div
              className="relative overflow-hidden rounded-[2.25rem] shadow-lift"
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 2.25rem)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 2.25rem)' }}
              transition={{ duration: 1.3, ease: [0.7, 0, 0.2, 1], delay: 0.2 }}
            >
              <motion.picture
                className="block"
                style={reduce ? undefined : { y: imgY, scale: imgScale }}
                initial={{ filter: 'blur(12px)' }}
                animate={{ filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
              >
                <source media="(min-width: 768px)" srcSet="/images/hero-1600.webp" />
                <img
                  src="/images/hero-800.webp"
                  alt="Bright, modern dental treatment room with a patient chair and equipment"
                  width="800"
                  height="900"
                  fetchpriority="high"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/4.4]"
                />
              </motion.picture>
            </motion.div>

            {/* Floating cards */}
            <motion.div style={reduce ? undefined : { y: cardsY }} className="pointer-events-none absolute inset-0">
              <motion.div
                className="pointer-events-auto absolute -left-3 bottom-10 hidden sm:-left-8 sm:block"
                initial={{ opacity: 0, x: -40, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 1.3 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl bg-white p-4 shadow-lift"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-soft">
                      <GoogleG className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Counter value={site.rating.value} decimals={1} className="font-display text-xl font-semibold" />
                        <Stars value={5} className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs text-navy-500">Rated on Google</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="pointer-events-auto absolute -right-2 top-8 hidden sm:-right-6 sm:block"
                initial={{ opacity: 0, x: 40, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 1.5 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur"
                >
                  <p className="text-xs font-medium text-navy-500">Request online in</p>
                  <p className="font-display text-xl font-semibold text-brand">under 1 minute</p>
                </motion.div>
              </motion.div>

              <motion.div
                className="pointer-events-auto absolute -bottom-5 right-8 hidden lg:block"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 1.7 }}
              >
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 rounded-full bg-navy py-2.5 pl-2.5 pr-5 text-white shadow-lift transition hover:bg-brand"
                >
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-teal">
                    <span className="absolute inset-0 animate-ping rounded-full bg-teal/60" />
                    <Phone className="relative h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">Call us today</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Trust strip ─────────────────────── */
function TrustStrip() {
  const items = [
    { icon: Star, title: <><Counter value={site.rating.value} decimals={1} /> Google rating</>, text: `Based on ${site.rating.count} patient reviews` },
    { icon: CalendarCheck, title: 'Easy online requests', text: 'Book from any device' },
    { icon: PhoneCall, title: 'Talk to a real person', text: 'One tap to call the clinic' },
    { icon: MapPin, title: 'NW 7th St, Miami', text: `Miami, FL ${site.address.postalCode}` },
  ]
  return (
    <section aria-label="Highlights" className="container-x relative z-10 -mt-8 sm:-mt-10">
      <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-navy/[0.06] bg-navy/[0.06] shadow-soft lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <StaggerItem key={i} className="group flex flex-col gap-3 bg-white p-5 transition-colors duration-500 hover:bg-sky-soft sm:flex-row sm:items-center sm:p-7">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold leading-tight">{title}</span>
              <span className="mt-0.5 block text-sm text-navy-500">{text}</span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

/* ─────────────────────── Services marquee ─────────────────────── */
function ServicesMarquee() {
  return (
    <section aria-label="Services we offer" className="pt-20 sm:pt-24">
      <Marquee duration={45}>
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/services#${s.slug}`}
            className="group mx-3 flex shrink-0 items-center gap-4 rounded-full border border-navy/[0.08] bg-white px-6 py-3.5 transition-colors hover:border-brand hover:bg-brand-50 sm:mx-4"
          >
            <span className="text-brand transition-transform duration-500 group-hover:rotate-12">
              <ServiceIcon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="whitespace-nowrap font-display text-xl text-navy sm:text-2xl">{s.title}</span>
          </Link>
        ))}
      </Marquee>
    </section>
  )
}

/* ──────────────────────── Services ──────────────────────── */
function FeaturedServices() {
  const featured = services.slice(0, 6)
  return (
    <section className="section !pt-16">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Services"
            title="Dental care for every stage of your smile"
            intro="From routine check-ups to extractions and cosmetic options, explore the care available at our Miami clinic."
          />
          <Reveal variant="right">
            <Button to="/services" variant="outline" className="group">
              View all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {featured.map((s, i) => (
            <StaggerItem key={s.slug} className="h-full">
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ─────────────────────── Why choose us ─────────────────────── */
function WhyChooseUs() {
  // Every point below echoes what real patients wrote in their Google reviews.
  const points = [
    { icon: Users, title: 'A professional team', text: 'Patients describe a professional team and professional service from start to finish.' },
    { icon: HeartHandshake, title: 'Friendly, welcoming staff', text: 'Both of our Google reviews mention friendly staff — we want every visit to feel comfortable.' },
    { icon: MessagesSquare, title: 'Excellent communication', text: 'We explain what to expect, answer your questions, and keep you informed.' },
    { icon: Sparkles, title: 'A smooth experience', text: 'From your first call to your appointment, we aim to make dental care simple.' },
  ]
  return (
    <section className="section relative overflow-hidden bg-sky-soft">
      <Blob className="-right-40 top-10 h-96 w-96 bg-brand/15" duration={20} />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="grid grid-cols-5 gap-4">
            <RevealImage
              src="/images/treatment.webp"
              alt="Dental team in protective gear treating a patient in the dental chair"
              loading="lazy"
              width="1000"
              height="1200"
              parallax={8}
              className="col-span-3 h-[26rem] rounded-4xl shadow-lift sm:h-[32rem]"
            />
            <div className="col-span-2 flex flex-col gap-4 pt-16">
              <RevealImage
                src="/images/xray-review.webp"
                alt="Dental professional reviewing X-ray images of teeth"
                loading="lazy"
                width="900"
                height="700"
                delay={200}
                parallax={10}
                className="h-48 rounded-3xl shadow-soft sm:h-60"
              />
              <Reveal variant="scale" delay={400}>
                <Tilt className="rounded-3xl" glow="rgba(255,255,255,0.25)">
                  <div className="rounded-3xl bg-brand p-5 text-white shadow-lift">
                    <Counter value={site.rating.value} decimals={1} className="font-display text-4xl font-semibold" />
                    <Stars value={5} className="h-4 w-4" />
                    <p className="mt-2 text-sm text-white/80">Google rating from every review so far</p>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Choose Us"
            title="Care that feels personal, professional and easy"
            intro="We know visiting the dentist isn’t always something people look forward to. Here’s what our patients say they value."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group h-full rounded-3xl bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/10 text-teal-700 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-teal group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{text}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── How it works ─────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: ClipboardList, title: 'Send a request', text: 'Fill in the short appointment form or call us directly.' },
    { icon: PhoneCall, title: 'We confirm with you', text: 'The clinic contacts you to confirm a date and time that works.' },
    { icon: Smile, title: 'Visit the clinic', text: `Come see us at ${site.address.street}, Miami.` },
  ]
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Booking Made Simple" title="Three easy steps to your visit" />
        <div className="relative mt-16">
          {/* Connector line draws itself as the section enters */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-0.5 origin-left bg-gradient-to-r from-brand via-brand-300 to-teal md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
          <Stagger as="ol" className="relative grid gap-10 md:grid-cols-3 md:gap-6" stagger={0.25} delay={0.2}>
            {steps.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem as="li" key={title} className="relative text-center">
                <motion.span
                  whileHover={{ rotate: -6, scale: 1.08 }}
                  className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand shadow-lift ring-8 ring-white"
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <motion.span
                    className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-teal text-xs font-bold text-white"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.6 + i * 0.25 }}
                  >
                    {i + 1}
                  </motion.span>
                </motion.span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-navy-500">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal className="mt-14 flex justify-center" delay={300}>
          <Magnetic>
            <Button to="/book-appointment" size="lg" className="group">
              Start your request <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────── Testimonials ─────────────────────── */
function Testimonials() {
  return (
    <section className="section relative overflow-hidden bg-navy">
      <Blob className="-left-32 bottom-0 h-96 w-96 bg-brand/30" duration={22} range={60} />
      <Blob className="right-0 top-0 h-80 w-80 bg-teal/20" duration={18} />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              light
              eyebrow="Patient Reviews"
              title="What our patients are saying"
              intro="Real reviews from real patients on Google."
            />
            <Reveal className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" delay={200}>
              <div className="flex items-center gap-4">
                <Counter value={site.rating.value} decimals={1} className="font-display text-6xl font-semibold text-white" />
                <div>
                  <Stars value={5} className="h-5 w-5" />
                  <p className="mt-1.5 text-sm text-white/70">
                    {site.rating.count} reviews on <span className="font-semibold text-white">Google</span>
                  </p>
                </div>
              </div>
              <Link to="/reviews" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-white">
                Read all reviews <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 150} variant={i % 2 ? 'right' : 'up'}>
                <motion.div
                  className="h-full"
                  whileHover={{ y: -8, rotate: i % 2 ? 0.6 : -0.6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <ReviewCard review={r} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Location ─────────────────────── */
function Location() {
  return (
    <section className="section" aria-labelledby="visit-heading">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Contact &amp; Location</span>
              <h2 id="visit-heading" className="h-display mt-5 text-[2.1rem] leading-[1.1] sm:text-5xl">
                Visit our Miami dental clinic
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-500">
                Find us on NW 7th St in Miami. Call ahead and our team will help you plan your visit.
              </p>
            </Reveal>
            <Reveal className="mt-8" delay={100}>
              <ContactDetails />
            </Reveal>
            <Reveal className="mt-8" delay={200}>
              <HoursCard />
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" variant="scale" delay={150}>
            <MapEmbed className="h-full min-h-[420px]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useSeo({
    title: 'Dentist in Miami, FL | Dental Care Miami LLC',
    description:
      'Dental Care Miami LLC — a 5.0-rated dental clinic on Google at 2772 NW 7th St, Miami, FL 33125. Request an appointment online or call +1 844-817-0271.',
  })
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesMarquee />
      <FeaturedServices />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Location />
      <CtaBanner />
    </>
  )
}
