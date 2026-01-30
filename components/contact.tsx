'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Besoin d'aide ou de précisions?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Contactez Joseph Chanel OBAH, PDG et fondateur de Digital & AI Academy
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-lg bg-card border border-border p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2">WhatsApp Business</h3>
            <p className="text-foreground/60 mb-4">Communication rapide et directe</p>
            <a
              href="https://wa.me/237672991834"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:text-primary/80"
            >
              +237 672 991 834
            </a>
          </div>

          <div className="rounded-lg bg-card border border-border p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Localisation</h3>
            <p className="text-foreground/60 mb-4">Nous sommes basés à</p>
            <p className="text-primary font-semibold">
              Douala, Bonaberi<br />
              Cameroun
            </p>
          </div>

          <div className="rounded-lg bg-card border border-border p-8 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-foreground/60 mb-4">Pour les demandes formelles</p>
            <a
              href="mailto:joseph@da-academy.digital"
              className="text-primary font-semibold hover:text-primary/80"
            >
              joseph@da-academy.digital
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-lg bg-primary/10 border border-primary/30 p-8 sm:p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Digital & AI Academy
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Nous formons les entrepreneurs africains aux technologies digitales et à l'intelligence artificielle pour générer des revenus durables et professionnels.
          </p>
          <p className="text-sm text-foreground/60">
            Fondée par Joseph Chanel OBAH • Douala, Cameroun
          </p>
        </div>
      </div>
    </section>
  )
}
