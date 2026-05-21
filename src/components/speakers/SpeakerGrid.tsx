import { useState } from 'react';
import { motion } from 'framer-motion';
import { Speaker } from '@/content/speakers';
import { SpeakerCard } from './SpeakerCard';
import { SpeakerModal } from './SpeakerModal';

interface SpeakerGridProps {
  speakers: Speaker[];
}

export const SpeakerGrid = ({ speakers }: SpeakerGridProps) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
          >
            <SpeakerCard
              speaker={speaker}
              onClick={() => setSelectedSpeaker(speaker)}
            />
          </motion.div>
        ))}
      </div>

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </>
  );
};
