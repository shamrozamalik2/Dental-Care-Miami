import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap'

const variants = {
  primary:
    'bg-brand text-white shadow-[0_8px_24px_-8px_rgba(8,127,181,0.7)] hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(8,127,181,0.8)]',
  accent: 'bg-teal text-white shadow-[0_8px_24px_-8px_rgba(22,184,166,0.7)] hover:bg-teal-600 hover:-translate-y-0.5',
  outline: 'border border-navy/15 bg-white text-navy hover:border-brand hover:text-brand hover:-translate-y-0.5',
  ghostLight: 'border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20',
  white: 'bg-white text-brand-700 hover:-translate-y-0.5 hover:shadow-lift',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-7 py-4 text-base',
}

/**
 * Renders a router <Link> for internal paths, <a> for tel:/mailto:/http,
 * or a <button> when neither `to` nor `href` is passed.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
