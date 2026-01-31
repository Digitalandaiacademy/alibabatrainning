'use client'

import { Shield, Heart } from 'lucide-react'

export function GuaranteeSection() {
    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl"></div>

                        {/* Content */}
                        <div className="relative p-8 md:p-12 rounded-2xl bg-card border-2 border-primary/30 shadow-xl">
                            <div className="flex justify-center mb-6">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                                    <Shield className="h-10 w-10 text-primary" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-6">
                                Mon engagement
                            </h2>

                            <div className="space-y-6">
                                <p className="text-xl text-center text-foreground/90 leading-relaxed">
                                    Si tu suis la formation pas à pas,<br />
                                    <span className="font-bold text-primary text-2xl">
                                        je t'accompagne jusqu'à ton premier achat réussi en Chine.
                                    </span>
                                </p>

                                <div className="flex items-center justify-center gap-2 pt-4">
                                    <Heart className="h-6 w-6 text-primary fill-primary" />
                                    <p className="text-lg font-semibold text-primary">
                                        Ton objectif devient aussi le mien.
                                    </p>
                                    <Heart className="h-6 w-6 text-primary fill-primary" />
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="mt-8 pt-8 border-t border-border">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-primary">100%</p>
                                        <p className="text-sm text-foreground/60">Pratique</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">0</p>
                                        <p className="text-sm text-foreground/60">Théorie inutile</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">♾️</p>
                                        <p className="text-sm text-foreground/60">Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
