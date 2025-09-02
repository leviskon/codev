import { NextRequest, NextResponse } from 'next/server'
import { getProjects, getProjectById } from '../../../lib/database'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Получение проектов из базы данных...')
    
    // Получаем параметр id из URL если есть
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (id) {
      // Получаем конкретный проект по ID
      const projectId = parseInt(id, 10)
      
      if (isNaN(projectId)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Некорректный ID проекта'
          },
          { status: 400 }
        )
      }
      
      const project = await getProjectById(projectId)
      
      if (!project) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Проект не найден'
          },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        project
      })
    }
    
    // Получаем все проекты
    const projects = await getProjects()
    
    return NextResponse.json({
      success: true,
      projects,
      count: projects.length
    })
    
  } catch (error) {
    console.error('Ошибка получения проектов:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера при получении проектов',
        details: error.message
      },
      { status: 500 }
    )
  }
}
