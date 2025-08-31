'use client';


import { motion } from 'framer-motion';
import CodevLogoAnimated from './CodevLogoAnimated';

export default function HeroSection() {
  const isVisible = true; // Сразу делаем видимым

  return (
          <section 
        className="min-h-screen sm:min-h-[90vh] lg:min-h-[85vh] bg-background relative overflow-hidden flex items-center pt-20 sm:pt-24 lg:pt-20 pb-6 sm:pb-8 lg:pb-8"
      >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Текстовая секция */}
          <div 
            className={`space-y-4 sm:space-y-6 text-center lg:text-left ${
              isVisible ? 'animate-slide-bottom' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
                        <div 
              className={`space-y-3 sm:space-y-4 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <h1 
                className={`text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight lg:leading-[50px] lg:mt-8 ${
                  isVisible ? 'animate-slide-bottom' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                <span 
                  className={`text-foreground ${
                    isVisible ? 'animate-slide-left-hero' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.4s' }}
                >
                  Расскажите о своё м{" "}
                </span>
                <span 
                  className={`text-primary ${
                    isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.5s' }}
                >
                  бизнесе
                </span>
                <span 
                  className={`text-foreground ${
                    isVisible ? 'animate-slide-left-hero' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.6s' }}
                >
                  {" "}— получите идею{" "}
                </span>
                <span 
                  className={`text-primary ${
                    isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.7s' }}
                >
                  цифрового решения
                </span>
                <span 
                  className={`text-foreground ${
                    isVisible ? 'animate-slide-left-hero' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.8s' }}
                >
                  {" "}за минуту
                </span>
              </h1>
              
              <p 
                className={`text-base sm:text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                  isVisible ? 'animate-slide-bottom' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.9s' }}
              >
                Наш AI-помощник сразу рассчитает примерную стоимость и сроки разработки. 
                Попробуйте бесплатно прямо сейчас.
              </p>
            </div>

            {/* CTA кнопка */}
            <div
              className={`${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.0s' }}
            >
              <div className="sp mx-auto lg:mx-0 w-fit">
                <button 
                  className="sparkle-button"
                  style={{ animationDelay: '1.5s' }}
                >
                  <span className="spark"></span>
                  <span className="backdrop"></span>
                  <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text">Калькулятор стоимости</span>
                </button>
                <div className="bodydrop"></div>
                <span aria-hidden="true" className="particle-pen">
                  {[...Array(16)].map((_, i) => (
                    <svg key={i} className="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  ))}
                </span>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div 
              className={`flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.1s' }}
            >
              {[
                "Бесплатная консультация",
                "Расчёт за 1 минуту", 
                "Индивидуальное решение"
              ].map((text, index) => (
                <div 
                  key={text}
                  className={`flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-foreground/60 ${
                    isVisible ? 'animate-slide-left-hero' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${1.2 + index * 0.05}s` }}
                >
                  <div 
                    className={`w-1.5 h-1.5 bg-primary rounded-full ${
                      isVisible ? 'animate-dot-pulse' : ''
                    }`}
                    style={{ animationDelay: `${1.6 + index * 0.1}s` }}
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Визуальная секция */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-[300px] sm:h-[420px] md:h-[500px] lg:h-[520px] xl:h-[580px]">
              {/* Sparkle звёзды вокруг логотипа */}
              <div className="absolute inset-0">
                {/* Основные sparkle - большие */}
                <div className="absolute top-8 left-8 sm:top-12 sm:left-12 lg:top-16 lg:left-16">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary animate-sparkle-blink-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                
                <div className="absolute top-1/2 left-4 sm:left-6 lg:left-8 transform -translate-y-1/2">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-primary/90 animate-sparkle-blink-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                
                <div className="absolute bottom-16 left-16 sm:bottom-20 sm:left-20 lg:bottom-24 lg:left-24">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary animate-sparkle-blink-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute top-6 right-4 sm:top-8 sm:right-6 lg:top-12 lg:right-8">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary/85 animate-sparkle-blink-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute top-1/2 right-6 sm:right-8 lg:right-10 transform -translate-y-1/2">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary/70 animate-sparkle-blink-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-primary/80 animate-sparkle-blink-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                
                {/* Средние sparkle */}
                <div className="absolute top-12 right-12 sm:top-16 sm:right-16 lg:top-20 lg:right-20">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary/80 animate-sparkle-blink-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute top-32 left-12 sm:top-36 sm:left-16 lg:top-40 lg:left-20">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary/75 animate-sparkle-blink-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute bottom-32 right-16 sm:bottom-36 sm:right-20 lg:bottom-40 lg:right-24">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary/70 animate-sparkle-blink-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                
                {/* Маленькие sparkle */}
                <div className="absolute top-20 right-1/4 sm:top-24 sm:right-1/3">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-primary/60 animate-sparkle-blink-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                
                <div className="absolute bottom-1/3 left-1/4 sm:bottom-1/4 sm:left-1/3">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-primary/50 animate-sparkle-blink-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute top-16 left-1/3 sm:top-20 sm:left-1/3">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3 lg:h-3 text-primary/45 animate-sparkle-blink-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute bottom-20 right-1/3 sm:bottom-24 sm:right-1/3">
                  <svg className="w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 text-primary/40 animate-sparkle-blink-13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>

                <div className="absolute top-1/3 left-12 sm:top-1/3 sm:left-16 transform -translate-y-1/2">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3 lg:h-3 text-primary/55 animate-sparkle-blink-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              
              {/* Анимированный логотип собирающийся из кусочков */}
              <div className="absolute inset-0 flex items-start justify-center pt-4 sm:items-center sm:pt-0">
                <motion.div
                  // Добавляем лёгкое покачивание после сборки
                  animate={{ 
                    y: [0, -8, 0, -5, 0],
                    rotate: [0, 0.5, 0, -0.5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3.5 // Начинаем после завершения сборки
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <CodevLogoAnimated 
                    className="w-72 h-72 xs:w-80 xs:h-80 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] cursor-pointer"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
