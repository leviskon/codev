'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      id: 1,
      title: "Общие положения",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях услуг <span className="text-primary font-semibold">Codev</span> (далее — «Компания»).
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Мы стремимся обеспечить максимальную безопасность ваших персональных данных и соблюдаем все требования действующего законодательства.
          </p>
        </div>
      )
    },
    {
      id: 2,
      title: "Сбор информации",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Мы собираем только необходимую информацию для предоставления качественных услуг:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Контактные данные</h4>
                <p className="text-sm text-foreground/70">Имя, email, телефон для связи</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Информация о проекте</h4>
                <p className="text-sm text-foreground/70">Детали и требования к разработке</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Техническая информация</h4>
                <p className="text-sm text-foreground/70">Данные для улучшения сервиса</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Файлы cookie</h4>
                <p className="text-sm text-foreground/70">Для корректной работы сайта</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Использование данных",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Ваши данные используются исключительно в следующих целях:
          </p>
          <div className="space-y-4">
            {[
              { title: "Связь с клиентами", desc: "Обсуждение проектов и предоставление консультаций" },
              { title: "Техническая поддержка", desc: "Решение вопросов и помощь в использовании продуктов" },
              { title: "Улучшение услуг", desc: "Анализ потребностей для развития наших решений" },
              { title: "Информирование", desc: "Уведомления о новых возможностях и обновлениях" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-foreground/10">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Защита данных",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Мы применяем современные методы защиты информации:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">SSL шифрование</h4>
              <p className="text-sm text-foreground/70">Защищенная передача данных</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">GDPR соответствие</h4>
              <p className="text-sm text-foreground/70">Европейские стандарты защиты</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Безопасное хранение</h4>
              <p className="text-sm text-foreground/70">Защищенные серверы</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Ваши права",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            В соответствии с законодательством, вы имеете следующие права:
          </p>
          <div className="space-y-4">
            {[
              { right: "Доступ к данным", desc: "Получить информацию о том, какие данные мы храним" },
              { right: "Исправление данных", desc: "Потребовать исправления неточной информации" },
              { right: "Удаление данных", desc: "Запросить полное удаление ваших персональных данных" },
              { right: "Ограничение обработки", desc: "Ограничить использование ваших данных" },
              { right: "Переносимость данных", desc: "Получить данные в структурированном формате" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.right}</h4>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Контакты",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            По всем вопросам, связанным с защитой персональных данных и конфиденциальностью, обращайтесь к нам:
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Служба поддержки Codev</h4>
                <p className="text-foreground/70">Ответим на все ваши вопросы в течение 24 часов</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a 
                href="mailto:team.codevai@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg text-sm hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all group"
              >
                <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-foreground/80 group-hover:text-primary transition-colors">Email</span>
              </a>
              <a 
                href="https://t.me/codevai_team"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg text-sm hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all group"
              >
                <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="text-foreground/80 group-hover:text-primary transition-colors">Telegram</span>
              </a>
              <a 
                href="https://wa.me/996700746333"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg text-sm hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all group"
              >
                <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="text-foreground/80 group-hover:text-primary transition-colors">WhatsApp</span>
              </a>
              <a 
                href="https://www.instagram.com/codevai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg text-sm hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all group"
              >
                <svg className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-foreground/80 group-hover:text-primary transition-colors">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Шапка */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link 
              href="/" 
              className="inline-flex items-center text-primary hover:text-primary-dark transition-all duration-300 mb-8 group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Назад на главную</span>
            </Link>
            
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="codev-logo-text text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Политика конфиденциальности
              </h1>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>

          {/* Контент */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section 
                key={section.id}
                className={`bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl flex items-center justify-center text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{section.id}. {section.title}</h2>
                  </div>
                </div>
                <div className="pl-0 sm:pl-16">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center mt-16 pt-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Есть вопросы по конфиденциальности?</h3>
              <p className="text-foreground/70 mb-6">Мы всегда готовы ответить на ваши вопросы и обеспечить максимальную защиту ваших данных.</p>
              <Link 
                href="/#contact"
                className="lime-chat-button inline-flex items-center justify-center gap-2 text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
