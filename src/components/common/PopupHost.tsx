import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import {
  Popup,
  markShown,
  shouldShow,
  trackClick,
  trackView,
  useActivePopups,
} from '@/lib/popups';

/**
 * Renders one popup at a time on top of the page.
 * - Fetches active popups from the API on mount.
 * - Filters out those the user has already seen based on frequency.
 * - Shows the highest-priority popup first; after dismiss, moves to the next.
 */
export const PopupHost = () => {
  const { popups, loading } = useActivePopups();
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const queue = useMemo(() => popups.filter(shouldShow), [popups]);
  const current: Popup | undefined = queue[index];

  // Mark shown + track view when a popup becomes visible.
  useEffect(() => {
    if (!current || dismissed) return;
    markShown(current);
    trackView(current.id);
  }, [current, dismissed]);

  // Lock body scroll while a popup is open.
  useEffect(() => {
    if (!current || dismissed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [current, dismissed]);

  // ESC to close.
  useEffect(() => {
    if (!current || dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, dismissed]);

  if (loading || !current || dismissed) return null;

  function close() {
    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      setDismissed(true);
    }
  }

  function handleCta() {
    if (!current?.buttonUrl) return;
    trackClick(current.id);
    const isExternal = /^https?:\/\//i.test(current.buttonUrl);
    if (isExternal) {
      window.open(current.buttonUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = current.buttonUrl;
    }
    close();
  }

  return (
    <AnimatePresence>
      <motion.div
        key={current.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain p-4 bg-black/70 backdrop-blur-sm"
        onClick={close}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`popup-title-${current.id}`}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md sm:max-w-lg my-auto bg-white rounded-2xl shadow-2xl text-gray-900 max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto overscroll-contain flex-1">
            {current.imageUrl && (
              <div className="w-full bg-gray-100 flex items-center justify-center">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full max-h-[50vh] object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}

            <div className="p-6 sm:p-7">
            <h2
              id={`popup-title-${current.id}`}
              className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-3"
            >
              {current.title}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">
              {current.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-3" style={{ touchAction: 'manipulation' }}>
                {current.buttonLabel && current.buttonUrl && (
                  <button
                    type="button"
                    onClick={handleCta}
                    style={{ touchAction: 'manipulation' }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ted-red hover:bg-red-700 text-white font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <span>{current.buttonLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  style={{ touchAction: 'manipulation' }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors active:scale-95"
                >
                  {current.buttonLabel && current.buttonUrl ? 'No thanks' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
