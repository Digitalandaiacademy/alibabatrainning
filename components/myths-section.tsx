'use client'

import { X, Check } from 'lucide-react'

export function MythsSection() {
    const myths = [
        {
            myth: 'Acheter en Chine, c\'est réservé aux riches',
            reality: 'Tu peux commencer avec un petit budget'
        },
        {
            myth: 'Sans carte Visa, tu es bloqué',
            reality: 'Tu peux payer avec MTN & Orange Money'
        },
        {
            myth: 'Les transitaires sont trop compliqués',
            reality: 'Les transitaires deviennent simples quand tu comprends le système'
        },
        {
            myth: 'C\'est trop risqué',
            reality: 'Le risque vient de l\'improvisation, pas de la Chine'
        }
    ]

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-4">
                        Démolition des Mythes
                    </h2>
                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Ce qu'on te fait croire vs la réalité
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myths.map((item, index) => (
                            <div key={index} className="space-y-4">
                                {/* Mythe */}
                                <div className="p-6 rounded-lg bg-destructive/10 border-2 border-destructive/30">
                                    <div className="flex gap-3 items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20">
                                                <X className="h-5 w-5 text-destructive" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-destructive mb-1">Mythe</p>
                                            <p className="text-foreground/80">{item.myth}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Réalité */}
                                <div className="p-6 rounded-lg bg-green-500/10 border-2 border-green-500/30">
                                    <div className="flex gap-3 items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Réalité</p>
                                            <p className="text-foreground/80">{item.reality}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
