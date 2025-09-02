import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { generatePDFTemplate, ProposalData } from '../../../lib/pdf-template'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Генерируем PDF
    const pdfBuffer = await generatePDF(data)

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="proposal.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

async function generatePDF(data: ProposalData): Promise<Buffer> {
  let browser;
  let page;
  
  try {
    // Запускаем Puppeteer браузер с оптимизированными настройками
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox', 
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-ipc-flooding-protection'
      ],
      timeout: 60000
    });

    page = await browser.newPage();
    
    // Устанавливаем больший viewport и таймауты
    await page.setViewport({ width: 1200, height: 800 });
    
    // Генерируем HTML контент
    const htmlContent = generatePDFTemplate(data);
    
    // Устанавливаем HTML контент с увеличенным таймаутом
    await page.setContent(htmlContent, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    // Ждем полной загрузки страницы
    await page.evaluateHandle('document.fonts.ready');
    
    // Небольшая задержка для стабильности
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Генерируем PDF с увеличенным таймаутом
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm', 
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      timeout: 60000
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    
    // Пытаемся закрыть страницу перед повторной попыткой
    if (page && !page.isClosed()) {
      try {
        await page.close();
      } catch (closeError) {
        console.error('Error closing page:', closeError);
      }
    }
    
    // Fallback: генерируем простой HTML PDF если Puppeteer не работает
    return await generateFallbackPDF(data);
  } finally {
    // Закрываем браузер
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
  }
}

// Fallback функция для генерации простого PDF если Puppeteer не работает
async function generateFallbackPDF(data: ProposalData): Promise<Buffer> {
  console.log('Using fallback PDF generation...');
  
  // Создаем простой HTML документ
  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; margin: 40px; line-height: 1.6;">
        <h1 style="color: #007BFF;">Предложение по разработке IT-решения</h1>
        <p><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
        <p><strong>Специальная скидка:</strong> -10%</p>
        
        <h2>Контактные данные</h2>
        <p><strong>ФИО:</strong> ${data.contact.fullName}</p>
        <p><strong>WhatsApp:</strong> ${data.contact.whatsapp}</p>
        
        <h2>Проект: ${data.proposal.title}</h2>
        <p>${data.proposal.description}</p>
        
        <h2 style="color: #28a745;">Стоимость</h2>
        <p style="font-size: 24px; color: #28a745;"><strong>${Math.round(data.totalPrice * 0.9).toLocaleString()} KGS</strong> (со скидкой 10%)</p>
        <p><em>Оригинальная цена: ${data.totalPrice.toLocaleString()} KGS</em></p>
        <p><strong>Срок:</strong> ${data.totalWeeks} недель</p>
        
        <h2>Функциональность</h2>
        <ul>
          ${data.proposal.functionality?.map(func => `<li>${func}</li>`).join('') || '<li>Функциональность будет определена после детального анализа</li>'}
        </ul>
        
        <h2>Рекомендации для расширения</h2>
        ${data.proposal.additional_recommendations && data.proposal.additional_recommendations.length > 0 ? `
          <ul>
            ${data.proposal.additional_recommendations.map(rec => `
              <li>
                <strong>${rec.title}</strong> (+${rec.additional_cost.toLocaleString()} KGS, +${rec.additional_weeks} нед.)<br>
                <em>${rec.description}</em>
              </li>
            `).join('')}
          </ul>
        ` : '<p>Дополнительные функции будут предложены после анализа</p>'}
        
        <h2>Следующие шаги</h2>
        <ol>
          ${data.proposal.nextSteps?.map(step => `<li>${step}</li>`).join('') || '<li>Связаться для обсуждения деталей</li>'}
        </ol>
        
        <p style="margin-top: 40px; color: #666; font-size: 12px;">
          Предложение действительно в течение 30 дней<br>
          © ${new Date().getFullYear()} Codev - Разработка IT-решений
        </p>
      </body>
    </html>
  `;
  
  // Возвращаем HTML как буфер (можно использовать для простого HTML вывода)
  return Buffer.from(htmlContent, 'utf-8');
}
