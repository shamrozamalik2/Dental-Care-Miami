import { AlertCircle } from 'lucide-react'

/** Label + control + error message, wired up for accessibility. */
export default function FormField({ id, label, required, optional, error, hint, className = '', children }) {
  const errId = `${id}-error`
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-navy">
        <span>
          {label}
          {required && <span className="ml-0.5 text-brand" aria-hidden="true">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-navy-300">Optional</span>}
      </label>
      {children({
        id,
        name: id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': error ? errId : undefined,
        'aria-required': required ? 'true' : undefined,
        className: `input ${error ? 'input-error' : ''}`,
      })}
      {error ? (
        <p id={errId} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      ) : (
        hint && <p className="mt-2 text-xs text-navy-500">{hint}</p>
      )}
    </div>
  )
}
