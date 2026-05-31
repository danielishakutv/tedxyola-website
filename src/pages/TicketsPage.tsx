import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Award, Target, Flame, ShoppingBag } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';
import { useState } from 'react';
import { TicketModal } from '@/components/common/TicketModal';

interface Tier {
  name: string;
  icon: React.ElementType;
  price: string;
  tagline: string;
  description: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  ticketUrl: string;
}

const attendeeTiers: Tier[] = [
  {
    name: 'Spark',
    icon: Zap,
    price: '₦5,500',
    tagline: 'Your seat at the table.',
    description: 'Experience powerful ideas live.',
    features: [
      'General seating',
      'Access to all talks and performances',
      'Event program booklet (digital)',
      'Certificate of attendance',
      'Post-event photo gallery access',
    ],
    highlight: false,
    ticketUrl: 'https://selar.com/68050o1l01',
  },
  {
    name: 'Ember',
    icon: Star,
    price: '₦12,000',
    tagline: 'The full IGNITE experience.',
    description: 'Great seats, great conversations, great food.',
    features: [
      'Priority seating (reserved section, closer to the stage)',
      'Access to all talks and performances',
      'Networking lunch with speakers and fellow attendees',
      'Event program booklet (digital)',
      'Certificate of attendance',
      'Post-event recording access (watch all talks again)',
      'Post-event photo gallery access',
    ],
    highlight: true,
    badge: 'MOST POPULAR',
    ticketUrl: 'https://selar.com/68050o1l01',
  },
  {
    name: 'Blaze',
    icon: Flame,
    price: '₦20,000',
    tagline: 'Front row. Full access. First in the room.',
    description: 'The ultimate TEDxYola experience.',
    features: [
      'VIP front-row seating',
      'Access to all talks and performances',
      'Exclusive speaker meet-and-greet session',
      'Networking lunch with speakers and fellow attendees',
      'Event program booklet (digital)',
      'Certificate of attendance',
      'Post-event recording access (watch all talks again)',
      'Post-event photo gallery access',
      'Priority entry (skip the queue)',
    ],
    highlight: false,
    ticketUrl: 'https://selar.com/68050o1l01',
  },
];

const sponsorPackages = [
  {
    name: 'Title Sponsor',
    icon: Award,
    hint: 'Maximum brand visibility and exclusive partnership benefits',
    perks: [
      'Top billing across all marketing',
      'Keynote opportunity',
      'Premium booth space',
      '10 VIP tickets',
      'Speaking slot (15 min)',
    ],
  },
  {
    name: 'Gold Sponsor',
    icon: Star,
    hint: 'Premium positioning with significant brand exposure',
    perks: [
      'Featured in all promotional materials',
      'Premium booth space',
      '7 VIP tickets',
      'Logo on stage backdrop',
      'Speaking slot (10 min)',
    ],
  },
  {
    name: 'Silver Sponsor',
    icon: Zap,
    hint: 'Solid visibility with good engagement opportunities',
    perks: [
      'Featured in key materials',
      'Standard booth space',
      '5 tickets',
      'Logo on event materials',
      'Workshop opportunity',
    ],
  },
  {
    name: 'Bronze Sponsor',
    icon: Target,
    hint: 'Entry-level partnership with brand mention',
    perks: [
      'Logo on website & materials',
      'Standard booth space',
      '3 tickets',
      'Social media mention',
      'Event access',
    ],
  },
];

const merch = [
  {
    name: 'Branded TEDxYola Premium T-Shirt',
    image: '/images/merch/tshirt.jpg.jpeg',
    description: 'Wear the movement. Premium quality tee with the TEDxYola IGNITE design.',
    price: '₦6,000',
    buyUrl: 'https://selar.com/q583m15085',
  },
  {
    name: 'Premium Branded TEDxYola Unisex Face Cap',
    image: '/images/merch/cap.png',
    description: 'Stay sharp. Classic structured cap with embroidered TEDxYola branding.',
    price: '₦3,500',
    buyUrl: 'https://selar.com/11d338x5ae',
  },
];

