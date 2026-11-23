/**
 * Reusable motion primitives built on Framer Motion.
 * All of them respect the user's "reduce motion" setting through <MotionConfig reducedMotion="user">
 * (set in Layout), plus explicit checks where a value would otherwise never resolve.
 */
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

export const EASE = [0.2, 0.7, 0.2, 1]

/* ───────────── Word-by-word headline reveal ───────────── */

export const wordContainer = (delay = 0, stagger = 0.07) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/** One word that slides up from behind a mask. Must be inside a parent using `wordContainer`. */
export function Word({ children, className = '' }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        variants={{
          hidden: { y: '108%', rotate: 4, opacity: 0 },
          show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Splits a plain string into masked words and reveals them in sequence. */
export function SplitText({ text, as = 'span', className = '', delay = 0, stagger = 0.06, inView = false }) {
  const Comp = motion[as] ?? motion.span
  const words = text.split(' ')
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' }
  return (
    <Comp className={className} initial="hidden" {...trigger} variants={wordContainer(delay, stagger)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <Word>{w}</Word>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Comp>
  )
}

/* ───────────── Count-up number ───────────── */

export function Counter({ value, decimals = 0, duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setDisplay(value)
    const controls = animate(0, value, { duration, ease: EASE, onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value.toFixed(decimals)}</span>
      <span aria-hidden="true" className="tabular-nums">{display.toFixed(decimals)}</span>
    </span>
  )
}

/* ───────────── 3D tilt + cursor spotlight ───────────── */

export function Tilt({ children, className = '', max = 7, glow = 'rgba(8,126,171,0.12)' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const [hover, setHover] = useState(false)
  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const background = useMotionTemplate`radial-gradient(380px circle at ${gx} ${gy}, ${glow}, transparent 65%)`

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduce) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
    setHover(false)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ background }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

/* ───────────── Magnetic hover (for CTAs) ───────────── */

export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduce) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────── Image that unmasks on scroll + gentle parallax ───────────── */

export function RevealImage({ className = '', imgClassName = '', parallax = 6, delay = 0, ...img }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full overflow-hidden rounded-[inherit]"
        initial={{ clipPath: 'inset(14% 10% 14% 10% round 2rem)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)', opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: EASE, delay: delay / 1000 }}
      >
        <motion.img
          {...img}
          style={reduce || !parallax ? undefined : { y }}
          initial={{ scale: 1.3 }}
          whileInView={{ scale: parallax ? 1.14 : 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.6, ease: EASE, delay: delay / 1000 }}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}

/* ───────────── Stagger groups ───────────── */

export function Stagger({ as = 'div', children, className = '', stagger = 0.09, delay = 0, ...props }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </Comp>
  )
}

export const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

export function StaggerItem({ as = 'div', children, className = '', ...props }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp className={className} variants={itemVariants} {...props}>
      {children}
    </Comp>
  )
}

/* ───────────── Infinite marquee ───────────── */

export function Marquee({ children, duration = 40, reverse = false, className = '' }) {
  return (
    <div className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}>
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {children}
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </span>
      </motion.div>
    </div>
  )
}

/* ───────────── Scroll progress bar ───────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-400 to-teal"
    />
  )
}

/* ───────────── Self-drawing SVG path ───────────── */

export function DrawPath({ d, className = '', delay = 0, duration = 1.1, strokeWidth = 3, viewBox, inView = false }) {
  const trigger = inView ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true } } : { animate: { pathLength: 1, opacity: 1 } }
  return (
    <svg aria-hidden="true" viewBox={viewBox} className={className} preserveAspectRatio="none" fill="none">
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        {...trigger}
        transition={{ duration, ease: EASE, delay }}
      />
    </svg>
  )
}

/* ───────────── Scroll-linked text: words brighten as you scroll ───────────── */

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

export function ScrollRevealText({ text, as = 'p', className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const Tag = as
  if (reduce) return <Tag className={className}>{text}</Tag>
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </ScrollWord>
        ))}
      </span>
    </Tag>
  )
}

/* ───────────── Ambient drifting blob ───────────── */

export function Blob({ className = '', duration = 18, range = 40 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, range, -range * 0.6, 0], y: [0, -range * 0.7, range * 0.5, 0], scale: [1, 1.08, 0.96, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
