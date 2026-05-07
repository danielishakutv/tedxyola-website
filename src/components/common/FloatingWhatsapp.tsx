import { useEffect, useState } from 'react';
import { MessageCircle, Bot, HelpCircle, X } from 'lucide-react';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbArklVAjPXUYhwhF30L';

export const FloatingWhatsapp = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000); // show after ~3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed right-2 bottom-2 sm:right-4 sm:bottom-4 md:right-6 md:bottom-6 z-[1100] transition-all duration-300 ${
        visible && !dismissed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      aria-hidden={!visible || dismissed}
    >
      {/* Options bubble */}
      <div
        className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* WhatsApp Channel */}
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white text-gray-900 rounded-full shadow-lg px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium">WhatsApp Channel</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
        </a>

        {/* Yola AI */}
        <button
          type="button"
          className="group flex items-center gap-3 bg-white text-gray-900 rounded-full shadow-lg px-4 py-2 hover:bg-gray-100 transition-colors"
          aria-label="Yola AI"
        >
          <span className="text-sm font-medium">Yola AI</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600/10 group-hover:bg-purple-600/20 transition-colors">
            <Bot className="w-5 h-5 text-purple-600" />
          </div>
        </button>

        {/* Inquiries */}
        <button
          type="button"
          className="group flex items-center gap-3 bg-white text-gray-900 rounded-full shadow-lg px-4 py-2 hover:bg-gray-100 transition-colors"
          aria-label="Inquiries"
        >
          <span className="text-sm font-medium">Inquiries</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900/10 group-hover:bg-gray-900/20 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-900" />
          </div>
        </button>
      </div>

      {/* Main FAB + Dismiss */}
      <div className="relative">
        {/* Dismiss button */}
        <button
          type="button"
          aria-label="Dismiss widget"
          onClick={() => setDismissed(true)}
          className="absolute -top-3 -left-7 sm:-top-2 sm:-left-4 w-9 h-9 sm:w-6 sm:h-6 rounded-full bg-black text-white shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </button>
        {/* FAB */}
        <button
          type="button"
          aria-label={open ? 'Close WhatsApp options' : 'Open WhatsApp options'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl bg-[#E62B1E] hover:bg-red-700 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-red-500/40"
        >
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}>
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </span>
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}>
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </span>
        </button>
      </div>
    </div>
  );
}
