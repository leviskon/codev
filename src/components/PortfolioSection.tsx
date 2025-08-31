'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

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

  return (
    <section 
      ref={targetRef}
      className="py-12 sm:py-8 lg:py-12 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок секции */}
        <div
          className={`text-center mb-6 sm:mb-8 lg:mb-10 ${
            isVisible ? 'animate-section-slide-up' : 'opacity-0'
          }`}
        >
          <h2 className={`services-title text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground mb-2 sm:mb-4 leading-tight ${
            isVisible ? 'animate-header-glow' : ''
          }`}>
            Примеры{" "}
            <span className="text-primary relative inline-block">
              решений
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed ${
            isVisible ? 'animate-section-fade-scale delay-200' : 'opacity-0'
          }`}>
            Проекты, которые мы создали для наших клиентов
          </p>
        </div>

        {/* Карусель проектов */}
        <div className={`w-full overflow-x-auto overflow-y-visible scrollbar-hide py-4 ${
          isVisible ? 'animate-section-reveal-up delay-400' : 'opacity-0'
        }`}>
          <div className="flex gap-6 sm:gap-8 w-max px-4 sm:px-0">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  group flex-shrink-0 w-[300px] sm:w-[340px] 
                  bg-background/80 hover:bg-background/90
                  border border-foreground/10 hover:border-primary/40
                  rounded-xl cursor-pointer
                  transition-all duration-300 ease-out
                  hover:shadow-lg hover:shadow-primary/10
                  ${isVisible ? 'animate-portfolio-slide' : 'opacity-0'}
                `}
                style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                onClick={() => window.open(project.link, '_blank')}
              >
                {/* Изображение */}
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 300px, 340px"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Clean indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Simple action */}
                  <div className="flex items-center text-primary/70 group-hover:text-primary text-sm font-medium transition-colors duration-300">
                    <span>Посмотреть проект</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA внизу секции */}
        <div
          className={`text-center mt-6 sm:mt-8 max-w-2xl mx-auto ${
            isVisible ? 'animate-section-slide-up delay-1000' : 'opacity-0'
          }`}
        >
          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-3">
            Готовы создать свой проект? Расскажите о задачах
          </p>
          
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
        </div>
      </div>
    </section>
  );
}
