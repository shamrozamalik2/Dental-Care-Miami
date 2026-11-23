/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — Miami Dental Clinic
 *  Edit this file to update business details across the whole site.
 *
 *  FROM THE GOOGLE BUSINESS PROFILE (may be outdated, verify with the clinic):
 *   - name, address, phone
 *   - rating 3.7 / 5 from 12 reviews
 *   - listed closing time 9 PM
 *   - review excerpts below
 *
 *  ⚠ PHONE: 239 is a Southwest Florida area code (Fort Myers / Naples),
 *    not a Miami one (305 / 786). Confirm this is the clinic's current number.
 *
 *  NOT DISPLAYED until verified:
 *   - dentist: an older review mentions "Dr. Sotomayor". Current association unconfirmed.
 *   - whatsapp / email: leave null unless the clinic confirms official ones.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Miami Dental Clinic',
  shortName: 'Miami Dental Clinic',
  phoneDisplay: '+1 239-499-6242',
  phoneHref: 'tel:+12394996242',
  email: null,
  whatsapp: null, // Only set if the clinic confirms it uses WhatsApp (digits only, e.g. '13055550123')
  dentist: null, // e.g. { name: 'Dr. …' } once the clinic confirms the current dentist(s)

  address: {
    street: '201 Northwest Dr',
    city: 'Miami',
    region: 'FL',
    postalCode: '33126',
    country: 'United States',
  },
  get addressOneLine() {
    const a = this.address
    return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`
  },

  mapsEmbedUrl: 'https://www.google.com/maps?q=Miami+Dental+Clinic,+201+Northwest+Dr,+Miami,+FL+33126&output=embed',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=201+Northwest+Dr,+Miami,+FL+33126',
  googleProfileUrl: 'https://www.google.com/maps/search/?api=1&query=Miami+Dental+Clinic+201+Northwest+Dr+Miami+FL+33126',

  /** Shown exactly as listed on Google. Update both numbers together. */
  rating: { value: 3.7, count: 12, source: 'Google' },

  /**
   * Opening hours. Set `verified: true` and fill `schedule` once the clinic confirms them.
   */
  hours: {
    verified: false,
    listedNote: 'Google lists a closing time of 9 PM.',
    pendingNote: 'Full opening hours are being confirmed, so please call before visiting.',
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
 * Proposed service categories, not yet confirmed by the clinic.
 * Descriptions explain what each type of care generally involves; they make no claims about outcomes.
 */
export const services = [
  {
    slug: 'general-dentistry',
    title: 'General Dentistry',
    icon: 'Stethoscope',
    image: '/images/general.webp',
    short: 'Everyday dental care and check-ups to help you look after your teeth and gums.',
    long: 'General dentistry covers routine examinations and the everyday care that supports your oral health. It’s also your chance to raise any concerns and ask questions.',
  },
  {
    slug: 'preventive-dental-care',
    title: 'Preventive Dental Care',
    icon: 'ShieldCheck',
    image: '/images/preventive.webp',
    short: 'Care focused on helping prevent dental problems before they start.',
    long: 'Preventive care focuses on regular check-ups and good daily habits. Ask the team for guidance on caring for your teeth between visits.',
  },
  {
    slug: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    icon: 'Sparkles',
    image: '/images/cleaning.webp',
    short: 'Professional cleanings to remove plaque and tartar that brushing can miss.',
    long: 'A professional cleaning removes plaque and tartar build-up. It’s a good time to ask for tips on improving your at-home routine.',
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    icon: 'Smile',
    image: '/images/cosmetic.webp',
    short: 'Options focused on the appearance of your smile, discussed one-on-one.',
    long: 'Cosmetic dentistry focuses on how your smile looks. Talk with the team about your goals and which options may be suitable for you.',
  },
  {
    slug: 'orthodontics',
    title: 'Orthodontics',
    icon: 'Ruler',
    image: '/images/orthodontics.webp',
    short: 'Information on options for straightening teeth and improving alignment.',
    long: 'Orthodontics deals with the alignment of teeth and bite. Ask about the options available and whether they may be right for you.',
  },
  {
    slug: 'braces-consultation',
    title: 'Braces Consultation',
    icon: 'MessagesSquare',
    image: '/images/braces.webp',
    short: 'Talk through whether braces could be right for you or your child.',
    long: 'A braces consultation is a chance to discuss concerns about alignment, ask questions, and understand possible next steps before making any decisions.',
  },
  {
    slug: 'tooth-extractions',
    title: 'Tooth Extractions',
    icon: 'Syringe',
    image: '/images/extractions.webp',
    short: 'When a tooth can’t be saved, extraction may be recommended after an examination.',
    long: 'Extraction may be recommended for a tooth that is badly damaged or causing problems. The team will explain the process and aftercare so you know what to expect.',
  },
  {
    slug: 'emergency-dental-consultations',
    title: 'Emergency Dental Consultations',
    icon: 'Siren',
    image: '/images/emergency.webp',
    short: 'Sudden tooth pain or a dental injury? Call us to discuss being seen.',
    long: 'Toothaches, broken teeth or a lost filling can be stressful. Call the office directly so the team can talk through your situation and next steps.',
  },
]

/**
 * Excerpts from Google reviews. Only real text belongs here.
 * Review dates vary, so they are not presented as recent.
 */
export const reviews = [
  { id: 'r1', excerpt: 'I know I’m in good hands every time I visit this office.' },
  { id: 'r2', excerpt: 'Good place for dental work.' },
  { id: 'r3', excerpt: 'God bless and keep up the good work.' },
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]
