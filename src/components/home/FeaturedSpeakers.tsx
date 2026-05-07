import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { speakers } from '@/content/speakers';

export const FeaturedSpeakers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredSpeakers = speakers.slice(0, 6);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredSpeakers.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredSpeakers.length - 1 : prev - 1
    );
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
            Featured Speakers
          </h2>
          <p className="text-xl text-white/70">
            Meet the brilliant minds sharing ideas worth spreading
          </p>
        </div>

        <Link
          to="/event/speakers"
          className="hidden lg:inline-flex px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
        >
          View All Speakers
        </Link>
      </div>

      {/* Mobile Carousel */}
      <div className="lg:hidden relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <div className="aspect-square bg-gradient-to-br from-ted-red/20 to-purple-600/20 rounded-xl mb-4" />
          <h3 className="text-xl font-bold mb-1">
            {featuredSpeakers[currentIndex].name}
          </h3>
          <p className="text-sm text-white/60 mb-3">
            {featuredSpeakers[currentIndex].title}
          </p>
          <p className="text-ted-red font-semibold mb-2">
            {featuredSpeakers[currentIndex].talkTitle}
          </p>
          <p className="text-sm text-white/70 line-clamp-3">
            {featuredSpeakers[currentIndex].talkSummary}
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous speaker"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {featuredSpeakers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-ted-red w-8'
                    : 'bg-white/30'
                }`}
                aria-label={`Go to speaker ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next speaker"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {featuredSpeakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-ted-red/50 hover:bg-white/10 transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-ted-red/20 to-purple-600/20 rounded-xl mb-4 group-hover:scale-105 transition-transform" />
            <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
            <p className="text-sm text-white/60 mb-3">{speaker.title}</p>
            <p className="text-ted-red font-semibold mb-2">
              {speaker.talkTitle}
            </p>
            <p className="text-sm text-white/70 line-clamp-3">
              {speaker.talkSummary}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="lg:hidden mt-8 text-center">
        <Link
          to="/event/speakers"
          className="inline-flex px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
        >
          View All Speakers
        </Link>
      </div>
    </div>
  );
};
