'use client';

import { useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function Footer() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    'Веб-приложения',
    'Мобильные приложения', 
    'Telegram-боты',
    'CRM и ERP-системы',
    'Интернет-магазины'
  ];

  const company = [
    'Услуги',
    'Процесс работы',
    'Наши работы',
    'Цены',
    'Контакты'
  ];

  const support = [
    'Техническая поддержка',
    'Консультация',
    'Обучение команды',
    'Сопровождение проектов'
  ];

  return (
    <footer 
      ref={targetRef}
      className="relative bg-background border-t-2 border-primary/60 shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)] mt-16 sm:mt-20 lg:mt-24"
    >      

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`py-12 sm:py-16 lg:py-20 ${
          isVisible ? 'animate-footer-rise' : 'opacity-0'
        }`}>
          {/* Верхняя часть футера */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-16">
            
            {/* Логотип и описание */}
            <div className={`lg:col-span-1 ${
              isVisible ? 'animate-section-slide-left delay-200' : 'opacity-0'
            }`}>
              <div className="mb-6">
                <h3 className="codev-logo-text text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  <span className="text-primary">Codev</span>
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Разрабатываем веб-приложения, мобильные решения и цифровые продукты. Прозрачный процесс, честные цены, качественный результат.
                </p>
              </div>
              
                             {/* Социальные сети и контакты */}
               <div className="space-y-4">
                 <h4 className="text-sm font-semibold text-foreground/90 mb-3">Свяжитесь с нами</h4>
                 <div className="grid grid-cols-2 gap-3">
                   {/* Instagram */}
                   <a 
                     href="https://www.instagram.com/codevai/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
                   >
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                       </svg>
                     </div>
                     <span className="text-xs text-foreground/70 group-hover:text-primary transition-colors">Instagram</span>
                   </a>
                   
                   {/* Telegram */}
                   <a 
                     href="https://t.me/codevai_team" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
                   >
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                       </svg>
                     </div>
                     <span className="text-xs text-foreground/70 group-hover:text-primary transition-colors">Telegram</span>
                   </a>
                   
                   {/* WhatsApp */}
                   <a 
                     href="https://wa.me/996700746333" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
                   >
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                       </svg>
                     </div>
                     <span className="text-xs text-foreground/70 group-hover:text-primary transition-colors">WhatsApp</span>
                   </a>
                   
                   {/* Email */}
                   <a 
                     href="mailto:team.codevai@gmail.com" 
                     className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
                   >
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                       <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </div>
                     <span className="text-xs text-foreground/70 group-hover:text-primary transition-colors">Email</span>
                   </a>
                 </div>
               </div>
            </div>

            {/* Услуги */}
            <div className={`${
              isVisible ? 'animate-section-slide-up delay-400' : 'opacity-0'
            }`}>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Услуги</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className={`${
                    isVisible ? 'animate-section-fade-scale' : 'opacity-0'
                  }`} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <button className="text-sm sm:text-base text-foreground/70 hover:text-primary transition-colors duration-300 text-left">
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Компания */}
            <div className={`${
              isVisible ? 'animate-section-slide-up delay-600' : 'opacity-0'
            }`}>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Разделы</h4>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index} className={`${
                    isVisible ? 'animate-section-fade-scale' : 'opacity-0'
                  }`} style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <button className="text-sm sm:text-base text-foreground/70 hover:text-primary transition-colors duration-300 text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Поддержка */}
            <div className={`${
              isVisible ? 'animate-section-slide-right delay-800' : 'opacity-0'
            }`}>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Поддержка</h4>
              <ul className="space-y-3 mb-6">
                {support.map((item, index) => (
                  <li key={index} className={`${
                    isVisible ? 'animate-section-fade-scale' : 'opacity-0'
                  }`} style={{ animationDelay: `${1.0 + index * 0.1}s` }}>
                    <button className="text-sm sm:text-base text-foreground/70 hover:text-primary transition-colors duration-300 text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              
              
            </div>
          </div>

          {/* Нижняя часть футера */}
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${
            isVisible ? 'animate-section-slide-up delay-1000' : 'opacity-0'
          }`}>
            <p className="text-sm text-foreground/60 text-center sm:text-left">
              © {new Date().getFullYear()} Codev. Все права защищены.
            </p>
            
            <div className="flex items-center gap-6">
              <a 
                href="/privacy" 
                className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                Политика конфиденциальности
              </a>
              <a 
                href="/terms" 
                className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
