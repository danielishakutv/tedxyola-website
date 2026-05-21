import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/content/siteConfig';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsEventDropdownOpen(false);
  }, [location]);

  const eventLinks = [
    { to: '/event/theme', label: 'Theme' },
    { to: '/event/speakers', label: 'Speakers' },
    { to: '/activities', label: 'Activities' },
    { to: siteConfig.ticketUrl, label: 'Buy Ticket' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-white group"
          >
            <img 
              src="/logo-white.png"
              alt="TEDxYola" 
              className="h-14 lg:h-12 w-auto"
              decoding="async"
              fetchPriority="high"
              width={160}
              height={56}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-ted-red transition-colors font-medium"
            >
              Home
            </Link>

            {/* Event Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsEventDropdownOpen(true)}
              onMouseLeave={() => setIsEventDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-ted-red transition-colors font-medium">
                <span>The Event</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isEventDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-xl overflow-hidden"
                  >
                    {eventLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-3 text-white hover:bg-ted-red hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/past-events"
              className="text-white hover:text-ted-red transition-colors font-medium"
            >
              Past Events
            </Link>

            <Link
              to="/about"
              className="text-white hover:text-ted-red transition-colors font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-ted-red transition-colors font-medium"
            >
              Contact
            </Link>

            <Link
              to="/watch"
              className="text-white hover:text-ted-red transition-colors font-bold"
            >
              Watch
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to={siteConfig.ticketUrl}
              className="px-6 py-3 bg-ted-red text-white font-semibold rounded-full hover:bg-red-700 transition-all hover:scale-105 inline-block"
            >
              Buy Tickets
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-md rounded-b-lg"
            >
              <div className="py-4 space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Home
                </Link>

                <div className="px-4 py-2 text-white/60 text-sm font-semibold">
                  The Event
                </div>
                {eventLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-8 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/past-events"
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Past Events
                </Link>

                <Link
                  to="/about"
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Contact
                </Link>

                <Link
                  to="/watch"
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-bold"
                >
                  Watch
                </Link>

                <div className="px-4 pt-4">
                  <Link
                    to={siteConfig.ticketUrl}
                    className="block w-full px-6 py-3 bg-ted-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-center"
                  >
                    Buy Tickets
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
