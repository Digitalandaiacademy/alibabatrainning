import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital & AI Academy | Formation Chine → Afrique',
  description: 'Apprenez à importer depuis la Chine et à développer votre business en Afrique avec notre formation complète.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
