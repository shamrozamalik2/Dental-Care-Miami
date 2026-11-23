import { Stethoscope, ShieldCheck, Sparkles, Smile, Ruler, MessagesSquare, Syringe, Siren, Circle } from 'lucide-react'

const icons = { Stethoscope, ShieldCheck, Sparkles, Smile, Ruler, MessagesSquare, Syringe, Siren }

export default function ServiceIcon({ name, className = 'h-6 w-6' }) {
  const Icon = icons[name] || Circle
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />
}
