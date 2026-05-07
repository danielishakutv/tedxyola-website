import { motion } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { ThemeHighlight } from '@/components/home/ThemeHighlight';
import { FeaturedSpeakers } from '@/components/home/FeaturedSpeakers';
import { Testimonials } from '@/components/home/Testimonials';
import { RecentNews } from '@/components/home/RecentNews';
import { galleryImages } from '@/content/gallery';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mic, Palette, Music, Coffee, Users, Sparkles, MessageCircle, Lightbulb, Camera, Award } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';
import { useState } from 'react';

export const Home = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const galleryPreview = galleryImages.slice(0, 8);

  const activities = [
    {
      id: 1,
      icon: Mic,
      title: 'Inspiring Talks',
      description: 'Thought-provoking presentations from visionary speakers sharing breakthrough ideas worth spreading.',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      icon: Palette,
      title: 'Art Exhibition',
      description: 'Immersive art installations and visual displays celebrating local and international artists.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      icon: Music,
      title: 'Live Performances',
      description: 'Captivating musical performances blending traditional and contemporary sounds.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      icon: MessageCircle,
      title: 'Fireside Chats',
      description: 'Intimate conversations with innovators exploring deep questions and personal journeys.',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 5,
      icon: Users,
      title: 'Networking Sessions',
      description: 'Connect with like-minded changemakers, entrepreneurs, and creative professionals.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      icon: Lightbulb,
      title: 'Interactive Workshops',
      description: 'Hands-on learning experiences designed to spark creativity and practical skills.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 7,
      icon: Camera,
      title: 'Photo Showcase',
      description: 'Stunning photography exhibitions capturing powerful moments and untold stories.',
      color: 'from-rose-500 to-red-500'
    },
    {
      id: 8,
      icon: Coffee,
      title: 'Community Lounges',
      description: 'Relaxed spaces for informal discussions, refreshments, and spontaneous connections.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 9,
      icon: Sparkles,
      title: 'Cultural Performances',
      description: 'Vibrant displays of local heritage through dance, poetry, and traditional arts.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 10,
      icon: Award,
      title: 'Innovation Showcase',
      description: 'Live demonstrations of cutting-edge projects and groundbreaking local innovations.',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <div>
      <Hero />

      {/* About Section */}
      <Section background="black">
        <AboutSection />
      </Section>

      {/* Why Attend */}
      <Section background="gradient">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-white"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Why Attend TED<span className="text-ted-red">x</span>Yola
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Leave with ideas you can use, people you can build with, and energy that lasts long after the event.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: 'Actionable ideas, not fluff',
              body: 'Talks under 18 minutes with clear insights, frameworks, and next steps you can apply immediately.'
            }, {
              title: 'Meet collaborators',
              body: 'Connect with founders, creatives, policy shapers, technologists, and community leaders ready to build.'
            }, {
              title: 'See Yola spotlighted',
              body: 'Stories, innovation, and culture from the North-East on a global TEDx stage.'
            }, {
              title: 'Energy you can feel',
              body: 'Performances, art, and immersive moments that recharge creativity and perspective.'
            }, {
              title: 'Coaching-quality talks',
              body: 'Speakers are coached to be concise and audience-first, so every minute respects your time.'
            }, {
              title: 'Momentum beyond the day',
              body: 'Join a community that keeps collaborating after the event—follow-up circles, projects, and channels to stay engaged.'
            }].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
            >
              <span>Get Your Ticket</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>        </motion.div>
      </Section>

      {/* Theme Highlight */}
      <Section background="gradient">
        <ThemeHighlight />
      </Section>

      {/* Featured Speakers */}
      <Section background="black">
        <FeaturedSpeakers />
      </Section>

      {/* Program Teaser */}
      <Section background="white" className="text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Event Program
            </h2>
            <p className="text-xl text-gray-600">
              Experience a day filled with diverse activities, performances, and connections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 mb-12 px-0">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const isSelected = selectedActivity === activity.id;
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cursor-pointer h-40 md:h-48"
                  onClick={() => setSelectedActivity(isSelected ? null : activity.id)}
                  onMouseEnter={() => window.innerWidth >= 768 && setSelectedActivity(activity.id)}
                  onMouseLeave={() => window.innerWidth >= 768 && setSelectedActivity(null)}
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{ rotateY: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      perspective: '1200px'
                    }}
                  >
                    {/* Front of card */}
                    <motion.div
                      className={`
                        absolute inset-0 bg-gradient-to-br ${activity.color}
                        rounded-2xl p-4 md:p-6 
                        flex flex-col items-center justify-center
                        transition-all duration-300
                        ${!isSelected ? 'hover:scale-105 hover:shadow-xl' : ''}
                      `}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-white mb-2 md:mb-3" />
                      <h3 className="text-white font-bold text-center text-xs md:text-sm lg:text-base leading-tight line-clamp-3">
                        {activity.title}
                      </h3>
                    </motion.div>

                    {/* Back of card */}
                    <motion.div
                      className="absolute inset-0 bg-black/95 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <h3 className="text-white font-bold text-center text-xs md:text-sm leading-tight">
                        {activity.title}
                      </h3>
                      <p className="text-white text-center text-xs md:text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/event/program"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105"
            >
              <span>View Full Program</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Gallery Teaser */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Moments to Remember
            </h2>
            <p className="text-xl text-white/70">
              Glimpses from our previous events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {galleryPreview.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square rounded-xl bg-gradient-to-br from-ted-red/20 to-purple-600/20 hover:scale-105 transition-transform cursor-pointer overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Testimonials */}
      <Section background="gradient">
        <Testimonials />
      </Section>

      {/* Recent News */}
      <Section background="white" className="text-black">
        <RecentNews />
      </Section>

      {/* Sponsors/Partners */}
      <Section background="white" className="text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-8">
            Our Partners
          </h2>
          <p className="text-gray-500 mb-12">
            Thank you to our sponsors and partners who make this event possible
          </p>

            <div className="overflow-hidden">
              <div className="flex gap-8 partners-marquee">
                {[...siteConfig.partners, ...siteConfig.partners].map((partner, idx) => {
                  const content = (
                    <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center p-8 hover:bg-gray-200 transition-colors">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={180}
                      />
                    </div>
                  );

                  return partner.url ? (
                    <a
                      key={`${partner.name}-${idx}`}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-80 flex-shrink-0"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={`${partner.name}-${idx}`} className="w-80 flex-shrink-0">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            Join Us at TEDxYola {siteConfig.eventYear}
          </h2>
          <p className="text-xl text-white/90 mb-4">
            {siteConfig.eventDate}
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
            <MapPin className="w-5 h-5" />
            <span>
              {siteConfig.venue.name}, {siteConfig.venue.city}
            </span>
          </div>

          <Link
            to={siteConfig.ticketUrl}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 text-lg"
          >
            <span>Get Your Tickets</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </Section>
    </div>
  );
};
