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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '890189743411990');fbq('track', 'PageView');` }} />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=890189743411990&ev=PageView&noscript=1" />` }} />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
