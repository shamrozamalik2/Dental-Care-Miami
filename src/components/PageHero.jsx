import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Blob, EASE, SplitText } from './motion.jsx'

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/** Header band for inner pages, with breadcrumb and animated title. */
export default function PageHero({ eyebrow, title, intro, crumb, children }) {
  return (
    <section className="relative overflow-hidden bg-sky-soft">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Blob className="-right-32 -top-32 h-[28rem] w-[28rem] bg-brand/15" duration={20} />
        <Blob className="-bottom-40 left-1/4 h-80 w-80 bg-teal/15" duration={16} range={60} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" aria-hidden="true">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#087FB5" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <motion.nav aria-label="Breadcrumb" {...fade(0)}>
          <ol className="flex items-center gap-1.5 text-sm text-navy-500">
            <li>
              <Link to="/" className="hover:text-brand">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-medium text-navy">{crumb}</li>
          </ol>
        </motion.nav>
        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <motion.span {...fade(0.08)} className="eyebrow inline-flex bg-white">
              {eyebrow}
            </motion.span>
          )}
          <SplitText as="h1" text={title} delay={0.15} className="h-display mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl" />
          {intro && (
            <motion.p {...fade(0.45)} className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-500 sm:text-xl">
              {intro}
            </motion.p>
          )}
          {children && <motion.div {...fade(0.55)} className="mt-8">{children}</motion.div>}
        </div>
      </div>
    </section>
  )
}
