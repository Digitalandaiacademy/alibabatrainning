'use client'

import { BookOpen, GraduationCap, Users } from 'lucide-react'

export function SolutionSection() {
    const offerings = [
        {
            icon: BookOpen,
            title: 'Un livre PDF de 45 pages',
            description: 'Guide complet et détaillé pour tout comprendre'
        },
        {
            icon: GraduationCap,
            title: 'Une formation en ligne complète',
            description: 'Accès à vie avec toutes les mises à jour'
        },
        {
            icon: Users,
            title: 'Un accompagnement réel',
            description: 'Jusqu\'à ton premier achat réussi en Chine'
        }
    ]

    return (
        <section className="py-20 sm:py-32 bg-gradient-to-b from-transparent to-primary/5">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-4">
                        Voici ce que tu obtiens
                    </h2>
                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Un package complet pour réussir ton premier achat en Chine
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {offerings.map((offering, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <offering.icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {offering.title}
                                </h3>
                                <p className="text-foreground/70">
                                    {offering.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-xl font-semibold text-primary flex items-center justify-center gap-2">
                            <span className="text-2xl">👉</span>
                            Tu n'es pas laissé seul après l'achat.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
