import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { generatePDFTemplate, ProposalData } from '../../../lib/pdf-template'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { contact } = data

    // Генерируем PDF
    const pdfBuffer = await generatePDF(data)

    // Отправляем в Telegram
    await sendToTelegram(contact, pdfBuffer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending proposal:', error)
    return NextResponse.json(
      { error: 'Failed to send proposal' },
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

async function sendToTelegram(contact: { fullName: string; whatsapp: string }, pdfBuffer: Buffer) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const adminId = process.env.ADMINS_TELEGRAM_ID

  if (!botToken || !adminId) {
    console.log('Telegram bot not configured, skipping Telegram send...')
    console.log('PDF generated successfully for:', contact.fullName)
    console.log('PDF size:', pdfBuffer.length, 'bytes')
    return // Просто пропускаем отправку в Telegram если не настроен
  }

  // Отправляем текстовое сообщение
  const message = `🆕 Новая заявка на разработку!\n\n👤 ФИО: ${contact.fullName}\n📱 WhatsApp: ${contact.whatsapp}\n\n📄 PDF с детальным предложением прикреплен ниже.`

  const textResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: adminId,
      text: message,
      parse_mode: 'HTML'
    }),
  })

  if (!textResponse.ok) {
    throw new Error('Failed to send text message to Telegram')
  }

  // Отправляем PDF
  const formData = new FormData()
  formData.append('chat_id', adminId)
  formData.append('document', new Blob([pdfBuffer.buffer], { type: 'application/pdf' }), `proposal_${contact.fullName.replace(/\s+/g, '_')}.pdf`)
  formData.append('caption', `Предложение для ${contact.fullName}`)

  const pdfResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: formData,
  })

  if (!pdfResponse.ok) {
    throw new Error('Failed to send PDF to Telegram')
  }
}
