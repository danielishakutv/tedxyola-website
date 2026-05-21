import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
  return (
    <div className="space-y-16 lg:space-y-20">
      {/* About TEDxYola */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ted-red/10 rounded-full mb-6">
            <Lightbulb className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold text-ted-red">
              Ideas Worth Spreading
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            About TEDxYola
          </h2>

          <div className="space-y-4 text-lg text-white/80 leading-relaxed">
            <p>
              TEDxYola is an independently organized TED event bringing together
              thought leaders, innovators, and dreamers in Yola, Adamawa State.
            </p>

            <p>
              Our mission is to spark conversations, inspire action, and celebrate
              the power of ideas. We believe that every voice matters and that
              together, we can shape a better tomorrow.
            </p>

            <p>
              Join us for a day of inspiring talks, meaningful connections, and
              unforgettable experiences.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all group"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-ted-red/20 to-purple-600/20 p-8 flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-tr from-ted-red/10 to-transparent"
            />

            <div className="relative z-10 text-center flex flex-col items-center justify-center">
              <img 
                src="/logo-white.png"
                alt="TEDxYola"
                className="w-full max-w-md h-auto mb-6"
                loading="lazy"
                decoding="async"
                width={640}
                height={360}
              />
              <div className="mt-4 text-white text-xl font-medium">Ideas Worth Spreading</div>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-ted-red rounded-full blur-2xl opacity-50"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600 rounded-full blur-2xl opacity-50"
          />
        </motion.div>
      </div>

      {/* What is TEDx? */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-xl backdrop-blur"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">What is TEDx?</h3>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              TEDx is a program of local, self-organized events licensed by TED. Talks are non-commercial, non-political, and centered on ideas—never promotion.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              TEDxYola follows TED guidelines while tailoring each event to our community. We blend TED Talk videos and live speakers to spark deep discussion and connection.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/90 w-full lg:max-w-md">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">Licensed by TED, locally organized</div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">Talks capped at 18 minutes</div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">Non-commercial and non-political</div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">Global network, community-first focus</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
