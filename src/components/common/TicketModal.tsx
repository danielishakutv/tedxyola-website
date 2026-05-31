import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Ticket,
  ArrowRight,
  User as UserIcon,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import type { ActivityGoogleForm } from '@/content/activities';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketUrl: string;
  eventTitle?: string;
  googleForm?: ActivityGoogleForm;
  /** When true, sales are closed: capture the user's details and show a sold-out notice instead of redirecting to checkout. */
  soldOut?: boolean;
}

export const TicketModal = ({
  isOpen,
  onClose,
  ticketUrl,
  eventTitle,
  googleForm,
  soldOut = false,
}: TicketModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<HTMLElement>(null);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // iOS-safe body scroll lock: freeze body at current scroll position
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Prevent backdrop touchmove from scrolling the page, but allow
  // scrolling inside the modal's scrollable area
  useEffect(() => {
    if (!isOpen) return;
    const preventScroll = (e: TouchEvent) => {
      // Allow scrolling if the touch target is inside our scrollable container
      if (scrollableRef.current && scrollableRef.current.contains(e.target as Node)) {
        return;
      }
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isOpen]);

  // Reset form state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    setErrors({});
    setSubmitting(false);
    setSubmitted(false);
  }, [isOpen]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Please enter your full name';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11)
      next.phone = 'Phone number must be exactly 11 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address';
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanEmail = email.trim();

    if (googleForm) {
      const fd = new FormData();
      fd.set(googleForm.fields.fullname, cleanName);
      fd.set(googleForm.fields.phone, cleanPhone);
      fd.set(googleForm.fields.email, cleanEmail);
      Object.entries(googleForm.hidden ?? {}).forEach(([k, v]) => fd.set(k, v));
      try {
        fetch(googleForm.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          body: fd,
        }).catch(() => {});
      } catch {
        // best-effort; never block the next step
      }
    }

    if (soldOut) {
      setSubmitting(false);
      setSubmitted(true);
      return;
    }

    const params = new URLSearchParams({
      add_to_cart: '1',
      email: cleanEmail,
      fullname: cleanName,
      mobile: cleanPhone,
    });
    window.location.href = `${ticketUrl}?${params.toString()}`;
  };

  const firstName = name.trim().split(/\s+/)[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
        >
          {/* Backdrop — closes modal on click, does NOT scroll page on touch */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            onTouchEnd={(e) => {
              // Only close if the touch ended directly on the backdrop
              if (e.target === e.currentTarget) onClose();
            }}
            aria-hidden
          />

          {/* Modal sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md max-h-[92dvh] sm:max-h-[88dvh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center flex-shrink-0">
              <span className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-4 sm:pt-6 pb-2 flex-shrink-0">
              <div className="min-w-0">
                {!submitted && (
                  <>
                    <p className="text-xs uppercase tracking-wider text-ted-red font-semibold">
                      {soldOut ? 'Register Your Interest' : 'Get Your Ticket'}
                    </p>
                    {eventTitle && (
                      <h2
                        id="ticket-modal-title"
                        className="text-2xl font-bold text-gray-900 mt-1 truncate"
                      >
                        {eventTitle}
                      </h2>
                    )}
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 -mt-2 -mr-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success state */}
            {submitted ? (
              <div className="px-6 pb-[max(env(safe-area-inset-bottom),2rem)] sm:pb-10 pt-2 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-9 w-9 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tickets are sold out
                </h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {firstName ? `Thank you, ${firstName}! ` : 'Thank you! '}
                  {eventTitle ?? 'This event'} is fully booked. We&apos;ve saved
                  your details and our team will reach out with any updates or
                  last-minute openings.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-colors text-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Scrollable form — ref used to allow touch-scroll inside */
              <form
                ref={scrollableRef as React.RefObject<HTMLFormElement>}
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] sm:pb-8 pt-2 space-y-5"
                style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
              >
                <div>
                  <label
                    htmlFor="ticket-name"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="ticket-name"
                      ref={firstFieldRef}
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ticket-phone"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="ticket-phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="\d{11}"
                      maxLength={11}
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))
                      }
                      placeholder="08012345678"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base tracking-wide`}
                    />
                  </div>
                  {errors.phone ? (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500">
                      Must be exactly 11 digits
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ticket-email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="ticket-email"
                      type="email"
                      inputMode="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-lg shadow-ted-red/30"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{soldOut ? 'Submitting...' : 'Redirecting...'}</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-5 h-5" />
                      <span>{soldOut ? 'Submit Details' : 'Get Ticket'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 pb-2">
                  {soldOut
                    ? 'Your details are kept private and used only to contact you about this event.'
                    : 'You will be redirected to our secure ticketing partner to complete your purchase.'}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
