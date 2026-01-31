'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-48">
      {/* Optional Background Image with Gradient Overlay */}
      {/* Uncomment the following lines to add a background image */}
      {/* <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
      </div> */}

      {/* Gradient background (used when no image) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-transparent"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
            Acheter en Chine et lancer ton commerce en Afrique
            <span className="block mt-3 text-primary">
              en toute sécurité, sans te faire arnaquer,
            </span>
            <span className="block mt-2">
              même avec un petit budget
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-xl leading-8 text-foreground/80 max-w-3xl mx-auto">
            <span className="font-semibold">Une méthode claire pour débutants africains :</span>
            <br />
            Alibaba, Pinduoduo, paiements locaux, transitaires et revente expliqués simplement.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              👉 Voir l'aperçu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 px-8 bg-transparent"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              👉 Me contacter
            </Button>
            <Link href="/checkout">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                👉 Accéder à la formation (5 000 FCFA)
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 text-center">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-4xl font-bold text-primary">45</p>
              <p className="text-sm text-foreground/60 mt-1">Pages de contenu</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-4xl font-bold text-primary">5000 FCFA</p>
              <p className="text-sm text-foreground/60 mt-1">Prix formation</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border col-span-2 sm:col-span-1">
              <p className="text-4xl font-bold text-primary">♾️</p>
              <p className="text-sm text-foreground/60 mt-1">Accès à vie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
