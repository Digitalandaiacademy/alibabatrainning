'use client'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent py-20 sm:py-32 lg:py-48">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Chine → Afrique
          </h1>
          <p className="mt-6 text-xl leading-8 text-foreground/80">
            <span className="font-semibold">Importation, Dropshipping et Profits Pas à Pas</span>
          </p>

          <p className="mt-8 text-lg text-foreground/70 max-w-2xl mx-auto">
            Apprenez comment importer depuis la Chine et générer des profits substantiels en Afrique. Une formation complète et pratique pour débuter ou développer votre business.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir l'aperçu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 px-8 bg-transparent"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me contacter
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">45</p>
              <p className="text-sm text-foreground/60 mt-1">Pages de contenu</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5000 FCFA</p>
              <p className="text-sm text-foreground/60 mt-1">Prix formation</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">♾️</p>
              <p className="text-sm text-foreground/60 mt-1">Accès à vie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
