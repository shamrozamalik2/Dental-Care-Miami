import { CalendarCheck, Phone, Info, Siren, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { motion } from 'framer-motion'
import { RevealImage, Stagger, StaggerItem } from '../components/motion.jsx'
import { services, site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

function ServiceRow({ service, index }) {
  const flip = index % 2 === 1
  return (
    <article id={service.slug} className="scroll-mt-28">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
          <RevealImage
            src={service.image}
            alt={`${service.title} — illustrative dental care photo`}
            loading="lazy"
            width="900"
            height="700"
            parallax={7}
            className="aspect-[4/3] w-full rounded-4xl shadow-lift"
          />
          <motion.span
            className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand shadow-lift"
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.6 }}
          >
            <ServiceIcon name={service.icon} />
          </motion.span>
        </div>
        <Reveal delay={150} variant={flip ? 'left' : 'right'}>
          <span className="font-display text-sm text-brand">{String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
          <h2 className="h-display mt-3 text-3xl sm:text-4xl">{service.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-500">{service.long}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={`/book-appointment?service=${service.slug}`}>
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Request this service
            </Button>
            <Button href={site.phoneHref} variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" /> Ask a question
            </Button>
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export default function Services() {
  useSeo({
    title: 'Dental Services in Miami, FL | Miami Dental Clinic',
    description:
      'Teeth cleaning, preventive care, cosmetic dentistry, orthodontics, braces consultations, extractions and emergency dental consultations in Miami, FL. Call +1 239-499-6242.',
  })
  return (
    <>
      <PageHero
        crumb="Services"
        image="/images/general.webp"
        eyebrow="Our Services"
        title="Dental services in Miami, Florida"
        intro="Explore the types of care you can ask Miami Dental Clinic about. Not sure what you need? Call our office and we’ll help you find the right next step."
      />

      {/* Quick jump nav */}
      <section className="border-b border-navy/[0.06] bg-white">
        <div className="container-x py-6">
          <Stagger as="nav" aria-label="Services" stagger={0.05} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {services.map((s) => (
              <StaggerItem
                as="a"
                key={s.slug}
                href={`#${s.slug}`}
                whileHover={{ y: -3 }}
                className="flex shrink-0 items-center gap-2 rounded-full border border-navy/10 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-brand hover:bg-brand-50 hover:text-brand"
              >
                <ServiceIcon name={s.icon} className="h-4 w-4" /> {s.title}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          {!site.servicesConfirmed && (
            <Reveal className="mb-16 flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm text-navy-700">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p>
                Availability of specific treatments may vary. Please{' '}
                <a href={site.phoneHref} className="font-semibold text-brand underline-offset-2 hover:underline">
                  call {site.phoneDisplay}
                </a>{' '}
                to confirm a service before your visit.
              </p>
            </Reveal>
          )}

          {/* Emergency callout */}
          <Reveal className="mb-24 overflow-hidden rounded-4xl bg-gradient-to-br from-navy to-brand-800 p-8 text-white sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-teal">
                  <Siren className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-medium !text-white sm:text-3xl">Dental pain or an urgent problem?</h2>
                  <p className="mt-2 max-w-xl text-white/75">
                    Don’t wait on a form — call the clinic so the team can talk through your situation right away.
                  </p>
                </div>
              </div>
              <Button href={site.phoneHref} variant="accent" size="lg">
                <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phoneDisplay}
              </Button>
            </div>
          </Reveal>

          <div className="space-y-24 sm:space-y-32">
            {services.map((s, i) => (
              <ServiceRow key={s.slug} service={s} index={i} />
            ))}
          </div>

          <Reveal className="mt-24 text-center">
            <p className="text-navy-500">Not sure which service you need?</p>
            <Button to="/book-appointment" variant="outline" className="mt-4">
              Request an appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
