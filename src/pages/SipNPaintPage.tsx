import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Sparkles,
  Palette,
  Coffee,
  Music,
  Users,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgePercent,
} from 'lucide-react';
import { activities } from '@/content/activities';
import { siteConfig } from '@/content/siteConfig';
import { TicketModal } from '@/components/common/TicketModal';

const ticketIncludes = [
  { icon: Palette, label: 'Painting Materials' },
  { icon: Coffee, label: 'Light Refreshments' },
  { icon: Music, label: 'Karaoke & Networking' },
  { icon: Sparkles, label: 'Access to the TEDxYola Creative Experience' },
];

const importantNotes = [
  'Please come with your ticket or proof of payment',
  'Seating is limited and strictly by registration',
  'No painting experience needed',
];

/** Pull the numeric value out of a formatted price string like "₦5,000". */
const parsePrice = (value?: string): number | null => {
  if (!value) return null;
  const num = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) ? num : null;
};

export const SipNPaintPage = () => {
  const event = activities.find((a) => a.id === 'sip-n-paint');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  if (!event) {
    return (
      <section className="pt-32 pb-16 min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Event details unavailable.</p>
          <Link to="/activities" className="text-ted-red underline">
            Back to Activities
          </Link>
        </div>
      </section>
    );
  }

  const ticketHref = event.ticketHref ?? '';
  const openTicketModal = () => setIsTicketModalOpen(true);

  const currentPrice = parsePrice(event.ticketPrice);
  const originalPrice = parsePrice(event.originalPrice);
  const discountPercent =
    currentPrice !== null && originalPrice !== null && originalPrice > currentPrice
      ? Math.round((1 - currentPrice / originalPrice) * 100)
      : null;

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.thumbnail})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-purple-900/70"
          aria-hidden
        />

        {/* Decorative animated paint blobs — pure transform/opacity for smooth, fast motion */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <span className="absolute top-20 left-[8%] w-24 h-24 rounded-full bg-ted-red/30 blur-2xl animate-float" />
          <span className="absolute top-1/3 right-[12%] w-36 h-36 rounded-full bg-purple-500/25 blur-3xl animate-float animation-delay-300" />
          <span className="absolute bottom-24 left-1/4 w-20 h-20 rounded-full bg-pink-500/25 blur-2xl animate-pulse-glow animation-delay-200" />
          <span className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-yellow-400/20 blur-2xl animate-float animation-delay-500" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Activities</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs sm:text-sm font-semibold text-white mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-ted-red" />
              TEDxYola 2026 Pre-Event
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-tight mb-4">
              Sip <span className="text-ted-red">'n</span> Paint
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 mb-6">
              Paint Your Thoughts
            </p>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8">
              Theme:{' '}
              <span className="font-semibold text-white">
                {siteConfig.themeName} — {siteConfig.themeTagline}
              </span>
            </p>

            {currentPrice !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="inline-flex flex-col items-start gap-4 mb-10 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
              >
                {discountPercent !== null && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ted-red text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-lg shadow-ted-red/40 animate-pulse-glow">
                    <BadgePercent className="w-4 h-4" />
                    Save {discountPercent}%
                  </span>
                )}
                <div className="flex items-end gap-4">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tight">
                    {event.ticketPrice}
                  </span>
                  {event.originalPrice && (
                    <span className="text-2xl sm:text-3xl font-bold text-white/45 line-through decoration-ted-red decoration-[3px] mb-1.5">
                      {event.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-white/75 font-medium">
                  Limited early-bird price — per seat
                </p>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openTicketModal}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-ted-red/30 text-lg"
              >
                <Ticket className="w-5 h-5" />
                <span>Buy Ticket</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
            >
              <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-ted-red/40">
                <Calendar className="w-6 h-6 text-ted-red mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Date
                </p>
                <p className="font-semibold text-gray-900">{event.date}</p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-ted-red/40">
                <Clock className="w-6 h-6 text-ted-red mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Time
                </p>
                <p className="font-semibold text-gray-900">{event.time}</p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-ted-red/40">
                <MapPin className="w-6 h-6 text-ted-red mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                  Venue
                </p>
                <p className="font-semibold text-gray-900">{event.venue}</p>
                <p className="text-sm text-gray-600 mt-1">{event.city}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none mb-16"
            >
              <p className="text-lg leading-relaxed text-gray-700">
                {event.description}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-ted-red" />
                  Your Ticket Includes
                </h2>
                <ul className="space-y-4">
                  {ticketIncludes.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-4">
                      <span className="w-12 h-12 rounded-xl bg-ted-red/20 border border-ted-red/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-ted-red" />
                      </span>
                      <span className="text-lg">{label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border-2 border-yellow-200 bg-yellow-50"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  Important Notes
                </h2>
                <ul className="space-y-4">
                  {importantNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2.5 rounded-full bg-yellow-600 flex-shrink-0" />
                      <span className="text-gray-800 text-lg">{note}</span>
                    </li>
                  ))}
                  {event.capacity && (
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 mt-0.5 text-yellow-700 flex-shrink-0" />
                      <span className="text-gray-800 text-lg">
                        {event.capacity}
                      </span>
                    </li>
                  )}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-10 rounded-2xl bg-gradient-to-br from-ted-red to-red-700 text-white shadow-xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Ready to paint your thoughts?
              </h2>
              <p className="text-white/90 text-lg mb-4 max-w-xl mx-auto">
                Reserve your seat now — registration is required and seats are limited.
              </p>
              {currentPrice !== null && (
                <p className="text-lg sm:text-xl mb-8">
                  Just{' '}
                  <span className="font-extrabold text-white">{event.ticketPrice}</span>
                  {event.originalPrice && (
                    <>
                      {' '}
                      <span className="line-through text-white/60 font-semibold">
                        {event.originalPrice}
                      </span>
                    </>
                  )}
                  {discountPercent !== null && (
                    <span className="font-bold text-white"> · Save {discountPercent}%</span>
                  )}
                </p>
              )}
              <button
                type="button"
                onClick={openTicketModal}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-ted-red font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 text-lg"
              >
                <Ticket className="w-5 h-5" />
                <span>Buy Ticket</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <div className="mt-16 pt-8 border-t border-gray-200 text-center space-y-4">
              {event.poweredBy && (
                <p className="text-sm text-gray-500">
                  Powered by{' '}
                  <span className="font-semibold text-gray-900">
                    {event.poweredBy}
                  </span>
                </p>
              )}
              <p className="text-sm text-gray-500 font-mono tracking-wide">
                #TEDxYola2026 · #PaintYourThoughts · #IGNITE
              </p>
            </div>
          </div>
        </div>
      </section>

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticketUrl={ticketHref}
        eventTitle={event.title}
        googleForm={event.googleForm}
        soldOut={event.soldOut}
      />
    </>
  );
};
