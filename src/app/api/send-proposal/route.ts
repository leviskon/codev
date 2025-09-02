import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { contact, proposal, selectedRecommendations, projectData, totalPrice, totalWeeks } = data

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

async function generatePDF(data: any): Promise<Buffer> {
  try {
    const doc = new jsPDF()
    let yPosition = 20

    // Функция для добавления текста с переносом строк
    const addText = (text: string, fontSize: number = 12, isBold: boolean = false, isTitle: boolean = false) => {
      doc.setFontSize(fontSize)
      if (isBold) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }

      const pageWidth = doc.internal.pageSize.width
      const margin = 20
      const maxWidth = pageWidth - (2 * margin)
      
      if (isTitle) {
        // Центрированный заголовок
        const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor
        const textOffset = (pageWidth - textWidth) / 2
        doc.text(text, textOffset, yPosition)
      } else {
        // Обычный текст с переносом
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, margin, yPosition)
        yPosition += (lines.length - 1) * (fontSize * 0.35)
      }
      
      yPosition += fontSize * 0.5
    }

    const addSpacing = (space: number = 5) => {
      yPosition += space
    }

    // Заголовок
    addText('Предложение по разработке IT-решения', 16, true, true)
    addSpacing(10)

    // Контактные данные
    addText('Контактные данные:', 14, true)
    addText(`ФИО: ${data.contact.fullName}`)
    addText(`WhatsApp: ${data.contact.whatsapp}`)
    addSpacing()

    // Данные проекта
    addText('Данные проекта:', 14, true)
    addText(`Сфера бизнеса: ${data.projectData.business}`)
    addText(`Цели: ${data.projectData.goals.join(', ')}`)
    addText(`Технологии: ${data.projectData.technologies.join(', ')}`)
    addText(`Бюджет: ${data.projectData.budgetRange.min.toLocaleString()} - ${data.projectData.budgetRange.max.toLocaleString()} KGS`)
    addText(`Сроки: ${data.projectData.timelineRange.min} - ${data.projectData.timelineRange.max} недель`)
    if (data.projectData.context) {
      addText(`Дополнительная информация: ${data.projectData.context}`)
    }
    addSpacing()

    // Предложение
    addText('Сгенерированное предложение:', 14, true)
    addText(`Название: ${data.proposal.title}`)
    addText(`Описание: ${data.proposal.description}`)
    addText(`Стоимость: ${data.totalPrice.toLocaleString()} KGS`)
    addText(`Сроки: ${data.totalWeeks} недель`)
    addSpacing()

    // Проверка на новую страницу
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Функциональность
    if (data.proposal.functionality?.length > 0) {
      addText('Функциональность:', 14, true)
      data.proposal.functionality.forEach((func: string, index: number) => {
        addText(`${index + 1}. ${func}`)
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
      })
      addSpacing()
    }

    // Выбранные рекомендации
    if (data.selectedRecommendations?.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      addText('Включенные дополнительные функции:', 14, true)
      data.selectedRecommendations.forEach((recIndex: number) => {
        const rec = data.proposal.additional_recommendations[recIndex]
        if (rec) {
          addText(`• ${rec.title} (+${rec.additional_cost.toLocaleString()} KGS, +${rec.additional_weeks} нед.)`)
        }
      })
      addSpacing()
    }

    // Этапы разработки
    if (data.proposal.phases?.length > 0) {
      if (yPosition > 230) {
        doc.addPage()
        yPosition = 20
      }
      addText('Этапы разработки:', 14, true)
      data.proposal.phases.forEach((phase: any, index: number) => {
        addText(`${index + 1}. ${phase.name} (${phase.duration_weeks} нед.)`)
        addText(`   ${phase.description}`)
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
      })
      addSpacing()
    }

    // Технический стек
    if (data.proposal.technical_stack) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      addText('Технический стек:', 14, true)
      const stack = data.proposal.technical_stack
      if (stack.frontend?.length) addText(`Frontend: ${stack.frontend.join(', ')}`)
      if (stack.backend?.length) addText(`Backend: ${stack.backend.join(', ')}`)
      if (stack.database?.length) addText(`База данных: ${stack.database.join(', ')}`)
      if (stack.deployment?.length) addText(`Развертывание: ${stack.deployment.join(', ')}`)
      addSpacing()
    }

    // Следующие шаги
    if (data.proposal.nextSteps?.length > 0) {
      if (yPosition > 230) {
        doc.addPage()
        yPosition = 20
      }
      addText('Следующие шаги:', 14, true)
      data.proposal.nextSteps.forEach((step: string, index: number) => {
        addText(`${index + 1}. ${step}`)
      })
    }

    // Конвертируем в Buffer
    const pdfOutput = doc.output('arraybuffer')
    return Buffer.from(pdfOutput)
  } catch (error) {
    throw error
  }
}

async function sendToTelegram(contact: any, pdfBuffer: Buffer) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const adminId = process.env.ADMINS_TELEGRAM_ID

  if (!botToken || !adminId) {
    throw new Error('Telegram bot token or admin ID not configured')
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
  formData.append('document', new Blob([pdfBuffer], { type: 'application/pdf' }), `proposal_${contact.fullName.replace(/\s+/g, '_')}.pdf`)
  formData.append('caption', `Предложение для ${contact.fullName}`)

  const pdfResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: formData,
  })

  if (!pdfResponse.ok) {
    throw new Error('Failed to send PDF to Telegram')
  }
}
