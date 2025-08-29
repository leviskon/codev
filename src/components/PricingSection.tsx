'use client';

import { useState, useEffect } from 'react';

// Прозрачные преимущества
const transparencyBenefits = [
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Почасовая оплата',
    description: 'Считаем время разработки и опыт команды. Без накруток на "бренд".'
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Видите прогресс',
    description: 'Ежедневные отчеты о потраченном времени. Знаете, за что платите.'
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Без скрытых платежей',
    description: 'Никаких "дополнительных модулей" или неожиданных доплат.'
  },
  {
    icon: (
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: 'Максимум за минимум',
    description: 'Используем готовые решения там, где это разумно. Экономим ваш бюджет.'
  }
];

export default function PricingSection() {
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
        <div className="absolute top-20 left-1/4 w-2 h-40 bg-gradient-to-b from-primary/20 to-transparent rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-1 h-32 bg-gradient-to-b from-blue-400/20 to-transparent -rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-1 h-24 bg-gradient-to-b from-purple-400/20 to-transparent rotate-45"></div>
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
            Прозрачная стоимость{" "}
            <span className="text-primary relative inline-block">
              без лишних трат
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-4xl mx-auto font-light leading-relaxed">
            Мы считаем стоимость по времени и опыту разработчиков. 
            Вы сразу знаете, за что платите.
          </p>
        </div>

        {/* Преимущества прозрачности */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
          {transparencyBenefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`
                group p-6 sm:p-8 rounded-xl sm:rounded-2xl
                bg-background/50 backdrop-blur-sm border-2 border-primary/60
                shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)]
                transition-all duration-500 ease-out
                hover:bg-primary/5 hover:border-primary/80 hover:scale-105 hover:shadow-[0_0_30px_rgba(174,239,16,0.6),0_0_60px_rgba(174,239,16,0.3)]
                cursor-pointer
                ${isVisible ? 'animate-fade-in' : 'opacity-0'}
              `}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-benefit-hover" style={{ animationDelay: `${index * 0.5}s` }}>
                  {benefit.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>



        {/* CTA */}
        <div
          className={`text-center mt-16 sm:mt-20 lg:mt-24 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.2s' }}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Получите точную{" "}
              <span className="text-primary">стоимость проекта</span>
            </h3>
            
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Опишите свою задачу, и мы подготовим детальное КП с точными сроками и стоимостью
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
                <span className="relative z-10">Получить КП</span>
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
                Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
