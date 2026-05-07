export interface Speaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  photo: string;
  talkTitle: string;
  talkSummary: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    instagram?: string;
  };
}

export const speakers: Speaker[] = [
  {
    id: 'speaker-1',
    name: 'Coming Soon',
    title: 'Tech Innovator & AI Researcher',
    company: 'FutureLabs Africa',
    photo: '/images/speakers/placeholder-1.jpg',
    talkTitle: 'The Next Wave: AI for African Solutions',
    talkSummary: 'Exploring how artificial intelligence can solve uniquely African challenges in healthcare, agriculture, and education.',
    bio: 'Dr. Amina Abdullahi is a leading voice in African tech innovation. With a PhD in Computer Science from MIT, she founded FutureLabs Africa to develop AI solutions tailored to the continent\'s needs.',
    socialLinks: {
      twitter: 'https://twitter.com/aminaabdullahi',
      linkedin: 'https://linkedin.com/in/aminaabdullahi',
    },
  },
  {
    id: 'speaker-2',
    name: 'Coming Soon',
    title: 'Social Entrepreneur',
    company: 'GreenPath Initiative',
    photo: '/images/speakers/placeholder-2.jpg',
    talkTitle: 'Building Sustainable Communities',
    talkSummary: 'How grassroots movements can drive environmental change and create lasting impact in local communities.',
    bio: 'Chidi Okonkwo is the founder of GreenPath Initiative, an organization that has planted over 1 million trees across Nigeria and empowered thousands of youth in environmental conservation.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/chidiokonkwo',
      website: 'https://greenpathng.org',
    },
  },
  {
    id: 'speaker-3',
    name: 'Coming Soon',
    title: 'Education Reformer',
    company: 'Learn Forward',
    photo: '/images/speakers/placeholder-3.jpg',
    talkTitle: 'Reimagining Education for Tomorrow',
    talkSummary: 'Why traditional education models are failing and how we can design learning experiences for the future.',
    bio: 'Fatima Hassan has dedicated her career to transforming education in Northern Nigeria. Her innovative teaching methods have reached over 50,000 students.',
    socialLinks: {
      twitter: 'https://twitter.com/fatimahassan',
      linkedin: 'https://linkedin.com/in/fatimahassan',
    },
  },
  {
    id: 'speaker-4',
    name: 'Coming Soon',
    title: 'Creative Director & Artist',
    company: 'Pixel Studios',
    photo: '/images/speakers/placeholder-4.jpg',
    talkTitle: 'Art as a Catalyst for Change',
    talkSummary: 'Discovering how creative expression can bridge divides and inspire collective action.',
    bio: 'Ibrahim Musa is an award-winning artist whose work has been featured in galleries across Africa and Europe. He uses art to tell stories of resilience and hope.',
    socialLinks: {
      instagram: 'https://instagram.com/ibrahimmusa',
      website: 'https://ibrahimmusa.art',
    },
  },
  {
    id: 'speaker-5',
    name: 'Coming Soon',
    title: 'Health Innovation Specialist',
    company: 'HealthTech Africa',
    photo: '/images/speakers/placeholder-5.jpg',
    talkTitle: 'Digital Health Revolution',
    talkSummary: 'How mobile technology is transforming healthcare delivery in remote communities.',
    bio: 'Dr. Ngozi Eze leads HealthTech Africa, a startup that has brought telemedicine services to over 200 rural communities across Nigeria.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ngozieze',
      twitter: 'https://twitter.com/drngozieze',
    },
  },
  {
    id: 'speaker-6',
    name: 'Coming Soon',
    title: 'Youth Advocate & Author',
    photo: '/images/speakers/placeholder-6.jpg',
    talkTitle: 'The Power of Youth Agency',
    talkSummary: 'Why giving young people real power—not just a seat at the table—is essential for progress.',
    bio: 'Yusuf Ahmed is a bestselling author and youth advocate who has spoken at over 100 schools and universities about civic engagement and leadership.',
    socialLinks: {
      twitter: 'https://twitter.com/yusufahmed',
      website: 'https://yusufahmed.com',
    },
  },
];
