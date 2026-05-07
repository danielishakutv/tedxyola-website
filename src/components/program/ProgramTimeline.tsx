import { motion } from 'framer-motion';
import { Clock, User, Coffee, Music, MessageCircle } from 'lucide-react';
import { ProgramItem } from '@/content/program';

interface ProgramTimelineProps {
  items: ProgramItem[];
}

const getIcon = (type: ProgramItem['type']) => {
  switch (type) {
    case 'talk':
      return User;
    case 'break':
      return Coffee;
    case 'performance':
      return Music;
    case 'networking':
      return MessageCircle;
    default:
      return Clock;
  }
};

const getColor = (type: ProgramItem['type']) => {
  switch (type) {
    case 'talk':
      return 'bg-ted-red';
    case 'performance':
      return 'bg-purple-600';
    case 'break':
      return 'bg-blue-600';
    case 'networking':
      return 'bg-green-600';
    case 'opening':
      return 'bg-yellow-600';
    case 'closing':
      return 'bg-pink-600';
    default:
      return 'bg-gray-600';
  }
};

export const ProgramTimeline = ({ items }: ProgramTimelineProps) => {
  return (
    <div className="relative px-4 md:px-0">
      {/* Timeline Line - Desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ted-red via-purple-600 to-ted-red -translate-x-1/2" />
      
      {/* Timeline Line - Mobile only (left side) */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-ted-red via-purple-600 to-ted-red" />

      <div className="space-y-6 md:space-y-12">
        {items.map((item, index) => {
          const Icon = getIcon(item.type);
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex md:gap-8 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-stretch md:items-center`}
            >
              {/* Desktop Time */}
              <div
                className={`hidden md:flex md:w-5/12 ${
                  isLeft ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:border-ted-red/50 transition-all">
                  <Clock className="w-5 h-5 text-ted-red flex-shrink-0" />
                  <span className="font-bold text-base">{item.time}</span>
                  <span className="text-white/60 text-sm">({item.duration})</span>
                </div>
              </div>

              {/* Timeline Icon */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-black dark:border-black"
                style={{
                  background: getColor(item.type).replace('bg-', ''),
                }}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              {/* Content */}
              <div className={`md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'} ml-20 md:ml-0`}>
                {/* Mobile Time */}
                <div className="md:hidden flex items-center gap-2 text-sm text-ted-red font-semibold mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                  <span className="text-white/60">({item.duration})</span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:border-ted-red/50 transition-all shadow-xl h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg md:text-2xl font-bold leading-tight flex-1">
                        {item.title}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getColor(item.type)} text-white`}>
                        {item.type}
                      </span>
                    </div>

                    {item.speaker && (
                      <p className="text-sm md:text-base text-ted-red font-bold mb-3">
                        {item.speaker}
                      </p>
                    )}

                    <p className="text-sm md:text-base text-white/80 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
