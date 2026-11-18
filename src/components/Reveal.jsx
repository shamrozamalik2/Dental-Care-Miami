import { motion } from 'framer-motion'
import { EASE } from './motion.jsx'

const offsets = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.92 },
  fade: {},
}

/** Fades + slides children in when scrolled into view. `delay` is in ms. */
export default function Reveal({ as = 'div', delay = 0, variant = 'up', className = '', children, ...props }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offsets[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.85, ease: EASE, delay: delay / 1000 }}
      {...props}
    >
      {children}
    </Comp>
  )
}
