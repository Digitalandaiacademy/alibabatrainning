'use client'

import { Check } from 'lucide-react'

export function Features() {
  const features = [
    'Guides complets sur l\'importation depuis la Chine',
    'Stratégies de dropshipping proven et testées',
    'Méthodes de négociation avec les fournisseurs',
    'Gestion logistique et douanes expliquée',
    'Calcul des marges et pricing stratégique',
    'Études de marché pour l\'Afrique',
    'Construction de votre brand personnel',
    'Mise en place de votre boutique en ligne',
  ]

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ce que vous allez apprendre
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Une formation complète couvrant tous les aspects du commerce électronique entre la Chine et l'Afrique
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
