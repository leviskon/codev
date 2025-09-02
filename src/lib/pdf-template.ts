export interface ProposalData {
  contact: {
    fullName: string;
    whatsapp: string;
  };
  proposal: {
    title: string;
    description: string;
    price: number;
    timeline_weeks: number;
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
  };
  selectedRecommendations: number[];
  projectData: {
    business: string;
    goals: string[];
    technologies: string[];
    context: string;
    budgetRange: { min: number; max: number };
    timelineRange: { min: number; max: number };
  };
  totalPrice: number;
  totalWeeks: number;
}

export function generatePDFTemplate(data: ProposalData): string {
  const discountPrice = Math.round(data.totalPrice * 0.9); // Скидка 10%
  
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Предложение по разработке IT-решения</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #000;
            background: #f9fafb;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            padding: 32px;
        }
        
        /* Header Section */
        .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 3px solid #000;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
        }
        
        .header .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin-bottom: 16px;
        }
        
        .discount-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 16px;
            margin: 16px 0;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        /* Info Grid */
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }

        .info-card {
            background: #f9fafb;
            padding: 24px;
            border-radius: 12px;
            border-left: 4px solid #000;
        }

        .info-card h3 {
            color: #000;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
        }

        .info-card p {
            margin: 4px 0;
            color: #374151;
        }

        /* Price Section */
        .price-section {
            margin-bottom: 32px;
        }

        .price-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }

        .price-card {
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .price-card.blue {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            border-color: #93c5fd;
        }

        .price-card.green {
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            border-color: #6ee7b7;
        }

        .price-card h3 {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 4px;
        }

        .price-large {
            font-size: 30px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
        }

        .price-small {
            font-size: 14px;
            color: #6b7280;
        }

        .budget-justification {
            background: #f3f4f6;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
            font-size: 12px;
            color: #1d4ed8;
            font-style: italic;
        }

        /* Section Title */
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #000;
            margin-bottom: 16px;
            margin-top: 32px;
        }

        /* Functionality Section */
        .functionality-list {
            display: grid;
            gap: 12px;
            margin-bottom: 32px;
        }

        .functionality-item {
            padding: 16px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .functionality-number {
            width: 24px;
            height: 24px;
            background: #000;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .functionality-text {
            color: #1f2937;
            flex: 1;
        }

        /* Recommendations Section */
        .recommendations-section {
            margin-bottom: 32px;
        }

        .advice-card {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #f59e0b;
            margin-bottom: 16px;
        }

        .advice-card p {
            font-size: 14px;
            color: #92400e;
            margin-bottom: 16px;
        }

        .recommendations-grid {
            display: grid;
            gap: 16px;
        }

        .recommendation-item {
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #10b981;
            background: #ecfdf5;
        }

        .recommendation-item.not-selected {
            border: 2px dashed #f59e0b;
            background: white;
        }

        .recommendation-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .recommendation-title {
            font-weight: 600;
            color: #000;
            margin-bottom: 8px;
        }

        .priority-badge {
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
        }

        .priority-high {
            background: #fef2f2;
            color: #dc2626;
        }

        .priority-medium {
            background: #fefbf2;
            color: #d97706;
        }

        .priority-low {
            background: #f0fdf4;
            color: #16a34a;
        }

        .recommendation-description {
            color: #374151;
            margin-bottom: 12px;
        }

        .recommendation-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
        }

        .cost-info {
            display: flex;
            gap: 16px;
        }

        .cost-item {
            font-size: 14px;
        }

        .cost-label {
            color: #6b7280;
        }

        .cost-value {
            font-weight: 600;
            color: #ea580c;
        }

        .selected-badge {
            background: #dcfce7;
            border: 1px solid #16a34a;
            padding: 12px;
            border-radius: 8px;
            margin-top: 12px;
        }

        .selected-badge p {
            font-size: 14px;
            color: #166534;
            font-weight: 500;
        }

        /* Phases Section */
        .phases-section {
            margin-bottom: 32px;
        }

        .phases-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .phase-item {
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .phase-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .phase-name {
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }

        .phase-duration {
            background: #000;
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }

        .phase-description {
            color: #374151;
            margin-bottom: 12px;
        }

        .deliverables h4 {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 8px;
        }

        .deliverables ul {
            list-style: none;
            padding-left: 0;
        }

        .deliverables li {
            padding: 2px 0;
            padding-left: 20px;
            position: relative;
            font-size: 14px;
            color: #6b7280;
        }

        .deliverables li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000;
            font-weight: bold;
        }

        /* Technical Section */
        .tech-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-bottom: 32px;
        }

        .tech-stack-section {
            padding: 24px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .tech-stack-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 16px;
        }

        .tech-categories {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .tech-category {
            margin-bottom: 8px;
        }

        .tech-category-name {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            text-transform: capitalize;
            margin-bottom: 4px;
        }

        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .tech-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
        }

        .arch-integration-section {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .arch-card {
            padding: 24px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .arch-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 12px;
        }

        .arch-description {
            color: #374151;
            font-size: 14px;
            line-height: 1.5;
        }

        /* Risks Section */
        .risks-section {
            margin-bottom: 32px;
        }

        .risks-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .risk-item {
            background: #fef5f5;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 16px;
        }

        .risk-title {
            color: #dc2626;
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 14px;
        }

        .risk-mitigation {
            color: #374151;
            font-size: 13px;
        }

        /* ROI Section */
        .roi-section {
            margin-bottom: 32px;
        }

        .roi-card {
            background: #ecfdf5;
            border: 1px solid #10b981;
            border-radius: 12px;
            padding: 24px;
        }

        .roi-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 12px;
        }

        .roi-description {
            color: #1f2937;
        }

        /* Support Section */
        .support-section {
            margin-bottom: 32px;
        }

        .support-card {
            background: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 12px;
            padding: 24px;
        }

        .support-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 12px;
        }

        .support-description {
            color: #1f2937;
        }

        /* Next Steps Section */
        .next-steps-section {
            margin-bottom: 32px;
        }

        .next-steps-card {
            background: #fffbeb;
            border: 1px solid #f59e0b;
            border-radius: 12px;
            padding: 24px;
        }

        .next-steps-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 16px;
        }

        .next-steps-list {
            counter-reset: step-counter;
            list-style: none;
            padding: 0;
        }

        .next-steps-list li {
            counter-increment: step-counter;
            padding: 12px 0;
            padding-left: 40px;
            position: relative;
            color: #1f2937;
        }

        .next-steps-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 12px;
            background: #f59e0b;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
        }

        /* Footer */
        .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
        }

        .contact-info {
            background: #000;
            color: white;
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
        }

        .contact-info h3 {
            margin-bottom: 12px;
            font-size: 18px;
        }

        .contact-info p {
            margin: 4px 0;
        }

        .footer-text {
            color: #6b7280;
            font-size: 12px;
        }

        /* Print optimizations */
        @media print {
            body {
                background: white;
                font-size: 12px;
            }
            
            .container {
                box-shadow: none;
                border: none;
                margin: 0;
                padding: 20px;
            }
            
            .info-grid,
            .price-grid,
            .tech-grid {
                break-inside: avoid;
            }
            
            .functionality-item,
            .phase-item,
            .recommendation-item {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px;">
                <svg width="60" height="60" viewBox="0 0 1000 1000" style="flex-shrink: 0;">
                    <style type="text/css">
                        .st0{fill:#CCF511;stroke:#CCF511;stroke-width:4;stroke-miterlimit:10;}
                        .st1{fill:none;stroke:#CCF511;stroke-width:20;stroke-linecap:round;stroke-miterlimit:10;}
                        .st2{fill:none;stroke:#CCF511;stroke-width:21;stroke-linecap:round;stroke-miterlimit:10;}
                    </style>
                    <g>
                        <path class="st0" d="M660,588c-36,2-84,49-120.91,56.33c-32.48,6.45-66.59,5.69-97.4-6.45c-27.44-10.81-51.65-29.28-69.41-52.83
                            c-18.09-23.99-29.18-52.92-31.71-82.86c-2.58-30.48,3.61-61.45,17.9-88.52c13.74-26.03,34.68-48.07,59.96-63.14
                            c26.48-15.79,57.3-23.57,88.1-22.43c36.66,1.36,70.31,18,100.47,38.89c27.68,19.18,56,21,56,21l113.62-129.45
                            C723.79,199.85,645.75,164.94,547,160c-200-10-352,131.37-352,325.5S353,830,547,816c99.22-7.16,177.63-41.89,230.5-100.16L660,588
                            z"/>
                    </g>
                    <path class="st1" d="M396,482c-0.26-5.55-1.39-42.9,28.48-71.5c28.96-27.72,64.78-25.89,70.52-25.5"/>
                    <line class="st2" x1="710.5" y1="421" x2="710.5" y2="556"/>
                    <line class="st2" x1="747.5" y1="441.5" x2="747.5" y2="535.5"/>
                    <line class="st2" x1="784.5" y1="459.5" x2="784.5" y2="517.5"/>
                </svg>
                <div>
                    <h1 style="margin: 0; font-size: 28px;">Codev</h1>
                    <div style="color: #6b7280; font-size: 14px; margin: 0;">Разработка IT-решений</div>
                </div>
            </div>
            <h1>Предложение по разработке IT-решения</h1>
            <div class="subtitle">Дата создания: ${new Date().toLocaleDateString('ru-RU')}</div>
            <div class="discount-badge">🎉 Специальная скидка -10%</div>
        </div>
        
        <!-- Contact and Project Info -->
        <div class="info-grid">
            <div class="info-card">
                <h3>👤 Контактные данные</h3>
                <p><strong>ФИО:</strong> ${data.contact.fullName}</p>
                <p><strong>WhatsApp:</strong> ${data.contact.whatsapp}</p>
            </div>
            <div class="info-card">
                <h3>💼 Данные проекта</h3>
                <p><strong>Сфера:</strong> ${data.projectData.business}</p>
                <p><strong>Цели:</strong> ${data.projectData.goals.join(', ')}</p>
                <p><strong>Технологии:</strong> ${data.projectData.technologies.join(', ')}</p>
            </div>
        </div>
        
        <!-- Pricing Section -->
        <h2 class="section-title">💰 Стоимость проекта</h2>
        <div class="price-grid">
            <div class="price-card blue">
                <h3>Стоимость проекта (примерная)</h3>
                <div class="price-large">${discountPrice.toLocaleString()} KGS</div>
                <div class="price-small">
                    ${data.selectedRecommendations.length > 0 
                        ? `Базовая: ${data.proposal.price?.toLocaleString()} KGS + рекомендации: ${(discountPrice - Math.round(data.proposal.price * 0.9)).toLocaleString()} KGS`
                        : 'Со скидкой 10%'
                    }
                </div>
                <div class="price-small" style="margin-top: 8px; text-decoration: line-through; color: #9ca3af;">
                    Обычная цена: ${data.totalPrice.toLocaleString()} KGS
                </div>
            </div>
            <div class="price-card green">
                <h3>Срок реализации</h3>
                <div class="price-large">${data.totalWeeks} недель</div>
                <div class="price-small">
                    ${data.selectedRecommendations.length > 0 
                        ? `Базовые: ${data.proposal.timeline_weeks} нед. + доп.: ${data.totalWeeks - data.proposal.timeline_weeks} нед.`
                        : 'Включая тестирование и запуск'
                    }
                </div>
            </div>
        </div>
        
        ${data.proposal.budget_justification ? `
        <div class="budget-justification">
            <strong>💡 Обоснование стоимости:</strong> ${data.proposal.budget_justification}
        </div>
        ` : ''}
        
        <!-- Project Description -->
        <h2 class="section-title">📋 ${data.proposal.title}</h2>
        <div class="info-card">
            <p>${data.proposal.description}</p>
        </div>
        
        <!-- Functionality -->
        ${data.proposal.functionality && data.proposal.functionality.length > 0 ? `
        <h2 class="section-title">⚙️ Функциональность</h2>
        <div class="functionality-list">
            ${data.proposal.functionality.map((func, index) => `
                <div class="functionality-item">
                    <div class="functionality-number">${index + 1}</div>
                    <div class="functionality-text">${func}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        <!-- All Recommendations -->
        ${data.proposal.additional_recommendations && data.proposal.additional_recommendations.length > 0 ? `
        <div class="recommendations-section">
            <h2 class="section-title">⭐ Рекомендации для расширения проекта</h2>
            <div class="advice-card">
                <p><strong>● Совет:</strong> Следующие функции не включены в основной бюджет, но могут значительно улучшить ваш продукт. Рассмотрите возможность увеличения бюджета и сроков для их реализации.</p>
            </div>
            
            ${data.selectedRecommendations && data.selectedRecommendations.length > 0 ? `
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; color: #059669; margin-bottom: 16px;">✅ Включенные рекомендации</h3>
                <div class="recommendations-grid">
                    ${data.selectedRecommendations.map(recIndex => {
                        const rec = data.proposal.additional_recommendations?.[recIndex];
                        return rec ? `
                            <div class="recommendation-item">
                                <div class="recommendation-header">
                                    <div>
                                        <div class="recommendation-title">🚀 ${rec.title}</div>
                                        <span class="priority-badge priority-${rec.priority}">
                                            ${rec.priority === 'high' ? 'Высокий приоритет' :
                                              rec.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}
                                        </span>
                                    </div>
                                </div>
                                <div class="recommendation-description">${rec.description}</div>
                                <div class="recommendation-footer">
                                    <div class="cost-info">
                                        <div class="cost-item">
                                            <span class="cost-label">Доп. стоимость:</span>
                                            <div class="cost-value">+${rec.additional_cost.toLocaleString()} KGS</div>
                                        </div>
                                        <div class="cost-item">
                                            <span class="cost-label">Доп. время:</span>
                                            <div class="cost-value">+${rec.additional_weeks} нед.</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="selected-badge">
                                    <p>✓ Включено в проект! Стоимость и сроки обновлены в итоговой цене.</p>
                                </div>
                            </div>
                        ` : '';
                    }).join('')}
                </div>
            </div>
            ` : ''}
            
            <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #374151; margin-bottom: 16px;">💡 Дополнительные возможности</h3>
                <div class="recommendations-grid">
                    ${data.proposal.additional_recommendations.map((rec, index) => {
                        const isSelected = data.selectedRecommendations && data.selectedRecommendations.includes(index);
                        if (isSelected) return ''; // Не показываем уже включенные
                        
                        return `
                            <div class="recommendation-item not-selected">
                                <div class="recommendation-header">
                                    <div>
                                        <div class="recommendation-title">💎 ${rec.title}</div>
                                        <span class="priority-badge priority-${rec.priority}">
                                            ${rec.priority === 'high' ? 'Высокий приоритет' :
                                              rec.priority === 'medium' ? 'Средний приоритет' : 'Низкий приоритет'}
                                        </span>
                                    </div>
                                </div>
                                <div class="recommendation-description">${rec.description}</div>
                                <div class="recommendation-footer">
                                    <div class="cost-info">
                                        <div class="cost-item">
                                            <span class="cost-label">Доп. стоимость:</span>
                                            <div class="cost-value">+${rec.additional_cost.toLocaleString()} KGS</div>
                                        </div>
                                        <div class="cost-item">
                                            <span class="cost-label">Доп. время:</span>
                                            <div class="cost-value">+${rec.additional_weeks} нед.</div>
                                        </div>
                                    </div>
                                </div>
                                <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 12px; border-radius: 8px; margin-top: 12px;">
                                    <p style="font-size: 14px; color: #92400e; font-weight: 500; margin: 0;">
                                        💰 Можно добавить в следующую фазу развития проекта
                                    </p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        ` : ''}
        
        <!-- Development Phases -->
        ${data.proposal.phases && data.proposal.phases.length > 0 ? `
        <div class="phases-section">
            <h2 class="section-title">📅 Этапы разработки</h2>
            <div class="phases-list">
                ${data.proposal.phases.map(phase => `
                    <div class="phase-item">
                        <div class="phase-header">
                            <div class="phase-name">${phase.name}</div>
                            <div class="phase-duration">${phase.duration_weeks} нед.</div>
                        </div>
                        <div class="phase-description">${phase.description}</div>
                        ${phase.deliverables && phase.deliverables.length > 0 ? `
                        <div class="deliverables">
                            <h4>Результаты:</h4>
                            <ul>
                                ${phase.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Technical Details -->
        <div class="tech-grid">
            <!-- Technical Stack -->
            ${data.proposal.technical_stack ? `
            <div class="tech-stack-section">
                <div class="tech-stack-title">🛠️ Технический стек</div>
                <div class="tech-categories">
                    ${Object.entries(data.proposal.technical_stack).map(([key, value]) => `
                        <div class="tech-category">
                            <div class="tech-category-name">${key}:</div>
                            <div class="tech-tags">
                                ${Array.isArray(value) ? value.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : `<span class="tech-tag">${value}</span>`}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <!-- Architecture & Integrations -->
            <div class="arch-integration-section">
                ${data.proposal.architecture ? `
                <div class="arch-card">
                    <div class="arch-title">🏗️ Архитектура решения</div>
                    <div class="arch-description">${data.proposal.architecture}</div>
                </div>
                ` : ''}
                
                ${data.proposal.integrations && data.proposal.integrations.length > 0 ? `
                <div class="arch-card">
                    <div class="arch-title">🔗 Интеграции</div>
                    <div class="tech-tags">
                        ${data.proposal.integrations.map(integration => `<span class="tech-tag">${integration}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Risks -->
        ${data.proposal.risks && data.proposal.risks.length > 0 ? `
        <div class="risks-section">
            <h2 class="section-title">⚠️ Риски и их митигация</h2>
            <div class="risks-list">
                ${data.proposal.risks.map(risk => `
                    <div class="risk-item">
                        <div class="risk-title">Риск: ${risk.risk}</div>
                        <div class="risk-mitigation">Митигация: ${risk.mitigation}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- ROI -->
        ${data.proposal.roi ? `
        <div class="roi-section">
            <h2 class="section-title">📈 ROI и экономическая эффективность</h2>
            <div class="roi-card">
                <div class="roi-description">${data.proposal.roi}</div>
            </div>
        </div>
        ` : ''}
        
        <!-- Support -->
        ${data.proposal.support ? `
        <div class="support-section">
            <h2 class="section-title">🛡️ Техническая поддержка</h2>
            <div class="support-card">
                <div class="support-description">${data.proposal.support}</div>
            </div>
        </div>
        ` : ''}
        
        <!-- Next Steps -->
        ${data.proposal.nextSteps && data.proposal.nextSteps.length > 0 ? `
        <div class="next-steps-section">
            <h2 class="section-title">🚀 Следующие шаги</h2>
            <div class="next-steps-card">
                <ol class="next-steps-list">
                    ${data.proposal.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
        ` : ''}
        
        <!-- Contact Info -->
        <div class="contact-info">
            <h3>📞 Связаться с нами</h3>
            <p>Готовы обсудить детали проекта и ответить на все ваши вопросы!</p>
            <p><strong>Telegram:</strong> <a href="https://t.me/codevai_team" style="color: #60a5fa; text-decoration: underline;">@codevai_team</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/996700746333" style="color: #60a5fa; text-decoration: underline;">+996 700 746 333</a></p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <p>Предложение действительно в течение 30 дней с момента создания</p>
                <p>© ${new Date().getFullYear()} Codev - Разработка IT-решений</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
}