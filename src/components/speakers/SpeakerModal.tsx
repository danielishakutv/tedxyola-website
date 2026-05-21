import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Twitter, Linkedin, Instagram, ExternalLink, User } from 'lucide-react';
import { Speaker } from '@/content/speakers';
import { siteConfig } from '@/content/siteConfig';

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

// Pick an icon for whatever platform string the API returns.
const iconForPlatform = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('twitter') || p === 'x') return Twitter;
  if (p.includes('linkedin')) return Linkedin;
  if (p.includes('instagram')) return Instagram;
  return ExternalLink;
};

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

  const subtitle = [speaker.title, speaker.company].filter(Boolean).join(', ');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-zinc-950 rounded-2xl w-full max-w-md lg:max-w-4xl my-auto max-h-[92vh] overflow-y-auto no-scrollbar relative border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky header: red accent + brand + close */}
          <div className="sticky top-0 z-10">
            <div className="h-1 bg-ted-red" />
            <div className="flex items-center justify-between gap-2 bg-zinc-950/95 backdrop-blur px-5 py-3 border-b border-white/5">
              <span className="text-base font-bold tracking-tight text-white">
                TED<span className="text-ted-red">x</span>Yola
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-ted-red rounded text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                  Speaker Reveal
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Body: stacked poster on mobile, two columns on laptop */}
          <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-2">
            {/* Photo with viewfinder corner brackets */}
            <div className="p-5 lg:pr-2.5">
              <div className="relative lg:sticky lg:top-20">
                <div className="relative aspect-[4/3] m-1.5 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  {speaker.photo ? (
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                </div>
                <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-ted-red" />
                <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-ted-red" />
                <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-ted-red" />
                <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-ted-red" />
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-5 lg:pt-5 lg:pl-2.5">
              {/* Identity */}
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ted-red mb-2">
                Meet Our Speaker
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
                {speaker.name}
              </h2>
              {subtitle && (
                <p className="text-sm text-white/60 mt-1">{subtitle}</p>
              )}

              {/* Social links */}
              {speaker.socialLinks && speaker.socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {speaker.socialLinks.map((link) => {
                    const Icon = iconForPlatform(link.platform);
                    return (
                      <a
                        key={`${link.platform}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-full hover:bg-ted-red transition-colors"
                        aria-label={link.platform}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Talk topic */}
              <div className="mt-6 bg-ted-red rounded-lg p-4">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 mb-1">
                  Talk Topic
                </p>
                <p className="text-base font-bold text-white leading-snug">
                  {speaker.talkTitle}
                </p>
              </div>

              {/* Talk summary */}
              {speaker.talkSummary && (
                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                  {speaker.talkSummary}
                </p>
              )}

              {/* Bio */}
              {speaker.bio && (
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
                    {speaker.bio}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer: theme branding + event date */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-white/10">
            <div className="min-w-0">
              <span className="text-sm font-bold text-ted-red">
                {siteConfig.themeName}
              </span>
              <span className="hidden sm:inline text-xs text-white/40 ml-2 capitalize">
                {siteConfig.themeTagline}
              </span>
            </div>
            <span className="text-xs text-white/40 whitespace-nowrap">
              {siteConfig.eventDate}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
