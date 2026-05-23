import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

// WhatsApp contacts. Numbers are stored in international format (no +, spaces or
// leading zero) for the wa.me deep link, with a pretty label for display.
const CONTACTS = [
  { label: 'TEDxYola Team', display: '+234 814 060 4326', number: '2348140604326' },
  { label: 'TEDxYola Support', display: '+234 803 273 1983', number: '2348032731983' },
];

const PREFILLED_MESSAGE = encodeURIComponent(
  "Hello TEDxYola! I'd like to make an enquiry.",
);

// WhatsApp glyph (lucide has no brand icon for it).
const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
  </svg>
);

export const FloatingWhatsapp = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal the button shortly after load so it doesn't compete with the hero.
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Close the popup when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`fixed right-3 bottom-3 sm:right-5 sm:bottom-5 z-[1100] flex flex-col items-end transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {/* Contact options popup */}
      <div
        className={`mb-3 w-64 origin-bottom-right overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'pointer-events-none opacity-0 scale-95 translate-y-2'
        }`}
        role="dialog"
        aria-label="Chat with us on WhatsApp"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center gap-2 bg-[#075E54] px-4 py-3 text-white">
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Chat with us</p>
            <p className="text-[11px] text-white/70">Typically replies within minutes</p>
          </div>
        </div>

        {/* Contacts */}
        <div className="divide-y divide-gray-100">
          {CONTACTS.map((c) => (
            <a
              key={c.number}
              href={`https://wa.me/${c.number}?text=${PREFILLED_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-900">{c.label}</span>
                <span className="block text-xs text-gray-500">{c.display}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Trigger button (small until clicked) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close WhatsApp contacts' : 'Chat with us on WhatsApp'}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] py-2.5 pl-3 pr-4 text-white shadow-lg transition-all hover:bg-[#1ebe5d] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <WhatsAppIcon className="h-5 w-5" />
        )}
        <span className="text-sm font-semibold">{open ? 'Close' : 'Chat with us'}</span>
      </button>
    </div>
  );
};
