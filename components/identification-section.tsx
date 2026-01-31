'use client'

import { CheckCircle2 } from 'lucide-react'

export function IdentificationSection() {
    const identificationPoints = [
        'Tu veux acheter en Chine mais tu as peur de perdre ton argent',
        'Tu penses qu\'il faut beaucoup d\'argent pour commencer',
        'Tu n\'as pas de carte Visa internationale',
        'Tu ne comprends rien aux transitaires et à la livraison',
        'Tu veux lancer un petit commerce rentable au Cameroun',
        'Tu es fatigué des vidéos floues et des conseils incomplets',
    ]

    return (
        <section className="py-20 sm:py-32 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
                        Cette formation est pour toi si :
                    </h2>

                    <div className="space-y-4">
                        {identificationPoints.map((point, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-start p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-lg text-foreground/80">{point}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-xl font-semibold text-primary flex items-center justify-center gap-2">
                            <span className="text-2xl">➡️</span>
                            Ici, on t'explique vraiment comment faire.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
