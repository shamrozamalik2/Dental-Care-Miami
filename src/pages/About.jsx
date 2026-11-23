import { Link } from 'react-router-dom'
import { Armchair, HeartHandshake, ShieldCheck, MessagesSquare, MapPin, Phone, Star, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Stars from '../components/Stars.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { motion } from 'framer-motion'
import { Counter, RevealImage } from '../components/motion.jsx'
import { site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

const values = [
  {
    icon: HeartHandshake,
    title: 'Patient-centered care',
    text: 'Your needs and questions shape every visit. We take the time to listen.',
  },
  {
    icon: Armchair,
    title: 'A comfortable experience',
    text: 'A calm, welcoming setting where you can relax and feel at ease.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear communication',
    text: 'We explain your options in plain language so you always know what to expect.',
  },
  {
    icon: ShieldCheck,
    title: 'Commitment to oral health',
    text: 'Helping you care for your teeth and gums, today and over the long term.',
  },
]

export default function About() {
  useSeo({
    title: 'About Us | Miami Dental Clinic — Dentist in Miami, FL',
    description:
      'Learn about Miami Dental Clinic at 201 Northwest Dr, Miami, FL: patient-centered dental care, a comfortable experience and clear communication.',
  })
  return (
    <>
      <PageHero
        crumb="About Us"
        image="/images/clinic-miami.webp"
        eyebrow="About Us"
        title="Dental care centered on you"
        intro="Miami Dental Clinic is a dental practice in Miami, Florida, focused on patient-centered care, comfortable visits and clear, honest communication."
      />

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <RevealImage
              src="/images/clinic-miami.webp"
              alt="Dental treatment room with large windows looking out onto palm trees"
              loading="lazy"
              width="1100"
              height="800"
              parallax={8}
              className="aspect-[4/3.4] w-full rounded-4xl shadow-lift"
            />
            <Reveal variant="scale" delay={600} className="absolute -bottom-6 right-4 sm:-right-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-3xl bg-white p-5 shadow-lift"
              >
                <div className="flex items-center gap-2">
                  <Counter value={site.rating.value} decimals={1} className="font-display text-3xl font-semibold" />
                  <Stars value={5} />
                </div>
                <p className="mt-1 text-xs text-navy-500">Google rating · {site.rating.count} reviews</p>
              </motion.div>
            </Reveal>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Who We Are" title="Dental care built around you" />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-navy-500">
              <p>
                At {site.name}, we believe a great dental experience starts long before you sit in the chair. It starts
                with a friendly voice on the phone, clear answers to your questions, and a team that treats you with
                respect.
              </p>
              <p>
                Our goal is simple: make it easy to get the dental care you need in a setting where you feel
                comfortable and well informed — whether you’re coming in for a check-up, a consultation, or a tooth
                that’s giving you trouble.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/book-appointment">
                Book an Appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/services" variant="outline">
                Explore services
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-sky-soft">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Approach"
            title="What you can expect from us"
            intro="Four principles guide every visit to our clinic."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100} className="card p-8 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-10px_rgba(8,126,171,0.8)]">
                  <Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-navy-500">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="grid gap-px overflow-hidden rounded-4xl border border-navy/[0.06] bg-navy/[0.06] shadow-soft md:grid-cols-3">
            {[
              { icon: Star, label: 'Google rating', value: `${site.rating.value.toFixed(1)} / 5`, sub: `${site.rating.count} patient reviews`, href: '/reviews' },
              { icon: MapPin, label: 'Location', value: site.address.street, sub: `${site.address.city}, ${site.address.region} ${site.address.postalCode}`, href: site.mapsDirectionsUrl, ext: true },
              { icon: Phone, label: 'Call us', value: site.phoneDisplay, sub: 'Tap to call the clinic', href: site.phoneHref },
            ].map(({ icon: Icon, label, value, sub, href, ext }) => {
              const inner = (
                <>
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-300">{label}</p>
                  <p className="mt-2 font-display text-2xl font-medium">{value}</p>
                  <p className="mt-1 text-sm text-navy-500">{sub}</p>
                </>
              )
              const cls = 'block bg-white p-8 transition hover:bg-sky-soft sm:p-10'
              return href.startsWith('/') ? (
                <Link key={label} to={href} className={cls}>{inner}</Link>
              ) : (
                <a key={label} href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {inner}
                </a>
              )
            })}
          </Reveal>
        </div>
      </section>

      <CtaBanner title="We’d love to meet you" />
    </>
  )
}
