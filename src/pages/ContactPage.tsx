import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/content/siteConfig';
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HeartHandshake,
  Briefcase,
  Users,
  Heart,
  MessageCircle,
} from 'lucide-react';

export const ContactPage = () => {
  useEffect(() => {
    document.title = `Contact - ${siteConfig.eventName}`;
  }, []);

  const socialLinks = [
    { icon: Facebook, url: siteConfig.socialLinks.facebook, name: 'Facebook' },
    { icon: Twitter, url: siteConfig.socialLinks.twitter, name: 'Twitter' },
    { icon: Instagram, url: siteConfig.socialLinks.instagram, name: 'Instagram' },
    { icon: Linkedin, url: siteConfig.socialLinks.linkedin, name: 'LinkedIn' },
  ];

  const involvement = [
    {
      title: 'Sponsor This Event',
      desc: 'Support production, scholarships, and speaker experience.',
      icon: HeartHandshake,
      link: '/contact',
    },
    {
      title: 'Partnership & Collaboration',
      desc: 'Co-create activations, experiences, or media features.',
      icon: Briefcase,
      link: '/contact',
    },
    {
      title: 'Volunteer',
      desc: 'Join our operations, stage, and audience experience teams.',
      icon: Users,
      link: '/contact',
    },
    {
      title: 'Give / Donate',
      desc: 'Fuel community impact and accessibility initiatives.',
      icon: Heart,
      link: '/contact',
    },
    {
      title: 'Join WhatsApp Channel',
      desc: 'Get real-time updates and behind-the-scenes drops.',
      icon: MessageCircle,
      link: 'https://whatsapp.com/channel/0029VbArklVAjPXUYhwhF30L',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section background="gradient" className="min-h-[50vh] flex items-center">
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
            <Mail className="w-5 h-5 text-ted-red" />
            <span className="text-sm font-semibold">Get in Touch</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6">
            Contact Us
          </h1>

          <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>
      </Section>

      {/* Contact Content */}
      <Section background="black">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display mb-6">
                Let's Connect
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Whether you have questions about tickets, speaking opportunities,
                sponsorship, or anything else, our team is ready to answer all
                your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ted-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-ted-red" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${siteConfig.organizerEmail}`}
                    className="text-white/70 hover:text-ted-red transition-colors"
                  >
                    {siteConfig.organizerEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ted-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-ted-red" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-white/70">
                    {siteConfig.venue.city}, {siteConfig.venue.state}
                    <br />
                    {siteConfig.venue.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ted-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-ted-red" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-white/70">Coming soon</p>
                </div>
              </div>
            </div>

            {/* Get Involved */}
            <div>
              <h3 className="font-semibold mb-4">Get Involved</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {involvement.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="h-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3 hover:border-ted-red transition-colors">
                      <span className="w-11 h-11 rounded-lg bg-ted-red/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-ted-red" />
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );

                  return item.link ? (
                    <a key={item.title} href={item.link} className="block">{content}</a>
                  ) : (
                    <div key={item.title}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks
                  .filter((social) => social.url)
                  .map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-ted-red transition-colors"
                        aria-label={social.name}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center text-white/50">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Map Coming Soon</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </Section>
    </div>
  );
};
