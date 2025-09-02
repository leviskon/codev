'use client';

import React, { useState, useMemo, useEffect } from 'react'
import _ from 'lodash'

// NOTE: This single-file React component assumes TailwindCSS is available
// If you don't have Tailwind in your environment, include the CDN in index.html:
// <script src="https://cdn.tailwindcss.com"></script>

interface Preset {
  label: string;
  business: string[];
  goals: string[];
  techs: string[];
}

interface Plan {
  level: string;
  price: number;
  timeline_weeks: number;
  modules: string[];
  details: string;
}

interface Common {
  stack: string[];
  integrations: string[];
  roi: string;
  nextSteps: string[];
}

interface Proposal {
  price: number;
  timeline_weeks: number;
  title: string;
  description: string;
  functionality: string[];
  additional_recommendations?: {
    title: string;
    description: string;
    additional_cost: number;
    additional_weeks: number;
    priority: 'high' | 'medium' | 'low';
  }[];
  phases: {
    name: string;
    duration_weeks: number;
    description: string;
    deliverables: string[];
  }[];
  technical_stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
  };
  architecture: string;
  integrations: string[];
  budget_justification?: string;
  risks: {
    risk: string;
    mitigation: string;
  }[];
  roi: string;
  support: string;
  nextSteps: string[];
}

interface Contact {
  fullName: string;
  whatsapp: string;
}

// Typewriter анимация компонент
function TypewriterAnimation() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  const texts = [
    'ваши требования к проекту',
    'потенциальные сроки реализации', 
    'сложность разработки',
    'необходимый технологический стек',
    'объём работы команды',
    'возможные риски и ограничения'
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const currentFullText = texts[currentIndex]
    
    if (isTyping) {
      if (currentText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => currentFullText.slice(0, prev.length + 1))
        }, 80) // Скорость печати
      } else {
        // Пауза после завершения печати
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1))
        }, 50) // Скорость стирания
      } else {
        // Пауза перед следующей строкой
        timeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length)
          setIsTyping(true)
        }, 500)
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentText, currentIndex, isTyping])

  // Мигание курсора
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center text-sm">
      <span className="text-gray-400">Анализируем&nbsp;</span>{" "}
      <span className="text-black">
        {currentText}
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
      </span>
    </div>
  )
}

