'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const processSteps = [
  {
    id: 1,
    title: "Расскажите нам о своём проекте",
    description: "В любом формате: краткий текст, список функций или даже голосовое сообщение.",
  },
  {
    id: 2,
    title: "Мы готовим прозрачное предложение",
    description: "Детальное КП с функциями, сроками и стоимостью. Без «подводных камней».",
  },
  {
    id: 3,
    title: "Договор и старт",
    description: "Подписываем соглашение, вы вносите предоплату, и мы начинаем разработку.",
  },
  {
    id: 4,
    title: "Разработка в реальном времени",
    description: "Вы получаете доступ к тестовой версии проекта и видите прогресс вживую.",
  },
  {
    id: 5,
    title: "Готовое решение",
    description: "Передача проекта, обучение команды и техническая поддержка.",
  }
];

export default function ProcessSection() {
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

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section 
      ref={targetRef}
      className="py-12 sm:py-8 lg:py-12 bg-background relative overflow-hidden"
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div className={`text-center mb-6 sm:mb-8 lg:mb-10 ${isVisible ? 'animate-section-slide-up' : 'opacity-0'}`}>
          <h2 className={`services-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-2 sm:mb-4 leading-tight ${
            isVisible ? 'animate-header-glow' : ''
          }`}>
            Как из идеи рождается{" "}
            <span className="text-primary relative inline-block">
              готовый продукт
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed ${
            isVisible ? 'animate-section-fade-scale delay-200' : 'opacity-0'
          }`}>
            Прозрачный процесс разработки без сюрпризов и скрытых платежей
          </p>
        </div>

        {/* Timeline Process Steps */}
        <div className={`max-w-2xl mx-auto relative z-10 ${
          isVisible ? 'animate-section-reveal-up delay-400' : 'opacity-0'
        }`}>
          <ol className={`relative space-y-4 sm:space-y-6 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200 dark:before:bg-[#aeef10]/20 ${
            isVisible ? 'before:animate-timeline-stroke' : ''
          }`}>
            {processSteps.map((step, index) => (
              <li 
                key={step.id} 
                className={`relative -ms-1.5 flex items-start gap-4 ${
                  isVisible ? 'animate-card-stagger' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.6 + index * 0.15}s` }}
              >
                <span className={`size-3 shrink-0 rounded-full bg-[#aeef10] ${
                  isVisible ? 'animate-pulse-glow' : ''
                }`}></span>

                <div className="-mt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm lg:text-base text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA внизу секции */}
        <div className={`text-center mt-6 sm:mt-8 lg:mt-10 ${
          isVisible ? 'animate-section-slide-up delay-1000' : 'opacity-0'
        }`}>
          <Link href="/calculator">
            <button className="bg-primary hover:bg-primary-dark text-background font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              Начать проект прямо сейчас
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
