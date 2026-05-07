import { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from '@/content/gallery';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export const GalleryGrid = ({ images, onImageClick }: GalleryGridProps) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'event', label: 'Event' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'venue', label: 'Venue' },
    { id: 'audience', label: 'Audience' },
    { id: 'performance', label: 'Performance' },
  ];

  const filteredImages =
    filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === category.id
                ? 'bg-ted-red text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => onImageClick(image)}
            className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-gradient-to-br from-ted-red/20 to-purple-600/20"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center text-white p-4">
                <p className="font-semibold mb-1">{image.alt}</p>
                <p className="text-sm text-white/70">{image.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">
            No images found in this category.
          </p>
        </div>
      )}
    </div>
  );
};
