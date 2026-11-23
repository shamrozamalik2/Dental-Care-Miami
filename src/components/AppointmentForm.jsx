import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CalendarCheck, Loader2, Lock, AlertCircle } from 'lucide-react'
import FormField from './FormField.jsx'
import FormSuccess from './FormSuccess.jsx'
import { services, site } from '../config/site.js'
import { submitForm } from '../lib/submitForm.js'
import { isEmail, isPhone, todayISO, validate } from '../lib/validation.js'

const TIME_SLOTS = ['Morning (8am – 12pm)', 'Afternoon (12pm – 4pm)', 'Evening (after 4pm)', 'Any time']

const rules = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
  phone: (v) => (!v.trim() ? 'Please enter a phone number.' : !isPhone(v) ? 'Please enter a valid phone number.' : ''),
  email: (v) => (v.trim() && !isEmail(v) ? 'Please enter a valid email address.' : ''),
  date: (v) => (!v ? 'Please choose a preferred date.' : v < todayISO() ? 'Please choose today or a future date.' : ''),
  time: (v) => (!v ? 'Please choose a preferred time.' : ''),
  service: (v) => (!v ? 'Please select a service.' : ''),
  message: (v) => (v.length > 1000 ? 'Please keep your message under 1000 characters.' : ''),
}

export default function AppointmentForm({ compact = false }) {
  const [params] = useSearchParams()
  const preselect = services.find((s) => s.slug === params.get('service'))?.title ?? ''
  const dateParam = params.get('date') ?? ''
  const predate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam) && dateParam >= todayISO() ? dateParam : ''
  // Optional concern carried over from the home page "What brings you in?" picker.
  const prenote = (params.get('note') ?? '').slice(0, 200)
  const empty = { name: '', phone: '', email: '', date: predate, time: '', service: preselect, message: prenote, company: '' }

  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const update = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: rules[name]?.(value, next) || undefined }))
  }
  const blur = (e) => {
    const { name, value } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: rules[name]?.(value, values) || undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.company) return // honeypot: silently drop bots
    const errs = validate(values, rules)
    setErrors(errs)
    setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])))
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    setStatus('sending')
    try {
      const { company, ...payload } = values
      await submitForm('appointment-request', payload)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <FormSuccess
        title="Request received"
        resetLabel="Submit another request"
        onReset={() => {
          setValues(empty)
          setErrors({})
          setTouched({})
          setStatus('idle')
        }}
      >
        <p>
          Thank you, {values.name.split(' ')[0]}. Your appointment <strong className="text-navy">request</strong> for{' '}
          <strong className="text-navy">{values.service}</strong> has been submitted.
        </p>
        <p className="mt-3">
          <strong className="text-navy">This is not yet a confirmed appointment.</strong> The clinic will contact you at{' '}
          {values.phone} to confirm availability, date and time.
        </p>
      </FormSuccess>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Appointment request form">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Patient Name" required error={errors.name}>
          {(p) => <input {...p} type="text" autoComplete="name" placeholder="Jane Doe" value={values.name} onChange={update} onBlur={blur} />}
        </FormField>
        <FormField id="phone" label="Phone Number" required error={errors.phone}>
          {(p) => (
            <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="(305) 555-0123" value={values.phone} onChange={update} onBlur={blur} />
          )}
        </FormField>
        <FormField id="email" label="Email" optional error={errors.email} className="sm:col-span-2">
          {(p) => <input {...p} type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={update} onBlur={blur} />}
        </FormField>
        <FormField id="date" label="Preferred Date" required error={errors.date}>
          {(p) => <input {...p} type="date" min={todayISO()} value={values.date} onChange={update} onBlur={blur} />}
        </FormField>
        <FormField id="time" label="Preferred Time" required error={errors.time}>
          {(p) => (
            <select {...p} value={values.time} onChange={update} onBlur={blur}>
              <option value="">Select a time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id="service" label="Dental Service" required error={errors.service} className="sm:col-span-2">
          {(p) => (
            <select {...p} value={values.service} onChange={update} onBlur={blur}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
              <option>Not sure / Other</option>
            </select>
          )}
        </FormField>
        <FormField id="message" label="Additional Message" optional error={errors.message} className="sm:col-span-2">
          {(p) => (
            <textarea
              {...p}
              rows={compact ? 3 : 4}
              placeholder="Tell us briefly about your concern or any questions."
              value={values.message}
              onChange={update}
              onBlur={blur}
            />
          )}
        </FormField>

        {/* Honeypot (hidden from people) */}
        <div className="hidden" aria-hidden="true">
          <label>
            Company <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
          </label>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 flex gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Sorry, we couldn’t send your request. Please try again or call us at {site.phoneDisplay}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(8,126,171,0.8)] transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending request…
          </>
        ) : (
          <>
            <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request Appointment
          </>
        )}
      </button>
      <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs text-navy-500">
        <Lock className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        This is a request only — the clinic will contact you to confirm your appointment. Please don’t include
        sensitive medical details.
      </p>
    </form>
  )
}
