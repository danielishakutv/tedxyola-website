import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Image, Sparkles, ExternalLink } from 'lucide-react';
import { pastEvents } from '@/content/pastEvents';

export const PastEventsPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>(pastEvents[0].year);
  const selectedEvent = pastEvents.find((event) => event.year === selectedYear) ?? pastEvents[0];
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (year: string) => {
    setSelectedYear(year);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-semibold text-white mb-4">
              <Calendar className="w-4 h-4" /> Past Events
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Relive TEDxYola Highlights
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our journey from the first stage in 2018 to the upcoming IGNITE edition.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1.2fr] gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Events Timeline</h2>
                <span className="text-sm text-gray-500">Click an event to view details</span>
              </div>

              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <motion.button
                    key={event.year}
                    onClick={() => handleSelect(event.year)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      selectedYear === event.year
                        ? 'border-ted-red bg-ted-red/5 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-ted-red/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-ted-red font-semibold">{event.tagline}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="mt-3 text-gray-600">{event.summary}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg"
                ref={detailsRef}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-ted-red" />
                  <span className="text-sm font-semibold text-ted-red">{selectedEvent.date}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-lg text-gray-700 mb-4">{selectedEvent.tagline}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{selectedEvent.description}</p>

                <div className="space-y-3 mb-6">
                  {selectedEvent.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-ted-red mt-1" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Image className="w-4 h-4 text-ted-red" /> Gallery
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedEvent.images.map((src) => (
                      <div
                        key={src}
                        className="aspect-video rounded-lg overflow-hidden bg-gray-200"
                      >
                        <img
                          src={src}
                          alt={`${selectedEvent.title} photo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={450}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {selectedEvent.ctaLink && (
                  <div className="mt-8">
                    <a
                      href={selectedEvent.ctaLink}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ted-red text-white font-semibold hover:bg-red-700 transition-colors"
                    >
                      {selectedEvent.ctaLabel ?? 'Learn more'}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};
