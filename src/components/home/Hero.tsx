import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/content/siteConfig';

const slides = [
  {
    id: 1,
    title: (
      <>
        TED<span className="text-ted-red">x</span>Yola
      </>
    ),
    subtitle: `${siteConfig.venue.city}, ${siteConfig.venue.state}`,
    description: 'Ideas Worth Spreading',
    gradient: 'from-black via-gray-900 to-black',
    cta1: { text: 'Buy Tickets', href: siteConfig.ticketUrl },
    cta2: { text: 'Learn More', href: '/event/theme' },
  },
  {
    id: 2,
    title: siteConfig.themeName,
    subtitle: siteConfig.themeTagline,
    description: `Join us on ${siteConfig.eventDate} for an unforgettable experience`,
    gradient: 'from-ted-red/20 via-purple-600/20 to-pink-600/20',
    cta1: { text: 'Explore Theme', href: '/event/theme' },
    cta2: { text: 'Get Tickets', href: siteConfig.ticketUrl },
  },
  {
    id: 3,
    title: 'Meet Our Speakers',
    subtitle: 'Visionaries • Innovators • Changemakers',
    description: 'Hear from inspiring voices shaping our future',
    gradient: 'from-purple-900/30 via-black to-black',
    cta1: { text: 'View Speakers', href: '/event/speakers' },
    cta2: { text: 'Reserve Seat', href: siteConfig.ticketUrl },
  },
  {
    id: 4,
    title: 'Beyond the Stage',
    subtitle: "Sip 'n Paint • Campus Micro Chats • More",
    description: 'Community activities before, during, and after IGNITE on June 20, 2026',
    gradient: 'from-pink-900/30 via-purple-900/20 to-black',
    cta1: { text: "Sip 'n Paint Tickets", href: '/snp' },
    cta2: { text: 'All Activities', href: '/activities' },
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 6000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}>
            {/* Animated Gradient Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-ted-red/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6 lg:space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white"
                >
                  <Sparkles className="w-4 h-4 text-ted-red" />
                  <span>{siteConfig.eventDate}</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-display leading-tight text-white"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 max-w-4xl mx-auto"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                >
                  <a
                    href={slides[currentSlide].cta1.href}
                    className="group w-full sm:w-auto px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg shadow-lg shadow-ted-red/30"
                  >
                    <span>{slides[currentSlide].cta1.text}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    to={slides[currentSlide].cta2.href}
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/30 text-lg"
                  >
                    {slides[currentSlide].cta2.text}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-ted-red'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
