'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const requirementCards = [
  {
    id: 1,
    title: "Идея или цель",
    question: "Какая проблема у вашего бизнеса?",
    description: "Опишите задачу в любом формате — от текста до голосового сообщения. Мы поймем суть и предложим оптимальное решение.",
    number: "01",
    accentColor: "primary",
    features: ["Любой формат описания", "Быстрый анализ", "Персональный подход"]
  },
  {
    id: 2,
    title: "Функциональность и дизайн",
    question: "Что важнее: стиль, скорость или сложные функции?",
    description: "Определяем приоритеты проекта. Выберем правильный баланс между красотой, производительностью и функциональностью.",
    number: "02",
    accentColor: "blue-400",
    features: ["Приоритизация задач", "Технический баланс", "Оптимальная архитектура"]
  },
  {
    id: 3,
    title: "Обратная связь",
    question: "Ваше участие = идеальный результат",
    description: "Регулярные созвоны, доступ к тестовой версии и быстрые итерации. Вы всегда в курсе прогресса.",
    number: "03",
    accentColor: "purple-400",
    features: ["Еженедельные созвоны", "Тестовая среда", "Мгновенные правки"]
  }
];

export default function RequirementsSection() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

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
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, []);

  // Центрирование на среднюю карточку при загрузке
  useEffect(() => {
    const centerOnMiddleCard = () => {
      if (scrollContainerRef.current && isMobile) {
        const container = scrollContainerRef.current;
        const cardWidth = 180; // базовая ширина карточки
        const gap = 16; // gap-4 = 16px
        const middleCardIndex = 1; // средняя карточка (индекс 1)
        
        // Вычисляем позицию для центрирования средней карточки
        const scrollPosition = (cardWidth + gap) * middleCardIndex - (container.offsetWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    };

    // Небольшая задержка для завершения рендера
    const timer = setTimeout(centerOnMiddleCard, 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section 
      ref={targetRef}
      className="py-12 sm:py-8 lg:py-12 bg-background relative overflow-hidden requirements-section"
    >
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-6 sm:mb-8 lg:mb-10 ${
            isVisible ? 'animate-section-slide-up' : 'opacity-0'
          }`}
        >
          <h2 className={`services-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-2 sm:mb-4 leading-tight mobile-header ${
            isVisible ? 'animate-header-glow' : ''
          }`}>
            Что нужно{" "}
            <span className="text-primary relative inline-block">
              от вас
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed px-4 mobile-subheader ${
            isVisible ? 'animate-section-fade-scale delay-200' : 'opacity-0'
          }`}>
            Три главных компонента успешного проекта
          </p>
        </div>

                 {/* Карточки в стиле блога */}
         <div ref={scrollContainerRef} className={`w-full overflow-x-auto overflow-y-visible scrollbar-hide pt-8 pb-4 ${
           isVisible ? 'animate-section-reveal-up delay-400' : 'opacity-0'
         }`}>
           <div className="flex justify-start sm:justify-center items-start gap-4 sm:gap-4 lg:gap-6 w-full min-w-max px-4 sm:px-0">
             {requirementCards.map((card, index) => {
               const isHovered = hoveredCard === card.id;
               const rotationClass = index === 0 ? 'rotate-[-3deg] translate-y-[20px] hover:rotate-0 hover:translate-y-0' : 
                                    index === 2 ? 'rotate-[3deg] translate-y-[20px] hover:rotate-0 hover:translate-y-0' : '';
               
               return (
                 <article
                   key={card.id}
                   className={`relative flex flex-col min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] bg-background/90 border-3 border-[#aeef10]/50 dark:border-[#aeef10]/30 overflow-visible rounded-lg border group w-[180px] sm:w-[200px] lg:w-[240px] flex-shrink-0 transition-all duration-300 ease-out translate-y-[5px] hover:-translate-y-1 ${rotationClass} ${
                     isVisible 
                       ? 'animate-requirement-card' 
                       : 'opacity-0'
                   }`}
                   style={{ 
                     animationDelay: `${0.6 + index * 0.2}s`
                   }}
                   onMouseEnter={() => !isMobile && setHoveredCard(card.id)}
                   onMouseLeave={() => !isMobile && setHoveredCard(null)}
                   onTouchStart={() => {
                     if (isMobile) {
                       setHoveredCard(card.id);
                       if (touchTimeout) clearTimeout(touchTimeout);
                     }
                   }}
                   onTouchEnd={() => {
                     if (isMobile) {
                       const timeout = setTimeout(() => setHoveredCard(null), 1500);
                       setTouchTimeout(timeout);
                     }
                   }}
                 >
                {/* Иконка/номер вместо изображения */}
                <div className="relative w-full mb-2 overflow-visible">
                  <div className="aspect-[25/8] w-full bg-gradient-to-br from-primary/10 to-background border-b border-[#aeef10]/50 dark:border-[#aeef10]/50 flex items-center justify-center">
                    <div className={`
                      w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 flex items-center justify-center
                      transition-all duration-300
                      ${isHovered ? 'scale-110' : ''}
                    `}>
                                             {index === 0 && (
                         <div className="relative -mt-4 -mb-2">
                           <img 
                             src="/cosmonaft.png" 
                             alt="Космонавт" 
                             className={`
                               w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                               object-contain 
                               transform rotate-12 hover:rotate-6
                               transition-all duration-300
                               drop-shadow-lg
                               ${isHovered ? 'scale-110 -translate-y-1' : ''}
                             `}
                           />
                         </div>
                       )}
                      {index === 1 && (
                        <div className="relative -mt-4 -mb-2">
                          <img 
                            src="/rocket.png" 
                            alt="Ракета" 
                            className={`
                              w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                              object-contain 
                              transform rotate-12 hover:rotate-6
                              transition-all duration-300
                              drop-shadow-lg
                              ${isHovered ? 'scale-110 -translate-y-1' : ''}
                            `}
                          />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="relative -mt-4 -mb-2">
                          <img 
                            src="/phone.png" 
                            alt="Телефон" 
                            className={`
                              w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                              object-contain 
                              transform rotate-12 hover:rotate-6
                              transition-all duration-300
                              drop-shadow-lg
                              ${isHovered ? 'scale-110 -translate-y-1' : ''}
                            `}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Категория */}
                <div className="flex items-center w-full text-xs px-3 sm:px-4">
                  <div className={`
                    rounded-full px-2 py-1 text-xs font-medium
                    ${card.accentColor === 'primary' ? 'bg-primary/20 text-primary' : 
                      card.accentColor === 'blue-400' ? 'bg-blue-400/20 text-blue-400' : 'bg-purple-400/20 text-purple-400'}
                  `}>
                    Этап {card.number}
                  </div>
                </div>

                {/* Заголовок */}
                <h3 className="mt-2 text-sm sm:text-base font-semibold px-3 sm:px-4 leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  <span className="line-clamp-2">{card.title}</span>
                </h3>

                {/* Описание */}
                <p className="mt-1 px-3 sm:px-4 pb-3 text-xs sm:text-sm text-foreground/70 line-clamp-6 leading-relaxed">
                  {card.description}
                </p>
                               </article>
               );
             })}
           </div>
         </div>

        {/* Финальный призыв к действию */}
        <div
          className={`text-center mt-6 sm:mt-8 lg:mt-10 px-4 ${
            isVisible ? 'animate-section-slide-up delay-1000' : 'opacity-0'
          }`}
        >
          <div className="max-w-3xl mx-auto">
                       
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 mb-6 sm:mb-4 leading-relaxed">
            Готовы создать что-то выдающееся?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg sm:max-w-none mx-auto">
              <Link href="/calculator" className="w-full sm:w-auto">
                <button className={`
                  w-full
                  bg-primary hover:bg-primary-dark text-background 
                  font-semibold text-base sm:text-lg lg:text-xl 
                  px-8 sm:px-10 lg:px-12 py-3.5 sm:py-4 lg:py-5 
                  rounded-full transition-all duration-300 
                  shadow-lg hover:shadow-xl 
                  ${isMobile ? 'active:scale-95' : 'hover:scale-105'}
                  relative overflow-hidden group
                `}>
                  <span className="relative z-10">Обсудить проект</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/0 via-white/10 to-primary-dark/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
                </button>
              </Link>
              
              <a
              href="https://t.me/codevai_team"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-foreground/20 hover:border-primary text-foreground hover:text-primary font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:bg-primary/5 hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Узнать цену
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
