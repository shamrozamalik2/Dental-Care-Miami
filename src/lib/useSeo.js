import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Sets per-page <title>, meta description, canonical and OG tags. */
export function useSeo({ title, description }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    if (SITE_URL) {
      setMeta('link[rel="canonical"]', 'href', SITE_URL + pathname)
      setMeta('meta[property="og:url"]', 'content', SITE_URL + pathname)
    }
  }, [title, description, pathname])
}
