import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  X,
  Video,
  Store,
  Ticket,
  HeartHandshake,
  Calendar,
  MapPin,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';

/**
 * Where Startup Spotlight applications are sent.
 *
 * To collect responses in a Google Form (same approach as the Contact and
 * Newsletter forms), paste the form's `…/formResponse` URL into
 * SPOTLIGHT_FORM_ACTION and map each field to its `entry.XXXXX` id below.
 * While SPOTLIGHT_FORM_ACTION is empty, the form falls back to opening a
 * pre-filled email to the organizer so no application is ever lost.
 */
const SPOTLIGHT_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdOdN4q3P_qpKTW6-r2uaMgBuBW1XuxGgOLQes8lm45mVxScQ/formResponse';
const SPOTLIGHT_ENTRIES = {
  founderName: 'entry.2046218803',
  startupName: 'entry.58471837',
  email: 'entry.215216102',
  phone: 'entry.1814480807',
  location: 'entry.20799111',
  sector: 'entry.2149765',
  stage: 'entry.1752072186',
  website: 'entry.1115831289',
  description: 'entry.2010046385',
  impact: 'entry.1388989736',
  anythingElse: 'entry.136177128',
};

const SECTORS = [
  'Technology',
  'Agriculture',
  'Fashion',
  'Education',
  'Health',
  'Creative Industries',
  'Logistics',
  'Fintech',
  'Energy',
  'Other',
];

const STAGES = [
  'Prototype / MVP',
  'Pilot',
  'Live with users',
  'Generating revenue',
  'Scaling / Growth',
];

