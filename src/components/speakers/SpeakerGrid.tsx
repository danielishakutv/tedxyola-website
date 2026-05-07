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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
