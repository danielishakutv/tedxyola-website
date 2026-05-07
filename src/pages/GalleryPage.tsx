import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Lightbox } from '@/components/gallery/Lightbox';
import { galleryImages } from '@/content/gallery';
import { siteConfig } from '@/content/siteConfig';
import { GalleryImage } from '@/content/gallery';
import { Image } from 'lucide-react';

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    document.title = `Gallery - ${siteConfig.eventName}`;
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Section background="gradient" className="min-h-[50vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Image className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">Gallery</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            Event Gallery
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
            Relive the moments, connections, and inspiration from TEDxYola events
          </p>
        </motion.div>
      </Section>

      {/* Gallery Grid */}
      <Section background="black">
        <GalleryGrid
          images={galleryImages}
          onImageClick={setSelectedImage}
        />
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          images={galleryImages}
          currentImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
