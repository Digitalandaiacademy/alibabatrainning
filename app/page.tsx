import { Hero } from '@/components/hero'
import { CoursePreview } from '@/components/course-preview'
import { Features } from '@/components/features'
import { Contact } from '@/components/contact'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Formation Chine → Afrique | Importation & Dropshipping',
  description: 'Maîtrisez l\'importation depuis la Chine et le dropshipping. Formation complète de Digital & AI Academy dirigée par Joseph Chanel OBAH.',
  keywords: 'importation, dropshipping, commerce électronique, formation en ligne',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <CoursePreview />
      <Contact />
      <Footer />
    </main>
  )
}