export default function AiSolutionPicker() {
  const BUSINESS = [
    'Ресторан','Розница','Школа','Услуги','IT','Медицина','Образование','Логистика','Туризм','Недвижимость','Другое'
  ]
  const GOALS = [
    'Увеличить продажи','Автоматизировать процессы','Улучшить маркетинг','Повысить лояльность','Снизить затраты','Аналитика','Онлайн-оплата','Онлайн-запись','Доставка','Поддержка'
  ]
  const TECHS = [
    'Сайт','Интернет-магазин','Мобильное приложение','Telegram-бот','WhatsApp-бот','CRM','ERP','BI-дэшборд','1С','Интеграции с кассой','Онлайн-платежи'
  ]
  const PRESETS: Preset[] = [
    {label: 'Ресторан — Доставка', business: ['Ресторан'], goals: ['Доставка','Онлайн-оплата','Поддержка'], techs: ['Сайт','Интеграции с кассой','Платежи','Telegram-бот']},
    {label: 'Магазин — Онлайн-продажи', business: ['Розница'], goals: ['Увеличить продажи','Онлайн-оплата','Доставка'], techs: ['Интернет-магазин','Платежи','CRM','Интеграции с кассой']},
    {label: 'Школа — Запись и оплата', business: ['Школа','Образование'], goals: ['Онлайн-запись','Онлайн-оплата','Аналитика'], techs: ['Сайт','Платежи','CRM','BI-дэшборд']}
  ]

  const [step, setStep] = useState<number>(1)
  const [selectedBusiness, setSelectedBusiness] = useState<string>('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [budgetLevel, setBudgetLevel] = useState<string>('MVP')
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [context, setContext] = useState<string>('')
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false)
  const [contact, setContact] = useState<Contact>({fullName:'', whatsapp:''})
  const [activeResultTab, setActiveResultTab] = useState<string>('MVP')
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [customBusiness, setCustomBusiness] = useState<string>('')
  const [showCustomBusiness, setShowCustomBusiness] = useState<boolean>(false)
  const [customGoal, setCustomGoal] = useState<string>('')
  const [showCustomGoal, setShowCustomGoal] = useState<boolean>(false)
  const [budgetRange, setBudgetRange] = useState<{min: number, max: number}>({min: 20000, max: 2000000})
  const [timelineRange, setTimelineRange] = useState<{min: number, max: number}>({min: 2, max: 12})
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [selectedRecommendations, setSelectedRecommendations] = useState<number[]>([])
  
  // Состояния для редактирования инпутов
  const [budgetInputs, setBudgetInputs] = useState<{min: string, max: string}>({min: '', max: ''})
  const [timelineInputs, setTimelineInputs] = useState<{min: string, max: string}>({min: '', max: ''})
  const [inputFocus, setInputFocus] = useState<{budget_min: boolean, budget_max: boolean, timeline_min: boolean, timeline_max: boolean}>({
    budget_min: false, budget_max: false, timeline_min: false, timeline_max: false
  })

  // helpers
  const toggleGoals = (arr: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (val === 'Другое') {
      if (arr.includes('Другое')) {
        setter(arr.filter((x: string) => x !== 'Другое'))
        setShowCustomGoal(false)
        setCustomGoal('')
      } else {
        setter([...arr, 'Другое'])
        setShowCustomGoal(true)
      }
    } else {
      if (arr.includes(val)) setter(arr.filter((x: string) => x !== val))
      else setter([...arr, val])
    }
  }

  const selectBusiness = (val: string) => {
    if (val === 'Другое') {
      setSelectedBusiness('Другое')
      setShowCustomBusiness(true)
    } else {
      setSelectedBusiness(val)
      setShowCustomBusiness(false)
      setCustomBusiness('')
    }
  }

  const toggleTechs = (arr: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (arr.includes(val)) setter(arr.filter((x: string) => x !== val))
    else setter([...arr, val])
  }



  const resetWizard = ()=>{
    setStep(1); setSelectedBusiness(''); setSelectedGoals([]); setBudgetLevel('MVP'); setSelectedTechs([]); setContext(''); setProposal(null); setCustomBusiness(''); setShowCustomBusiness(false); setCustomGoal(''); setShowCustomGoal(false); setBudgetRange({min: 20000, max: 2000000}); setTimelineRange({min: 2, max: 12}); setIsGenerating(false); setSelectedRecommendations([]); setBudgetInputs({min: '', max: ''}); setTimelineInputs({min: '', max: ''}); setInputFocus({budget_min: false, budget_max: false, timeline_min: false, timeline_max: false}); setContact({fullName:'', whatsapp:''})
  }

  const editDetails = () => {
    setStep(1); // Возвращаемся к первому шагу, но данные сохраняются
    setProposal(null); // Очищаем предложение
    setIsGenerating(false)
  }

  const toggleRecommendation = (index: number) => {
    setSelectedRecommendations(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Функции для валидации инпутов при потере фокуса
  const validateBudgetInput = (field: 'min' | 'max', value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '')
    
    if (cleanValue === '' || cleanValue === '0') {
      // Если поле пустое, не меняем значение, просто очищаем инпут
      if (field === 'min') {
        setBudgetInputs({...budgetInputs, min: ''})
      } else {
        setBudgetInputs({...budgetInputs, max: ''})
      }
      return
    }

    const numValue = Number(cleanValue)
    
    if (field === 'min') {
      if (numValue >= 20000 && numValue <= 2000000 && numValue <= budgetRange.max) {
        setBudgetRange({...budgetRange, min: numValue})
      }
      setBudgetInputs({...budgetInputs, min: ''})
    } else {
      if (numValue >= 20000 && numValue <= 2000000 && numValue >= budgetRange.min) {
        setBudgetRange({...budgetRange, max: numValue})
      }
      setBudgetInputs({...budgetInputs, max: ''})
    }
  }

  const validateTimelineInput = (field: 'min' | 'max', value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '')
    
    if (cleanValue === '' || cleanValue === '0') {
      // Если поле пустое, не меняем значение, просто очищаем инпут
      if (field === 'min') {
        setTimelineInputs({...timelineInputs, min: ''})
      } else {
        setTimelineInputs({...timelineInputs, max: ''})
      }
      return
    }

    const numValue = Number(cleanValue)
    
    if (field === 'min') {
      if (numValue >= 1 && numValue <= 52 && numValue <= timelineRange.max) {
        setTimelineRange({...timelineRange, min: numValue})
      }
      setTimelineInputs({...timelineInputs, min: ''})
    } else {
      if (numValue >= 1 && numValue <= 52 && numValue >= timelineRange.min) {
        setTimelineRange({...timelineRange, max: numValue})
      }
      setTimelineInputs({...timelineInputs, max: ''})
    }
  }

  // Функция отправки заявки с PDF
  const submitRequest = async () => {
    if (!contact.fullName || !contact.whatsapp) {
      setToast('Пожалуйста, заполните все поля')
      return
    }

    if (!proposal) {
      setToast('Ошибка: предложение не найдено')
      return
    }

    try {
      setToast('Отправляем заявку...')
      
      const requestData = {
        contact,
        proposal,
        selectedRecommendations,
        projectData: {
          business: selectedBusiness === 'Другое' && customBusiness ? customBusiness : selectedBusiness,
          goals: selectedGoals.includes('Другое') && customGoal 
            ? selectedGoals.filter(g => g !== 'Другое').concat(customGoal)
            : selectedGoals,
          technologies: selectedTechs,
          context,
          budgetRange,
          timelineRange
        },
        totalPrice: getTotalPriceAndTime().price,
        totalWeeks: getTotalPriceAndTime().weeks
      }

      const response = await fetch('/api/send-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        setToast('Заявка успешно отправлена! PDF отправлен администратору.')
        setShowRequestModal(false)
        setContact({fullName:'', whatsapp:''})
      } else {
        setToast('Ошибка при отправке заявки')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      setToast('Ошибка при отправке заявки')
    }
  }

  // Рассчитываем итоговую стоимость и сроки с учетом выбранных рекомендаций
  const getTotalPriceAndTime = () => {
    if (!proposal) return { price: 0, weeks: 0 }
    
    const additionalCost = selectedRecommendations.reduce((sum, index) => {
      const rec = proposal.additional_recommendations?.[index]
      return sum + (rec?.additional_cost || 0)
    }, 0)
    
    const additionalWeeks = selectedRecommendations.reduce((sum, index) => {
      const rec = proposal.additional_recommendations?.[index]
      return sum + (rec?.additional_weeks || 0)
    }, 0)
    
    return {
      price: proposal.price + additionalCost,
      weeks: proposal.timeline_weeks + additionalWeeks
    }
  }

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (step > 1) {
        event.preventDefault()
        setStep(step - 1)
        // Update browser history without triggering popstate
        window.history.pushState({ step: step - 1 }, '', '/calculator')
      }
    }

    // Push initial state
    window.history.pushState({ step }, '', '/calculator')
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [step])

  // Update browser history when step changes
  useEffect(() => {
    if (step > 1) {
      window.history.pushState({ step }, '', '/calculator')
    }
  }, [step])



  // Live estimate calculation
  const estimate = useMemo(()=>{
    // Base minutes and cost per selected tech
    const techBase = selectedTechs.length * 80000 // base per tech in KGS (example)
    const goalsFactor = Math.max(1, selectedGoals.length * 0.25)
    const businessFactor = Math.max(1, selectedBusiness.length * 0.15)
    const budgetMultiplier = budgetLevel === 'MVP' ? 0.65 : budgetLevel === 'Оптимальный' ? 1 : 1.6
    const cost = Math.round( (50000 + techBase) * goalsFactor * businessFactor * budgetMultiplier / 1000 ) * 1000

    // timeframe
    let weeks = 2 + Math.ceil(selectedTechs.length * (budgetLevel === 'MVP' ? 1 : budgetLevel === 'Оптимальный' ? 1.6 : 2.6))
    weeks = Math.max(2, weeks)

    return { cost, weeks }
  },[selectedTechs, selectedGoals, selectedBusiness, budgetLevel])

  const generateProposal = async () => {
    setIsGenerating(true)
    let aiResponse = '' // Для доступа в catch блоке
    try {
      // Формируем промпт из собранных данных
      const businessType = selectedBusiness === 'Другое' && customBusiness ? customBusiness : selectedBusiness
      const goals = selectedGoals.includes('Другое') && customGoal 
        ? selectedGoals.filter(g => g !== 'Другое').concat(customGoal).join(', ')
        : selectedGoals.join(', ')
      
      const prompt = `Ты - эксперт по разработке IT-решений. Создай детальное предложение для следующего проекта:

ДАННЫЕ ПРОЕКТА:
- Сфера бизнеса: ${businessType}
- Цели проекта: ${goals}
- Технологии: ${selectedTechs.join(', ')}
- Бюджет: ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} KGS
- Сроки: ${timelineRange.min} - ${timelineRange.max} недель
- Дополнительная информация: ${context}

ТРЕБОВАНИЯ К ОТВЕТУ:
1. ВАЖНО: Ответь СТРОГО в JSON формате. Никакого текста до или после JSON. Не используй markdown блоки.
2. Создай ОДНО детальное предложение (не 3 варианта)
3. КРИТИЧЕСКИ ВАЖНО: Цена ДОЛЖНА быть в пределах указанного диапазона. Если бюджет маленький - предложи соответствующий MVP.
4. КРИТИЧЕСКИ ВАЖНО: Сроки ДОЛЖНЫ быть реалистичными. Не предлагай сложную функциональность за короткие сроки.
5. Функциональность должна СТРОГО соответствовать бюджету и срокам. Для малого бюджета - базовые функции.
6. Добавь дополнительные рекомендации, которые НЕ входят в основной проект (для увеличения бюджета)
7. Укажи технический стек и архитектуру соответствующие бюджету
8. Опиши реалистичные риски для данного бюджета

ФОРМАТ JSON:
{
  "price": 150000,
  "timeline_weeks": 8,
  "title": "Название проекта",
  "description": "Краткое описание проекта",
  "functionality": [
    "Функция 1: подробное описание",
    "Функция 2: подробное описание",
    "Функция 3: подробное описание"
  ],
  "additional_recommendations": [
    {
      "title": "Дополнительная функция 1",
      "description": "Описание функции",
      "additional_cost": 50000,
      "additional_weeks": 2,
      "priority": "high"
    }
  ],
  "phases": [
    {
      "name": "Этап 1",
      "duration_weeks": 2,
      "description": "Что будет сделано на этом этапе",
      "deliverables": ["Результат 1", "Результат 2"]
    }
  ],
  "technical_stack": {
    "frontend": ["React", "Next.js"],
    "backend": ["Node.js", "Express"],
    "database": ["PostgreSQL"],
    "deployment": ["Docker", "AWS"]
  },
  "architecture": "Описание архитектуры решения",
  "integrations": ["Интеграция 1", "Интеграция 2"],
  "budget_justification": "Объяснение почему такая цена адекватна для данной функциональности",
  "risks": [
    {
      "risk": "Описание риска",
      "mitigation": "Способ митигации"
    }
  ],
  "roi": "Описание ROI и экономической эффективности",
  "support": "Описание поддержки после запуска",
  "nextSteps": ["Следующий шаг 1", "Следующий шаг 2"]
}`

      // Отправляем запрос к ChatGPT API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка при обращении к API')
      }

      const data = await response.json()
      aiResponse = data.choices[0].message.content

      // Очищаем ответ от markdown форматирования
      let cleanResponse = aiResponse.trim()
      
      // Убираем markdown блоки ```json ... ```
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      // Убираем любой текст до первой { и после последней }
      const firstBrace = cleanResponse.indexOf('{')
      const lastBrace = cleanResponse.lastIndexOf('}')
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanResponse = cleanResponse.substring(firstBrace, lastBrace + 1)
      }

      // Парсим JSON ответ
      console.log('Cleaned response:', cleanResponse) // Для отладки
      const proposalData = JSON.parse(cleanResponse)
      
      setProposal(proposalData)
      setStep(5)

    } catch (error) {
      console.error('Ошибка генерации предложения:', error)
      console.error('Original AI response:', aiResponse) // Для отладки
      
      // Fallback к старому методу в случае ошибки
      const businessType = selectedBusiness === 'Другое' && customBusiness ? customBusiness : selectedBusiness
      const goals = selectedGoals.includes('Другое') && customGoal 
        ? selectedGoals.filter(g => g !== 'Другое').concat(customGoal).join(', ')
        : selectedGoals.join(', ')
      const fallbackProposal = {
        price: Math.round((budgetRange.min + budgetRange.max) / 2),
        timeline_weeks: Math.ceil((timelineRange.min + timelineRange.max) / 2),
        title: `IT-решение для ${businessType}`,
        description: `Комплексное решение для автоматизации бизнес-процессов в сфере ${businessType}`,
        functionality: [
          `Основной функционал: ${selectedTechs.slice(0, 2).join(', ')}`,
          `Интеграции: ${selectedTechs.slice(2).join(', ') || 'базовые интеграции'}`,
          `Пользовательский интерфейс для ${goals}`
        ],
        additional_recommendations: [
          {
            title: 'Расширенная аналитика',
            description: 'Детальные отчеты и дашборды для анализа данных',
            additional_cost: Math.round((budgetRange.min + budgetRange.max) / 2 * 0.3),
            additional_weeks: Math.ceil((timelineRange.min + timelineRange.max) / 2 * 0.4),
            priority: 'high' as const
          },
          {
            title: 'Мобильное приложение',
            description: 'Нативное мобильное приложение для iOS и Android',
            additional_cost: Math.round((budgetRange.min + budgetRange.max) / 2 * 0.6),
            additional_weeks: Math.ceil((timelineRange.min + timelineRange.max) / 2 * 0.8),
            priority: 'medium' as const
          }
        ],
        phases: [
          {
            name: 'Анализ и проектирование',
            duration_weeks: 1,
            description: 'Анализ требований и создание технического задания',
            deliverables: ['Техническое задание', 'Дизайн архитектуры']
          },
          {
            name: 'Разработка MVP',
            duration_weeks: Math.ceil((timelineRange.min + timelineRange.max) / 2 * 0.6),
            description: 'Разработка базового функционала',
            deliverables: ['MVP версия', 'Базовое тестирование']
          },
          {
            name: 'Финализация и запуск',
            duration_weeks: Math.ceil((timelineRange.min + timelineRange.max) / 2 * 0.4),
            description: 'Доработка, тестирование и запуск',
            deliverables: ['Готовый продукт', 'Документация', 'Обучение пользователей']
          }
        ],
        technical_stack: {
          frontend: ['React', 'Next.js', 'Tailwind CSS'],
          backend: ['Node.js', 'Express'],
          database: ['PostgreSQL'],
          deployment: ['Docker', 'AWS/DigitalOcean']
        },
        architecture: 'Микросервисная архитектура с разделением на frontend и backend. REST API для взаимодействия между компонентами.',
        integrations: selectedTechs,
        budget_justification: `Стоимость рассчитана исходя из выбранного бюджетного диапазона ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} KGS и включает базовую функциональность, необходимую для решения поставленных задач.`,
        risks: [
          {
            risk: 'Изменение требований в процессе разработки',
            mitigation: 'Гибкая методология разработки, еженедельные созвоны'
          },
          {
            risk: 'Сложность интеграций с внешними системами',
            mitigation: 'Предварительное тестирование API, создание заглушек'
          }
        ],
        roi: 'Окупаемость проекта ожидается в течение 6-12 месяцев за счет автоматизации процессов и повышения эффективности',
        support: 'Техническая поддержка в течение 3 месяцев после запуска включена в стоимость',
        nextSteps: ['Подписание договора', 'Детальное планирование', 'Начало разработки']
      }
      
      setProposal(fallbackProposal)
      setStep(5)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPdf = () => {
    // open printable view — user can Save as PDF from browser print dialog
    const el = document.createElement('div')
    el.innerHTML = `<div style="font-family: Arial; padding: 20px; max-width:800px">
      <h1>Предложение — ${new Date().toLocaleDateString()}</h1>
      <h3>Выбор</h3>
      <p><strong>Сфера:</strong> ${selectedBusiness === 'Другое' && customBusiness ? customBusiness : selectedBusiness}</p>
      <p><strong>Цели:</strong> ${selectedGoals.join(', ')}</p>
      <p><strong>Бюджет:</strong> ${budgetLevel}</p>
      <p><strong>Технологии:</strong> ${selectedTechs.join(', ')}</p>
      <hr/>${proposal ? `<h2>${proposal.title} — ${proposal.price.toLocaleString()} KGS — ${proposal.timeline_weeks} нед.</h2><p>${proposal.description}</p><div><h3>Функциональность:</h3><ul>${proposal.functionality.map(f => `<li>${f}</li>`).join('')}</ul></div>` : '<p>Нет предложений</p>'}
    </div>`
    const w = window.open('','_blank')
    if (w) {
      w.document.write(el.innerHTML)
      w.document.close()
      w.focus()
      setTimeout(() => { 
        try { 
          if (w) w.print() 
        } catch(e) { 
          console.warn(e) 
        } 
      }, 500)
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        /* Range Slider Styles */
        .range-slider-thumb-min,
        .range-slider-thumb-max {
          pointer-events: none;
          position: absolute;
          height: 24px;
          width: 100%;
          outline: none;
          background: transparent;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .range-slider-thumb-min::-webkit-slider-thumb,
        .range-slider-thumb-max::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          pointer-events: all;
          position: relative;
          margin-top: -2px;
        }
        
        .range-slider-thumb-min {
          z-index: 2;
        }
        
        .range-slider-thumb-max {
          z-index: 1;
        }

        .range-slider-thumb-min::-moz-range-thumb,
        .range-slider-thumb-max::-moz-range-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          pointer-events: all;
          margin-top: -2px;
        }

        .range-slider-thumb-min::-webkit-slider-track,
        .range-slider-thumb-max::-webkit-slider-track {
          appearance: none;
          background: transparent;
          height: 0;
        }

        .range-slider-thumb-min::-moz-range-track,
        .range-slider-thumb-max::-moz-range-track {
          background: transparent;
          border: none;
          height: 0;
        }

        .range-slider-thumb-min:focus,
        .range-slider-thumb-max:focus {
          outline: none;
        }

        .range-slider-thumb-min:focus::-webkit-slider-thumb,
        .range-slider-thumb-max:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-black">Калькулятор стоимости</h1>
              <div className="text-sm text-gray-400 font-light">
                {step <= 4 ? `Шаг ${step} из 4` : 'Готово'}
              </div>
            </div>
            
            {/* Step Navigation */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((stepNum) => {
                const canNavigate = stepNum === 1 || 
                  (stepNum === 2 && selectedBusiness !== '') ||
                  (stepNum === 3 && selectedBusiness !== '' && selectedGoals.length > 0) ||
                  (stepNum === 4 && selectedBusiness !== '' && selectedGoals.length > 0);
                
                const isActive = step >= stepNum;
                const stepLabels = {
                  1: { main: 'Сфера', sub: '' },
                  2: { main: 'Цели', sub: '' },
                  3: { main: 'Бюджет и сроки', sub: '' },
                  4: { main: 'Детали', sub: '' }
                };
                
                return (
                  <div key={stepNum} className="flex items-center">
                    <div 
                      className={`flex items-center ${isActive ? 'text-black' : 'text-gray-400'} ${canNavigate && step !== 5 ? 'cursor-pointer hover:text-black' : ''}`}
                      onClick={() => canNavigate && step !== 5 ? setStep(stepNum) : undefined}
                    >
                      <span className={`flex items-center justify-center w-4 h-4 me-1 text-xs border rounded-full shrink-0 font-thin ${isActive ? 'border-black bg-black text-white' : 'border-gray-400 text-gray-400'}`}>
                        {stepNum}
                      </span>
                      <span className="text-xs font-thin">
                        {stepLabels[stepNum as keyof typeof stepLabels].main}
                      </span>
                    </div>
                    {stepNum < 4 && (
                      <svg className="w-2 h-2 mx-1 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                      </svg>
                    )}
                  </div>
                );
              })}
              
              {step === 5 && (
                <div className="flex items-center ml-3">
                  <button
                    onClick={editDetails}
                    className="px-2 py-1 rounded text-xs font-thin bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  >
                    Редактировать детали
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
            <div 
              className="h-2 rounded-full transition-all duration-300 bg-black" 
              style={{width: `${Math.min(100, (step <= 4 ? (step-1)/4*100 : 100))}%`}} 
            />
          </div>
        </div>
      </header>

      <div className="pt-32 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main wizard */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-black mb-2">Подбор цифрового решения (с ИИ)</h1>
            <p className="text-sm text-gray-400 font-light">Стоимость и сроки являются примерными. Окончательные цены и временные рамки можно обсудить и изменить в зависимости от ваших требований.</p>
          </div>

          {/* Steps container */}
          <div>
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-black">Шаг 1 — Сфера бизнеса</h2>
                  <div className="text-sm text-gray-400 font-light">Выберите одну</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS.map(b=> (
                    <button key={b} onClick={()=>selectBusiness(b)} className={`px-3 py-1 rounded-full border font-light transition-colors duration-200 ${selectedBusiness === b ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-gray-600'}`}>{b}</button>
                  ))}
                </div>

                {showCustomBusiness && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-600 block mb-2">Укажите вашу сферу бизнеса:</label>
                    <input
                      type="text"
                      value={customBusiness}
                      onChange={(e) => setCustomBusiness(e.target.value)}
                      placeholder="Например: Фитнес-центр, Автосервис, Консалтинг..."
                      className="w-full p-3 rounded-md border border-gray-300 text-black focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button disabled={selectedBusiness === ''} onClick={()=>setStep(2)} className={`px-4 py-2 rounded-md ${selectedBusiness === '' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'} transition-colors duration-200`}>Дальше</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-black">Шаг 2 — Цели</h2>
                  <div className="text-sm text-gray-400 font-light">Мультовыбор</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(g=> (
                    <button key={g} onClick={()=>toggleGoals(selectedGoals,setSelectedGoals,g)} className={`px-3 py-1 rounded-full border font-light transition-colors duration-200 ${selectedGoals.includes(g) ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-gray-600'}`}>{g}</button>
                  ))}
                  <button onClick={()=>toggleGoals(selectedGoals,setSelectedGoals,'Другое')} className={`px-3 py-1 rounded-full border font-light transition-colors duration-200 ${selectedGoals.includes('Другое') ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-gray-600'}`}>Другое</button>
                </div>

                {showCustomGoal && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-600 block mb-2">Укажите вашу цель:</label>
                    <input
                      type="text"
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      placeholder="Например: Улучшить клиентский сервис, Оптимизировать логистику..."
                      className="w-full p-3 rounded-md border border-gray-300 text-black focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button onClick={()=>setStep(1)} className="px-4 py-2 rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors duration-200">Назад</button>
                  <button disabled={selectedGoals.length===0} onClick={()=>setStep(3)} className={`px-4 py-2 rounded-md ${selectedGoals.length===0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'} transition-colors duration-200`}>Дальше</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-medium mb-6 text-black">Шаг 3 — Бюджет и сроки</h2>
                
                {/* Budget Range Slider */}
                <div className="mb-8">
                  <label className="text-sm text-gray-600 block mb-3">Бюджет (KGS)</label>
                  <div className="space-y-4">
                    {/* Range Slider */}
                    <div className="relative h-6">
                      {/* Track */}
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
                      {/* Active Track */}
                      <div 
                        className="absolute top-1/2 h-2 bg-black rounded-lg transform -translate-y-1/2"
                        style={{
                          left: `${((budgetRange.min - 20000) / (2000000 - 20000)) * 100}%`,
                          width: `${((budgetRange.max - budgetRange.min) / (2000000 - 20000)) * 100}%`
                        }}
                      ></div>
                      {/* Min Range Slider */}
                      <input
                        type="range"
                        min="20000"
                        max="2000000"
                        step="5000"
                        value={budgetRange.min}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value <= budgetRange.max) {
                            setBudgetRange({...budgetRange, min: value});
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer range-slider-thumb-min"
                      />
                      {/* Max Range Slider */}
                      <input
                        type="range"
                        min="20000"
                        max="2000000"
                        step="5000"
                        value={budgetRange.max}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= budgetRange.min) {
                            setBudgetRange({...budgetRange, max: value});
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer range-slider-thumb-max"
                      />
                    </div>
                    
                    {/* Input Fields */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">От</label>
                        <input
                          type="text"
                          value={inputFocus.budget_min ? budgetInputs.min : budgetRange.min.toLocaleString() + ' KGS'}
                          onChange={(e) => {
                            setBudgetInputs({...budgetInputs, min: e.target.value});
                          }}
                          onFocus={(e) => {
                            setInputFocus({...inputFocus, budget_min: true});
                            setBudgetInputs({...budgetInputs, min: budgetRange.min.toString()});
                          }}
                          onBlur={(e) => {
                            setInputFocus({...inputFocus, budget_min: false});
                            validateBudgetInput('min', e.target.value);
                          }}
                          className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 text-center text-black"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">До</label>
                        <input
                          type="text"
                          value={inputFocus.budget_max ? budgetInputs.max : budgetRange.max.toLocaleString() + ' KGS'}
                          onChange={(e) => {
                            setBudgetInputs({...budgetInputs, max: e.target.value});
                          }}
                          onFocus={(e) => {
                            setInputFocus({...inputFocus, budget_max: true});
                            setBudgetInputs({...budgetInputs, max: budgetRange.max.toString()});
                          }}
                          onBlur={(e) => {
                            setInputFocus({...inputFocus, budget_max: false});
                            validateBudgetInput('max', e.target.value);
                          }}
                          className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 text-center text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Range Slider */}
                <div className="mb-8">
                  <label className="text-sm text-gray-600 block mb-3">Сроки выполнения (недели)</label>
                  <div className="space-y-4">
                    {/* Range Slider */}
                    <div className="relative h-6">
                      {/* Track */}
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
                      {/* Active Track */}
                      <div 
                        className="absolute top-1/2 h-2 bg-black rounded-lg transform -translate-y-1/2"
                        style={{
                          left: `${((timelineRange.min - 1) / (52 - 1)) * 100}%`,
                          width: `${((timelineRange.max - timelineRange.min) / (52 - 1)) * 100}%`
                        }}
                      ></div>
                      {/* Min Range Slider */}
                      <input
                        type="range"
                        min="1"
                        max="52"
                        step="1"
                        value={timelineRange.min}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value <= timelineRange.max) {
                            setTimelineRange({...timelineRange, min: value});
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer range-slider-thumb-min"
                      />
                      {/* Max Range Slider */}
                      <input
                        type="range"
                        min="1"
                        max="52"
                        step="1"
                        value={timelineRange.max}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= timelineRange.min) {
                            setTimelineRange({...timelineRange, max: value});
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer range-slider-thumb-max"
                      />
                    </div>
                    
                    {/* Input Fields */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">От</label>
                        <input
                          type="text"
                          value={inputFocus.timeline_min ? timelineInputs.min : timelineRange.min.toString()}
                          onChange={(e) => {
                            setTimelineInputs({...timelineInputs, min: e.target.value});
                          }}
                          onFocus={(e) => {
                            setInputFocus({...inputFocus, timeline_min: true});
                            setTimelineInputs({...timelineInputs, min: timelineRange.min.toString()});
                          }}
                          onBlur={(e) => {
                            setInputFocus({...inputFocus, timeline_min: false});
                            validateTimelineInput('min', e.target.value);
                          }}
                          className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 text-center text-black"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">До</label>
                        <input
                          type="text"
                          value={inputFocus.timeline_max ? timelineInputs.max : timelineRange.max.toString()}
                          onChange={(e) => {
                            setTimelineInputs({...timelineInputs, max: e.target.value});
                          }}
                          onFocus={(e) => {
                            setInputFocus({...inputFocus, timeline_max: true});
                            setTimelineInputs({...timelineInputs, max: timelineRange.max.toString()});
                          }}
                          onBlur={(e) => {
                            setInputFocus({...inputFocus, timeline_max: false});
                            validateTimelineInput('max', e.target.value);
                          }}
                          className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 text-center text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={()=>setStep(2)} className="px-4 py-2 rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors duration-200">Назад</button>
                  <button onClick={()=>setStep(4)} className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors duration-200">Дальше</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-medium mb-2 text-black">Шаг 4 — Предпочтительные технологии</h2>
                <div className="flex flex-wrap gap-2">
                  {TECHS.map(t=> (
                    <button key={t} onClick={()=>toggleTechs(selectedTechs,setSelectedTechs,t)} className={`px-3 py-1 rounded-full border font-light transition-colors duration-200 ${selectedTechs.includes(t) ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-gray-600'}`}>{t}</button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Уточнение (желательно более подробно)</label>
                  <textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="Опишите бизнес, инструменты, боли, ограничения" className="w-full mt-2 p-3 rounded-md border border-gray-300 resize-y h-24 text-black" />
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={()=>setStep(3)} className="px-4 py-2 rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors duration-200">Назад</button>
                  <div className="flex gap-2">
                    <button 
                      disabled={context.trim().length === 0 || selectedTechs.length === 0 || isGenerating} 
                      onClick={()=>{ setStep(5); generateProposal() }} 
                      className={`px-4 py-2 rounded-md ${context.trim().length === 0 || selectedTechs.length === 0 || isGenerating ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'} transition-colors duration-200`}
                    >
                      {isGenerating ? 'Генерация с ИИ...' : 'Сгенерировать предложение'}
                    </button>
                    <button onClick={resetWizard} className="px-4 py-2 rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors duration-200">Сбросить</button>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && isGenerating && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <p className="mt-4 text-lg text-gray-600">Генерируем персональное предложение с помощью ИИ...</p>
                <div className="mt-2">
                  <TypewriterAnimation />
                </div>
              </div>
            )}

            {step === 5 && !isGenerating && proposal && (
              <div>
                <div className="mt-4">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-black mb-2">{proposal.title || 'Персональное предложение'}</h2>
                    <p className="text-gray-600">{proposal.description || 'Детальное описание вашего проекта'}</p>
                  </div>

                  {/* Price and Timeline - Key Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Стоимость проекта (примерная)</h3>
                      <div className="text-3xl font-bold text-black">{getTotalPriceAndTime().price?.toLocaleString() || 'Уточняется'} KGS</div>
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedRecommendations.length > 0 
                          ? `Базовая: ${proposal.price?.toLocaleString()} KGS + рекомендации: ${(getTotalPriceAndTime().price - proposal.price).toLocaleString()} KGS`
                          : 'В рамках выбранного бюджета'
                        }
                      </p>
                      {proposal.budget_justification && (
                        <p className="text-xs text-blue-700 mt-2 italic">{proposal.budget_justification}</p>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Срок реализации</h3>
                      <div className="text-3xl font-bold text-black">{getTotalPriceAndTime().weeks || 'Уточняется'} недель</div>
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedRecommendations.length > 0 
                          ? `Базовые: ${proposal.timeline_weeks} нед. + доп.: ${getTotalPriceAndTime().weeks - proposal.timeline_weeks} нед.`
                          : 'Включая тестирование и запуск'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Functionality */}
                  {proposal.functionality && proposal.functionality.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-black mb-4">Функциональность</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {proposal.functionality.map((func: string, index: number) => (
                          <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-gray-800 flex-1">{func}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Recommendations */}
                  {proposal.additional_recommendations && proposal.additional_recommendations.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-black mb-4">Рекомендации для расширения проекта</h3>
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200 mb-4">
                        <p className="text-sm text-amber-800 mb-4">
                          <strong>● Совет:</strong> Следующие функции не включены в основной бюджет, но могут значительно улучшить ваш продукт. 
                          Рассмотрите возможность увеличения бюджета и сроков для их реализации.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {proposal.additional_recommendations.map((rec, index: number) => {
                          const isSelected = selectedRecommendations.includes(index)
                          return (
                            <div key={index} className={`p-5 rounded-lg border-2 transition-all duration-200 ${
                              isSelected 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-dashed border-orange-300 bg-white'
                            }`}>
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-black">{rec.title}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                      {rec.priority === 'high' ? 'Высокий приоритет' :
                                       rec.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mb-3">{rec.description}</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <div className="flex gap-4">
                                  <div>
                                    <span className="text-sm text-gray-500">Доп. стоимость:</span>
                                    <div className="font-semibold text-orange-600">+{rec.additional_cost.toLocaleString()} KGS</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Доп. время:</span>
                                    <div className="font-semibold text-orange-600">+{rec.additional_weeks} нед.</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleRecommendation(index)}
                                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isSelected 
                                      ? 'bg-red-500 text-white hover:bg-red-600' 
                                      : 'bg-green-500 text-white hover:bg-green-600'
                                  }`}
                                >
                                  {isSelected ? 'Удалить' : 'Добавить'}
                                </button>
                              </div>
                              {isSelected && (
                                <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-300">
                                  <p className="text-sm text-green-800 font-medium">
                                    ✓ Включено в проект! Стоимость и сроки обновлены в итоговой цене.
                                  </p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      {selectedRecommendations.length > 0 && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            <strong>▼ Выбрано рекомендаций: {selectedRecommendations.length}</strong><br/>
                            <strong>Итоговая стоимость:</strong> {getTotalPriceAndTime().price.toLocaleString()} KGS<br/>
                            <strong>Итоговые сроки:</strong> {getTotalPriceAndTime().weeks} недель
                          </p>
                        </div>
                      )}
                      
                      {selectedRecommendations.length === 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">
                            <strong>● Подсказка:</strong> Нажмите "Добавить" чтобы включить рекомендацию в проект и увидеть обновленную стоимость.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Development Phases */}
                  {proposal.phases && proposal.phases.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-black mb-4">Этапы разработки</h3>
                      <div className="space-y-4">
                        {proposal.phases.map((phase: any, index: number) => (
                          <div key={index} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-black">{phase.name}</h4>
                              <span className="text-sm bg-black text-white px-2 py-1 rounded">
                                {phase.duration_weeks} нед.
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">{phase.description}</p>
                            {phase.deliverables && phase.deliverables.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Результаты:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {phase.deliverables.map((deliverable: string, idx: number) => (
                                    <li key={idx}>{deliverable}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Technical Stack */}
                    {proposal.technical_stack && (
                      <div className="p-6 bg-white rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Технический стек</h3>
                        <div className="space-y-3">
                          {Object.entries(proposal.technical_stack).map(([key, value]: [string, any]) => (
                            <div key={key}>
                              <span className="text-sm font-medium text-gray-600 capitalize">{key}:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {Array.isArray(value) ? value.map((tech: string, idx: number) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                    {tech}
                                  </span>
                                )) : (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                    {value}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Architecture & Integrations */}
                    <div className="space-y-6">
                      {proposal.architecture && (
                        <div className="p-6 bg-white rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-black mb-3">Архитектура</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">{proposal.architecture}</p>
                        </div>
                      )}
                      
                      {proposal.integrations && proposal.integrations.length > 0 && (
                        <div className="p-6 bg-white rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-black mb-3">Интеграции</h3>
                          <div className="flex flex-wrap gap-2">
                            {proposal.integrations.map((integration: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {integration}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Risks, ROI, Support */}
                  <div className="space-y-6 mb-8">
                    {proposal.risks && proposal.risks.length > 0 && (
                      <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                        <h3 className="text-lg font-semibold text-black mb-4">Риски и митигация</h3>
                        <div className="space-y-3">
                          {proposal.risks.map((risk: any, index: number) => (
                            <div key={index} className="p-3 bg-white rounded-lg border border-red-100">
                              <p className="font-medium text-red-800 mb-1">Риск: {risk.risk}</p>
                              <p className="text-sm text-red-700">Митигация: {risk.mitigation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {proposal.roi && (
                      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                        <h3 className="text-lg font-semibold text-black mb-3">ROI и экономическая эффективность</h3>
                        <p className="text-gray-800">{proposal.roi}</p>
                      </div>
                    )}

                    {proposal.support && (
                      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                        <h3 className="text-lg font-semibold text-black mb-3">Поддержка</h3>
                        <p className="text-gray-800">{proposal.support}</p>
                      </div>
                    )}
                  </div>

                  {/* Next Steps */}
                  {proposal.nextSteps && proposal.nextSteps.length > 0 && (
                    <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 mb-8">
                      <h3 className="text-lg font-semibold text-black mb-4">Следующие шаги</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        {proposal.nextSteps.map((step: string, index: number) => (
                          <li key={index} className="text-gray-800">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}



                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="sticky top-6">
            <h3 className="font-medium text-black">Резюме выбора</h3>
            <p className="text-sm text-gray-400 font-light">Просматривайте ориентировочную цену и сроки в реальном времени.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-400 font-light">Сфера</div>
              <div className="font-medium text-black">{selectedBusiness ? (selectedBusiness === 'Другое' && customBusiness ? customBusiness : selectedBusiness) : '—'}</div>
              <div className="mt-2 text-sm text-gray-400 font-light">Цели</div>
              <div className="font-medium text-black">{selectedGoals.length ? (selectedGoals.includes('Другое') && customGoal ? selectedGoals.filter(g => g !== 'Другое').concat(customGoal).join(', ') : selectedGoals.join(', ')) : '—'}</div>
              <div className="mt-2 text-sm text-gray-400 font-light">Технологии</div>
              <div className="font-medium text-black">{selectedTechs.length ? selectedTechs.join(', ') : '—'}</div>
              <div className="mt-4 border-t pt-4">
                <div className="mt-2 text-sm text-gray-400 font-light">Выбранный бюджет</div>
                <div className="font-medium text-black">{budgetRange.min.toLocaleString()} - {budgetRange.max.toLocaleString()} KGS</div>
                <div className="mt-2 text-sm text-gray-400 font-light">Выбранные сроки</div>
                <div className="font-medium text-black">{timelineRange.min} - {timelineRange.max} нед.</div>
              </div>
            </div>

            {/* Action buttons after generation */}
            {step === 5 && !isGenerating && proposal && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-2 items-center">
                                <div className="relative group">
                    <button
                      onClick={() => { setShowRequestModal(true) }}
                      className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                    >
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      ></span>
                
                      <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                        <div className="relative z-10 flex items-center space-x-2">
                          <span className="transition-all duration-500 group-hover:translate-x-1">
                            Отправить и получить -10%
                          </span>
                          <svg
                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                            data-slot="icon"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </span>
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 font-light text-center">↑ Отправьте заявку и мы напишем вам в течение часа.</div>
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="text-sm underline text-gray-500 text-center pt-2 hover:text-gray-700 transition-colors duration-200">Обсудить в Telegram</a>
              </div>
            )}
            
          </div>
        </aside>
        </div>
      </div>

      {/* Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md border border-gray-300">
            <h3 className="font-medium mb-2 text-black">Получить предложение со скидкой -10%</h3>
            <p className="text-sm text-gray-600 mb-4">Мы отправим детальное предложение в PDF и напишем вам в течение часа</p>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">ФИО *</label>
              <input 
                value={contact.fullName} 
                onChange={e=>setContact({...contact,fullName:e.target.value})} 
                placeholder="Введите ваше полное имя" 
                className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp номер *</label>
              <input 
                value={contact.whatsapp} 
                onChange={e=>setContact({...contact,whatsapp:e.target.value})} 
                placeholder="+996 XXX XXX XXX" 
                className="w-full p-3 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button 
                onClick={()=>setShowRequestModal(false)} 
                className="px-4 py-2 rounded-md border border-gray-300 text-black hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button 
                onClick={submitRequest} 
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                disabled={!contact.fullName || !contact.whatsapp}
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 bg-white p-4 rounded-lg shadow-lg border border-gray-300 text-black">{toast}</div>
      )}

    </div>
  )
}

