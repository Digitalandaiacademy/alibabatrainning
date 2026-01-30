'use client'

import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">À propos</h3>
            <p className="text-sm text-foreground/60">
              Digital & AI Academy forme les entrepreneurs africains aux technologies digitales et à l'IA.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Formation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-foreground/60 hover:text-primary">Caractéristiques</a></li>
              <li><a href="#preview" className="text-foreground/60 hover:text-primary">Aperçu</a></li>
              <li><a href="#contact" className="text-foreground/60 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/60 hover:text-primary">CGU</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary">Confidentialité</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary">Remboursement</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Suivez-nous</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/60 hover:text-primary">Facebook</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary">Instagram</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            © {currentYear} Digital & AI Academy. Fait avec <Heart className="w-4 h-4 text-secondary" /> au Cameroun
          </p>
          <p className="text-sm text-foreground/60">
            alibaba-trainning.da-academy.digital
          </p>
        </div>
      </div>
    </footer>
  )
}
