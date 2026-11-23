import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { EASE } from './motion.jsx'

/* ───────────── Intro curtain (first visit per session) ───────────── */
function shouldShowIntro() {
  try {
    if (sessionStorage.getItem('mdc-intro')) return false
    sessionStorage.setItem('mdc-intro', '1')
  } catch {
    /* storage blocked: still show once */
  }
  return true
}

export function Preloader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => !reduce && shouldShowIntro())

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 1900)
    return () => clearTimeout(t)
  }, [show])

  const word = 'Miami Dental Clinic'.split(' ')
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/40 blur-[120px]" />
            <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-teal/30 blur-[120px]" />
          </div>
          <div className="relative text-center">
            <motion.svg
              viewBox="0 0 48 48"
              className="mx-auto h-16 w-16 text-teal"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <motion.path
                d="M24 9c-3-2.6-7.6-3.4-10.6-1.2-3.6 2.6-3.8 8-2.4 12.6 1.2 4 1.6 8 2 12.4.4 4.4 1.4 8.2 3.6 8.2 2.6 0 3-4.6 3.6-8.4.4-2.6 1.6-4.6 3.8-4.6s3.4 2 3.8 4.6c.6 3.8 1 8.4 3.6 8.4 2.2 0 3.2-3.8 3.6-8.2.4-4.4.8-8.4 2-12.4 1.4-4.6 1.2-10-2.4-12.6C31.6 5.6 27 6.4 24 9Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.svg>
            <p className="mt-6 flex gap-3 overflow-hidden font-display text-3xl text-white sm:text-5xl">
              {word.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.1 }}
                  className={i === 1 ? 'italic text-teal' : ''}
                >
                  {w}
                </motion.span>
              ))}
            </p>
            <motion.div
              className="mx-auto mt-8 h-px w-48 origin-left bg-white/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────── Custom cursor (fine pointers only) ───────────── */
export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ hover: false, label: '', hidden: true, dark: false })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })

  useEffect(() => {
    if (reduce) return
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest?.('[data-cursor], a, button, select, input, textarea, label')
      const label = t?.getAttribute?.('data-cursor') || ''
      setState((s) => {
        const next = { hover: !!t, label, hidden: false, dark: false }
        return s.hover === next.hover && s.label === next.label && !s.hidden ? s : next
      })
    }
    const leave = () => setState((s) => ({ ...s, hidden: true }))
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const big = !!state.label
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-brand mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: state.hidden || big ? 0 : 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full border"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: big ? 96 : state.hover ? 56 : 34,
          height: big ? 96 : state.hover ? 56 : 34,
          opacity: state.hidden ? 0 : 1,
          backgroundColor: big ? 'rgba(32,184,176,0.95)' : state.hover ? 'rgba(8,126,171,0.12)' : 'rgba(8,126,171,0)',
          borderColor: big ? 'rgba(32,184,176,0)' : 'rgba(8,126,171,0.45)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {big && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

/* ───────────── Film grain ───────────── */
export function Grain() {
  return <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[85]" />
}
