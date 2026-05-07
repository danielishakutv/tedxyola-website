import { motion } from 'framer-motion';
import { Check, Star, Zap, Users, Award, Target, X } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { siteConfig } from '@/content/siteConfig';
import { useState, FormEvent } from 'react';
import { AnimatePresence } from 'framer-motion';

export const TicketsPage = () => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyName, setNotifyName] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formAction = 'https://docs.google.com/forms/d/e/1FAIpQLSf-9APZzDjXJOgbg83e7XAGGwN1EjQWN-7VXBQ6wmg43s7f0w/formResponse';

  const utmSource = 'tickets';

  const handleNotifySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!notifyEmail.trim()) {
      setNotifyStatus('error');
      return;
    }

    setNotifyStatus('loading');
    try {
      const formData = new FormData();
      formData.set('entry.895495834', notifyEmail); // email
      formData.set('entry.1559990828', notifyName); // name
      formData.set('entry.1945408207', utmSource); // utm_source

      await fetch(formAction, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setNotifyStatus('success');
      setNotifyEmail('');
      setNotifyName('');

      // Auto-close after 3 seconds
      setTimeout(() => {
        setShowNotifyModal(false);
        setNotifyStatus('idle');
      }, 3000);
    } catch (err) {
      setNotifyStatus('error');
      console.error('Notification submission failed', err);
    }
  };
  const attendeeTiers = [
    {
      name: 'General Access',
      icon: Users,
      price: 'Coming Soon',
      description: 'Perfect for first-time attendees',
      features: [
        'Full day access to all talks',
        'Networking sessions',
        'Conference materials',
        'Refreshments',
        'Digital certificate',
      ],
      highlight: false,
    },
    {
      name: 'VIP Experience',
      icon: Star,
      price: 'Coming Soon',
      description: 'Premium experience with exclusive access',
      features: [
        'Front-row seating',
        'Meet & greet with speakers',
        'VIP networking reception',
        'Premium meals & beverages',
        'VIP merchandise pack',
        'Digital + printed certificate',
        'Priority seat selection',
      ],
      highlight: true,
    },
    {
      name: 'Student Pack',
      icon: Zap,
      price: 'Coming Soon',
      description: 'Special rates for students with valid ID',
      features: [
        'Full day access',
        'Student networking zone',
        'Conference materials',
        'Refreshments',
        'Digital certificate',
        'Exclusive student swag',
        'Alumni network access',
      ],
      highlight: false,
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
            Attendee Tiers
          </h2>
          <p className="text-center text-white/70 text-lg max-w-2xl mx-auto">
            Choose your experience level and join us for an unforgettable event
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
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  tier.highlight
                    ? 'bg-gradient-to-br from-ted-red to-red-900 ring-2 ring-ted-red md:scale-105'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Highlight badge for featured tier */}
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 text-sm font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      tier.highlight
                        ? 'bg-white/20'
                        : 'bg-ted-red/20'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${tier.highlight ? 'text-white' : 'text-ted-red'}`} />
                  </motion.div>

                  <h3 className={`text-2xl font-bold font-display mb-2 ${
                    tier.highlight ? 'text-white' : 'text-white'
                  }`}>
                    {tier.name}
                  </h3>

                  <p className={`text-sm mb-6 ${
                    tier.highlight ? 'text-white/90' : 'text-white/70'
                  }`}>
                    {tier.description}
                  </p>

                  <div className={`text-3xl font-bold font-display mb-8 ${
                    tier.highlight ? 'text-white' : 'text-ted-red'
                  }`}>
                    {tier.price}
                  </div>

                  <button 
                    onClick={() => setShowNotifyModal(true)}
                    className={`w-full py-3 rounded-full font-bold mb-8 transition-all ${
                    tier.highlight
                      ? 'bg-white text-ted-red hover:bg-white/90'
                      : 'bg-ted-red text-white hover:bg-red-700'
                  }`}>
                    Get Notified
                  </button>

                  <div className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlight ? 'text-white' : 'text-ted-red'
                        }`} />
                        <span className={tier.highlight ? 'text-white/90' : 'text-white/80'}>
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
          <p className="text-white/60 text-sm">
            🎉 Early bird discounts and special packages coming soon
          </p>
        </div>
      </Section>

      {/* Sponsor Section */}
      <Section background="gradient">
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
          <p className="text-center text-white/80 text-lg max-w-3xl mx-auto">
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-ted-red/50 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display mb-2 text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {pkg.hint}
                    </p>
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
                  <p className="text-ted-red font-bold text-lg mb-4">Includes:</p>
                  <ul className="space-y-3">
                    {pkg.perks.map((perk, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="flex items-center gap-3 text-white/80"
                      >
                        <div className="w-2 h-2 rounded-full bg-ted-red" />
                        {perk}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setShowNotifyModal(true)}
                  className="w-full py-3 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all">
                  Get Notified
                </button>
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
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Have unique sponsorship needs? We'd love to create a customized partnership package that aligns perfectly with your brand goals and budget.
          </p>
          <button 
            onClick={() => setShowNotifyModal(true)}
            className="px-8 py-4 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all">
            Get Notified
          </button>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section background="black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Secure your spot at {siteConfig.eventName} {siteConfig.eventYear}. Tickets and pricing will be available shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowNotifyModal(true)}
              className="px-8 py-4 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105"
            >
              Notify Me When Tickets Open
            </button>
            <button className="px-8 py-4 border-2 border-white hover:bg-white/10 text-white font-bold rounded-full transition-all">
              Contact Us
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Notify Modal */}
      <AnimatePresence>
        {showNotifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNotifyModal(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10 relative"
            >
              <button
                onClick={() => setShowNotifyModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-ted-red/20 flex items-center justify-center mb-6"
              >
                <Zap className="w-6 h-6 text-ted-red" />
              </motion.div>

              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Get Notified
              </h3>
              <p className="text-white/70 mb-6">
                Be the first to know when tickets go on sale
              </p>

              {notifyStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  <p className="text-white font-semibold mb-2">All set!</p>
                  <p className="text-white/70 text-sm">
                    We'll notify you as soon as tickets are available
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="notify-name" className="block text-sm font-medium text-white/80 mb-2">
                      Name
                    </label>
                    <input
                      id="notify-name"
                      type="text"
                      value={notifyName}
                      onChange={(e) => setNotifyName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-ted-red transition-colors text-white placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="notify-email" className="block text-sm font-medium text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      id="notify-email"
                      type="email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-ted-red transition-colors text-white placeholder-white/40"
                    />
                  </div>

                  {notifyStatus === 'error' && (
                    <p className="text-red-400 text-sm">Please enter a valid email</p>
                  )}

                  <button
                    type="submit"
                    disabled={notifyStatus === 'loading'}
                    className="w-full px-6 py-3 bg-ted-red hover:bg-red-700 text-white font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {notifyStatus === 'loading' ? 'Subscribing...' : 'Notify Me'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
