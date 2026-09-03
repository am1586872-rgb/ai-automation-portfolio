import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send } from 'lucide-react';

export function FloatingMobileContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearContact, setIsNearContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past top hero (120px)
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if contact section is visible in the viewport
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // If the top of the contact section enters the screen, hide the floating bar so it doesn't obstruct form inputs
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 50) {
          setIsNearContact(true);
        } else {
          setIsNearContact(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input') as HTMLInputElement | null;
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !isNearContact && (
        <aside 
          aria-label="تواصل سريع للجوال"
          className="fixed bottom-5 left-0 right-0 z-40 md:hidden pointer-events-none flex justify-center px-4"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 p-1.5 pl-2.5 rounded-full shadow-[0_12px_36px_rgba(15,23,42,0.6)]"
          >
            {/* WhatsApp Quick Chat */}
            <a
              href="https://api.whatsapp.com/send?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D8%A7%D9%87%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-transform active:scale-90 shadow-md shadow-emerald-500/30"
              aria-label="مراسلة فورية عبر واتساب"
              title="مراسلة عبر واتساب"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Scroll To Contact Form Action */}
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-slate-950 font-extrabold text-xs rounded-full shadow-md shadow-teal-500/25 active:scale-95 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
              </span>
              <span>ابدأ مشروعك الآن</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
