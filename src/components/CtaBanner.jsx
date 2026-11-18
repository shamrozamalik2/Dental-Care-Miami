import { motion } from 'framer-motion'
import { Phone, CalendarCheck } from 'lucide-react'
import Button from './Button.jsx'
import { Blob, EASE, Magnetic, SplitText } from './motion.jsx'
import { site } from '../config/site.js'

export default function CtaBanner({
  title = 'Ready to take care of your smile?',
  text = 'Request an appointment online in under a minute, or call and speak with our team directly.',
}) {
  return (
    <section className="container-x py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
        className="relative overflow-hidden rounded-4xl bg-brand px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Blob className="-left-20 -top-24 h-80 w-80 bg-white/15" duration={14} range={50} />
          <Blob className="-bottom-32 -right-10 h-96 w-96 bg-teal/50" duration={18} range={70} />
          <motion.svg
            className="absolute right-8 top-8 h-24 w-24 text-white/10"
            viewBox="0 0 64 64"
            fill="currentColor"
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M32 18c-3-2.4-6.4-3.4-9.6-2.6-4.6 1.2-6.9 6-6 11.4.6 3.6 2.1 6.6 3 10.2.9 3.6 1 9.2 4 11.2 2.9 1.9 4.2-2.6 4.9-5.5.6-2.6 1.5-5.6 3.7-5.6s3.1 3 3.7 5.6c.7 2.9 2 7.4 4.9 5.5 3-2 3.1-7.6 4-11.2.9-3.6 2.4-6.6 3-10.2.9-5.4-1.4-10.2-6-11.4-3.2-.8-6.6.2-9.6 2.6z" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-10 left-10 h-14 w-14 text-white/10"
            viewBox="0 0 64 64"
            fill="currentColor"
            animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M32 18c-3-2.4-6.4-3.4-9.6-2.6-4.6 1.2-6.9 6-6 11.4.6 3.6 2.1 6.6 3 10.2.9 3.6 1 9.2 4 11.2 2.9 1.9 4.2-2.6 4.9-5.5.6-2.6 1.5-5.6 3.7-5.6s3.1 3 3.7 5.6c.7 2.9 2 7.4 4.9 5.5 3-2 3.1-7.6 4-11.2.9-3.6 2.4-6.6 3-10.2.9-5.4-1.4-10.2-6-11.4-3.2-.8-6.6.2-9.6 2.6z" />
          </motion.svg>
        </div>
        <div className="relative mx-auto max-w-2xl">
          <SplitText as="h2" inView text={title} delay={0.2} className="h-display text-[2.1rem] leading-[1.1] !text-white sm:text-5xl" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="mt-5 text-lg text-white/80"
          >
            {text}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button to="/book-appointment" variant="white" size="lg" className="w-full">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book an Appointment
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={site.phoneHref} variant="ghostLight" size="lg" className="w-full">
                <Phone className="h-5 w-5" aria-hidden="true" /> {site.phoneDisplay}
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
