'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function DownloadForm() {
    const [orderId, setOrderId] = useState('')
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
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
