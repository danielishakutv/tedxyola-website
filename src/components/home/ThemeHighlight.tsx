import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/content/siteConfig';

export const ThemeHighlight = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ted-red via-purple-600 to-pink-600 p-1"
    >
      <div className="bg-black rounded-3xl p-8 lg:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">
              {siteConfig.eventYear} Theme
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            {siteConfig.themeName}
          </h2>

          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            {siteConfig.themeTagline}
          </p>

          {/* <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            In a world of constant change, we explore the ideas, innovations, and
            actions that will ignite tomorrow. Join us as we discover how bold
            thinking and collaboration can shape our shared future.
          </p> */}

          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
             From music and digital creativity to climate solutions, entrepreneurship, and social change, this theme celebrates the energy of people who are not just imagining a better future, but actively setting it in motion
          </p>

          <Link
            to="/event/theme"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 group"
          >
            <span>Explore Theme</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-ted-red/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
};
