import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Video,
  Store,
  Ticket,
  HeartHandshake,
  Megaphone,
  Globe,
  CheckCircle2,
  Calendar,
  MapPin,
  Flame,
  Link as LinkIcon,
  Rocket,
  Trophy,
  Network,
  Users,
  Lightbulb,
  Presentation,
  HelpCircle,
  ClipboardList,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';

const APPLY_PATH = '/spotlight/apply';

const benefits = [
  {
    icon: Video,
    title: 'Video Feature on the TEDxYola Stage',
    desc: "Your startup's story, professionally framed and screened to the full TEDxYola audience — founders, sponsors, speakers, media, and community leaders.",
  },
  {
    icon: Store,
    title: 'Free Exhibition Stall',
    desc: 'A dedicated stall at the venue for the entire event day, at no cost to you. Display your product, demo your solution, and meet attendees face-to-face.',
  },
  {
    icon: Ticket,
    title: 'Complimentary Event Access',
    desc: 'Full TEDxYola passes for your founding team, giving you access to every talk, every break, and every networking moment.',
  },
  {
    icon: HeartHandshake,
    title: 'Access to Speakers, Sponsors & Industry Leaders',
    desc: 'TEDxYola brings together leaders from across business, technology, government, and the creative industries. The Spotlight puts you in the same room as them.',
  },
  {
    icon: Megaphone,
    title: 'Media & Community Exposure',
    desc: "Your startup will be featured across TEDxYola's digital channels — website, social media, and post-event coverage — extending your reach long after the event.",
  },
  {
    icon: Globe,
    title: 'Credibility & Association',
    desc: 'Being part of a TEDx event signals quality, ambition, and seriousness to investors, partners, and customers. That association is yours to keep.',
  },
];

const whatItIs = [
  'Who they are',
  "The problem they're solving",
  'How their product, service, or solution works',
  'Why it matters for North East Nigeria and beyond',
];

const whoShouldApply = [
  'Early-stage startups based in Adamawa or anywhere across North East Nigeria',
  'Startups outside the region whose product or service is built for, or actively serving, North East Nigeria',
  'Founders with a working product, service, or pilot — not just an idea on paper',
  'Teams ready to engage with customers, investors, and partners on the day',
];

const sectors = [
  'Technology',
  'Agriculture',
  'Fashion',
  'Education',
  'Health',
  'Creative Industries',
  'Logistics',
  'Fintech',
  'Energy',
  'and beyond',
];

const steps = [
  {
    icon: ClipboardList,
    title: 'Fill the Application Form',
    desc: 'Submit your details, your story, and a short description of what you’re building.',
  },
  {
    icon: CheckCircle2,
    title: 'Get Reviewed',
    desc: 'The TEDxYola Startup Spotlight team will review every application carefully. Shortlisted founders may be invited for a brief follow-up conversation.',
  },
  {
    icon: Megaphone,
    title: 'Receive Your Invitation',
    desc: 'Selected startups will be notified ahead of the event with full instructions on next steps — including video production, stall setup, and event logistics.',
  },
  {
    icon: Sparkles,
    title: 'Show Up and Shine',
    desc: 'Arrive at TEDxYola 2026, set up your stall, watch your story go up on the big screen, and spend the day connecting with the people who can help you grow.',
  },
];

const futureRoadmap = [
  {
    icon: Trophy,
    text: 'A pitch competition with seed funding for the standout startup of the year',
  },
  {
    icon: HeartHandshake,
    text: 'Investor and mentor matchmaking sessions tied to the event',
  },
  {
    icon: Rocket,
    text: 'A year-round accelerator track under the TEDxYola brand',
  },
  {
    icon: Presentation,
    text: 'A published North East Startup Report featuring every spotlighted company',
  },
  {
    icon: Lightbulb,
    text: 'Quarterly demo days between TEDxYola main events',
  },
  {
    icon: Network,
    text: 'An alumni network connecting Spotlight founders across cohorts',
  },
];

const faqs = [
  {
    q: 'Is there a fee to apply or participate?',
    a: 'No. Applications are free, and selected startups receive their stall and event access at no cost.',
  },
  {
    q: 'Do I need to be based in Yola or Adamawa to apply?',
    a: 'No. We welcome startups from anywhere in North East Nigeria, and from outside the region if your product is built for or serving the North East.',
  },
  {
    q: 'What stage does my startup need to be at?',
    a: 'You should have a working product, service, or pilot — something we and the audience can see, use, or experience. Pure ideas without execution are not a fit for this round.',
  },
  {
    q: 'Who produces the video?',
    a: 'Shortlisted startups will receive guidance from the TEDxYola Spotlight team on video format and specifications. Details will be shared upon selection.',
  },
  {
    q: 'How many startups will be selected?',
    a: 'Spots are limited to maintain quality and ensure every featured startup gets meaningful airtime and attention.',
  },
  {
    q: 'When is the application deadline?',
    a: 'Apply as early as possible. Selection happens on a rolling basis until all spots are filled.',
  },
];

