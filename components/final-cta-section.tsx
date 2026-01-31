'use client'

import { Button } from '@/components/ui/button'
import { Rocket, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function FinalCtaSection() {
    const benefits = [
        'Clique maintenant et commence sérieusement',
        'Accède immédiatement au livre et à la formation',
        'Fais ton premier achat en Chine avec méthode'
    ]

    return (
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    {/* Rocket icon */}
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40 animate-pulse">
                            <Rocket className="h-10 w-10 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-center mb-8">
                        Prêt à passer à l'action ?
                    </h2>

                    {/* Benefits list */}
                    <div className="space-y-4 mb-12">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex gap-3 items-center justify-center"
                            >
                                <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                                <p className="text-lg text-foreground/90">{benefit}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <Link href="/checkout">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                ACCÉDER À LA FORMATION MAINTENANT
                            </Button>
                        </Link>

                        <p className="mt-6 text-sm text-foreground/60">
                            🔒 Paiement sécurisé • 📥 Accès immédiat • ♾️ Accès à vie
                        </p>
                    </div>

                    {/* Urgency message */}
                    <div className="mt-12 p-6 rounded-lg bg-card border-2 border-primary/30 text-center">
                        <p className="text-lg font-semibold text-primary">
                            ⏰ Ne laisse pas passer cette opportunité de transformer ton business
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
