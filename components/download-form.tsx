'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function DownloadForm() {
    const [orderId, setOrderId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const cleanOrderId = orderId.trim()

            // Step 1: Pre-check access (this doesn't count as a download yet)
            const checkResponse = await fetch(`/api/download?orderId=${cleanOrderId}&check=true`)

            if (!checkResponse.ok) {
                const data = await checkResponse.json()
                throw new Error(data.error || "Erreur de vérification.")
            }

            const checkData = await checkResponse.json()
            if (checkData.customerName) {
                setCustomerName(checkData.customerName)
            }

            // Step 2: Trigger native browser download
            // Using window.location.href makes the browser's download manager appear immediately
            // and handle the progress UI natively.
            window.location.href = `/api/download?orderId=${cleanOrderId}`

            // Note: We don't need to do anything else, the browser takes over.
            // We can clear loading immediately or after a short delay
            setTimeout(() => setLoading(false), 2000)
            return

        } catch (err: any) {
            setError(err.message || "Une erreur est survenue")
            setLoading(false)
        }
    }

    return (
        <section className="py-20">
            <div className="container mx-auto max-w-md px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Espace de Téléchargement</CardTitle>
                        <CardDescription className="text-center">
                            Entrez votre numéro de commande (reçu par email) pour télécharger la formation.
                            <br />
                            <span className="text-amber-600 font-semibold block mt-1">
                                ⚠️ Attention: Un seul téléchargement est autorisé par commande.
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleDownload} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="orderId" className="text-sm font-medium">Numéro de Commande (Order ID)</label>
                                <Input
                                    id="orderId"
                                    placeholder="ex: 7dbf9bc9-..."
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full" disabled={loading || !orderId}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Vérification...
                                    </>
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Télécharger le PDF
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-muted-foreground text-center mt-4">
                                Le téléchargement commencera automatiquement si votre paiement a été validé par l'administrateur.
                            </p>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border">
                            <h4 className="text-sm font-semibold mb-2">Besoin d'aide ?</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Si vous rencontrez des difficultés à télécharger votre formation, contactez-nous directement sur WhatsApp.
                            </p>
                            <a
                                href={`https://wa.me/237672991834?text=${encodeURIComponent(
                                    `Bonjour, je suis ${customerName || 'un client'}. J'ai effectué le paiement pour la formation Chine → Afrique (Numéro de commande: ${orderId}). J'ai des difficultés à télécharger le fichier, pouvez-vous m'aider ?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg transition-colors font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Contacter l'assistance sur WhatsApp
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
