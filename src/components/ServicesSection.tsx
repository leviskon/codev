'use client';

import Link from 'next/link';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// Конфигурация анимации для каждой строки
interface MarqueeConfig {
  desktop: {
    duration: string;
    speed: string;
  };
  mobile: {
    duration: string;
    speed: string;
  };
  tablet: {
    duration: string;
    speed: string;
  };
}

// Настройки анимации для каждой строки
const marqueeConfigs: Record<string, MarqueeConfig> = {
  row1: {
    desktop: { duration: '50s', speed: 'linear' },
    mobile: { duration: '25s', speed: 'linear' },
    tablet: { duration: '35s', speed: 'linear' }
  },
  row2: {
    desktop: { duration: '45s', speed: 'linear' },
    mobile: { duration: '22s', speed: 'linear' },
    tablet: { duration: '32s', speed: 'linear' }
  },
  row3: {
    desktop: { duration: '40s', speed: 'linear' },
    mobile: { duration: '20s', speed: 'linear' },
    tablet: { duration: '30s', speed: 'linear' }
  }
};

// Строка 1 - 4 карточки
const servicesRow1 = [
  {
    title: 'Веб-приложения',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z M8.716 14.253c.802-.005 1.607-.015 2.284-.015s1.482.01 2.284.015" />
      </svg>
    )
  },
  {
    title: 'Мобильные приложения',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    title: 'Десктопные программы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    )
  },
  {
    title: 'Telegram-боты',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    )
  }
];

// Строка 2 - 4 карточки  
const servicesRow2 = [
  {
    title: 'Корпоративные решения',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m2.25-18v18m13.5-18v18m2.25-18v18M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    )
  },
  {
    title: 'Интернет-магазины',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    )
  },
  {
    title: 'CRM и ERP-системы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    )
  },
  {
    title: 'MVP и прототипы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  }
];

// Строка 3 - 4 карточки
const servicesRow3 = [
  {
    title: 'Аналитические панели',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    )
  },
  {
    title: 'Медицинские ИТ-решения',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  {
    title: 'Образовательные платформы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    title: 'Логистические системы',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m15.75 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125A1.125 1.125 0 0021 17.625v-3.375M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    )
  }
];

// Функция для создания CSS переменных анимации
const getMarqueeStyles = (configKey: string): React.CSSProperties => {
  const config = marqueeConfigs[configKey];
  return {
    '--desktop-duration': config.desktop.duration,
    '--desktop-speed': config.desktop.speed,
    '--mobile-duration': config.mobile.duration,
    '--mobile-speed': config.mobile.speed,
    '--tablet-duration': config.tablet.duration,
    '--tablet-speed': config.tablet.speed,
  } as React.CSSProperties;
};

// Вспомогательные функции для быстрого изменения настроек
const updateMarqueeConfig = (
  rowKey: string, 
  device: 'desktop' | 'mobile' | 'tablet', 
  updates: Partial<{ duration: string; speed: string }>
) => {
  if (marqueeConfigs[rowKey]) {
    marqueeConfigs[rowKey][device] = { ...marqueeConfigs[rowKey][device], ...updates };
  }
};

// Функция для массового обновления всех строк
const updateAllRows = (
  device: 'desktop' | 'mobile' | 'tablet',
  updates: Partial<{ duration: string; speed: string }>
) => {
  Object.keys(marqueeConfigs).forEach(rowKey => {
    updateMarqueeConfig(rowKey, device, updates);
  });
};

/*
Примеры использования для настройки анимации:

1. Изменить скорость только для мобильных:
   updateMarqueeConfig('row1', 'mobile', { duration: '15s' });

2. Изменить тип анимации для десктопа:
   updateMarqueeConfig('row2', 'desktop', { speed: 'ease-in-out' });

3. Обновить все строки для планшетов:
   updateAllRows('tablet', { duration: '25s', speed: 'ease-out' });

4. Настроить индивидуальную строку:
   marqueeConfigs.row1.mobile.duration = '18s';
   marqueeConfigs.row1.mobile.speed = 'ease-in';

Доступные значения speed: linear, ease, ease-in, ease-out, ease-in-out
Доступные значения duration: любое время в секундах, например: '10s', '30s', '1.5s'
*/

