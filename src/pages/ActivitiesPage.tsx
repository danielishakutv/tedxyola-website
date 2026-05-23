import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Users,
  Ticket,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  activities,
  type Activity,
  type ActivityPhase,
  type ActivityStatus,
} from '@/content/activities';
import { TicketModal } from '@/components/common/TicketModal';

type FilterKey = 'all' | ActivityPhase;

const phaseFilters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Activities' },
  { key: 'pre-event', label: 'Before IGNITE' },
  { key: 'main-event', label: 'During IGNITE' },
  { key: 'post-event', label: 'After IGNITE' },
];

const phaseLabel: Record<ActivityPhase, string> = {
  'pre-event': 'Before IGNITE',
  'main-event': 'During IGNITE',
  'post-event': 'After IGNITE',
};

const statusStyle: Record<ActivityStatus, string> = {
  announced: 'bg-yellow-500/90 text-black border-yellow-300',
  open: 'bg-green-500/90 text-white border-green-300',
  closed: 'bg-red-500/90 text-white border-red-300',
  past: 'bg-white/80 text-gray-800 border-white',
};

const statusLabel: Record<ActivityStatus, string> = {
  announced: 'Announced',
  open: 'Registrations Open',
  closed: 'Registrations Closed',
  past: 'Past Activity',
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <article
    id={activity.id}
    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col scroll-mt-32"
  >
    <div className="relative aspect-video bg-gray-100 overflow-hidden">
      <img
        src={activity.thumbnail}
        alt={activity.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width={1200}
        height={675}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80';
        }}
      />
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur text-xs font-semibold text-white border border-white/20">
          {phaseLabel[activity.phase]}
        </span>
        <span
          className={`px-3 py-1 rounded-full backdrop-blur text-xs font-semibold border ${statusStyle[activity.status]}`}
        >
          {statusLabel[activity.status]}
        </span>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h2>
      <p className="text-ted-red font-semibold mb-4">{activity.tagline}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-ted-red flex-shrink-0" />
          <span>{activity.date}</span>
        </div>
        {activity.time && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-ted-red flex-shrink-0" />
            <span>{activity.time}</span>
          </div>
        )}
        <div className="flex items-center gap-2 sm:col-span-2">
          <MapPin className="w-4 h-4 text-ted-red flex-shrink-0" />
          <span>
            {activity.venue}
            {activity.city ? `, ${activity.city}` : ''}
          </span>
        </div>
        {activity.capacity && (
          <div className="flex items-center gap-2 sm:col-span-2">
            <Users className="w-4 h-4 text-ted-red flex-shrink-0" />
            <span>{activity.capacity}</span>
          </div>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed mb-5">{activity.description}</p>

      <ul className="space-y-2 mb-6">
        {activity.highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <Sparkles className="w-4 h-4 text-ted-red mt-0.5 flex-shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        {activity.ticketHref && (
          <button
            type="button"
            onClick={() => setIsTicketModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ted-red text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-ted-red/20"
          >
            <Ticket className="w-4 h-4" />
            <span>Buy Ticket</span>
          </button>
        )}
        {activity.detailsHref && (
          <Link
            to={activity.detailsHref}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-gray-200 text-gray-900 font-semibold hover:border-ted-red hover:text-ted-red transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        {!activity.ticketHref && !activity.detailsHref && activity.ctaLink && (
          <Link
            to={activity.ctaLink}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ted-red text-white font-semibold hover:bg-red-700 transition-colors"
          >
            {activity.ctaLabel ?? 'Learn more'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>

    {activity.ticketHref && (
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        ticketUrl={activity.ticketHref}
        eventTitle={activity.title}
        googleForm={activity.googleForm}
        soldOut={activity.soldOut}
      />
    )}
  </article>
  );
};

export const ActivitiesPage = () => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return activities;
    return activities.filter((a) => a.phase === filter);
  }, [filter]);

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-semibold text-white mb-4">
              <Sparkles className="w-4 h-4" /> Community Activities
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Beyond the Main Stage
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Connect, create, and converse with the TEDxYola community before, during, and after IGNITE on June 20, 2026.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {phaseFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  filter === f.key
                    ? 'bg-ted-red text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-16"
              >
                More activities coming soon. Stay tuned!
              </motion.p>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {filtered.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};
