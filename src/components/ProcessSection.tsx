'use client';

import { useState, useEffect } from 'react';

const processSteps = [
  {
    id: 1,
    title: "Расскажите нам о своём проекте",
    description: "В любом формате: краткий текст, список функций или даже голосовое сообщение.",
    icon: "💬",
    color: "from-slate-800/80 to-slate-900/90",
    borderColor: "border-slate-700/60"
  },
  {
    id: 2,
    title: "Мы готовим прозрачное предложение",
    description: "Детальное КП с функциями, сроками и стоимостью. Без «подводных камней».",
    icon: "📋",
    color: "from-slate-800/80 to-slate-900/90",
    borderColor: "border-slate-700/60"
  },
  {
    id: 3,
    title: "Договор и старт",
    description: "Подписываем соглашение, вы вносите предоплату, и мы начинаем разработку.",
    icon: "🤝",
    color: "from-slate-800/80 to-slate-900/90",
    borderColor: "border-slate-700/60"
  },
  {
    id: 4,
    title: "Разработка в реальном времени",
    description: "Вы получаете доступ к тестовой версии проекта и видите прогресс вживую.",
    icon: "⚡",
    color: "from-slate-800/80 to-slate-900/90",
    borderColor: "border-slate-700/60"
  },
  {
    id: 5,
    title: "Готовое решение",
    description: "Передача проекта, обучение команды и техническая поддержка.",
    icon: "🎉",
    color: "from-slate-800/80 to-slate-900/90",
    borderColor: "border-slate-700/60"
  }
];

export default function ProcessSection() {
  const isVisible = true; // Сразу делаем видимым
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определение мобильного устройства
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Throttled resize listener
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
      className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden"
    >
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ 
            animationDelay: '2.0s'
          }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Как из идеи рождается{" "}
            <span className="text-primary">готовый продукт</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Прозрачный процесс разработки без сюрпризов и скрытых платежей
          </p>
        </div>



        {/* Центральная линия для десктопа */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-10">
          <div 
            className={`w-0.5 h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent ${
              isVisible ? 'animate-line-draw' : 'opacity-0'
            }`}
            style={{ 
              animationDelay: '2.2s'
            }}
          />
        </div>

        {/* Карточки процесса в шахматном порядке */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20 max-w-7xl mx-auto relative z-10 gpu-accelerated">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === processSteps.length - 1;
            const staggerClass = `stagger-${index + 1}`;
            
            return (
              <div
                key={step.id}
                className="group relative"
              >
                <div className={`flex ${isEven ? 'justify-start lg:justify-end' : 'justify-start'}`}>
                  {/* Контентная часть */}
                  <div
                    className={`w-full lg:w-2/5 space-y-4 ${isEven ? 'lg:mr-16' : 'lg:ml-16'} gpu-accelerated ${
                      isVisible 
                        ? (isEven ? `animate-slide-left ${staggerClass}` : `animate-slide-right ${staggerClass}`)
                        : 'opacity-0'
                    } ${isMobile ? '' : 'hover-scale'}`}
                    style={{ willChange: 'transform' }}
                  >
                    <div className={`relative p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl ${isMobile ? 'bg-background/50' : 'bg-background/50'} backdrop-blur-sm border-2 border-primary/60 shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)] hover:border-primary/80 hover:bg-primary/5 hover:shadow-[0_0_30px_rgba(174,239,16,0.6),0_0_60px_rgba(174,239,16,0.3)] transition-all duration-200 ${isMobile ? '' : 'hover:shadow-xl'} gpu-accelerated`}>
                      {/* Номер этапа */}
                      <div className={`absolute -top-4 ${isEven ? '-left-4' : '-right-4'} w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center text-background font-bold text-lg sm:text-xl ${isMobile ? '' : 'shadow-lg'}`}>
                        {step.id}
                      </div>

                      <div className="space-y-4">
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-foreground ${isMobile ? '' : 'group-hover:text-primary transition-colors duration-200'}`}>
                          {step.title}
                        </h3>
                        
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Мобильная стрелка вниз */}
                {!isLast && (
                  <div className="lg:hidden flex justify-center mt-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary/60">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA внизу секции */}
        <div
          className={`text-center mt-12 sm:mt-16 lg:mt-20 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ 
            animationDelay: isMobile ? '3.2s' : '3.8s'
          }}
        >
          <button className="bg-primary hover:bg-primary-dark text-background font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Начать проект прямо сейчас
          </button>
        </div>
      </div>
    </section>
  );
}
