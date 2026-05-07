export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Announcing TEDxYola 2026: IGNITE',
    excerpt: 'We\'re thrilled to unveil our 2026 theme—IGNITE. Expect bold talks, powerful performances, and ideas that spark real change in our communities.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    category: 'Announcement',
    date: 'January 5, 2026',
    author: 'TEDxYola Team',
    slug: 'announcing-tedxyola-2026-ignite'
  },
  {
    id: 2,
    title: 'Speaker Applications Now Open',
    excerpt: 'Have an idea worth spreading? We\'re looking for speakers who challenge norms and inspire action. Applications close February 15th.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    category: 'Opportunity',
    date: 'December 20, 2025',
    author: 'Curator Team',
    slug: 'speaker-applications-now-open'
  },
  {
    id: 3,
    title: 'Recap: TEDxYola 2025 Highlights',
    excerpt: 'From AI innovation to cultural storytelling, TEDxYola 2025 brought together 6 inspiring speakers and unforgettable moments. Relive the highlights.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWcrTVaSVrS2n5HyLMS3VW6ymJi0jjYfV5Q&s',
    category: 'Recap',
    date: 'July 15, 2025',
    author: 'Daniel Ishaku',
    slug: 'recap-tedxyola-2025-highlights'
  },
  {
    id: 4,
    title: 'Volunteer Opportunities for 2026',
    excerpt: 'Be part of the magic behind the scenes. Join our volunteer team and help bring TEDxYola 2026 to life. Multiple roles available.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    category: 'Community',
    date: 'December 10, 2025',
    author: 'Operations Team',
    slug: 'volunteer-opportunities-for-2026'
  },
  {
    id: 5,
    title: 'Meet Our 2026 Speakers (Coming Soon)',
    excerpt: 'We\'re in the final stages of curating an incredible lineup of voices for IGNITE. Stay tuned for the official speaker announcement.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    category: 'Update',
    date: 'January 2, 2026',
    author: 'Curator Team',
    slug: 'meet-our-2026-speakers-coming-soon'
  },
  {
    id: 6,
    title: 'Partnership Opportunities Available',
    excerpt: 'Looking to amplify your brand while supporting ideas that matter? Explore our sponsorship packages and become a TEDxYola partner.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    category: 'Partnership',
    date: 'November 30, 2025',
    author: 'Partnerships Team',
    slug: 'partnership-opportunities-available'
  }
];
