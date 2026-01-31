'use client'

import { BookOpen } from 'lucide-react'

export function CourseContentSection() {
    const modules = [
        {
            title: 'Comprendre Alibaba et Pinduoduo',
            description: 'Comment fonctionnent réellement ces plateformes'
        },
        {
            title: 'Trouver des produits rentables',
            description: 'Identifier les opportunités pour le marché africain'
        },
        {
            title: 'Vérifier les fournisseurs',
            description: 'Éviter les arnaques et choisir les bons partenaires'
        },
        {
            title: 'Payer sans stress',
            description: 'Cartes, solutions locales, mobile money expliqués'
        },
        {
            title: 'Choisir un transitaire fiable',
            description: 'Comprendre la logistique et la livraison'
        },
        {
            title: 'Calculer les vrais coûts',
            description: 'Sans surprises, avec tous les frais inclus'
        },
        {
            title: 'Revendre efficacement',
            description: 'Stratégies de vente adaptées au Cameroun'
        },
        {
            title: 'Utiliser le dropshipping',
            description: 'Intelligemment et de manière rentable'
        }
    ]

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-4">
                        Ce que tu vas apprendre, étape par étape
                    </h2>
                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Un parcours complet du début à la fin
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {modules.map((module, index) => (
                            <div
                                key={index}
                                className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <span className="text-lg font-bold text-primary">{index + 1}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">
                                        {module.title}
                                    </h3>
                                    <p className="text-foreground/70">
                                        {module.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-xl font-semibold text-primary flex items-center justify-center gap-2">
                            <span className="text-2xl">👉</span>
                            Même si tu n'as jamais acheté en ligne de ta vie.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
