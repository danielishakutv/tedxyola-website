export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  event: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Amina Bello',
    role: 'Social Entrepreneur',
    image: 'https://ui-avatars.com/api/?name=Amina+Bello&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'TEDxYola opened my eyes to possibilities I never imagined. The talks were inspiring, and the connections I made have led to real collaborations in my community work.',
    event: 'TEDxYola 2025'
  },
  {
    id: 2,
    name: 'Ibrahim Musa',
    role: 'Tech Innovator',
    image: 'https://ui-avatars.com/api/?name=Ibrahim+Musa&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'The energy at TEDxYola is unmatched. Every talk was carefully curated, and I left with actionable ideas I implemented in my startup within weeks.',
    event: 'TEDxYola 2025'
  },
  {
    id: 3,
    name: 'Grace Adeyemi',
    role: 'Educator & Author',
    image: 'https://ui-avatars.com/api/?name=Grace+Adeyemi&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'TEDxYola isn\'t just an event—it\'s a movement. The ideas shared here have the power to transform communities, and the atmosphere encourages real dialogue and connection.',
    event: 'TEDxYola 2025'
  },
  {
    id: 4,
    name: 'Daniel Yusuf',
    role: 'Creative Director',
    image: 'https://ui-avatars.com/api/?name=Daniel+Yusuf&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'As a creative, I was blown away by the diversity of perspectives. From tech to culture to social impact—every talk gave me fresh inspiration for my work.',
    event: 'TEDxYola 2019'
  },
  {
    id: 5,
    name: 'Fatima Hassan',
    role: 'Policy Advocate',
    image: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'TEDxYola brings global conversations to Yola in a way that feels authentic and grounded. I met people I now work with on policy initiatives across the region.',
    event: 'TEDxYola 2025'
  },
  {
    id: 6,
    name: 'Michael Okoro',
    role: 'Student & Volunteer',
    image: 'https://ui-avatars.com/api/?name=Michael+Okoro&size=200&background=E62B1E&color=fff&bold=true',
    quote: 'Being part of TEDxYola as an attendee changed my perspective on what\'s possible in our community. The talks were short, powerful, and left me wanting to take action.',
    event: 'TEDxYola 2019'
  }
];
