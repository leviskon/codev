# Интеграция портфолио с базой данных

## Что было реализовано

### 1. API эндпоинт для проектов
- **Файл**: `src/app/api/projects/route.ts`
- **Функциональность**: 
  - Получение всех проектов из БД
  - Получение конкретного проекта по ID
  - Обработка ошибок и возврат соответствующих статус-кодов

### 2. Функции для работы с БД
- **Файл**: `src/lib/database.ts`
- **Добавленные функции**:
  - `getProjects()` - получение всех проектов
  - `getProjectById(id)` - получение проекта по ID
  - Интерфейс `Project` для типизации данных

### 3. Обновленный компонент портфолио
- **Файл**: `src/components/PortfolioSection.tsx`
- **Изменения**:
  - Загрузка данных из API вместо статичного массива
  - Индикатор загрузки
  - Обработка ошибок с fallback к примерам проектов
  - Адаптация данных из БД к формату отображения
  - Обработка отсутствующих изображений

## Структура таблицы projects

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT 'now()',
  updated_at TIMESTAMP NOT NULL DEFAULT 'now()'
);
```

## Как добавить новые проекты

### Вариант 1: Напрямую в БД
```sql
INSERT INTO projects (title, description, image_url, project_url) 
VALUES (
  'Название проекта',
  'Описание проекта',
  'https://example.com/image.jpg',
  'https://example.com'
);
```

### Вариант 2: Через админ панель (будущая разработка)

## Fallback механизм

Если база данных недоступна или произошла ошибка, компонент автоматически показывает примеры проектов:
- Gold Elegance
- Apakai  
- Kelkel Store

## API эндпоинты

### GET /api/projects
Возвращает все проекты из БД
```json
{
  "success": true,
  "projects": [...],
  "count": 3
}
```

### GET /api/projects?id=1
Возвращает конкретный проект
```json
{
  "success": true,
  "project": {...}
}
```

## Тестирование

1. Откройте http://localhost:3000/
2. Прокрутите до раздела "Примеры решений"
3. Проверьте, что проекты загружаются из БД
4. При ошибках соединения должны отображаться fallback проекты

## Настройка внешних изображений

В `next.config.ts` добавлены разрешенные домены для загрузки изображений:
- `i.ibb.co` и `**.ibb.co` - ImgBB хостинг
- `imgur.com` и `i.imgur.com` - Imgur
- `images.unsplash.com` - Unsplash
- `cdn.pixabay.com` - Pixabay
- `raw.githubusercontent.com` - GitHub

Если нужно добавить новый домен:
```typescript
{
  protocol: 'https',
  hostname: 'your-domain.com',
  port: '',
  pathname: '/**',
}
```

## Обработка ошибок изображений

- При ошибке загрузки показывается SVG placeholder
- Placeholder содержит графическую иконку и текст
- Предотвращается зацикливание при ошибках

## Файлы для добавления в git

- `src/app/api/projects/route.ts` - новый API эндпоинт
- `src/lib/database.ts` - обновленный с функциями для проектов  
- `src/components/PortfolioSection.tsx` - обновленный компонент
- `next.config.ts` - настройка внешних изображений
- `public/placeholder-project.svg` - SVG placeholder изображение
