export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v) => {
  const digits = v.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}
export const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

/** Runs a map of { field: (value, all) => errorMessage | '' } validators. */
export function validate(values, rules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const msg = rule(values[field] ?? '', values)
    if (msg) errors[field] = msg
  }
  return errors
}
