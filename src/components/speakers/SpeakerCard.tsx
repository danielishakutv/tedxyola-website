import { motion } from 'framer-motion';
import { Speaker } from '@/content/speakers';

interface SpeakerCardProps {
  speaker: Speaker;
  onClick: () => void;
}

export const SpeakerCard = ({ speaker, onClick }: SpeakerCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-ted-red/50 transition-all h-full"
      onClick={onClick}
    >
      <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
        {speaker.photo && (
          <img
            src={speaker.photo}
            alt={speaker.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-semibold text-sm">View Details</span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-bold leading-tight mb-0.5 group-hover:text-ted-red transition-colors line-clamp-2">
          {speaker.name}
        </h3>
        <p className="text-xs text-white/60 line-clamp-1">{speaker.title}</p>
        {speaker.company && (
          <p className="text-[11px] text-white/40 line-clamp-1">{speaker.company}</p>
        )}
        <p className="text-ted-red font-semibold text-xs mt-2 pt-2 border-t border-white/10 line-clamp-2">
          {speaker.talkTitle}
        </p>
      </div>
    </motion.div>
  );
};
