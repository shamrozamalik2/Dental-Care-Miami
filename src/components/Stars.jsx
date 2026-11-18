import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

/** Five stars that pop in one after another when scrolled into view. */
export default function Stars({ value = 5, className = 'h-4 w-4', animated = true }) {
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
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="inline-flex"
          variants={{
            hidden: { scale: 0, rotate: -60, opacity: 0 },
            show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 14 } },
          }}
        >
          <Star
            aria-hidden="true"
            className={`${className} ${i < Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-navy/20'}`}
          />
        </motion.span>
      ))}
    </motion.span>
  )
}
