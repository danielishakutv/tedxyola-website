import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Share2,
  HeartHandshake,
  Briefcase,
  Users,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formAction = 'https://docs.google.com/forms/d/e/1FAIpQLSf-9APZzDjXJOgbg83e7XAGGwN1EjQWN-7VXBQ6wmg43s7f0w/formResponse';

  const utmSource = 'newsletter';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${siteConfig.eventName} - ${siteConfig.themeName}`;

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      icon: Twitter,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      icon: Facebook,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      icon: Linkedin,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(
        shareText + ' ' + shareUrl
      )}`,
      icon: Share2,
    },
  ];

  const socialIcons = [
    { name: 'Facebook', icon: Facebook, url: siteConfig.socialLinks.facebook },
    { name: 'Twitter', icon: Twitter, url: siteConfig.socialLinks.twitter },
    {
      name: 'Instagram',
      icon: Instagram,
      url: siteConfig.socialLinks.instagram,
    },
    { name: 'LinkedIn', icon: Linkedin, url: siteConfig.socialLinks.linkedin },
    { name: 'YouTube', icon: Youtube, url: siteConfig.socialLinks.youtube },
    { name: 'Email', icon: Mail, url: `mailto:${siteConfig.socialLinks.email}` },
  ];

  const involvementLinks = [
    { name: 'Sponsor This Event', icon: HeartHandshake, url: '/contact' },
    { name: 'Partnership & Collaboration', icon: Briefcase, url: '/contact' },
    { name: 'Volunteer', icon: Users, url: '/contact' },
    { name: 'Give / Donate', icon: Heart, url: '/contact' },
    {
      name: 'Join WhatsApp Channel',
      icon: MessageCircle,
      url: 'https://whatsapp.com/channel/0029VbArklVAjPXUYhwhF30L',
    },
  ];

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    try {
      const formData = new FormData();
      formData.set('entry.895495834', newsletterEmail.trim()); // Email (required)
      formData.set('entry.1559990828', newsletterName.trim()); // Name (optional)
      formData.set('entry.1945408207', utmSource); // utm_source
      formData.set('fvv', '1');
      formData.set('fbzx', '-4687041336962915228');
      formData.set('pageHistory', '0');

      await fetch(formAction, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setNewsletterStatus('success');
      setNewsletterEmail('');
      setNewsletterName('');
    } catch (err) {
      console.error('Newsletter submit failed', err);
      setNewsletterStatus('error');
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="./logo-white.png" 
                alt="TEDxYola" 
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
                width={160}
                height={48}
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteConfig.metaDescription}
            </p>
            <p className="text-white/50 text-xs">
              {siteConfig.venue.city}, {siteConfig.venue.state}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/event/theme"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Theme
                </Link>
              </li>
              <li>
                <Link
                  to="/event/speakers"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  to="/event/program"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Program
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-ted-red transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {involvementLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialIcons
                .filter((social) => social.url)
                .map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ted-red transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Share & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Share Event</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ted-red transition-colors"
                    aria-label={`Share on ${link.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
              <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email (required)"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-ted-red"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    placeholder="Name (optional)"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-ted-red"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-4 py-2 bg-ted-red rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
                >
                  {newsletterStatus === 'loading' ? 'Submitting...' : 'Join'}
                </button>
                {newsletterStatus === 'success' && (
                  <p className="text-xs text-green-400">Thanks! You are on the list.</p>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-xs text-red-400">Please enter a valid email and try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              © {currentYear} {siteConfig.eventName}. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              This independent TEDx event is operated under license from TED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