export default function ServicesSection() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section 
      ref={targetRef}
      className="py-12 sm:py-8 lg:py-12 bg-background relative overflow-hidden"
    >
      

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-8 sm:mb-6 lg:mb-8 ${
            isVisible ? 'animate-section-slide-up' : 'opacity-0'
          }`}
        >
          <h2 className={`services-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-2 sm:mb-4 leading-tight ${
            isVisible ? 'animate-header-glow' : ''
          }`}>
            Что мы{" "}
            <span className="text-primary relative inline-block">
              делаем?
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed ${
            isVisible ? 'animate-section-fade-scale delay-200' : 'opacity-0'
          }`}>
            Полный спектр IT-услуг: от простых сайтов до сложных корпоративных систем.
          </p>
        </div>

        {/* Marquee услуг */}
        <div className={`relative z-10 flex flex-col gap-4 sm:gap-2 ${
          isVisible ? 'animate-section-reveal-up delay-400' : 'opacity-0'
        }`}>
          {/* Первая строка - прямое направление */}
          <div 
            className="group overflow-hidden flex-row" 
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, transparent 100%)',
            }}
          >
            <div className="flex gap-[1rem] animate-marquee-left group-hover:pause" style={getMarqueeStyles('row1')}>
              {/* Первый набор карточек */}
              {servicesRow1.map((service, index) => (
                <div key={`row1-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Дублированный набор для бесшовности */}
              {servicesRow1.map((service, index) => (
                <div key={`row1-dup-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Третий набор для широких экранов */}
              {servicesRow1.map((service, index) => (
                <div key={`row1-dup2-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
            </div>
              </div>
              
                    {/* Вторая строка - обратное направление */}
          <div 
            className="group overflow-hidden flex-row" 
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, transparent 100%)',
            }}
          >
            <div className="flex gap-[1rem] animate-marquee-right group-hover:pause" style={getMarqueeStyles('row2')}>
              {/* Первый набор карточек */}
              {servicesRow2.map((service, index) => (
                <div key={`row2-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Дублированный набор для бесшовности */}
              {servicesRow2.map((service, index) => (
                <div key={`row2-dup-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Третий набор для широких экранов */}
              {servicesRow2.map((service, index) => (
                <div key={`row2-dup2-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
              
                    {/* Третья строка - прямое направление */}
          <div 
            className="group overflow-hidden flex-row" 
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, transparent 100%)',
            }}
          >
            <div className="flex gap-[1rem] animate-marquee-left group-hover:pause" style={getMarqueeStyles('row3')}>
              {/* Первый набор карточек */}
              {servicesRow3.map((service, index) => (
                <div key={`row3-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Дублированный набор для бесшовности */}
              {servicesRow3.map((service, index) => (
                <div key={`row3-dup-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
              {/* Третий набор для широких экранов */}
              {servicesRow3.map((service, index) => (
                <div key={`row3-dup2-${service.title}-${index}`} className="flex gap-3 bg-card/80 p-3 pl-5 sm:p-2 sm:pl-4 rounded-lg items-center border-border/80 border-2 hover:border-primary/60 transition-colors duration-300 flex-shrink-0 min-w-fit">
                  <span className="relative flex shrink-0 overflow-hidden rounded bg-background w-[42px] h-[42px] sm:w-[36px] sm:h-[36px]">
                    <div className="aspect-square h-full w-full m-0 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                  </span>
                  <div className="pr-2">
                    <div className="font-semibold max-w-[180px] sm:max-w-[160px] font-primary truncate text-base sm:text-sm text-foreground">{service.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA внизу секции */}
        <div
          className={`text-center mt-12 sm:mt-6 lg:mt-8 ${
            isVisible ? 'animate-section-slide-up delay-800' : 'opacity-0'
          }`}
        >
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-4">
            <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Не нашли нужную{" "}
              <span className="text-primary">услугу?</span>
            </h3>
            
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Обсудите стоимость, функциональность и сроки с нашим ИИ-ассистентом или свяжитесь с нами напрямую
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg sm:max-w-none mx-auto">
              <Link href="/calculator" className="w-full sm:w-auto">
                <button className="w-full bg-primary hover:bg-primary-dark text-background font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 relative overflow-hidden group">
                  <span className="relative z-10">Узнать стоимость с ИИ</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/0 via-white/10 to-primary-dark/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
                </button>
              </Link>
              
              <a
              href="https://t.me/codevai_team"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:bg-primary/5 hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Связаться напрямую
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


