'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Digital & AI Academy"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Caractéristiques
          </a>
          <a href="#preview" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Aperçu
          </a>
          <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
