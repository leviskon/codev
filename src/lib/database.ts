import { Pool } from 'pg';

// Создаем пул соединений для PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL?.includes('localhost') && !process.env.DATABASE_URL?.includes('db:') 
    ? { rejectUnauthorized: false } 
    : false, // SSL только для внешних БД, не для Docker
});

/**
 * Получить админские Telegram ID из базы данных
 * @returns Promise<string[]> - массив Telegram ID администраторов
 */
export async function getAdminTelegramIds(): Promise<string[]> {
  const client = await pool.connect();
  
  try {
    console.log('Подключение к БД для получения admin_telegram_ids...');
    
    const result = await client.query(
      'SELECT value FROM settings WHERE key = $1',
      ['admin_telegram_ids']
    );
    
    if (result.rows.length === 0) {
      console.warn('Не найдены admin_telegram_ids в таблице settings');
      return [];
    }
    
    const value = result.rows[0].value;
    console.log('Получены admin_telegram_ids из БД:', value);
    
    // Парсим JSON массив из поля value
    try {
      const adminIds = JSON.parse(value);
      
      if (!Array.isArray(adminIds)) {
        console.error('admin_telegram_ids должен быть массивом');
        return [];
      }
      
      console.log(`Найдено ${adminIds.length} администраторов:`, adminIds);
      return adminIds;
      
    } catch (parseError) {
      console.error('Ошибка парсинга JSON admin_telegram_ids:', parseError);
      return [];
    }
    
  } catch (error) {
    console.error('Ошибка при получении admin_telegram_ids из БД:', error);
    return [];
  } finally {
    client.release();
  }
}

/**
 * Проверить подключение к базе данных
 */
export async function testDatabaseConnection(): Promise<boolean> {
  const client = await pool.connect();
  
  try {
    const result = await client.query('SELECT NOW()');
    console.log('✅ Подключение к БД успешно:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error);
    return false;
  } finally {
    client.release();
  }
}

/**
 * Интерфейс проекта
 */
export interface Project {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  project_url?: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Получить все проекты из базы данных
 * @returns Promise<Project[]> - массив проектов
 */
export async function getProjects(): Promise<Project[]> {
  const client = await pool.connect();
  
  try {
    console.log('Получение проектов из БД...');
    
    const result = await client.query(
      'SELECT id, title, description, image_url, project_url, created_at, updated_at FROM projects ORDER BY created_at DESC'
    );
    
    console.log(`Найдено ${result.rows.length} проектов в БД`);
    return result.rows;
    
  } catch (error) {
    console.error('Ошибка при получении проектов из БД:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Получить проект по ID
 * @param id - ID проекта
 * @returns Promise<Project | null> - проект или null если не найден
 */
export async function getProjectById(id: number): Promise<Project | null> {
  const client = await pool.connect();
  
  try {
    console.log(`Получение проекта с ID ${id} из БД...`);
    
    const result = await client.query(
      'SELECT id, title, description, image_url, project_url, created_at, updated_at FROM projects WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      console.log(`Проект с ID ${id} не найден`);
      return null;
    }
    
    return result.rows[0];
    
  } catch (error) {
    console.error(`Ошибка при получении проекта с ID ${id} из БД:`, error);
    throw error;
  } finally {
    client.release();
  }
}

// Освобождение ресурсов при завершении процесса
process.on('SIGINT', () => {
  pool.end();
});

process.on('SIGTERM', () => {
  pool.end();
});