export const SpotlightPage = () => {
  useEffect(() => {
    document.title = `Startup Spotlight - ${siteConfig.eventName}`;
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          aria-hidden
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <span className="absolute top-24 left-[8%] w-32 h-32 rounded-full bg-ted-red/30 blur-3xl animate-float" />
          <span className="absolute top-1/3 right-[10%] w-44 h-44 rounded-full bg-amber-500/20 blur-3xl animate-float animation-delay-300" />
          <span className="absolute bottom-20 left-1/4 w-28 h-28 rounded-full bg-purple-500/20 blur-3xl animate-pulse-glow animation-delay-200" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs sm:text-sm font-semibold text-white mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-ted-red" />
              TEDxYola {siteConfig.eventYear}
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display leading-tight mb-5">
              TEDxYola Startup <span className="text-ted-red">Spotlight</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-6">
              Your Startup. Our Stage. The Spotlight You’ve Been Waiting For.
            </p>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              A dedicated platform at TEDxYola {siteConfig.eventYear} for startups
              from Adamawa and across North East Nigeria to be seen, heard, and
              connected to the people who can help them grow.
            </p>

            <Link
              to={APPLY_PATH}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 text-lg shadow-xl shadow-ted-red/30"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why the Spotlight Exists */}
      <Section background="black" className="border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Why the Spotlight Exists
          </h2>
          <div className="space-y-5 text-lg text-white/75 leading-relaxed">
            <p>
              North East Nigeria is full of founders building real solutions to
              real problems — but too often, the region’s startups remain
              invisible to the wider ecosystem of investors, partners, customers,
              and media.
            </p>
            <p className="text-white font-semibold">
              The TEDxYola Startup Spotlight changes that.
            </p>
            <p>
              We’re creating a stage where the region’s most promising startups
              can step into the light, share their story with an audience of
              doers and decision-makers, and walk away with relationships that
              move their business forward.
            </p>
          </div>
        </div>
      </Section>

      {/* What Is the Spotlight */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 text-center">
            What Is the TEDxYola Startup Spotlight?
          </h2>
          <p className="text-lg text-white/75 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            The Startup Spotlight is a dedicated session at the TEDxYola main
            event where selected startups are featured through short, high-quality
            video highlights screened to the full TEDxYola audience. Each video
            tells the story of a founder and their company:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {whatItIs.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-ted-red flex-shrink-0" />
                <span className="text-white/85">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-lg text-white/75 leading-relaxed text-center max-w-3xl mx-auto">
            Beyond the screening, selected startups are given physical exhibition
            stalls at the venue, where they can showcase their products and
            services, demo their solutions, and engage directly with attendees
            throughout the event.
          </p>
        </div>
      </Section>

      {/* What You Get */}
      <Section background="black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 text-center">
            What You Get When Selected
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Selected startups walk away with visibility, access, and credibility
            that lasts long after event day.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
                className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-ted-red/50 hover:-translate-y-1 transition-all"
              >
                <span className="w-12 h-12 rounded-xl bg-ted-red/15 border border-ted-red/30 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-ted-red" />
                </span>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Who Should Apply */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Who Should Apply
          </h2>
          <p className="text-lg text-white/75 mb-8">The Spotlight is built for:</p>

          <div className="space-y-4 mb-10">
            {whoShouldApply.map((item) => (
              <div key={item} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-ted-red/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-ted-red" />
                </span>
                <span className="text-white/85 text-lg leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/75 leading-relaxed mb-4">
              We welcome startups across every sector — what matters is that
              you’re solving a real problem and ready to be seen:
            </p>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-ted-red/10 border border-ted-red/30 text-sm text-white/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How to Apply */}
      <Section background="black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-12 text-center">
            How to Apply
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.4) }}
                className="relative p-7 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="absolute top-6 right-6 text-5xl font-bold font-display text-white/5">
                  {i + 1}
                </span>
                <span className="w-12 h-12 rounded-xl bg-ted-red/15 border border-ted-red/30 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-ted-red" />
                </span>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-white/70 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={APPLY_PATH}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105 text-lg"
            >
              <span>Start Your Application</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Event Details */}
      <Section background="gradient">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-10 text-center">
            Event Details
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Calendar className="w-6 h-6 text-ted-red mb-3" />
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Date</p>
              <p className="font-semibold">Saturday, June 20, 2026</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <MapPin className="w-6 h-6 text-ted-red mb-3" />
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Venue</p>
              <p className="font-semibold">Merat Hotel &amp; Suites</p>
              <p className="text-sm text-white/60 mt-1">Yola, Adamawa State</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Flame className="w-6 h-6 text-ted-red mb-3" />
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Theme</p>
              <p className="font-semibold">Ignite</p>
              <p className="text-sm text-white/60 mt-1">Ideas That Set Change in Motion</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <LinkIcon className="w-6 h-6 text-ted-red mb-3" />
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">Apply</p>
              <Link
                to={APPLY_PATH}
                className="font-semibold text-ted-red hover:underline break-words"
              >
                tedxyola.com/spotlight
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Just the Beginning */}
      <Section background="black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Rocket className="w-7 h-7 text-ted-red" />
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center">
              Just the Beginning
            </h2>
          </div>
          <p className="text-lg text-white/75 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            The Startup Spotlight is the start of something bigger. In the seasons
            ahead, we’re working toward:
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {futureRoadmap.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="w-10 h-10 rounded-lg bg-ted-red/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-ted-red" />
                </span>
                <span className="text-white/80 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-white/75 text-lg max-w-3xl mx-auto leading-relaxed">
            By stepping into the Spotlight today, you’re not just joining an event
            — you’re joining a{' '}
            <span className="text-white font-semibold">movement</span> to put North
            East Nigeria’s startup ecosystem firmly on the map.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="gradient">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <HelpCircle className="w-7 h-7 text-ted-red" />
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <span className="text-ted-red">Q.</span>
                  <span>{q}</span>
                </h3>
                <p className="text-white/70 leading-relaxed pl-6">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ted-red to-red-800" aria-hidden />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <span className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
          <span className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-black/20 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Step Into the Spotlight
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            If you’re building something that matters, this is your moment to be
            seen.
          </p>
          <Link
            to={APPLY_PATH}
            className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-ted-red font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 text-lg shadow-2xl"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-8 text-sm text-white/70 font-mono tracking-wide">
            #TEDxYola2026 · #StartupSpotlight · #IGNITE
          </p>
        </div>
      </section>
    </div>
  );
};
