import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '@/components/common/Section';
import { SpeakerGrid } from '@/components/speakers/SpeakerGrid';
import { SpeakerGridSkeleton } from '@/components/speakers/SpeakerGridSkeleton';
import { useSpeakers } from '@/hooks/useSpeakers';
import { siteConfig } from '@/content/siteConfig';
import { Mic } from 'lucide-react';

export const SpeakersPage = () => {
  const { speakers, loading, error, refetch } = useSpeakers();

  useEffect(() => {
    document.title = `Speakers - ${siteConfig.eventName}`;
  }, []);

  const renderSpeakers = () => {
    if (loading && speakers.length === 0) {
      return <SpeakerGridSkeleton count={8} />;
    }

    if (error && speakers.length === 0) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-white/70 mb-6">
            We couldn't load the speakers right now. Please try again.
          </p>
          <button
            onClick={refetch}
            className="inline-flex px-6 py-3 bg-ted-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (speakers.length === 0) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-display mb-4">
            Speakers Coming Soon
          </h2>
          <p className="text-xl text-white/70">
            Our {siteConfig.eventYear} speaker lineup is being finalised. Check
            back soon to meet the visionaries taking the stage.
          </p>
        </div>
      );
    }

    return <SpeakerGrid speakers={speakers} />;
  };

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
            <Mic className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">Our Speakers</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            Meet the Speakers
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
            Visionaries, innovators, and changemakers sharing ideas worth
            spreading at TEDxYola {siteConfig.eventYear}
          </p>
        </motion.div>
      </Section>

      {/* Speakers Grid */}
      <Section background="black">{renderSpeakers()}</Section>

      {/* Call to Action */}
      <Section background="white" className="text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-6">
            Experience These Talks Live
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't miss the opportunity to hear from these incredible speakers in
            person. Get your tickets now!
          </p>
          <Link
            to={siteConfig.ticketUrl}
            className="inline-flex px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105"
          >
            Buy Tickets
          </Link>
        </motion.div>
      </Section>
    </div>
  );
};
