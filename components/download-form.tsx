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
            // Direct download via our secure proxy API
            const response = await fetch(`/api/download?orderId=${orderId}`, {
                method: 'GET',
            })

            if (!response.ok) {
                if (response.status === 404) throw new Error("Commande introuvable.")
                if (response.status === 403) throw new Error("Paiement non validé ou accès non accordé.")
                throw new Error("Erreur lors du téléchargement.")
            }

            // If successful, trigger the file download from the blob stream
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = "Formation-Chine-Afrique.pdf"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

        } catch (err: any) {
            setError(err.message || "Une erreur est survenue")
        } finally {
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
                            Entrez votre numéro de commande pour télécharger la formation.
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
