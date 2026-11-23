import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

/**
 * Five stars filled to the exact value (e.g. 3.7 → three full stars and one 70% star).
 * Stars pop in one after another when scrolled into view.
 */
export default function Stars({ value = 5, className = 'h-4 w-4', emptyClass = 'text-navy/15', animated = true }) {
  return (
    <motion.span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${value} out of 5 stars`}
      initial={animated ? 'hidden' : false}
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <motion.span
            key={i}
            className="relative inline-flex"
            variants={{
              hidden: { scale: 0, rotate: -60, opacity: 0 },
              show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 14 } },
            }}
          >
            <Star aria-hidden="true" className={`${className} ${emptyClass}`} />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star aria-hidden="true" className={`${className} block max-w-none fill-amber-400 text-amber-400`} />
              </span>
            )}
          </motion.span>
        )
      })}
    </motion.span>
  )
}
