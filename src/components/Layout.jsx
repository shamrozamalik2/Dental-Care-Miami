import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MobileCallBar from './MobileCallBar.jsx'
import { ScrollProgress, EASE } from './motion.jsx'
import { SmoothScroll, useLenis, scrollToTarget } from '../lib/smoothScroll.jsx'

// Sticky header height (+ breathing room). Includes the 16px the header shrinks by once scrolled.
const HEADER_OFFSET = -126

function Shell() {
  const location = useLocation()
  const outlet = useOutlet()
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

  // Scroll to #hash targets. The element may not exist until the next page
  // finishes its enter transition, so poll briefly for it.
  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    let frame
    let timer
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (!el) {
        if (tries++ < 90) frame = requestAnimationFrame(tick)
        return
      }
      // If we had to wait for a new page, let its enter transition settle first so the position is exact.
      timer = setTimeout(() => scrollToTarget(lenisRef.current, el, { offset: HEADER_OFFSET }), tries ? 550 : 0)
    }
    tick()
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [location.key, location.hash])

  // Intercept same-page "#anchor" link clicks so they glide via Lenis.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#main') return
      const el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))
      if (!el) return
      e.preventDefault()
      history.replaceState(null, '', a.getAttribute('href'))
      scrollToTarget(lenisRef.current, el, { offset: HEADER_OFFSET })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => scrollToTarget(lenisRef.current, 0, { immediate: true })}
      >
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.28, ease: 'easeIn' } }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileCallBar />
    </>
  )
}

export default function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Shell />
      </SmoothScroll>
    </MotionConfig>
  )
}
