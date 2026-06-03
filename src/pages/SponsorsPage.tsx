import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/common/Section';
import { useSponsors } from '@/lib/sponsors';

export const SponsorsPage = () => {
  const { sponsors, loading, error } = useSponsors();

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <Section background="black" className="pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ted-red/10 border border-ted-red/30 rounded-full text-ted-red text-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            <span>Our Partners</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold font-display mb-6">
            Sponsors &amp; Partners
          </h1>
          <p className="text-lg lg:text-xl text-white/70 leading-relaxed">
            TEDxYola is powered by the generosity of organizations who believe in
            the power of ideas. Meet the partners making this event possible.
          </p>
        </motion.div>
      </Section>

      {/* Grid */}
      <Section background="black" className="pt-4 pb-20">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/20 border-t-ted-red rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-white/70">
              We couldn't load our sponsors right now. Please try again shortly.
            </p>
          </div>
        )}

        {!loading && !error && sponsors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">
              Sponsor announcements coming soon. Want to be one of the first?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-ted-red hover:bg-red-700 text-white font-semibold rounded-full transition-all"
            >
              Become a Sponsor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!loading && !error && sponsors.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {sponsors.map((sponsor, i) => {
              const card = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  className="group bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="aspect-[3/2] w-full flex items-center justify-center mb-3 sm:mb-4">
                    <img
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm sm:text-base leading-tight line-clamp-2">
                    {sponsor.name}
                  </h3>
                </motion.div>
              );

              return sponsor.website ? (
                <a
                  key={sponsor.id}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="block h-full"
                >
                  {card}
                </a>
              ) : (
                <div key={sponsor.id} className="h-full">
                  {card}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section background="gradient">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
            Partner with TEDxYola
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Amplify your brand while supporting ideas worth spreading. Let's
            build something meaningful together.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105"
          >
            <span>Become a Sponsor</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Section>
    </div>
  );
};
