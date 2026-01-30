import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Paiement reçu | Digital & AI Academy',
  description: 'Merci pour votre achat! Vous recevrez bientôt votre accès à la formation.',
}

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const orderId = searchParams.orderId

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-20 sm:py-32">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Paiement reçu!
            </h1>
            
            <p className="text-lg text-foreground/70 mb-8">
              Merci pour votre achat. Votre commande a été créée avec succès.
            </p>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">N° de commande</p>
                  <p className="text-lg font-semibold text-primary font-mono">
                    {orderId || 'En traitement...'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Statut</p>
                  <p className="text-lg font-semibold text-amber-600">
                    En attente de vérification
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-foreground/70">
                    📧 Vous recevrez un email dès que votre paiement sera confirmé (généralement dans les 2-4 heures)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Prochaines étapes
              </h2>
              
              <div className="text-left space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      1
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Vérification du paiement</p>
                    <p className="text-sm text-foreground/60">
                      Nous vérifions votre paiement auprès de votre prestataire
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      2
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Confirmation par email</p>
                    <p className="text-sm text-foreground/60">
                      Vous recevrez un email avec votre lien de téléchargement
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      3
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Téléchargez votre formation</p>
                    <p className="text-sm text-foreground/60">
                      Accédez à votre PDF complet pendant 48 heures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-900 mb-4">
                <span className="font-semibold">ℹ️ Besoin d'aide?</span>
              </p>
              <p className="text-sm text-blue-800 mb-4">
                Si vous n'avez pas reçu votre email dans 4 heures, contactez-nous:
              </p>
              <a
                href="https://wa.me/237672991834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                📱 WhatsApp Business: +237 672 991 834
              </a>
            </div>

            <div className="mt-12">
              <Link href="/">
                <Button variant="outline">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
