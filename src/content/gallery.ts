export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'event' | 'speakers' | 'venue' | 'audience' | 'performance';
  year?: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'img-1',
    src: '/images/gallery/alvin.jpg',
    alt: 'Alvin - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-2',
    src: '/images/gallery/amy.jpg',
    alt: 'Amy - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-3',
    src: '/images/gallery/daniel.jpg',
    alt: 'Daniel - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-4',
    src: '/images/gallery/danjuma.jpg',
    alt: 'Danjuma - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-5',
    src: '/images/gallery/galaxy.jpg',
    alt: 'Galaxy - TEDxYola',
    category: 'event',
    year: 2025,
  },
  {
    id: 'img-6',
    src: '/images/gallery/hauwa.jpg',
    alt: 'Hauwa - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-7',
    src: '/images/gallery/prof.jpg',
    alt: 'Prof - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-8',
    src: '/images/gallery/speakers.jpg',
    alt: 'Speakers at TEDxYola',
    category: 'speakers',
    year: 2025,
  },
  {
    id: 'img-9',
    src: '/images/gallery/vivian.jpg',
    alt: 'Vivian - TEDxYola',
    category: 'speakers',
    year: 2025,
  },
];
