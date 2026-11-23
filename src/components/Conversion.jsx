import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Zap,
  CalendarClock,
  Sparkles,
  Ruler,
  Bandage,
  HeartHandshake,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Check,
  AlertTriangle,
} from 'lucide-react'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'
import ServiceIcon from './ServiceIcon.jsx'
import { EASE, Magnetic } from './motion.jsx'
import { services, site } from '../config/site.js'
import { scrollToTarget, useLenis } from '../lib/smoothScroll.jsx'

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

const Eyebrow = ({ children, light = false }) => (
  <span className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? 'text-teal' : 'text-brand'}`}>
    <span className={`h-px w-10 ${light ? 'bg-teal' : 'bg-brand'}`} aria-hidden="true" />
    {children}
  </span>
)

/* ════════════════════ Emergency ribbon ════════════════════ */
export function EmergencyRibbon() {
  return (
    <section aria-label="Dental emergencies" className="relative z-10 -mt-[5.5rem] sm:-mt-[5.25rem]">
      <div className="container-x">
        <div className="-mb-px flex flex-col items-start justify-between gap-4 rounded-t-[2rem] bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <p className="flex items-center gap-4 text-navy">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span>
              <strong className="font-semibold">Toothache, swelling or a broken tooth?</strong>{' '}
              <span className="text-navy-500">Don’t wait it out. Call and our team will talk you through your options.</span>
            </span>
          </p>
          <a
            href={site.phoneHref}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <Phone className="h-4 w-4 group-hover:animate-[wiggle_0.5s_ease-in-out]" aria-hidden="true" />
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════ "What brings you in?" picker ════════════════════ */
const concerns = [
  {
    id: 'pain',
    icon: Zap,
    label: 'I have tooth pain',
    headline: 'Tooth pain shouldn’t be ignored.',
    text: 'Pain is often a sign something needs attention. Call our office so our team can talk you through your options and arrange a time to see you.',
    services: ['emergency-dental-consultations', 'general-dentistry'],
    urgent: true,
  },
  {
    id: 'checkup',
    icon: CalendarClock,
    label: 'I’m due for a check-up or cleaning',
    headline: 'Stay ahead with regular care.',
    text: 'Routine visits and professional cleanings help you keep your smile healthy and spot small problems before they grow.',
    services: ['teeth-cleaning', 'preventive-dental-care'],
  },
  {
    id: 'cosmetic',
    icon: Sparkles,
    label: 'I want a more confident smile',
    headline: 'Love the way your smile looks.',
    text: 'Talk with our team about cosmetic options focused on the appearance of your smile, explained clearly so you can decide what’s right for you.',
    services: ['cosmetic-dentistry'],
  },
  {
    id: 'alignment',
    icon: Ruler,
    label: 'My teeth are crooked or crowded',
    headline: 'Straighter teeth start with a conversation.',
    text: 'Request a consultation to learn about options for straightening teeth and improving alignment.',
    services: ['braces-consultation', 'orthodontics'],
  },
  {
    id: 'broken',
    icon: Bandage,
    label: 'A tooth is broken or damaged',
    headline: 'Let’s take a look as soon as possible.',
    text: 'A cracked, broken or badly damaged tooth needs to be checked. Our team can explain whether it can be treated or may need to be removed.',
    services: ['emergency-dental-consultations', 'tooth-extractions'],
    urgent: true,
  },
  {
    id: 'nervous',
    icon: HeartHandshake,
    label: 'I’m nervous about the dentist',
    headline: 'You’re not alone, and you’re in control.',
    text: 'Let us know when you request your visit. We’ll take things at your pace and explain each step in plain language before anything happens.',
    services: ['general-dentistry'],
  },
]

export function ConcernPicker() {
  const [active, setActive] = useState(concerns[0].id)
  const c = concerns.find((x) => x.id === active)
  const primary = bySlug[c.services[0]]
  const bookUrl = `/book-appointment?${new URLSearchParams({ service: c.services[0], note: c.label })}`
  const panelId = useId()
  const lenis = useLenis()
  const choose = (id) => {
    setActive(id)
    // On phones the answer sits below the list, so bring it into view.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      const el = document.getElementById(panelId)
      if (el) setTimeout(() => scrollToTarget(lenis, el, { offset: -96 }), 60)
    }
  }

  return (
    <section className="section relative overflow-hidden bg-white" aria-labelledby="concern-heading">
      <div aria-hidden="true" className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Start here</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="concern-heading" className="h-display mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl">
              What brings you in <span className="italic text-brand">today?</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-xl text-lg text-navy-500">
              Not sure which treatment you need? You don’t have to be. Choose what’s bothering you and we’ll point you
              to the right next step.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div role="tablist" aria-label="Choose your concern" aria-orientation="vertical" className="flex flex-col gap-2.5">
              {concerns.map((x) => {
                const on = x.id === active
                const Icon = x.icon
                return (
                  <button
                    key={x.id}
                    role="tab"
                    aria-selected={on}
                    aria-controls={panelId}
                    onClick={() => choose(x.id)}
                    className={`group relative flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${
                      on ? 'border-transparent text-white' : 'border-navy/[0.08] bg-white text-navy hover:border-brand/40 hover:bg-sky-soft'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="concern-pill"
                        className="absolute inset-0 rounded-2xl bg-navy shadow-lift"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                        on ? 'bg-teal text-white' : 'bg-sky-soft text-brand group-hover:bg-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="relative flex-1 font-semibold">{x.label}</span>
                    <ArrowRight
                      className={`relative h-4 w-4 transition-all duration-300 ${on ? 'translate-x-0 text-teal opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'}`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={150} variant="scale" className="lg:col-span-7">
            <div
              id={panelId}
              role="tabpanel"
              className="relative isolate h-full min-h-[30rem] overflow-hidden rounded-[2.25rem] bg-navy p-8 text-white sm:p-12"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={primary.image}
                  src={primary.image}
                  alt=""
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy/90 to-brand-800/70" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex h-full flex-col"
                >
                  {c.urgent && (
                    <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-red-500/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-red-300">
                      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> Best to call us
                    </span>
                  )}
                  <h3 className="h-display text-3xl !text-white sm:text-[2.6rem] sm:leading-[1.1]">{c.headline}</h3>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">{c.text}</p>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Ask our team about</p>
                  <ul className="mt-3 flex flex-wrap gap-2.5">
                    {c.services.map((slug) => (
                      <li key={slug}>
                        <Link
                          to={`/services#${slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-2 pr-4 text-sm font-medium backdrop-blur transition hover:border-teal hover:bg-teal/20"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-teal">
                            <ServiceIcon name={bySlug[slug].icon} className="h-3.5 w-3.5" />
                          </span>
                          {bySlug[slug].title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                    {c.urgent ? (
                      <>
                        <Magnetic>
                          <Button href={site.phoneHref} variant="accent" size="lg" className="w-full">
                            <Phone className="h-5 w-5" aria-hidden="true" /> Call {site.phoneDisplay}
                          </Button>
                        </Magnetic>
                        <Button to={bookUrl} variant="ghostLight" size="lg">
                          Or request a visit online
                        </Button>
                      </>
                    ) : (
                      <>
                        <Magnetic>
                          <Button to={bookUrl} variant="accent" size="lg" className="group w-full">
                            Request a visit for this
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Button>
                        </Magnetic>
                        <Button href={site.phoneHref} variant="ghostLight" size="lg">
                          <Phone className="h-5 w-5" aria-hidden="true" /> Prefer to talk? Call us
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-navy-500">
            {['Request online in about a minute', 'Our team contacts you to confirm', 'Options explained in plain language'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal/15 text-teal-700">
                  <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ════════════════════ FAQ ════════════════════ */
const faqs = [
  {
    q: 'How do I book an appointment?',
    a: `Fill in the online request form, which takes about a minute, or call our office at ${site.phoneDisplay}. Our team will get back to you to arrange a date and time.`,
  },
  {
    q: 'Is my appointment confirmed when I send the form?',
    a: 'Not yet. The form sends an appointment request. Your visit is confirmed once our team has contacted you and agreed a date and time with you.',
  },
  {
    q: 'Do you accept my insurance?',
    a: `Coverage depends on your plan. Please call ${site.phoneDisplay} with your insurance details and our team can tell you what applies to your visit.`,
  },
  {
    q: 'What should I do in a dental emergency?',
    a: `Call our office at ${site.phoneDisplay} and explain what’s happening. If you have severe facial swelling, difficulty breathing or swallowing, or bleeding that won’t stop, call 911 or go to the nearest emergency room.`,
  },
  {
    q: 'I’m anxious about dental visits. What can I do?',
    a: 'Let us know when you request your appointment or when you arrive. We’ll take things at your pace and explain each step before anything happens, so there are no surprises.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Google lists a closing time of 9 PM. Hours can vary, so please call our office to confirm before your visit.',
  },
  {
    q: 'Where are you located?',
    a: `We’re at ${site.addressOneLine}. Use the “Get directions” button on this page to open the route in Google Maps.`,
  },
]

function FaqItem({ item, open, onToggle, i }) {
  const id = `faq-${i}`
  return (
    <div className={`rounded-3xl border transition-colors duration-300 ${open ? 'border-transparent bg-sky-soft' : 'border-navy/[0.08] bg-white hover:border-brand/30'}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-semibold text-navy sm:px-8 sm:py-6"
        >
          {item.q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${open ? 'bg-brand text-white' : 'bg-sky-soft text-brand'}`}
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl px-6 pb-6 leading-relaxed text-navy-500 sm:px-8 sm:pb-7">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)

  // FAQ structured data so search engines can show these answers.
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <section className="section bg-white" aria-labelledby="faq-heading">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 id="faq-heading" className="h-display mt-6 text-[2.6rem] leading-[1.02] sm:text-5xl">
                Before you <span className="italic text-brand">book</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 text-lg text-navy-500">Quick answers to what patients usually ask first.</p>
            </Reveal>
            <Reveal delay={200} className="mt-8 rounded-3xl bg-navy p-7 text-white">
              <p className="font-display text-2xl">Still have a question?</p>
              <p className="mt-2 text-white/65">Our team is happy to help over the phone.</p>
              <a href={site.phoneHref} className="group mt-5 inline-flex items-center gap-3 font-semibold hover:text-teal">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                {site.phoneDisplay}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-8">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <FaqItem item={f} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
