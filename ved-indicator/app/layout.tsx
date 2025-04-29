import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "sonner"
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Ved Indicator | 教育指标分析平台',
  description: '专业的教育数据分析和可视化平台，帮助教育工作者做出数据驱动的决策',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