const applicationSchema = z.object({
  founderName: z.string().min(2, 'Please enter the founder or contact name'),
  startupName: z.string().min(2, 'Please enter your startup name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  location: z.string().min(2, 'Please enter your city and state'),
  sector: z.string().min(1, 'Please select a sector'),
  stage: z.string().min(1, 'Please select your current stage'),
  website: z
    .string()
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .min(20, 'Tell us a bit more — at least 20 characters'),
  impact: z.string().optional().or(z.literal('')),
  anythingElse: z.string().optional().or(z.literal('')),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const perks = [
  { icon: Video, label: 'Video feature on the TEDxYola stage' },
  { icon: Store, label: 'Free exhibition stall for the full event day' },
  { icon: Ticket, label: 'Complimentary passes for your founding team' },
  { icon: HeartHandshake, label: 'Access to speakers, sponsors & industry leaders' },
];

export const SpotlightApplyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [usedEmailFallback, setUsedEmailFallback] = useState(false);

  useEffect(() => {
    document.title = `Apply — Startup Spotlight | ${siteConfig.eventName}`;
  }, []);

  const submitToGoogleForm = async (data: ApplicationData) => {
    const formData = new FormData();
    (Object.keys(SPOTLIGHT_ENTRIES) as Array<keyof typeof SPOTLIGHT_ENTRIES>).forEach(
      (key) => {
        formData.set(SPOTLIGHT_ENTRIES[key], data[key] || '');
      }
    );
    formData.set('fvv', '1');
    formData.set('pageHistory', '0');

    await fetch(SPOTLIGHT_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
  };

  const submitViaEmail = (data: ApplicationData) => {
    const lines = [
      `Startup: ${data.startupName}`,
      `Founder / Contact: ${data.founderName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Location: ${data.location}`,
      `Sector: ${data.sector}`,
      `Stage: ${data.stage}`,
      `Website / Social: ${data.website || '—'}`,
      '',
      'What we are building & the problem we solve:',
      data.description,
      '',
      'How it serves North East Nigeria:',
      data.impact || '—',
      '',
      'Anything else:',
      data.anythingElse || '—',
    ];
    const subject = `Startup Spotlight Application — ${data.startupName}`;
    const mailto = `mailto:${siteConfig.organizerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = mailto;
  };

  const onSubmit = async (data: ApplicationData) => {
    try {
      if (SPOTLIGHT_FORM_ACTION) {
        await submitToGoogleForm(data);
        setUsedEmailFallback(false);
      } else {
        submitViaEmail(data);
        setUsedEmailFallback(true);
      }
      setShowSuccessModal(true);
      reset();
    } catch (err) {
      console.error('Spotlight application submission failed', err);
      // Last-resort fallback so the applicant is never stuck
      submitViaEmail(data);
      setUsedEmailFallback(true);
      setShowSuccessModal(true);
      reset();
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-ted-red transition-colors text-white placeholder:text-white/40';

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          aria-hidden
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/spotlight"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Startup Spotlight</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight mb-4">
              Apply to the <span className="text-ted-red">Spotlight</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Tell us about your startup. Applications are free and reviewed on a
              rolling basis until all spots are filled — so apply early.
            </p>
          </motion.div>
        </div>
      </section>

      <Section background="black" className="pt-4">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 max-w-6xl mx-auto">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:sticky lg:top-28 self-start"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-lg font-bold mb-4">If selected, you get</h2>
              <ul className="space-y-4">
                {perks.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-ted-red/15 border border-ted-red/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-ted-red" />
                    </span>
                    <span className="text-white/80 text-sm leading-relaxed pt-1.5">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-ted-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">Date</p>
                  <p className="font-semibold">Saturday, June 20, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ted-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50">Venue</p>
                  <p className="font-semibold">Merat Hotel &amp; Suites</p>
                  <p className="text-sm text-white/60">Yola, Adamawa State</p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium mb-2">
                    Founder / Contact Name *
                  </label>
                  <input
                    id="founderName"
                    type="text"
                    {...register('founderName')}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                  {errors.founderName && (
                    <p className="mt-1 text-sm text-red-400">{errors.founderName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="startupName" className="block text-sm font-medium mb-2">
                    Startup Name *
                  </label>
                  <input
                    id="startupName"
                    type="text"
                    {...register('startupName')}
                    className={inputClass}
                    placeholder="Your company name"
                  />
                  {errors.startupName && (
                    <p className="mt-1 text-sm text-red-400">{errors.startupName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={inputClass}
                    placeholder="+234…"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Location (City, State) *
                </label>
                <input
                  id="location"
                  type="text"
                  {...register('location')}
                  className={inputClass}
                  placeholder="e.g. Yola, Adamawa"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium mb-2">
                    Sector *
                  </label>
                  <select
                    id="sector"
                    {...register('sector')}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select a sector
                    </option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s} className="bg-gray-900">
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-400">{errors.sector.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="stage" className="block text-sm font-medium mb-2">
                    Current Stage *
                  </label>
                  <select
                    id="stage"
                    {...register('stage')}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select your stage
                    </option>
                    {STAGES.map((s) => (
                      <option key={s} value={s} className="bg-gray-900">
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.stage && (
                    <p className="mt-1 text-sm text-red-400">{errors.stage.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">
                  Website or Social Link
                </label>
                <input
                  id="website"
                  type="text"
                  {...register('website')}
                  className={inputClass}
                  placeholder="https:// (optional)"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  What are you building, and what problem does it solve? *
                </label>
                <textarea
                  id="description"
                  rows={5}
                  {...register('description')}
                  className={`${inputClass} resize-none`}
                  placeholder="Describe your product or service, who it's for, and the problem it solves."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="impact" className="block text-sm font-medium mb-2">
                  How does it serve North East Nigeria?
                </label>
                <textarea
                  id="impact"
                  rows={3}
                  {...register('impact')}
                  className={`${inputClass} resize-none`}
                  placeholder="Optional — tell us why it matters for the region."
                />
              </div>

              <div>
                <label htmlFor="anythingElse" className="block text-sm font-medium mb-2">
                  Anything else we should know?
                </label>
                <textarea
                  id="anythingElse"
                  rows={3}
                  {...register('anythingElse')}
                  className={`${inputClass} resize-none`}
                  placeholder="Optional"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting…' : 'Submit Application'}</span>
                <Send className="w-5 h-5" />
              </button>

              <p className="text-xs text-white/40 text-center">
                Applications are free. By applying you agree to be contacted by the
                TEDxYola team about your submission.
              </p>
            </form>
          </motion.div>
        </div>
      </Section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Received!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {usedEmailFallback
                  ? 'Your email app should now open with your application ready to send — just hit send and our team will take it from there.'
                  : "Thanks for applying to the TEDxYola Startup Spotlight. We'll review your submission and reach out if you're shortlisted."}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-ted-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
