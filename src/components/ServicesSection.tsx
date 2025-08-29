'use client';

import { useState, useEffect } from 'react';

const services = [
  {
    id: 1,
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
      </svg>
    ),
    title: 'Веб-приложения',
    description: 'Современные SPA и PWA с React, Vue, Angular. Быстрые, отзывчивые и масштабируемые решения.'
  },
  {
    id: 2,
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Мобильные приложения',
    description: 'Нативные iOS/Android приложения и кроссплатформенные решения на React Native, Flutter.'
  },
  {
    id: 3,
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Десктопные программы',
    description: 'Кроссплатформенные десктопные приложения на Electron, .NET, Qt для Windows, macOS, Linux.'
  },
  {
    id: 4,
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Telegram-боты',
    description: 'Умные чат-боты для автоматизации бизнеса, продаж, поддержки клиентов и внутренних процессов.'
  },
  {
    id: 5,
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Корпоративные решения',
    description: 'ERP, CRM системы, интеграции с 1С, автоматизация бизнес-процессов и внутренние порталы.'
  }
];

export default function ServicesSection() {
  const isVisible = true;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 left-1/5 w-2 h-32 bg-gradient-to-b from-primary/20 to-transparent -rotate-12"></div>
        <div className="absolute bottom-32 right-1/4 w-1 h-40 bg-gradient-to-b from-blue-400/20 to-transparent rotate-45"></div>
        <div className="absolute top-1/4 right-1/5 w-1 h-24 bg-gradient-to-b from-purple-400/20 to-transparent -rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-16 sm:mb-20 lg:mb-24 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
            Что мы{" "}
            <span className="text-primary relative inline-block">
              делаем?
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-4xl mx-auto font-light leading-relaxed">
            Полный спектр IT-услуг: от простых сайтов до сложных корпоративных систем.
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`
                group p-6 sm:p-8 rounded-xl sm:rounded-2xl
                bg-background/50 backdrop-blur-sm border-2 border-primary/60
                shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)]
                transition-all duration-500 ease-out
                hover:bg-primary/5 hover:border-primary/80 hover:scale-105 hover:shadow-[0_0_30px_rgba(174,239,16,0.6),0_0_60px_rgba(174,239,16,0.3)]
                cursor-pointer text-center
                ${isVisible ? 'animate-fade-in' : 'opacity-0'}
              `}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Иконка */}
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Заголовок */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                {service.title}
              </h3>
              
              {/* Описание */}
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA внизу секции */}
        <div
          className={`text-center mt-16 sm:mt-20 lg:mt-24 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.0s' }}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Не нашли нужную{" "}
              <span className="text-primary">услугу?</span>
            </h3>
            
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Обсудим ваши задачи и найдем оптимальное решение
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg sm:max-w-none mx-auto">
              <button className={`
                w-full sm:w-auto
                bg-primary hover:bg-primary-dark text-background 
                font-semibold text-base sm:text-lg lg:text-xl 
                px-8 sm:px-10 lg:px-12 py-3.5 sm:py-4 lg:py-5 
                rounded-full transition-all duration-300 
                shadow-lg hover:shadow-xl 
                ${isMobile ? 'active:scale-95' : 'hover:scale-105'}
                relative overflow-hidden group
              `}>
                <span className="relative z-10">Обсудить задачу</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/0 via-white/10 to-primary-dark/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
              </button>
              
              <button className={`
                w-full sm:w-auto
                border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary
                font-semibold text-base sm:text-lg lg:text-xl 
                px-8 sm:px-10 lg:px-12 py-3.5 sm:py-4 lg:py-5 
                rounded-full transition-all duration-300 
                hover:bg-primary/5 
                ${isMobile ? 'active:scale-95' : 'hover:scale-105'}
              `}>
                Техническая консультация
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


