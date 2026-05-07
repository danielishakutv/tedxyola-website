import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { Speaker } from '@/content/speakers';

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

export const SpeakerModal = ({ speaker, onClose }: SpeakerModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="aspect-square md:aspect-auto bg-gradient-to-br from-ted-red/20 to-purple-600/20" />

            {/* Content */}
            <div className="p-8 md:py-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {speaker.name}
              </h2>
              <p className="text-lg text-white/70 mb-1">{speaker.title}</p>
              {speaker.company && (
                <p className="text-white/50 mb-6">{speaker.company}</p>
              )}

              {/* Social Links */}
              {speaker.socialLinks && (
                <div className="flex gap-3 mb-6">
                  {speaker.socialLinks.twitter && (
                    <a
                      href={speaker.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-ted-red transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {speaker.socialLinks.linkedin && (
                    <a
                      href={speaker.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-ted-red transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {speaker.socialLinks.website && (
                    <a
                      href={speaker.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-ted-red transition-colors"
                      aria-label="Website"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-ted-red mb-2">
                    {speaker.talkTitle}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {speaker.talkSummary}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    About
                  </h4>
                  <p className="text-white/70 leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
