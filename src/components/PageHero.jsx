import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { EASE, SplitText } from './motion.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/**
 * Dark photo header for inner pages. It slides up under the transparent header
 * using the --header-h variable.
 */
export default function PageHero({ eyebrow, title, intro, crumb, image = '/images/hero-1920.webp', imageAlt = '', children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-navy"
      style={{ marginTop: 'calc(var(--header-h) * -1)' }}
    >
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y }}>
        <motion.img
          src={image}
          alt={imageAlt}
          className="h-[120%] w-full object-cover"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy/60 to-transparent" />

      <div className="container-x relative pb-16 sm:pb-24" style={{ paddingTop: 'calc(var(--header-h) + 4rem)' }}>
        <motion.nav aria-label="Breadcrumb" {...fade(0.1)}>
          <ol className="flex items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-medium text-white">{crumb}</li>
          </ol>
        </motion.nav>
        <div className="mt-10 max-w-3xl">
          {eyebrow && (
            <motion.span {...fade(0.15)} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              <span className="h-px w-8 bg-teal" aria-hidden="true" /> {eyebrow}
            </motion.span>
          )}
          <SplitText
            as="h1"
            text={title}
            delay={0.25}
            className="h-display mt-5 text-[2.75rem] leading-[1.02] !text-white sm:text-6xl lg:text-7xl"
          />
          {intro && (
            <motion.p {...fade(0.55)} className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {intro}
            </motion.p>
          )}
          {children && <motion.div {...fade(0.65)} className="mt-9">{children}</motion.div>}
        </div>
      </div>
    </section>
  )
}
