import { Phone, ClipboardList, PhoneCall, Smile, Siren } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import AppointmentForm from '../components/AppointmentForm.jsx'
import HoursCard from '../components/HoursCard.jsx'
import GoogleRating from '../components/GoogleRating.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../config/site.js'
import { useSeo } from '../lib/useSeo.js'

const steps = [
  { icon: ClipboardList, title: 'Submit your request', text: 'Tell us when you’d like to come in and what you need.' },
  { icon: PhoneCall, title: 'We’ll call to confirm', text: 'The clinic will contact you to confirm a date and time.' },
  { icon: Smile, title: 'See you soon', text: `Visit us at ${site.address.street}, Miami.` },
]

export default function BookAppointment() {
  useSeo({
    title: 'Book an Appointment | Dental Care Miami LLC — Miami, FL',
    description:
      'Request a dental appointment online with Dental Care Miami LLC in Miami, FL. Choose your preferred date, time and service — the clinic will call to confirm.',
  })
  return (
    <>
      <PageHero
        crumb="Book an Appointment"
        eyebrow="Appointments"
        title="Request an appointment"
        intro="Share a few details and your preferred time. Our team will contact you to confirm — it only takes a minute."
      >
        <GoogleRating variant="inline" />
      </PageHero>

      <section className="section !pt-12 sm:!pt-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="card p-6 sm:p-10 lg:col-span-7">
            <h2 className="h-display text-3xl">Your details</h2>
            <p className="mt-2 text-navy-500">
              Fields marked <span className="text-brand">*</span> are required.
            </p>
            <div className="mt-8">
              <AppointmentForm />
            </div>
          </Reveal>

          <aside className="space-y-6 lg:col-span-5">
            <Reveal className="flex gap-4 rounded-3xl border border-red-100 bg-red-50/70 p-6">
              <Siren className="h-6 w-6 shrink-0 text-red-500" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Urgent dental problem?</h2>
                <p className="mt-1 text-sm text-navy-500">Please call instead of using the form so we can respond faster.</p>
                <a href={site.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal className="card p-7 sm:p-8">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="relative flex gap-4">
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="absolute left-5 top-12 h-[calc(100%-1.5rem)] border-l-2 border-dashed border-brand-100" />
                    )}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="mt-0.5 block text-sm text-navy-500">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <HoursCard />
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
