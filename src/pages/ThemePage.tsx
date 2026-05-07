import { motion } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';
import { Sparkles, Target, Heart, Users, Lightbulb } from 'lucide-react';
import { useEffect } from 'react';

export const ThemePage = () => {
  useEffect(() => {
    document.title = `${siteConfig.themeName} - ${siteConfig.eventName}`;
  }, []);

  const principles = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing new ideas and technologies that can transform our world.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Bringing together diverse minds to create powerful solutions.',
    },
    {
      icon: Target,
      title: 'Action',
      description: 'Moving beyond ideas to create real, measurable impact.',
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Building a future that serves all of humanity with empathy.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="gradient" className="min-h-[70vh] flex items-center">
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
            <Sparkles className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">
              {siteConfig.eventYear} Theme
            </span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            {siteConfig.themeName}
          </h1>

          <p className="text-2xl lg:text-3xl text-white/90 mb-8 leading-relaxed">
            {siteConfig.themeTagline}
          </p>
        </motion.div>
      </Section>

      {/* Theme Explanation */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-8 text-center">
            What Does It Mean?
          </h2>

          {/* <div className="space-y-6 text-lg text-white/80 leading-relaxed">
            <p>
              In a world facing unprecedented challenges and opportunities, we
              stand at a crossroads. The decisions we make today, the ideas we
              pursue, and the actions we take will shape the world of tomorrow.
            </p>

            <p>
              <span className="text-ted-red font-semibold">
                {siteConfig.themeName}
              </span>{' '}
              is a call to action for innovators, dreamers, and changemakers. It's
              about sparking conversations that challenge the status quo,
              celebrating bold ideas that push boundaries, and igniting the
              collective imagination to create a better future.
            </p>

            <p>
              This theme explores how technology, creativity, compassion, and
              collaboration can come together to solve our most pressing
              problems. From artificial intelligence to sustainable development,
              from education reform to social justice—we believe that every
              great change starts with a single spark.
            </p>

            <p>
              At TEDxYola {siteConfig.eventYear}, we're bringing together
              visionaries who are already lighting the way. Join us as we
              explore what it means to truly ignite tomorrow.
            </p>
          </div> */}

        <div className="space-y-6 text-lg text-white/80 leading-relaxed">
            <p>
              IGNITE is about the spark that turns ideas into action. It represents the moment when curiosity becomes courage, when creativity meets purpose, and when a single idea begins to move people, communities, and futures forward.
            </p>

            <p>
              At TEDxYola 2026, <span className="text-ted-red font-semibold">
                {siteConfig.themeName}
              </span>{' '} shines a light on ideas emerging from the North-East and beyond—ideas born from innovation, culture, resilience, technology, and human experience. From music and digital creativity to climate solutions, entrepreneurship, and social change, this theme celebrates the energy of people who are not just imagining a better future, but actively setting it in motion.
            </p>

            <p>
              From youth-led tech startups and digital skills movements, to music and creative expression, climate resilience, food innovation, and cultural preservation, IGNITE reflects a region no longer waiting to be defined — but actively shaping what comes next.
            </p>

            <p>
                These are not passive ideas. They are ideas that ignite change.
            </p>

            <p>
              At TEDxYola {siteConfig.eventYear}, we're bringing together
              visionaries who are already lighting the way. Join us as we
              explore what it means to truly ignite tomorrow.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Principles */}
      <Section background="white" className="text-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-display mb-12 text-center">
            Our Guiding Principles
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-ted-red hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-ted-red rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{principle.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Section>

      {/* Quote Section */}
      <Section background="gradient">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <blockquote className="text-3xl lg:text-4xl font-bold font-display leading-relaxed">
            "The best way to predict the future is to create it."
          </blockquote>
          <p className="text-xl text-white/70 mt-6">— Peter Drucker</p>
        </motion.div>
      </Section>

      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.ted.com/tedx/events/62506"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ted-red text-white font-semibold shadow-lg hover:bg-red-700 transition-all"
          >
            Read more about TEDxYola on TED.com
          </a>
        </motion.div>
      </Section>
    </div>
  );
};
