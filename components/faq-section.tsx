'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from 'lucide-react'

export function FaqSection() {
    const faqs = [
        {
            question: 'Est-ce que c\'est adapté aux débutants ?',
            answer: 'Oui. La formation est conçue pour zéro expérience. Tout est expliqué depuis le début, étape par étape, avec des exemples concrets.'
        },
        {
            question: 'Est-ce que je peux vraiment payer depuis le Cameroun ?',
            answer: 'Oui. Les solutions locales sont expliquées clairement. Tu peux utiliser MTN Money, Orange Money, et d\'autres méthodes de paiement accessibles au Cameroun.'
        },
        {
            question: 'Est-ce que je serai seul après l\'achat ?',
            answer: 'Non. Il y a un suivi réel jusqu\'au premier achat. Tu peux poser tes questions et recevoir de l\'aide pour réussir ton premier achat en Chine.'
        },
        {
            question: 'Est-ce que ça marche avec un petit budget ?',
            answer: 'Oui. C\'est même prévu pour ça. La formation t\'explique comment commencer avec un budget limité et comment maximiser tes profits dès le début.'
        }
    ]

    return (
        <section className="py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <HelpCircle className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">
                            Questions Fréquentes
                        </h2>
                    </div>

                    <p className="text-lg text-foreground/70 text-center mb-12">
                        Les réponses à tes dernières hésitations
                    </p>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-6">
                                    <span className="text-lg font-semibold text-foreground pr-4">
                                        {faq.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground/80 pb-6 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Additional reassurance */}
                    <div className="mt-12 p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
                        <p className="text-lg text-foreground/90">
                            💬 D'autres questions ? <span className="font-semibold text-primary">Contacte-moi directement</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
