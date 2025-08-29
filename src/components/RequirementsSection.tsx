'use client';

import { useState, useEffect } from 'react';

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
  const isVisible = true; // Сразу делаем видимым
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);

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

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-background relative overflow-hidden requirements-section">
      {/* Минималистичный фон */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-10 w-1 h-32 bg-primary/20 rotate-12"></div>
        <div className="absolute top-1/2 right-20 w-1 h-24 bg-blue-400/20 -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-16 bg-purple-400/20 rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ 
            animationDelay: '0.2s'
          }}
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8 leading-tight mobile-header">
            Что нужно{" "}
            <span className="text-primary relative inline-block">
              от вас
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed px-4 mobile-subheader">
            Три главных компонента успешного проекта
          </p>
        </div>

        {/* Карточки в вертикальном списке */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
          {requirementCards.map((card, index) => {
            const isHovered = hoveredCard === card.id;
            
            return (
              <div
                key={card.id}
                className={`group ${
                  isVisible 
                    ? 'animate-fade-in' 
                    : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${0.4 + index * 0.2}s`
                }}
                onMouseEnter={() => !isMobile && setHoveredCard(card.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                onTouchStart={() => {
                  if (isMobile) {
                    setHoveredCard(card.id);
                    // Очищаем предыдущий таймер
                    if (touchTimeout) clearTimeout(touchTimeout);
                  }
                }}
                onTouchEnd={() => {
                  if (isMobile) {
                    // Убираем подсветку через 1.5 секунды
                    const timeout = setTimeout(() => setHoveredCard(null), 1500);
                    setTouchTimeout(timeout);
                  }
                }}
              >
                <div className={`
                  relative p-4 sm:p-6 lg:p-8 xl:p-12 
                  bg-background/50 backdrop-blur-sm
                  border-2 border-primary/60 
                  rounded-xl sm:rounded-2xl
                  shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)]
                  transition-all duration-500 ease-out
                  ${isHovered ? 'bg-primary/5 border-primary/80 shadow-[0_0_30px_rgba(174,239,16,0.6),0_0_60px_rgba(174,239,16,0.3)] scale-[1.01] sm:scale-[1.02]' : 'hover:bg-primary/5 hover:border-primary/70 hover:shadow-[0_0_25px_rgba(174,239,16,0.5),0_0_50px_rgba(174,239,16,0.25)]'}
                  cursor-pointer
                  ${isMobile ? 'active:scale-[0.98] mobile-card-container mobile-card-padding' : ''}
                  mobile-touch-target
                `}>
                  
                  {/* Мобильная версия - вертикальный макет */}
                  <div className="block sm:hidden">
                    {/* Номер и заголовок */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`
                        flex-shrink-0 w-16 h-16
                        flex items-center justify-center
                        text-3xl font-bold
                        transition-all duration-500
                        ${card.accentColor === 'primary' ? 'text-primary' : 
                          card.accentColor === 'blue-400' ? 'text-blue-400' : 'text-purple-400'}
                        ${isHovered ? 'scale-110' : ''}
                      `}>
                        {card.number}
                      </div>
                      
                      <h3 className={`
                        text-xl font-bold text-foreground
                        transition-colors duration-300
                        ${isHovered ? 'text-primary' : ''}
                      `}>
                        {card.title}
                      </h3>
                    </div>
                    
                    {/* Вопрос */}
                    <h4 className="text-base font-medium text-foreground/90 mb-3 leading-tight">
                      {card.question}
                    </h4>
                    
                    {/* Описание */}
                    <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* Фичи - одна колонка на мобильном */}
                    <div className="space-y-2">
                      {card.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className={`
                            p-3 
                            bg-background/50 border border-border/50
                            rounded-lg
                            text-sm text-foreground/80
                            transition-all duration-300
                            ${isHovered ? 'bg-background/80 border-primary/20' : ''}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`
                              w-1.5 h-1.5 rounded-full
                              ${card.accentColor === 'primary' ? 'bg-primary' : 
                                card.accentColor === 'blue-400' ? 'bg-blue-400' : 'bg-purple-400'}
                            `}></div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Десктопная версия - горизонтальный макет */}
                  <div className="hidden sm:block">
                    <div className="flex items-start gap-6 lg:gap-8 xl:gap-12">
                      <div className={`
                        flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24
                        flex items-center justify-center
                        text-4xl lg:text-5xl xl:text-6xl font-bold
                        transition-all duration-500
                        ${card.accentColor === 'primary' ? 'text-primary' : 
                          card.accentColor === 'blue-400' ? 'text-blue-400' : 'text-purple-400'}
                        ${isHovered ? 'scale-110' : ''}
                      `}>
                        {card.number}
                      </div>

                      {/* Контент */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-4 lg:mb-6">
                          <h3 className={`
                            text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-foreground mb-2 lg:mb-3
                            transition-colors duration-300
                            ${isHovered ? 'text-primary' : ''}
                          `}>
                            {card.title}
                          </h3>
                          
                          <h4 className="text-base lg:text-lg xl:text-xl font-medium text-foreground/90 mb-3 lg:mb-4">
                            {card.question}
                          </h4>
                          
                          <p className="text-sm lg:text-base xl:text-lg text-foreground/70 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* Фичи */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-3 xl:gap-4">
                          {card.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`
                                p-2.5 lg:p-3 xl:p-4 
                                bg-background/50 border border-border/50
                                rounded-lg xl:rounded-xl
                                text-xs lg:text-sm xl:text-base text-foreground/80
                                transition-all duration-300
                                ${isHovered ? 'bg-background/80 border-primary/20' : ''}
                              `}
                            >
                              <div className="flex items-center gap-1.5 lg:gap-2">
                                <div className={`
                                  w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full
                                  ${card.accentColor === 'primary' ? 'bg-primary' : 
                                    card.accentColor === 'blue-400' ? 'bg-blue-400' : 'bg-purple-400'}
                                `}></div>
                                <span className="font-medium">{feature}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Акцентная линия слева */}
                  <div className={`
                    absolute left-0 top-1/2 transform -translate-y-1/2
                    w-0.5 sm:w-1 h-0 rounded-full
                    transition-all duration-500
                    ${card.accentColor === 'primary' ? 'bg-primary' : 
                      card.accentColor === 'blue-400' ? 'bg-blue-400' : 'bg-purple-400'}
                    ${isHovered ? 'h-1/2 sm:h-2/3' : 'h-1/4 sm:h-1/3'}
                  `}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Финальный призыв к действию */}
        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 xl:mt-24 px-4 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ 
            animationDelay: '1.5s'
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Готовы создать что-то{" "}
              <span className="text-primary">выдающееся?</span>
            </h3>
            
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 mb-6 sm:mb-8 leading-relaxed">
              Опишите свою идею, и мы превратим её в работающее решение
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg sm:max-w-none mx-auto">
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
                <span className="relative z-10">Обсудить проект</span>
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
                Узнать цену
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