export const TicketsPage = () => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <Section background="gradient" className="min-h-[60vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Zap className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">Get Your Tickets</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            Join Us at {siteConfig.eventName}
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
            Experience inspiring talks, connect with brilliant minds, and be part of a movement spreading ideas worth sharing
          </p>
        </motion.div>
      </Section>

      {/* Attendee Tiers */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4 text-center">
            Choose Your Experience
          </h2>
          <p className="text-center text-white/70 text-lg max-w-2xl mx-auto">
            Every ticket gets you into the room. Pick the experience that fits you best.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {attendeeTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  tier.highlight
                    ? 'bg-gradient-to-br from-ted-red to-red-900 ring-2 ring-ted-red md:scale-105'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 text-xs font-bold rounded-bl-lg tracking-wide">
                    {tier.badge}
                  </div>
                )}

                <div className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      tier.highlight ? 'bg-white/20' : 'bg-ted-red/20'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${tier.highlight ? 'text-white' : 'text-ted-red'}`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold font-display mb-1 text-white">
                    {tier.name}
                  </h3>

                  <p className={`text-sm font-medium mb-1 ${tier.highlight ? 'text-white/90' : 'text-white/80'}`}>
                    {tier.tagline}
                  </p>

                  <p className={`text-xs mb-6 ${tier.highlight ? 'text-white/70' : 'text-white/50'}`}>
                    {tier.description}
                  </p>

                  <div className={`text-4xl font-bold font-display mb-8 ${
                    tier.highlight ? 'text-white' : 'text-ted-red'
                  }`}>
                    {tier.price}
                  </div>

                  <button
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full py-3 rounded-full font-bold mb-8 transition-all hover:scale-105 active:scale-95 ${
                      tier.highlight
                        ? 'bg-white text-ted-red hover:bg-white/90'
                        : 'bg-ted-red text-white hover:bg-red-700'
                    }`}
                  >
                    Get Ticket
                  </button>

                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          tier.highlight ? 'text-white' : 'text-ted-red'
                        }`} />
                        <span className={`text-sm ${tier.highlight ? 'text-white/90' : 'text-white/75'}`}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-white/50 text-sm">
            Secure payment · Tickets delivered digitally · June 20, 2026
          </p>
        </div>
      </Section>

      {/* Merch Section */}
      <Section background="gradient">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 mx-auto flex justify-center w-fit">
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Official Merch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4 text-center">
            Wear the IGNITE Spirit
          </h2>
          <p className="text-center text-white/80 text-lg max-w-2xl mx-auto">
            Take a piece of TEDxYola home. Limited edition merchandise, exclusively for our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {merch.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-300 group"
            >
              <div className="aspect-square bg-white/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    el.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-white/20 text-center p-8';
                    placeholder.innerHTML = `<div style="font-size:4rem">👕</div><p style="margin-top:8px;font-size:0.875rem">Image coming soon</p>`;
                    el.parentElement!.appendChild(placeholder);
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-white mb-1">{item.name}</h3>
                <p className="text-ted-red text-2xl font-bold font-display mb-2">{item.price}</p>
                <p className="text-white/70 text-sm mb-5">{item.description}</p>
                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all text-center hover:scale-105 active:scale-95"
                >
                  Buy Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/50 text-sm mt-8"
        >
          Limited quantities — order online or grab yours on the day.
        </motion.p>
      </Section>

      {/* Sponsor Section */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4 text-center">
            Sponsorship Packages
          </h2>
          <p className="text-center text-white/70 text-lg max-w-3xl mx-auto">
            Partner with us and reach an engaged audience of innovators, thinkers, and changemakers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sponsorPackages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-ted-red/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-2 text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-white/60 text-sm">{pkg.hint}</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="w-12 h-12 rounded-full bg-ted-red/20 flex items-center justify-center flex-shrink-0 ml-4"
                  >
                    <Icon className="w-6 h-6 text-ted-red" />
                  </motion.div>
                </div>

                <div className="mb-6">
                  <p className="text-ted-red font-bold text-sm mb-4 uppercase tracking-wide">Includes:</p>
                  <ul className="space-y-3">
                    {pkg.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/75 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-ted-red flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`mailto:${siteConfig.organizerEmail}?subject=Sponsorship Inquiry — ${pkg.name}`}
                  className="block w-full py-3 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all text-center"
                >
                  Get in Touch
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Package */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-ted-red/10 to-purple-600/10 border border-ted-red/30 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold font-display mb-4">Custom Package</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Have unique sponsorship needs? We'd love to create a customized partnership package that aligns perfectly with your brand goals and budget.
          </p>
          <a
            href={`mailto:${siteConfig.organizerEmail}?subject=Custom Sponsorship Inquiry`}
            className="inline-block px-8 py-4 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </Section>

      {/* Ticket Modal */}
      <AnimatePresence>
        {selectedTier && (
          <TicketModal
            isOpen={!!selectedTier}
            onClose={() => setSelectedTier(null)}
            ticketUrl={selectedTier.ticketUrl}
            eventTitle={`${selectedTier.name} — ${selectedTier.price}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
