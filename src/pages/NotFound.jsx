import { Home, Phone } from 'lucide-react'
import Button from '../components/Button.jsx'
import { ToothMark } from '../components/Logo.jsx'
import { site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

export default function NotFound() {
  useSeo({ title: 'Page not found | Dental Care Miami LLC', description: 'The page you were looking for could not be found.' })
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <ToothMark className="mx-auto h-16 w-16 animate-float" />
        <p className="mt-8 font-display text-7xl font-semibold text-brand">404</p>
        <h1 className="h-display mt-4 text-3xl sm:text-4xl">We couldn’t find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-navy-500">The link may be broken or the page may have moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">
            <Home className="h-4 w-4" aria-hidden="true" /> Back to home
          </Button>
          <Button href={site.phoneHref} variant="outline">
            <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  )
}
