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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr text-foreground">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
