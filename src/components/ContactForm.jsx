import { useState } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import FormField from './FormField.jsx'
import FormSuccess from './FormSuccess.jsx'
import { site } from '../config/site.js'
import { submitForm } from '../lib/submitForm.js'
import { isEmail, isPhone, validate } from '../lib/validation.js'

const rules = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name.' : ''),
  phone: (v, all) =>
    !v.trim() && !all.email.trim()
      ? 'Please enter a phone number or email so we can reply.'
      : v.trim() && !isPhone(v)
        ? 'Please enter a valid phone number.'
        : '',
  email: (v) => (v.trim() && !isEmail(v) ? 'Please enter a valid email address.' : ''),
  message: (v) =>
    v.trim().length < 5 ? 'Please enter a short message.' : v.length > 1500 ? 'Please keep it under 1500 characters.' : '',
}

export default function ContactForm() {
  const empty = { name: '', phone: '', email: '', message: '', company: '' }
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (Object.keys(errors).length) setErrors(validate(next, rules))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.company) return
    const errs = validate(values, rules)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const { company, ...payload } = values
      await submitForm('contact-message', payload)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <FormSuccess
        title="Message received"
        resetLabel="Send another message"
        onReset={() => {
          setValues(empty)
          setStatus('idle')
        }}
      >
        <p>Thanks for reaching out. The team will get back to you as soon as possible.</p>
      </FormSuccess>
    )
  }

  // Field ids are prefixed "c-" so they never clash with the appointment form; `name` is overridden per input.
  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="c-name" label="Your Name" required error={errors.name} className="sm:col-span-2">
          {(p) => <input {...p} name="name" type="text" autoComplete="name" value={values.name} onChange={update} />}
        </FormField>
        <FormField id="c-phone" label="Phone" error={errors.phone}>
          {(p) => <input {...p} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={update} />}
        </FormField>
        <FormField id="c-email" label="Email" error={errors.email}>
          {(p) => <input {...p} name="email" type="email" autoComplete="email" value={values.email} onChange={update} />}
        </FormField>
        <FormField id="c-message" label="Message" required error={errors.message} className="sm:col-span-2">
          {(p) => <textarea {...p} name="message" rows={5} value={values.message} onChange={update} placeholder="How can we help?" />}
        </FormField>
        <div className="hidden" aria-hidden="true">
          <input name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 flex gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Sorry, your message couldn’t be sent. Please try again or call {site.phoneDisplay}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-navy-700 disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" /> Send Message
          </>
        )}
      </button>
    </form>
  )
}
