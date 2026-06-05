import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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

  const close = useCallback(() => {
    setIndex((i) => {
      if (i < queue.length - 1) return i + 1;
      setDismissed(true);
      return i;
    });
  }, [queue.length]);

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
  }, [current, dismissed, close]);

  if (loading || !current || dismissed) return null;

  const handleCta = () => {
    if (!current.buttonUrl) return;
    trackClick(current.id);
    const isExternal = /^https?:\/\//i.test(current.buttonUrl);
    if (isExternal) {
      window.open(current.buttonUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = current.buttonUrl;
    }
    close();
  };

  // Close only when the click is truly on the backdrop, not bubbled from inside.
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain p-4 bg-black/70 backdrop-blur-sm"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`popup-title-${current.id}`}
      style={{ isolation: 'isolate' }}
    >
      <motion.div
        key={current.id}
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative w-full max-w-md sm:max-w-lg my-auto bg-white rounded-2xl shadow-2xl text-gray-900 max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 pointer-events-none" />
        </button>

        <div className="overflow-y-auto overscroll-contain flex-1">
          {current.imageUrl && (
            <div className="w-full bg-gray-100 flex items-center justify-center">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full max-h-[50vh] object-contain pointer-events-none select-none"
                loading="eager"
                decoding="async"
                draggable={false}
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

            <div className="flex flex-col sm:flex-row gap-3">
              {current.buttonLabel && current.buttonUrl && (
                <button
                  type="button"
                  onClick={handleCta}
                  style={{
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  className="cursor-pointer select-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-ted-red hover:bg-red-700 text-white font-semibold rounded-full transition-colors active:scale-95"
                >
                  <span className="pointer-events-none">{current.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 pointer-events-none" />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                style={{
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                }}
                className="cursor-pointer select-none inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors active:scale-95"
              >
                <span className="pointer-events-none">
                  {current.buttonLabel && current.buttonUrl ? 'No thanks' : 'Close'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
