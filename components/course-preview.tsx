'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CoursePreview() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section id="preview" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Aperçu de la formation
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Consultez un extrait de la formation PDF avant d'acheter
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border p-8">

              {/* Carousel for Cover and Summary Images */}
              <Carousel className="w-full max-w-2xl mx-auto mb-8">
                <CarouselContent>
                  <CarouselItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video w-full h-full flex items-center justify-center bg-gray-50 rounded-lg cursor-pointer group overflow-hidden">
                          <img
                            src="/couverture.png"
                            alt="Couverture Formation Chine Afrique"
                            className="object-cover w-full h-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden border-none bg-transparent shadow-none">
                        <div className="relative w-full h-auto">
                          <img
                            src="/couverture.png"
                            alt="Couverture Formation Chine Afrique"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                  <CarouselItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video w-full h-full flex items-center justify-center bg-gray-50 rounded-lg cursor-pointer group overflow-hidden">
                          <img
                            src="/sommaire.png"
                            alt="Aperçu du sommaire en image"
                            className="object-cover w-full h-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden border-none bg-transparent shadow-none">
                        <div className="relative w-full h-auto">
                          <img
                            src="/sommaire.png"
                            alt="Aperçu du sommaire en image"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="text-center">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mb-6"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Masquer le sommaire détaillé' : 'Voir le sommaire détaillé'}
                </Button>
              </div>

              {showPreview && (
                <div className="p-6 border-t border-border bg-card rounded-lg mx-auto max-w-xl text-left">
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Sommaire Détaillé</h3>
                  <div className="space-y-3 text-sm text-foreground/80">
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Introduction</span> - Pourquoi la Chine vers l'Afrique?</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 1</span> - Trouver les bons fournisseurs</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 2</span> - Négociation et prix</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 3</span> - Logistique et expédition</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 4</span> - Douanes et documentation</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 5</span> - Dropshipping: Guide complet</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 6</span> - Calcul des marges et pricing</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 7</span> - Marketing et vente</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 <span className="font-semibold">Chapitre 8</span> - Cas pratiques et études de cas</p>
                    <p className="p-2 bg-muted/50 rounded hover:bg-muted transition-colors">📌 Ressources et références utiles</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Section */}
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border h-fit sticky top-24">
            <h3 className="text-2xl font-bold text-foreground mb-4">Formation Complète</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="text-foreground/70">Prix</span>
                <span className="text-3xl font-bold text-primary">5000 FCFA</span>
              </div>
              <div className="text-sm text-foreground/60 space-y-1">
                <p>✓ Accès à vie au PDF</p>
                <p>✓ Mises à jour futures</p>
                <p>✓ Support par email</p>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold mb-4">
                Acheter maintenant
              </Button>
            </Link>

            <p className="text-xs text-foreground/50 text-center">
              Paiement sécurisé • Livraison instantanée
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
