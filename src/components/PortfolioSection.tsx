'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const portfolioProjects = [
  {
    id: 1,
    name: 'Gold Elegance',
    description: 'Компания по декорированию мероприятий. Создаем незабываемую атмосферу с премиальными материалами',
    image: '/gold_elegance.png',
    link: 'https://price-list-goldelegance.vercel.app/'
  },
  {
    id: 2,
    name: 'Apakai',
    description: 'Магазин уходовой косметики и мыломоющих средств с быстрой доставкой и качественными товарами',
    image: '/apakai.png',
    link: 'https://apakai.vercel.app/'
  },
  {
    id: 3,
    name: 'Kelkel Store',
    description: 'Магазин современной бытовой техники с широким ассортиментом и доставкой по Кыргызстану',
    image: '/kelkel_store.png',
    link: 'https://kelkel.store/'
  }
];

export default function PortfolioSection() {
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
        <div className="absolute top-32 right-1/4 w-2 h-48 bg-gradient-to-b from-primary/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-36 bg-gradient-to-b from-blue-400/20 to-transparent -rotate-12"></div>
        <div className="absolute top-1/3 right-10 w-1 h-28 bg-gradient-to-b from-purple-400/20 to-transparent rotate-12"></div>
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
            Примеры{" "}
            <span className="text-primary relative inline-block">
              решений
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-4xl mx-auto font-light leading-relaxed">
            Проекты, которые мы создали для наших клиентов. От лендингов до сложных веб-приложений.
          </p>
        </div>

        {/* Карточки проектов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className={`
                group rounded-xl sm:rounded-2xl
                bg-background/50 backdrop-blur-sm border-2 border-primary/60
                shadow-[0_0_20px_rgba(174,239,16,0.4),0_0_40px_rgba(174,239,16,0.2)]
                transition-all duration-500 ease-out
                hover:bg-primary/5 hover:border-primary/80 hover:scale-105 hover:shadow-[0_0_30px_rgba(174,239,16,0.6),0_0_60px_rgba(174,239,16,0.3)]
                cursor-pointer overflow-hidden
                ${isVisible ? 'animate-fade-in' : 'opacity-0'}
              `}
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              {/* Изображение проекта */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                />
                {/* Оверлей при hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Контент карточки */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h3>
                
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Кнопка */}
                <div className="pt-2">
                  <button 
                    className={`
                      inline-flex items-center gap-2
                      bg-primary hover:bg-primary-dark text-background
                      font-semibold text-sm sm:text-base
                      px-6 py-3 rounded-full
                      transition-all duration-300
                      shadow-lg hover:shadow-xl
                      ${isMobile ? 'active:scale-95' : 'hover:scale-105'}
                      group/btn
                    `}
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <span>Перейти</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
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
              Готовы создать{" "}
              <span className="text-primary">свой проект?</span>
            </h3>
            
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Расскажите о своих задачах, и мы предложим оптимальное решение
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
                <span className="relative z-10">Начать проект</span>
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
                Посмотреть все работы
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
