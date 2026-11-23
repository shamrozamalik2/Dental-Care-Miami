import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, CalendarCheck, Phone, ArrowRight } from 'lucide-react'
import Button from './Button.jsx'
import { EASE, Magnetic, Word, wordContainer } from './motion.jsx'
import { site } from '../config/site.js'

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/**
 * Inner-page banner, matching the home hero: living navy background, headline
 * with an accented phrase, framed photo with a floating info card, and CTAs.
 *
 * Props:
 *  - title, highlight: `highlight` is a phrase inside `title` shown in teal italic
 *  - badge: { icon, label, value, href?, ext? } floating card over the photo
 *  - actions: false hides the default Book/Call buttons; children render below them
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  crumb,
  image = '/images/hero-1920.webp',
  imageAlt = '',
  badge,
  actions = true,
  children,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  // Split the title so the highlighted phrase can be styled.
  const words = title.split(' ')
  const hl = highlight ? highlight.split(' ') : []
  const hlStart = hl.length ? words.findIndex((_, i) => hl.every((h, j) => words[i + j] === h)) : -1
  const isHl = (i) => hlStart >= 0 && i >= hlStart && i < hlStart + hl.length

  const BadgeIcon = badge?.icon
  const BadgeTag = badge?.href ? 'a' : 'div'

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy" style={{ marginTop: 'calc(var(--header-h) * -1)' }}>
      {/* Living background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-mesh absolute -left-[10%] -top-[10%] h-[38rem] w-[38rem] rounded-full bg-brand/45 blur-[140px]" />
        <div className="animate-mesh-slow absolute -right-[8%] bottom-[-20%] h-[32rem] w-[32rem] rounded-full bg-teal/30 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 25% 40%, black 15%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 25% 40%, black 15%, transparent 65%)',
          }}
        />
      </div>

      <div className="container-x relative pb-24 sm:pb-28" style={{ paddingTop: 'calc(var(--header-h) + 2.5rem)' }}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: textY }}>
            <motion.nav aria-label="Breadcrumb" {...fade(0.1)}>
              <ol className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/55 backdrop-blur">
                <li>
                  <Link to="/" className="hover:text-white">Home</Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-white">{crumb}</li>
              </ol>
            </motion.nav>

            {eyebrow && (
              <motion.p {...fade(0.2)} className="mt-9 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                <span className="h-px w-10 bg-teal" aria-hidden="true" /> {eyebrow}
              </motion.p>
            )}

            <motion.h1
              className="h-display mt-5 text-[2.9rem] leading-[0.98] !text-white sm:text-6xl lg:text-[5.2rem]"
              initial="hidden"
              animate="show"
              variants={wordContainer(0.3, 0.07)}
              aria-label={title}
            >
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <span key={i}>
                    <Word className={isHl(i) ? 'italic text-teal' : ''}>{w}</Word>{' '}
                  </span>
                ))}
              </span>
            </motion.h1>

            {intro && (
              <motion.p {...fade(0.6)} className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
                {intro}
              </motion.p>
            )}

            {(actions || children) && (
              <motion.div {...fade(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {actions && (
                  <>
                    <Magnetic>
                      <Button to="/book-appointment" variant="accent" size="lg" className="group w-full">
                        <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Button>
                    </Magnetic>
                    <Magnetic>
                      <Button href={site.phoneHref} variant="ghostLight" size="lg" className="w-full">
                        <Phone className="h-5 w-5" aria-hidden="true" /> {site.phoneDisplay}
                      </Button>
                    </Magnetic>
                  </>
                )}
                {children}
              </motion.div>
            )}
          </motion.div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <motion.div
              style={reduce ? undefined : { y: imgY }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
              className="relative ml-auto aspect-[5/6] w-[90%] overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] bg-brand-800 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] lg:aspect-[4/5]"
            >
              <motion.img
                src={image}
                alt={imageAlt}
                fetchpriority="high"
                style={reduce ? undefined : { scale: imgScale }}
                className="h-full w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative ring */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-dashed border-teal/50 lg:-right-10"
            />

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
                className="absolute -left-2 bottom-8 sm:-left-8 lg:-left-12"
              >
                <BadgeTag
                  {...(badge.href ? { href: badge.href } : {})}
                  {...(badge.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 text-navy shadow-2xl transition hover:-translate-y-0.5"
                >
                  {BadgeIcon && (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal text-white">
                      <BadgeIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">{badge.label}</span>
                    <span className="mt-0.5 block font-display text-xl font-medium leading-tight">{badge.value}</span>
                  </span>
                </BadgeTag>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Curved edge into the page */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 rounded-t-[2.5rem] bg-white sm:h-12 sm:rounded-t-[3rem]" />
    </section>
  )
}
