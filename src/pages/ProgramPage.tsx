import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { program } from '@/content/program';
import { siteConfig } from '@/content/siteConfig';
import { Calendar, Clock, ChevronDown } from 'lucide-react';

export const ProgramPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Program - ${siteConfig.eventName}`;
  }, []);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      talk: 'bg-ted-red/10 text-ted-red border-ted-red/20',
      performance: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      break: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      networking: 'bg-green-500/10 text-green-400 border-green-500/20',
      opening: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      closing: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    };
    return colors[type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  return (
    <div>
      {/* Minimal Hero */}
      <Section background="black" className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ted-red/10 rounded-full mb-6 border border-ted-red/20">
            <Calendar className="w-4 h-4 text-ted-red" />
            <span className="text-sm font-semibold text-ted-red">{siteConfig.eventDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Event Schedule
          </h1>

          <p className="text-lg md:text-xl text-white/60">
            9:00 AM - 3:00 PM • {siteConfig.venue.name}
          </p>
        </motion.div>
      </Section>

      {/* Minimalist Program Grid */}
      <Section background="black" className="py-12">
        <div className="max-w-4xl mx-auto space-y-3">
          {program.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.div
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                {/* Compact Header */}
                <div className="p-4 md:p-6 flex items-center gap-4">
                  {/* Time */}
                  <div className="flex-shrink-0 text-right min-w-[80px] md:min-w-[100px]">
                    <div className="text-lg md:text-xl font-bold text-white">
                      {item.time.split(' ')[0]}
                    </div>
                    <div className="text-xs text-white/40">
                      {item.time.split(' ')[1]}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold mb-1 truncate group-hover:text-ted-red transition-colors">
                          {item.title}
                        </h3>
                        {item.speaker && (
                          <p className="text-sm text-white/60 truncate">
                            {item.speaker}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-white/40 mb-3 mt-4">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Minimal Footer CTA */}
      <Section background="gradient" className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Us?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Secure your spot for a day of inspiration
          </p>
          <a
            href={siteConfig.ticketUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105"
          >
            <span>Get Tickets</span>
          </a>
        </motion.div>
      </Section>
    </div>
  );
};
