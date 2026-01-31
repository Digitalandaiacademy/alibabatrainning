'use client'

import { DollarSign, Coffee, Smartphone, ShoppingBag } from 'lucide-react'

export function PricingSection() {
    const comparisons = [
        {
            icon: Coffee,
            text: 'une sortie du week-end'
        },
        {
            icon: Smartphone,
            text: 'un abonnement inutile'
        },
        {
            icon: ShoppingBag,
            text: 'une erreur d\'achat mal faite'
        }
    ]

    return (
        <section className="py-20 sm:py-32 bg-gradient-to-b from-transparent to-primary/5">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <DollarSign className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">
                            Le prix
                        </h2>
                    </div>

                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Tout le programme + le suivi est accessible pour :
                    </p>

                    {/* Price Card */}
                    <div className="text-center mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                        <p className="text-6xl font-bold text-primary mb-2">5 000 FCFA</p>
                        <p className="text-lg text-foreground/70">seulement</p>
                    </div>

                    {/* Comparisons */}
                    <div className="space-y-4">
                        <p className="text-xl font-semibold text-foreground text-center mb-6">
                            👉 Moins que :
                        </p>

                        {comparisons.map((comparison, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-center p-4 rounded-lg bg-card border border-border"
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <comparison.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-lg text-foreground/80">{comparison.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Value proposition */}
                    <div className="mt-12 p-6 rounded-lg bg-green-500/10 border-2 border-green-500/30">
                        <p className="text-center text-lg font-semibold text-green-600 dark:text-green-400">
                            💡 Un investissement qui peut te rapporter des centaines de milliers de FCFA
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
