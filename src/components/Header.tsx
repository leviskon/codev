'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              <span className="text-primary">C</span>ode<span className="text-primary">v</span>
            </span>
          </div>

          {/* Десктопная навигация */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#services"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Услуги
            </a>
            <a
              href="#portfolio"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Портфолио
            </a>
            <a
              href="#about"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              О нас
            </a>
            <a
              href="#contact"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Контакты
            </a>
          </div>

          {/* Десктопная CTA кнопка */}
          <button className="hidden sm:block bg-primary hover:bg-primary-dark text-background font-semibold px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full transition-all duration-200 hover:scale-105 animate-glow text-sm sm:text-base lg:text-lg">
            Связаться
          </button>

          {/* Мобильное меню кнопка */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex flex-col justify-center items-center space-y-1.5 group"
          >
            <span
              className={`w-6 h-0.5 sm:w-7 sm:h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 sm:w-7 sm:h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 sm:w-7 sm:h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 pb-6 space-y-4">
            <a
              href="#services"
              className="block text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Услуги
            </a>
            <a
              href="#portfolio"
              className="block text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Портфолио
            </a>
            <a
              href="#about"
              className="block text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              О нас
            </a>
            <a
              href="#contact"
              className="block text-foreground/80 hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакты
            </a>
            <button className="w-full bg-primary hover:bg-primary-dark text-background font-semibold px-6 py-3 rounded-full transition-all duration-200 mt-4">
              Связаться
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
