import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ContactDetails from '../components/ContactDetails.jsx'
import ContactForm from '../components/ContactForm.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import HoursCard from '../components/HoursCard.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { CalendarCheck } from 'lucide-react'
import { useSeo } from '../lib/useSeo.js'

export default function Contact() {
  useSeo({
    title: 'Contact Us | Dental Care Miami LLC — 2772 NW 7th St, Miami, FL',
    description:
      'Contact Dental Care Miami LLC at 2772 NW 7th St, Miami, FL 33125. Call +1 844-817-0271, get directions, or send us a message online.',
  })
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact Us"
        title="We’re here to help"
        intro="Call us, send a message, or stop by our Miami clinic. The fastest way to reach us is by phone."
      />

      <section className="section !pt-12 sm:!pt-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Reveal className="card p-6 sm:p-8">
              <h2 className="h-display text-2xl">Get in touch</h2>
              <div className="mt-6">
                <ContactDetails />
              </div>
              <div className="mt-6 border-t border-navy/[0.06] pt-6">
                <Button to="/book-appointment" className="w-full">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book an Appointment
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <HoursCard id="hours" />
            </Reveal>
          </div>

          <Reveal className="card p-6 sm:p-10 lg:col-span-7">
            <h2 className="h-display text-3xl">Send us a message</h2>
            <p className="mt-2 text-navy-500">
              Have a question? Leave your details and we’ll get back to you. To book a visit, please use the{' '}
              <Link to="/book-appointment" className="font-semibold text-brand hover:underline">appointment form</Link>.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Map" className="container-x pb-20 sm:pb-24">
        <Reveal>
          <MapEmbed className="h-[420px] sm:h-[480px]" />
        </Reveal>
      </section>
    </>
  )
}
