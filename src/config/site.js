/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — Dental Care Miami LLC
 *  Edit this file to update business details across the site.
 *
 *  VERIFIED (from Google Business Profile): name, address, phone,
 *  rating (5.0 from 2 reviews), review #1 text.
 *
 *  NOT YET VERIFIED — confirm with the clinic before launch:
 *   - hours            (Google lists "Open 24 hours")
 *   - services         (proposed categories only)
 *   - review #2 exact wording (currently a summary)
 *   - whatsapp         (leave null unless an official number exists)
 *   - email            (leave null unless an official address exists)
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Dental Care Miami LLC',
  shortName: 'Dental Care Miami',
  phoneDisplay: '+1 844-817-0271',
  phoneHref: 'tel:+18448170271',
  email: null, // e.g. 'hello@clinic.com' once confirmed
  whatsapp: null, // e.g. '18448170271' (digits only) once an official WhatsApp number is confirmed

  address: {
    street: '2772 NW 7th St',
    city: 'Miami',
    region: 'FL',
    postalCode: '33125',
    country: 'United States',
  },
  get addressOneLine() {
    const a = this.address
    return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`
  },

  mapsEmbedUrl:
    'https://www.google.com/maps?q=Dental+Care+Miami+LLC,+2772+NW+7th+St,+Miami,+FL+33125&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=2772+NW+7th+St,+Miami,+FL+33125',
  googleProfileUrl:
    'https://www.google.com/maps/search/?api=1&query=Dental+Care+Miami+LLC+2772+NW+7th+St+Miami+FL+33125',

  rating: { value: 5.0, count: 2, source: 'Google' },

  /**
   * Opening hours.
   * Set `verified: true` and fill `schedule` once the clinic confirms.
   */
  hours: {
    verified: false,
    listedNote: 'Google Maps currently lists this location as open 24 hours.',
    pendingNote: 'Please call ahead to confirm availability before visiting.',
    schedule: [
      { day: 'Monday', time: 'To be confirmed' },
      { day: 'Tuesday', time: 'To be confirmed' },
      { day: 'Wednesday', time: 'To be confirmed' },
      { day: 'Thursday', time: 'To be confirmed' },
      { day: 'Friday', time: 'To be confirmed' },
      { day: 'Saturday', time: 'To be confirmed' },
      { day: 'Sunday', time: 'To be confirmed' },
    ],
  },

  /** Set to true once the clinic confirms the list of services below. */
  servicesConfirmed: false,
}

/**
 * Proposed service categories — descriptions are general explanations of
 * each service type, not claims about outcomes. Edit / remove as needed.
 */
export const services = [
  {
    slug: 'general-dentistry',
    title: 'General Dentistry',
    icon: 'Stethoscope',
    image: '/images/dental-exam.webp',
    short: 'Routine check-ups and everyday dental care to help keep your teeth and gums healthy.',
    long: 'General dentistry covers routine examinations and the everyday care that supports long-term oral health. Your visit is a chance to ask questions and talk through any concerns with the team.',
  },
  {
    slug: 'emergency-dental-care',
    title: 'Emergency Dental Care',
    icon: 'Siren',
    image: '/images/dentist-tools.webp',
    short: 'Dealing with sudden tooth pain or a dental injury? Call us to discuss being seen.',
    long: 'Toothaches, a chipped or broken tooth, or a lost filling can’t always wait. Call the clinic directly so the team can talk through your situation and next steps.',
    featured: true,
  },
  {
    slug: 'tooth-extractions',
    title: 'Tooth Extractions',
    icon: 'Syringe',
    image: '/images/treatment.webp',
    short: 'When a tooth can’t be saved, extraction may be recommended after an examination.',
    long: 'Extraction may be recommended for a tooth that is severely damaged or causing problems. The team will explain the process, what to expect, and aftercare so you feel prepared.',
  },
  {
    slug: 'wisdom-tooth-extraction',
    title: 'Wisdom Tooth Extraction',
    icon: 'ScanFace',
    image: '/images/xray-review.webp',
    short: 'Evaluation and removal of wisdom teeth that are impacted or causing discomfort.',
    long: 'Wisdom teeth can sometimes become impacted or crowd neighboring teeth. After an evaluation, the team will discuss whether removal is right for you and how to prepare.',
    featured: true,
  },
  {
    slug: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    icon: 'Sparkles',
    image: '/images/oral-care.webp',
    short: 'Professional cleanings to remove plaque and tartar that brushing alone can miss.',
    long: 'Professional cleanings remove plaque and tartar build-up and are a good opportunity to get personalized tips for your at-home routine.',
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    icon: 'Smile',
    image: '/images/smile.webp',
    short: 'Options focused on the appearance of your smile, discussed during a consultation.',
    long: 'Cosmetic dentistry focuses on how your smile looks. Talk with the team about your goals and the options that may be suitable for you.',
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    icon: 'Sun',
    image: '/images/smile.webp',
    short: 'Professional whitening options to help brighten the look of your smile.',
    long: 'Ask about professional whitening options and whether whitening is a good fit for your teeth.',
  },
  {
    slug: 'dental-consultations',
    title: 'Dental Consultations',
    icon: 'MessagesSquare',
    image: '/images/digital-scan.webp',
    short: 'Sit down with the team to discuss concerns, questions, and your treatment options.',
    long: 'Not sure what you need? A consultation is a straightforward way to discuss your concerns, ask questions, and understand your options before deciding on next steps.',
    featured: true,
  },
]

/**
 * Google reviews. Only real reviews belong here.
 * `quote` = exact review text. If only a summary is available, leave `quote`
 * null and fill `summary`; it will be displayed as a summary, not a quote.
 */
export const reviews = [
  {
    id: 'review-1',
    author: 'Google reviewer',
    rating: 5,
    quote:
      'Great service and a professional team! Friendly staff, excellent communication, and a smooth experience. Highly recommend Dental Care Miami LLC!',
    summary: null,
    tag: 'Overall experience',
  },
  {
    id: 'review-2',
    author: 'Google reviewer',
    rating: 5,
    quote: null, // TODO: paste exact review text from Google here
    summary:
      'Described an excellent wisdom tooth extraction experience, with friendly staff and professional service.',
    tag: 'Wisdom tooth extraction',
  },
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]
