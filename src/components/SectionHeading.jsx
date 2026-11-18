import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, intro, align = 'center', light = false }) {
  const center = align === 'center'
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className={`eyebrow ${light ? '!bg-white/10 !text-white' : ''}`}>{eyebrow}</span>}
      <h2 className={`h-display mt-5 text-[2.1rem] leading-[1.1] sm:text-5xl ${light ? '!text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/75' : 'text-navy-500'}`}>{intro}</p>}
    </Reveal>
  )
}
