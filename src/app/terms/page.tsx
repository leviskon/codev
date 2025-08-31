'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TermsOfService() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      id: 1,
      title: "Общие условия",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Используя услуги <span className="text-primary font-semibold">Codev</span>, вы соглашаетесь с настоящими условиями. Мы предоставляем услуги разработки программного обеспечения на основе взаимного уважения и профессионализма.
          </p>
          <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
            <p className="text-foreground/70 leading-relaxed text-sm">
              Наша цель — создавать качественные IT-решения, которые помогают вашему бизнесу расти и развиваться.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Наши услуги",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Codev предоставляет полный спектр услуг в области разработки программного обеспечения:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Веб-приложения", desc: "Современные и производительные веб-решения", icon: "🌐" },
              { title: "Мобильные приложения", desc: "Нативные и кроссплатформенные приложения", icon: "📱" },
              { title: "Telegram-боты", desc: "Автоматизация бизнес-процессов через ботов", icon: "🤖" },
              { title: "CRM и ERP системы", desc: "Корпоративные решения для управления", icon: "📊" },
              { title: "E-commerce платформы", desc: "Интернет-магазины и торговые площадки", icon: "🛒" },
              { title: "Техническая поддержка", desc: "Сопровождение и развитие проектов", icon: "🔧" }
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                  <p className="text-sm text-foreground/70">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Процесс работы",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Мы следуем проверенной методологии разработки для достижения лучших результатов:
          </p>
          <div className="space-y-6">
            {[
              { 
                step: "01", 
                title: "Анализ и планирование", 
                desc: "Детальное изучение требований, составление технического задания и планирование архитектуры",
                color: "from-blue-500/20 to-blue-600/20"
              },
              { 
                step: "02", 
                title: "Договор и предоплата", 
                desc: "Оформление официального договора, определение сроков и внесение предоплаты",
                color: "from-green-500/20 to-green-600/20"
              },
              { 
                step: "03", 
                title: "Разработка", 
                desc: "Итеративная разработка с регулярными демонстрациями промежуточных результатов",
                color: "from-purple-500/20 to-purple-600/20"
              },
              { 
                step: "04", 
                title: "Тестирование", 
                desc: "Комплексное тестирование функциональности, производительности и безопасности",
                color: "from-orange-500/20 to-orange-600/20"
              },
              { 
                step: "05", 
                title: "Запуск и поддержка", 
                desc: "Развертывание продукта, обучение команды и постоянная техническая поддержка",
                color: "from-primary/20 to-primary/30"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10`}>
                    <span className="font-bold text-foreground text-sm">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {index < 4 && (
                  <div className="absolute left-6 top-12 w-px h-6 bg-gradient-to-b from-primary/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Стоимость и оплата",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">💰</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Прозрачное ценообразование</h4>
              <p className="text-sm text-foreground/70">Четкие расценки без скрытых платежей</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">⏱️</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Почасовая ставка</h4>
              <p className="text-sm text-foreground/70">Оплата только за фактически выполненную работу</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">📈</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Гибкие условия</h4>
              <p className="text-sm text-foreground/70">Возможность изменения объема работ</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
            <p className="text-foreground/80 leading-relaxed">
              Стоимость рассчитывается на основе сложности проекта, требуемых технологий и сроков выполнения. 
              Все изменения в проекте обсуждаются заранее с прозрачным ценообразованием.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Интеллектуальная собственность",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Права заказчика</h4>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                После полной оплаты все права на разработанный продукт переходят к заказчику. 
                Вы получаете полные права на исходный код и документацию.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Общие решения</h4>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Мы сохраняем право использовать общие технические решения и наработки в других проектах, 
                что позволяет нам предлагать конкурентные цены.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Гарантии и ответственность",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <div>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Мы берем на себя полную ответственность за качество выполняемых работ и предоставляем следующие гарантии:
          </p>
          <div className="space-y-4">
            {[
              { 
                title: "Качество исполнения", 
                desc: "Выполнение работ строго в соответствии с техническим заданием и лучшими практиками разработки",
                icon: "⭐"
              },
              { 
                title: "Соблюдение сроков", 
                desc: "Четкое следование установленным срокам с регулярными отчетами о ходе выполнения проекта",
                icon: "⏰"
              },
              { 
                title: "Техническая поддержка", 
                desc: "Бесплатная поддержка в течение гарантийного периода, исправление выявленных ошибок",
                icon: "🔧"
              },
              { 
                title: "Конфиденциальность", 
                desc: "Полная конфиденциальность информации о проекте и соблюдение NDA при необходимости",
                icon: "🔒"
              },
              { 
                title: "Безопасность кода", 
                desc: "Соблюдение стандартов безопасности и проведение аудита безопасности разработанного ПО",
                icon: "🛡️"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Изменения условий",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      content: (
        <div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 p-6 rounded-xl border border-yellow-500/20 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Уведомление об изменениях</h4>
                <p className="text-foreground/80 leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящие условия для улучшения качества обслуживания 
                  и соответствия современным требованиям рынка.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-sm font-bold">📧</span>
              </div>
              <p className="text-foreground/80 text-sm">
                Уведомление по электронной почте за 30 дней до вступления изменений в силу
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-sm font-bold">🌐</span>
              </div>
              <p className="text-foreground/80 text-sm">
                Публикация обновленных условий на официальном сайте компании
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-sm font-bold">✅</span>
              </div>
              <p className="text-foreground/80 text-sm">
                Возможность обсуждения изменений, затрагивающих текущие проекты
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h1 className="codev-logo-text text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Условия использования
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
          <div className={`text-center mt-16 pt-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.9s' }}>
                      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Готовы начать проект?</h3>
            <p className="text-foreground/70 mb-6">Давайте обсудим ваши идеи и создадим что-то удивительное вместе!</p>
            
            {/* Контактные способы */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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
            
            <Link 
              href="/#contact"
              className="lime-chat-button inline-flex items-center justify-center gap-2 text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Обсудить проект
            </Link>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
