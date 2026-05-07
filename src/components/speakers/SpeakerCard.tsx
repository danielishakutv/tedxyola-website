import { motion } from 'framer-motion';
import { Speaker } from '@/content/speakers';

interface SpeakerCardProps {
  speaker: Speaker;
  onClick: () => void;
}

export const SpeakerCard = ({ speaker, onClick }: SpeakerCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-ted-red/50 transition-all"
      onClick={onClick}
    >
      <div className="aspect-square bg-gradient-to-br from-ted-red/20 to-purple-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-semibold">View Details</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 group-hover:text-ted-red transition-colors">
          {speaker.name}
        </h3>
        <p className="text-sm text-white/60 mb-3">{speaker.title}</p>
        {speaker.company && (
          <p className="text-xs text-white/40 mb-3">{speaker.company}</p>
        )}
        <div className="border-t border-white/10 pt-3 mt-3">
          <p className="text-ted-red font-semibold text-sm mb-2">
            {speaker.talkTitle}
          </p>
          <p className="text-sm text-white/70 line-clamp-2">
            {speaker.talkSummary}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
