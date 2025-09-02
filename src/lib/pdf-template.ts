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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            background: #fff;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #007BFF;
        }
        
        .header h1 {
            font-size: 28px;
            color: #007BFF;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header .date {
            color: #666;
            font-size: 14px;
        }
        
        .discount-badge {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #007BFF;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #e9ecef;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #007BFF;
        }
        
        .info-card h3 {
            color: #007BFF;
            font-size: 16px;
            margin-bottom: 10px;
        }
        
        .price-highlight {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
        }
        
        .price-highlight .original-price {
            text-decoration: line-through;
            opacity: 0.7;
            font-size: 18px;
        }
        
        .price-highlight .discounted-price {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .price-highlight .savings {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 15px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 10px;
        }
        
        .functionality-list {
            counter-reset: func-counter;
        }
        
        .functionality-item {
            counter-increment: func-counter;
            background: #fff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            position: relative;
            padding-left: 60px;
        }
        
        .functionality-item::before {
            content: counter(func-counter);
            position: absolute;
            left: 15px;
            top: 15px;
            background: #007BFF;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .phase-timeline {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .phase-item {
            background: #fff;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 20px;
            position: relative;
            border-left: 6px solid #007BFF;
        }
        
        .phase-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .phase-name {
            font-weight: bold;
            font-size: 16px;
            color: #007BFF;
        }
        
        .phase-duration {
            background: #007BFF;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .deliverables {
            margin-top: 10px;
        }
        
        .deliverables ul {
            list-style: none;
            padding-left: 0;
        }
        
        .deliverables li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }
        
        .deliverables li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
        }
        
        .tech-stack {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .tech-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #17a2b8;
        }
        
        .tech-category h4 {
            color: #17a2b8;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        
        .tech-tag {
            background: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .risk-item {
            background: #fff5f5;
            border: 1px solid #fed7d7;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .risk-title {
            color: #e53e3e;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .risk-mitigation {
            color: #2d3748;
            font-size: 13px;
        }
        
        .next-steps {
            counter-reset: step-counter;
        }
        
        .next-step {
            counter-increment: step-counter;
            background: #fff8e1;
            border: 1px solid #ffecb3;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            position: relative;
            padding-left: 50px;
        }
        
        .next-step::before {
            content: counter(step-counter);
            position: absolute;
            left: 15px;
            top: 15px;
            background: #ffa726;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            color: #666;
        }
        
        .contact-info {
            background: #007BFF;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        
        .contact-info h3 {
            margin-bottom: 10px;
        }
        
        @media print {
            .container {
                margin: 0;
                box-shadow: none;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            .phase-item, .functionality-item {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Предложение по разработке IT-решения</h1>
            <div class="date">Дата создания: ${new Date().toLocaleDateString('ru-RU')}</div>
            <div class="discount-badge">🎉 Специальная скидка -10%</div>
        </div>
        
        <!-- Contact and Project Info -->
        <div class="section">
            <h2 class="section-title">Информация о клиенте</h2>
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
        </div>
        
        <!-- Pricing with Discount -->
        <div class="section">
            <h2 class="section-title">💰 Стоимость проекта</h2>
            <div class="price-highlight">
                <div class="original-price">${data.totalPrice.toLocaleString()} KGS</div>
                <div class="discounted-price">${discountPrice.toLocaleString()} KGS</div>
                <div class="savings">Экономия: ${(data.totalPrice - discountPrice).toLocaleString()} KGS</div>
                <p style="margin-top: 15px; font-size: 16px;">
                    ⏱️ Срок реализации: <strong>${data.totalWeeks} недель</strong>
                </p>
            </div>
            ${data.proposal.budget_justification ? `
            <div class="info-card">
                <h3>💡 Обоснование стоимости</h3>
                <p>${data.proposal.budget_justification}</p>
            </div>
            ` : ''}
        </div>
        
        <!-- Project Title and Description -->
        <div class="section">
            <h2 class="section-title">📋 Описание проекта</h2>
            <div class="info-card">
                <h3>${data.proposal.title}</h3>
                <p>${data.proposal.description}</p>
            </div>
        </div>
        
        <!-- Functionality -->
        ${data.proposal.functionality && data.proposal.functionality.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⚙️ Функциональность</h2>
            <div class="functionality-list">
                ${data.proposal.functionality.map(func => `
                    <div class="functionality-item">${func}</div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Selected Recommendations -->
        ${data.selectedRecommendations && data.selectedRecommendations.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⭐ Включенные дополнительные функции</h2>
            ${data.selectedRecommendations.map(recIndex => {
                const rec = data.proposal.additional_recommendations?.[recIndex];
                return rec ? `
                    <div class="info-card">
                        <h3>🚀 ${rec.title}</h3>
                        <p>${rec.description}</p>
                        <p><strong>Стоимость:</strong> +${rec.additional_cost.toLocaleString()} KGS</p>
                        <p><strong>Время:</strong> +${rec.additional_weeks} недель</p>
                    </div>
                ` : '';
            }).join('')}
        </div>
        ` : ''}
        
        <!-- Development Phases -->
        ${data.proposal.phases && data.proposal.phases.length > 0 ? `
        <div class="section">
            <h2 class="section-title">📅 Этапы разработки</h2>
            <div class="phase-timeline">
                ${data.proposal.phases.map(phase => `
                    <div class="phase-item">
                        <div class="phase-header">
                            <div class="phase-name">${phase.name}</div>
                            <div class="phase-duration">${phase.duration_weeks} нед.</div>
                        </div>
                        <p>${phase.description}</p>
                        ${phase.deliverables && phase.deliverables.length > 0 ? `
                        <div class="deliverables">
                            <strong>Результаты:</strong>
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
        
        <!-- Technical Stack -->
        ${data.proposal.technical_stack ? `
        <div class="section">
            <h2 class="section-title">🛠️ Технический стек</h2>
            <div class="tech-stack">
                ${Object.entries(data.proposal.technical_stack).map(([key, value]) => `
                    <div class="tech-category">
                        <h4>${key}</h4>
                        <div class="tech-tags">
                            ${Array.isArray(value) ? value.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : `<span class="tech-tag">${value}</span>`}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Architecture and Integrations -->
        ${data.proposal.architecture ? `
        <div class="section">
            <h2 class="section-title">🏗️ Архитектура решения</h2>
            <div class="info-card">
                <p>${data.proposal.architecture}</p>
            </div>
        </div>
        ` : ''}
        
        ${data.proposal.integrations && data.proposal.integrations.length > 0 ? `
        <div class="section">
            <h2 class="section-title">🔗 Интеграции</h2>
            <div class="tech-tags">
                ${data.proposal.integrations.map(integration => `<span class="tech-tag">${integration}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Risks -->
        ${data.proposal.risks && data.proposal.risks.length > 0 ? `
        <div class="section">
            <h2 class="section-title">⚠️ Риски и их митигация</h2>
            ${data.proposal.risks.map(risk => `
                <div class="risk-item">
                    <div class="risk-title">Риск: ${risk.risk}</div>
                    <div class="risk-mitigation">Митигация: ${risk.mitigation}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        <!-- ROI -->
        ${data.proposal.roi ? `
        <div class="section">
            <h2 class="section-title">📈 ROI и экономическая эффективность</h2>
            <div class="info-card">
                <p>${data.proposal.roi}</p>
            </div>
        </div>
        ` : ''}
        
        <!-- Support -->
        ${data.proposal.support ? `
        <div class="section">
            <h2 class="section-title">🛡️ Техническая поддержка</h2>
            <div class="info-card">
                <p>${data.proposal.support}</p>
            </div>
        </div>
        ` : ''}
        
        <!-- Next Steps -->
        ${data.proposal.nextSteps && data.proposal.nextSteps.length > 0 ? `
        <div class="section">
            <h2 class="section-title">🚀 Следующие шаги</h2>
            <div class="next-steps">
                ${data.proposal.nextSteps.map(step => `
                    <div class="next-step">${step}</div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Contact Info -->
        <div class="contact-info">
            <h3>📞 Связаться с нами</h3>
            <p>Готовы обсудить детали проекта и ответить на все ваши вопросы!</p>
            <p><strong>Telegram:</strong> @your_telegram</p>
            <p><strong>WhatsApp:</strong> +996 XXX XXX XXX</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Предложение действительно в течение 30 дней с момента создания</p>
            <p>© ${new Date().getFullYear()} Codev - Разработка IT-решений</p>
        </div>
    </div>
</body>
</html>
`;
}
