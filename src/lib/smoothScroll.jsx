import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

/** Lenis inertia scrolling. Disabled automatically for users who prefer reduced motion. */
export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 })
    let id = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      id = requestAnimationFrame(raf)
    })
    setLenis(instance)
    return () => {
      cancelAnimationFrame(id)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scrolls to a y-position or element, via Lenis when active, otherwise natively. */
export function scrollToTarget(lenis, target, { offset = 0, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: immediate ? 0 : 1.3 })
    return
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}
