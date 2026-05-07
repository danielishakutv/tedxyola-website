export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  type: 'talk' | 'performance' | 'break' | 'networking' | 'opening' | 'closing';
  description: string;
  speaker?: string;
  duration: string;
}

export const program: ProgramItem[] = [
  {
    id: 'item-1',
    time: '09:00 AM',
    title: 'Registration & Networking',
    type: 'networking',
    description: 'Check-in, receive your badge, and connect with fellow attendees over light refreshments.',
    duration: '30 minutes',
  },
  {
    id: 'item-2',
    time: '09:30 AM',
    title: 'Opening Ceremony',
    type: 'opening',
    description: 'Welcome address by the TEDxYola organizing team and a special performance to set the stage.',
    duration: '30 minutes',
  },
  {
    id: 'item-3',
    time: '10:00 AM',
    title: 'The Next Wave: AI for African Solutions',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'Exploring how artificial intelligence can solve uniquely African challenges.',
    duration: '18 minutes',
  },
  {
    id: 'item-4',
    time: '10:20 AM',
    title: 'Building Sustainable Communities',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'How grassroots movements can drive environmental change and create lasting impact.',
    duration: '18 minutes',
  },
  {
    id: 'item-5',
    time: '10:40 AM',
    title: 'Creative Performance',
    type: 'performance',
    description: 'An inspiring dance performance celebrating African culture and innovation.',
    duration: '10 minutes',
  },
  {
    id: 'item-6',
    time: '10:50 AM',
    title: 'Morning Break',
    type: 'break',
    description: 'Coffee, tea, and networking opportunities.',
    duration: '20 minutes',
  },
  {
    id: 'item-7',
    time: '11:10 AM',
    title: 'Reimagining Education for Tomorrow',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'Why traditional education models are failing and how we can design learning for the future.',
    duration: '18 minutes',
  },
  {
    id: 'item-8',
    time: '11:30 AM',
    title: 'Art as a Catalyst for Change',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'Discovering how creative expression can bridge divides and inspire collective action.',
    duration: '18 minutes',
  },
  {
    id: 'item-9',
    time: '11:50 AM',
    title: 'Digital Health Revolution',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'How mobile technology is transforming healthcare delivery in remote communities.',
    duration: '18 minutes',
  },
  {
    id: 'item-10',
    time: '12:10 PM',
    title: 'Lunch & Networking',
    type: 'break',
    description: 'Enjoy a delicious lunch while connecting with speakers and attendees.',
    duration: '50 minutes',
  },
  {
    id: 'item-11',
    time: '01:00 PM',
    title: 'The Power of Youth Agency',
    type: 'talk',
    speaker: 'Coming Soon',
    description: 'Why giving young people real power is essential for progress.',
    duration: '18 minutes',
  },
  {
    id: 'item-12',
    time: '01:20 PM',
    title: 'Panel Discussion',
    type: 'networking',
    description: 'All speakers join for an interactive Q&A session with the audience.',
    duration: '40 minutes',
  },
  {
    id: 'item-13',
    time: '02:20 PM',
    title: 'Closing Ceremony',
    type: 'closing',
    description: 'Final remarks, thank you to sponsors, and closing performance.',
    duration: '30 minutes',
  },
  {
    id: 'item-14',
    time: '02:50 PM',
    title: 'Post-Event Networking',
    type: 'networking',
    description: 'Continue the conversations and build lasting connections.',
    duration: '10 minutes',
  },
];
