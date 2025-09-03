import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codev - IT компания | Разработка и оцифровка бизнеса",
  description: "Codev - IT компания, которая занимается разработкой, оцифровкой бизнеса, созданием сайтов и веб-приложений. Получите расчёт стоимости проекта за минуту с нашим AI-помощником.",
  keywords: "IT компания, разработка сайтов, веб-приложения, оцифровка бизнеса, Codev, программирование, дизайн",
  authors: [{ name: "Codev Team" }],
  creator: "Codev",
  publisher: "Codev",
  icons: {
    icon: [
      {
        url: '/codev-logo-without-bg.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/codev-logo-without-bg.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: {
      url: '/codev-logo-without-bg.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/codev-logo-without-bg.png',
  },
  openGraph: {
    title: "Codev - IT компания | Разработка и оцифровка бизнеса",
    description: "Codev - IT компания, которая занимается разработкой, оцифровкой бизнеса, созданием сайтов и веб-приложений. Получите расчёт стоимости проекта за минуту с нашим AI-помощником.",
    images: ['/codev-logo-without-bg.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Codev - IT компания | Разработка и оцифровка бизнеса",
    description: "Codev - IT компания, которая занимается разработкой, оцифровкой бизнеса, созданием сайтов и веб-приложений.",
    images: ['/codev-logo-without-bg.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/GetVoIP_Grotesque.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/KanitCyrillic.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
