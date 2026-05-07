import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';
import { galleryImages } from '@/content/gallery';
import { Play, Youtube } from 'lucide-react';

export const WatchPage = () => {
  useEffect(() => {
    document.title = `Watch - ${siteConfig.eventName}`;
  }, []);

  const videos = [
    {
      id: '1',
      title: 'Opening Speaker Talk 2025',
      speaker: 'Previous Speaker Name',
      views: '10K',
      duration: '18:24',
    },
    {
      id: '2',
      title: 'Innovation in Africa',
      speaker: 'Previous Speaker Name',
      views: '8.5K',
      duration: '16:42',
    },
    {
      id: '3',
      title: 'The Future of Education',
      speaker: 'Previous Speaker Name',
      views: '12K',
      duration: '19:15',
    },
    {
      id: '4',
      title: 'Sustainable Communities',
      speaker: 'Previous Speaker Name',
      views: '9.2K',
      duration: '17:38',
    },
    {
      id: '5',
      title: 'Youth Empowerment',
      speaker: 'Previous Speaker Name',
      views: '11K',
      duration: '15:52',
    },
    {
      id: '6',
      title: 'Creative Thinking',
      speaker: 'Previous Speaker Name',
      views: '7.8K',
      duration: '18:01',
    },
  ];

  const featuredGallery = galleryImages.slice(0, 6);

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
            <Play className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">Watch Talks</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            Previous Talks
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
            Watch inspiring talks from previous TEDxYola events
          </p>
        </motion.div>
      </Section>

      {/* Featured Video */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="aspect-video bg-gradient-to-br from-ted-red/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 cursor-pointer group hover:from-ted-red/30 hover:to-purple-600/30 transition-all">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white text-xl font-semibold">
                Featured Talk: Coming Soon
              </p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Latest Featured Talk</h2>
            <p className="text-white/70">
              Watch highlights from our most recent event
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Video Grid */}
      <Section background="white" className="text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-12 text-center">
            Past Talks
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:from-gray-300 group-hover:to-gray-400 transition-all">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-ted-red transition-colors">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                    {video.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-ted-red transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{video.speaker}</p>
                <p className="text-xs text-gray-500">{video.views} views</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-2">Event Gallery</h3>
            <p className="text-center text-gray-600 mb-8">Highlights from recent TEDxYola moments</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGallery.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={900}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ted-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
              >
                View Full Gallery
              </Link>
            </div>
          </div>

          {/* YouTube Channel Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105"
            >
              <Youtube className="w-6 h-6" />
              <span>Visit Our YouTube Channel</span>
            </a>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};
