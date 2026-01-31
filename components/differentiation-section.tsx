'use client'

import { X, Star } from 'lucide-react'

export function DifferentiationSection() {
    const negatives = [
        'Pas de promesses irréalistes',
        'Pas de jargon compliqué',
        'Pas de théorie inutile'
    ]

    return (
        <section className="py-20 sm:py-32 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="h-8 w-8 text-primary fill-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">
                            Pourquoi cette formation est différente
                        </h2>
                        <Star className="h-8 w-8 text-primary fill-primary" />
                    </div>

                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Contrairement aux autres formations
                    </p>

                    <div className="space-y-4 mb-12">
                        {negatives.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-center p-6 rounded-lg bg-card border-2 border-primary/20"
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <X className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-lg font-semibold text-foreground">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center p-8 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/30">
                        <p className="text-2xl font-bold text-primary flex items-center justify-center gap-3">
                            <span className="text-3xl">👉</span>
                            Ici, c'est terrain + méthode + accompagnement
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
