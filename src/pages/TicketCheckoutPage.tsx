import { FormEvent, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Ticket,
  ArrowRight,
  User as UserIcon,
  Phone,
  Mail,
  Loader2,
} from 'lucide-react';

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdw8yqXqQVTHFZNmxaMTDpQhd1IfVqk3qV2dkYdMDR4Nf50HQ/formResponse';

const SELAR_URL = 'https://selar.com/68050o1l01';

export const TicketCheckoutPage = () => {
  const [params] = useSearchParams();
  const tier = params.get('tier') ?? 'Ticket';
  const price = params.get('price') ?? '';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Please enter your full name';
    if (phone.replace(/\D/g, '').length !== 11)
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

    // Fire-and-forget Google Form submission
    try {
      const fd = new FormData();
      fd.set('entry.1490570247', cleanName);
      fd.set('entry.263556657', cleanPhone);
      fd.set('entry.675258623', cleanEmail);
      fd.set('fvv', '1');
      fd.set('fbzx', '-3306221977193950438');
      fd.set('pageHistory', '0');
      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        body: fd,
      }).catch(() => {});
    } catch {
      // best-effort; never block redirect
    }

    // Redirect to Selar with pre-filled details
    const qs = new URLSearchParams({
      add_to_cart: '1',
      email: cleanEmail,
      fullname: cleanName,
      mobile: cleanPhone,
    });
    window.location.href = `${SELAR_URL}?${qs.toString()}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back link */}
      <div className="pt-28 pb-4 px-4 max-w-lg mx-auto">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to tickets
        </Link>
      </div>

      <div className="px-4 pb-16 max-w-lg mx-auto">
        {/* Tier badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-widest text-ted-red font-semibold mb-2">
            Get Your Ticket
          </p>
          <h1 className="text-4xl font-bold font-display">
            {tier}
            {price && (
              <span className="text-ted-red ml-3">{price}</span>
            )}
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Fill in your details below and you'll be taken to our secure payment page to complete your purchase.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="co-name"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="co-name"
                  ref={nameRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="co-phone"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))
                  }
                  placeholder="08012345678"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base tracking-wide`}
                />
              </div>
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Must be exactly 11 digits</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="co-email"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="co-email"
                  type="email"
                  inputMode="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ted-red focus:border-transparent text-base`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-ted-red text-white font-bold rounded-full hover:bg-red-700 active:bg-red-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-lg shadow-ted-red/30 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Redirecting to payment…</span>
                </>
              ) : (
                <>
                  <Ticket className="w-5 h-5" />
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 pt-1">
              You will be redirected to our secure ticketing partner to complete your purchase.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
