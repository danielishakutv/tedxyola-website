import { siteConfig } from './siteConfig';

export interface PastEvent {
  year: string;
  title: string;
  date: string;
  tagline: string;
  summary: string;
  description: string;
  highlights: string[];
  images: string[];
  ctaLabel?: string;
  ctaLink?: string;
}

export const pastEvents: PastEvent[] = [
  {
    year: '2026',
    title: `${siteConfig.eventName} ${siteConfig.eventYear}`,
    date: siteConfig.eventDate || '2026',
    tagline: `${siteConfig.themeName} — ${siteConfig.themeTagline}`,
    summary: 'A new chapter focused on sparks that become movements across innovation, culture, and community.',
    description:
      'IGNITE spotlights ideas born from resilience, creativity, and collaboration in Yola and beyond. Expect bold stories from innovators, creatives, community builders, and technologists who are lighting the way forward.',
    highlights: [
      `Theme: ${siteConfig.themeName} — ${siteConfig.themeTagline}`,
      'Curated speaker lineup featuring voices from the North-East and across Nigeria',
      'Immersive performances and interactive experiences',
      'Focus on technology, creativity, climate resilience, and community impact',
    ],
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    ],
    ctaLabel: 'View Theme',
    ctaLink: '/event/theme',
  },
  {
    year: '2025',
    title: 'TEDxYola 2025',
    date: 'June 21st, 2025',
    tagline: 'AI, Culture and Change: Shaping Tomorrow\'s Narratives',
    summary: 'Exploring how cutting-edge technology, rich cultural heritage, and transformative ideas converge to shape the future.',
    description:
      'TEDxYola 2025 brought together visionaries at Fasnet Cinema in Yola to explore the powerful intersection of artificial intelligence, cultural heritage, and societal transformation. Through thought-provoking talks and powerful performances, the event spotlighted voices that challenge norms, inspire innovation, and foster community-driven change. From examining AI\'s impact on society to celebrating the preservation and evolution of culture, TEDxYola 2025 ignited dialogue and action around building a better tomorrow. Featuring experts in technology, development, arts, and social impact, the event demonstrated how diverse perspectives can drive meaningful progress in our rapidly evolving world.',
    highlights: [
      'Theme: AI, Culture and Change: Shaping Tomorrow\'s Narratives',
      'Venue: Fasnet Cinema, Yola, Adamawa',
      '6 inspiring speakers from technology, development, arts, and social impact',
      'Deep dive into AI\'s role in African development and digital governance',
      'Stories of resilience, peace-building, and community transformation',
      'Chess as a tool for empowerment in IDP camps',
      'Digital skills training and edtech innovation showcased',
      'Cross-cultural dialogue on heritage preservation and evolution',
    ],
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWcrTVaSVrS2n5HyLMS3VW6ymJi0jjYfV5Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV31dapUp_i7qbNzk-9psC_qX2KmCHB19CjA&s',
      'https://i.ytimg.com/vi/uqylnkSKsOs/maxresdefault.jpg',
    ],
    ctaLabel: 'View Event on TED.com',
    ctaLink: 'https://www.ted.com/tedx/events/62506',
  },
  {
    year: '2019',
    title: 'TEDxYola 2019',
    date: 'April 27th, 2019',
    tagline: 'Breaking Limiting Thoughts',
    summary: 'The first-ever TEDx event in Yola, featuring 10 speakers and 3 performances exploring ideas that challenge boundaries.',
    description:
      "TEDxYola 2019 marked a historic moment as Yola's first TEDx event, bringing together visionaries, innovators, and changemakers at the City Green Hotel. With the powerful theme 'Breaking Limiting Thoughts,' speakers challenged conventional thinking and shared transformative ideas spanning entrepreneurship, education, technology, and social impact. The event featured 10 compelling speakers and 3 captivating performances, creating an unforgettable experience that inspired attendees to question boundaries and embrace new possibilities.",
    highlights: [
      "Theme: Breaking Limiting Thoughts",
      'Venue: City Green Hotel, Yola',
      "First-ever TEDx event in Yola's history",
      '10 speakers sharing transformative ideas',
      '3 live performances blending culture and creativity',
      'Topics spanning entrepreneurship, education, technology, and social impact',
      'Community-powered organization by passionate volunteers',
      'Event started at 10:00 AM with energized attendees',
    ],
    images: [
      'https://pi.tedcdn.com/r/www.filepicker.io/api/file/hRbRM2hkSHeYMWLw3ipQ?quality=90&w=260',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    ],
    ctaLabel: 'View Event on TED.com',
    ctaLink: 'https://www.ted.com/tedx/events/31011',
  },
];
