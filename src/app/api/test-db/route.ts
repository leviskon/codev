import { NextRequest, NextResponse } from 'next/server'
import { testDatabaseConnection, getAdminTelegramIds } from '../../../lib/database'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Тестирование подключения к базе данных...')
    
    // Проверяем подключение к БД
    const isConnected = await testDatabaseConnection()
    
    if (!isConnected) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Не удалось подключиться к базе данных',
          connection: false
        },
        { status: 500 }
      )
    }
    
    // Получаем админские Telegram ID
    const adminIds = await getAdminTelegramIds()
    
    return NextResponse.json({
      success: true,
      connection: true,
      message: 'Подключение к БД успешно',
      adminTelegramIds: adminIds,
      adminCount: adminIds.length,
      databaseUrl: process.env.DATABASE_URL ? 'Настроен' : 'Не настроен'
    })
    
  } catch (error) {
    console.error('Ошибка тестирования БД:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        connection: false
      },
      { status: 500 }
    )
  }
}
