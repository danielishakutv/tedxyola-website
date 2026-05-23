export type ActivityPhase = 'pre-event' | 'main-event' | 'post-event';

export type ActivityStatus = 'announced' | 'open' | 'closed' | 'past';

export interface ActivityGoogleForm {
  actionUrl: string;
  fields: {
    fullname: string;
    phone: string;
    email: string;
  };
  hidden?: Record<string, string>;
}

export interface Activity {
  id: string;
  title: string;
  tagline: string;
  phase: ActivityPhase;
  date: string;
  time?: string;
  venue: string;
  city: string;
  thumbnail: string;
  description: string;
  highlights: string[];
  capacity?: string;
  status: ActivityStatus;
  /** When true, ticket sales are closed — the form collects details for follow-up instead of redirecting to checkout. */
  soldOut?: boolean;
  ticketPrice?: string;
  originalPrice?: string;
  ticketHref?: string;
  detailsHref?: string;
  ctaLabel?: string;
  ctaLink?: string;
  poweredBy?: string;
  googleForm?: ActivityGoogleForm;
}

export const activities: Activity[] = [
  {
    id: 'sip-n-paint',
    title: "Sip 'n Paint",
    tagline: 'Paint Your Thoughts',
    phase: 'pre-event',
    date: 'Saturday, 23rd May 2026',
    time: '4:00 PM Prompt',
    venue: 'Toko Academy, Bekaji Main Road, Jimeta, Yola',
    city: 'Yola, Adamawa',
    thumbnail:
      '/images/activities/snp_thumbnail.svg',
    description:
      "An IGNITE pre-event where art meets ideas. Bring your curiosity, paint your thoughts onto canvas, and meet the TEDxYola community over light refreshments, karaoke, and networking — no painting experience required.",
    highlights: [
      'Painting materials provided',
      'Light refreshments',
      'Karaoke & networking',
      'Access to the TEDxYola Creative Experience',
    ],
    capacity: 'Seating is limited and strictly by registration',
    status: 'open',
    soldOut: true,
    ticketPrice: '₦5,000',
    originalPrice: '₦8,500',
    ticketHref: 'https://selar.com/y77699111h',
    detailsHref: '/snp',
    poweredBy: 'Toko Academy Ltd.',
    googleForm: {
      actionUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSfPZDuA3A7cButLXd3MB8bV8d00IqClIEXZvwsUD7sMfayrLg/formResponse',
      fields: {
        fullname: 'entry.1490570247',
        phone: 'entry.263556657',
        email: 'entry.675258623',
      },
      hidden: {
        fvv: '1',
        fbzx: '-1304986757629354313',
        pageHistory: '0',
      },
    },
  },
  {
    id: 'campus-micro-chats-mau',
    title: 'Campus Micro Chats — M.A.U.',
    tagline: 'Bite-sized TEDx conversations on campus',
    phase: 'pre-event',
    date: 'Coming Soon',
    venue: 'Modibbo Adama University (M.A.U.)',
    city: 'Yola, Adamawa',
    thumbnail:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    description:
      'A roving series of short, candid conversations with students at Modibbo Adama University. Campus Micro Chats brings TEDxYola voices, alumni, and changemakers directly to lecture halls, courtyards, and student lounges for unfiltered, idea-driven exchanges in the lead-up to IGNITE.',
    highlights: [
      'Open to all M.A.U. students — free entry with a valid ID',
      'Live Q&A with TEDxYola speakers and alumni',
      'Mini-talks on innovation, culture, and student life',
      'TEDxYola merch giveaways and surprise drops',
      'A direct path for student voices into the IGNITE main stage',
    ],
    status: 'announced',
    ctaLabel: 'Get Updates',
    ctaLink: '/contact',
  },
];
