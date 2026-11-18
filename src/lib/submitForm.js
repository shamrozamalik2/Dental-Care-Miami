const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

/** True when a real form endpoint is configured (see .env.example). */
export const formsAreLive = Boolean(ENDPOINT)

/**
 * Sends form data as JSON to VITE_FORM_ENDPOINT.
 * Without an endpoint, resolves after a short delay so the UI flow can be
 * previewed — nothing is transmitted. Configure the endpoint before launch.
 */
export async function submitForm(formName, data) {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) console.info(`[${formName}] (no endpoint configured)`, data)
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, simulated: true }
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ form: formName, submittedAt: new Date().toISOString(), ...data }),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
  return { ok: true, simulated: false }
}
