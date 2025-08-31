'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Закрытие мобильного меню при нажатии Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full relative backdrop-blur-xl bg-white/10 border border-white/20">
          {/* Логотип */}
          <Link href="/" className="logo-container flex items-center gap-2 relative z-10">
            <img 
              src="/codev-logo-without-bg.svg" 
              alt="Codev" 
              className="h-6 w-6" 
            />
            <span className="codev-logo-text font-semibold tracking-wide text-white text-lg">Codev</span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex relative z-10">
            <Link href="/" className="nav-link">
              Главная
            </Link>
            <a href="#services" className="nav-link">
              Услуги
            </a>
            <a href="#process" className="nav-link">
              Процесс
            </a>
            <a href="#pricing" className="nav-link">
              Цены
            </a>
            <a href="#portfolio" className="nav-link">
              Работы
            </a>
          </nav>

          {/* Десктопная CTA кнопка */}
          <div className="hidden md:flex relative z-10">
            <a
              href="#contact"
              className="lime-chat-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-full px-6 py-2.5"
            >
              Связаться с нами
            </a>
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden relative z-10">
            <button
              onClick={toggleMobileMenu}
              className="glass-menu-button size-9 rounded-md flex items-center justify-center transition-all duration-200"
              type="button"
              aria-label="Открыть меню"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5 text-gray-200"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="mobile-menu-overlay fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
                     {/* Menu Content */}
           <div className={`mobile-menu-content fixed right-0 top-0 h-full w-72 max-w-[85vw] p-4 flex flex-col backdrop-blur-xl bg-white/8 border-l border-white/15 ${isMobileMenuOpen ? 'open' : ''}`}>
             {/* Header с логотипом и кнопкой закрытия */}
             <div className="flex items-center justify-between mb-8 pt-2">
               <div className="flex items-center gap-2">
                 <img 
                   src="/codev-logo-without-bg.svg" 
                   alt="Codev" 
                   className="h-5 w-5" 
                 />
                 <span className="codev-logo-text font-semibold text-white text-base">Codev</span>
               </div>
               <button
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="glass-menu-button size-8 rounded-full flex items-center justify-center"
                 aria-label="Закрыть меню"
               >
                 <svg 
                   xmlns="http://www.w3.org/2000/svg" 
                   width="18" 
                   height="18" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   strokeLinecap="round" 
                   strokeLinejoin="round"
                   className="text-gray-200"
                 >
                   <path d="m18 6-12 12"/>
                   <path d="m6 6 12 12"/>
                 </svg>
               </button>
             </div>

             {/* Navigation Links */}
             <nav className="flex-1 space-y-1">
                             <Link
                href="/"
                className="mobile-nav-link flex items-center gap-3 text-gray-300 hover:text-primary hover:bg-primary/5 transition-all duration-300 py-3 px-4 rounded-lg group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Главная</span>
              </Link>
               <a
                 href="#services"
                 className="mobile-nav-link flex items-center gap-3 text-gray-300 hover:text-primary hover:bg-primary/5 transition-all duration-300 py-3 px-4 rounded-lg group"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
                 <span className="font-medium">Услуги</span>
               </a>
               <a
                 href="#process"
                 className="mobile-nav-link flex items-center gap-3 text-gray-300 hover:text-primary hover:bg-primary/5 transition-all duration-300 py-3 px-4 rounded-lg group"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                 </svg>
                 <span className="font-medium">Процесс</span>
               </a>
               <a
                 href="#pricing"
                 className="mobile-nav-link flex items-center gap-3 text-gray-300 hover:text-primary hover:bg-primary/5 transition-all duration-300 py-3 px-4 rounded-lg group"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                 </svg>
                 <span className="font-medium">Цены</span>
               </a>
               <a
                 href="#portfolio"
                 className="mobile-nav-link flex items-center gap-3 text-gray-300 hover:text-primary hover:bg-primary/5 transition-all duration-300 py-3 px-4 rounded-lg group"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
                 <span className="font-medium">Работы</span>
               </a>
             </nav>

             {/* CTA Button */}
             <div className="mt-6 pt-4 border-t border-gray-700/30">
               <a
                 href="#contact"
                 className="lime-chat-button w-full inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-4 py-3 shadow-lg"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
                 Связаться с нами
               </a>
             </div>
           </div>
        </div>
      )}
    </>
  );
}
