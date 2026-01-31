import { Hero } from '@/components/hero'
import { IdentificationSection } from '@/components/identification-section'
import { MythsSection } from '@/components/myths-section'
import { SolutionSection } from '@/components/solution-section'
import { CourseContentSection } from '@/components/course-content-section'
import { CoursePreview } from '@/components/course-preview'
import { DifferentiationSection } from '@/components/differentiation-section'
import { GuaranteeSection } from '@/components/guarantee-section'
import { PricingSection } from '@/components/pricing-section'
import { FinalCtaSection } from '@/components/final-cta-section'
import { FaqSection } from '@/components/faq-section'
import { Contact } from '@/components/contact'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formation Chine → Afrique | Importation & Dropshipping',
  description: 'Acheter en Chine et lancer ton commerce en Afrique en toute sécurité, sans te faire arnaquer, même avec un petit budget. Formation complète avec accompagnement jusqu\'à ton premier achat réussi.',
  keywords: 'importation, dropshipping, commerce électronique, formation en ligne, Alibaba, Pinduoduo, Chine, Afrique, Cameroun',

  // Open Graph metadata for social media sharing
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://alibaba-trainning.da-academy.digital/',
    siteName: 'Digital & AI Academy - Formation Chine → Afrique',
    title: 'Formation Chine → Afrique | Importation & Dropshipping',
    description: 'Acheter en Chine et lancer ton commerce en Afrique en toute sécurité, sans te faire arnaquer, même avec un petit budget. Formation complète avec accompagnement jusqu\'à ton premier achat réussi.',
    images: [
      {
        url: 'https://alibaba-trainning.da-academy.digital/sommaire.jpg',
        width: 1200,
        height: 630,
        alt: 'Sommaire de la Formation Chine → Afrique',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Formation Chine → Afrique | Importation & Dropshipping',
    description: 'Acheter en Chine et lancer ton commerce en Afrique en toute sécurité, sans te faire arnaquer, même avec un petit budget.',
    images: ['https://alibaba-trainning.da-academy.digital/sommaire.jpg'],
  },

  // Additional metadata
  authors: [{ name: 'Joseph Chanel OBAH' }],
  creator: 'Digital & AI Academy',
  publisher: 'Digital & AI Academy',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <IdentificationSection />
      <MythsSection />
      <SolutionSection />
      <CourseContentSection />
      <CoursePreview />
      <DifferentiationSection />
      <GuaranteeSection />
      <PricingSection />
      <FinalCtaSection />
      <FaqSection />
      <Contact />
      <Footer />
    </main>
  )
}
