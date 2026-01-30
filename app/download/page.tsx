import { DownloadForm } from '@/components/download-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
    title: 'Téléchargement | Digital & AI Academy',
    description: 'Téléchargez votre formation.',
}

export default function DownloadPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex-1">
                <DownloadForm />
            </div>
            <Footer />
        </main>
    )
}
