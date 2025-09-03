This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Docker Deployment

This project includes Docker configuration for easy deployment. You can deploy it using Docker in two ways:

### Local Development with Docker Compose

1. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the application at http://localhost:3000

### Deploy on Timeweb Apps

Этот проект настроен для деплоя на Timeweb Apps:

#### Шаг 1: Подготовка базы данных
1. В панели Timeweb создайте базу данных PostgreSQL
2. Скопируйте строку подключения к базе данных

#### Шаг 2: Деплой приложения
1. Закоммитьте код в Git репозиторий
2. В Timeweb Apps создайте новое приложение
3. Подключите ваш репозиторий
4. Сервис автоматически обнаружит Dockerfile и развернет приложение

#### Шаг 3: Настройка переменных окружения
В настройках приложения Timeweb Apps укажите:
- `DATABASE_URL` - строка подключения к вашей PostgreSQL БД (из шага 1)

#### Шаг 4: Инициализация базы данных
После первого деплоя выполните SQL запросы для создания таблиц:

```sql
-- Создание таблицы настроек
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы проектов
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    project_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных настроек
INSERT INTO settings (key, value) VALUES 
('admin_telegram_ids', '[]')
ON CONFLICT (key) DO NOTHING;
```

## Deploy on Vercel

Alternatively, you can deploy on Vercel:

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
