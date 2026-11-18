import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Phone, Info } from 'lucide-react'
import { site } from '../config/site.js'
import { formsAreLive } from '../lib/submitForm.js'
import { EASE } from './motion.jsx'
import { useLenis, scrollToTarget } from '../lib/smoothScroll.jsx'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
})

export default function FormSuccess({ title, children, onReset, resetLabel }) {
  const ref = useRef(null)
  const lenis = useLenis()
  useEffect(() => {
    if (!ref.current) return
    ref.current.focus({ preventScroll: true })
    scrollToTarget(lenis, ref.current, { offset: -150 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div ref={ref} tabIndex={-1} role="status" className="text-center outline-none">
      {/* Animated check: ring pops, burst ripples, tick draws itself */}
      <div className="relative mx-auto h-20 w-20">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-teal/25"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
        />
        <motion.svg
          viewBox="0 0 80 80"
          className="relative h-20 w-20"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="38" fill="#E7F8F5" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#16B8A6"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          />
          <motion.path
            d="M26 41.5l9.5 9.5L55 31"
            fill="none"
            stroke="#16B8A6"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
          />
        </motion.svg>
      </div>

      <motion.h3 {...fadeUp(0.5)} className="h-display mt-6 text-3xl">{title}</motion.h3>
      <motion.div {...fadeUp(0.6)} className="mx-auto mt-4 max-w-md leading-relaxed text-navy-500">{children}</motion.div>

      {!formsAreLive && (
        <motion.p {...fadeUp(0.7)} className="mx-auto mt-6 flex max-w-md gap-2 rounded-2xl bg-amber-50 p-4 text-left text-xs text-amber-900">
          <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
          Preview mode: online form delivery has not been set up yet, so this request was not sent. Please call the
          clinic to book.
        </motion.p>
      )}

      <motion.div {...fadeUp(0.8)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={site.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border border-navy/15 px-6 py-3 font-semibold text-navy transition hover:border-brand hover:text-brand"
        >
          {resetLabel}
        </button>
      </motion.div>
    </div>
  )
}
