import { Stethoscope, Siren, Syringe, ScanFace, Sparkles, Smile, Sun, MessagesSquare, Circle } from 'lucide-react'

const icons = { Stethoscope, Siren, Syringe, ScanFace, Sparkles, Smile, Sun, MessagesSquare }

export default function ServiceIcon({ name, className = 'h-6 w-6' }) {
  const Icon = icons[name] || Circle
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />
}
