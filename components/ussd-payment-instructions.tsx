'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Smartphone, Monitor } from 'lucide-react'
import {
  isMobileDevice,
  generateUSSDDialURL,
  getUSSDInstructions,
  type PaymentMethod,
} from '@/lib/ussd'
import { generateQRCodeURL } from '@/lib/qrcode'

interface USSDPaymentInstructionsProps {
  ussdCode: string
  method: PaymentMethod
  amount: number
  orderId: string
  customerEmail: string
}

export function USSDPaymentInstructions({
  ussdCode,
  method,
  amount,
  orderId,
  customerEmail,
}: USSDPaymentInstructionsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  useEffect(() => {
    setIsMobile(isMobileDevice())
    setQrCodeUrl(generateQRCodeURL(ussdCode, 350))
  }, [ussdCode])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ussdCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDialUSSD = () => {
    const dialUrl = generateUSSDDialURL(ussdCode)
    window.location.href = dialUrl
  }

  const methodName = method === 'orange' ? 'Orange Money' : 'MTN Mobile Money'
  const methodColor = method === 'orange' ? 'bg-orange-50' : 'bg-yellow-50'
  const methodBorder = method === 'orange' ? 'border-orange-200' : 'border-yellow-200'
  const methodText = method === 'orange' ? 'text-orange-900' : 'text-yellow-900'

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code or Instructions */}
          <div className="lg:col-span-1">
            <Card className={`border-2 ${methodBorder} ${methodColor}`}>
              <CardHeader>
                <CardTitle className={methodText}>Scannez le code QR</CardTitle>
                <CardDescription>Depuis votre téléphone</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt={`QR Code for ${methodName}`}
                    className="w-48 h-48 border-2 border-foreground/20 rounded-lg"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé du paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground/70">Montant</span>
                  <span className="font-bold text-lg">{amount} FCFA</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground/70">Méthode</span>
                  <span className="font-semibold">{methodName}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground/70">Numéro de commande</span>
                  <span className="font-mono text-sm">{orderId}</span>
                </div>
              </CardContent>
            </Card>

            {/* USSD Code */}
            <Card className={methodBorder}>
              <CardHeader>
                <CardTitle>Code {methodName}</CardTitle>
                <CardDescription>
                  {isMobile
                    ? 'Appuyez sur le bouton pour lancer le paiement automatiquement'
                    : 'Copiez et collez ce code dans votre téléphone'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg font-mono text-center text-lg font-bold break-all">
                  {ussdCode}
                </div>

                <div className="flex gap-3">
                  {isMobile ? (
                    <Button
                      onClick={handleDialUSSD}
                      className="flex-1"
                      size="lg"
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Lancer le paiement
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCopyCode}
                      variant={copied ? 'secondary' : 'default'}
                      className="flex-1"
                      size="lg"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {copied ? 'Copié !' : 'Copier le code'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isMobile ? (
                    <Smartphone className="h-5 w-5" />
                  ) : (
                    <Monitor className="h-5 w-5" />
                  )}
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-foreground/80">
                  {isMobile ? (
                    <>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">1</span>
                        <span>Appuyez sur le bouton "Lancer le paiement"</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">2</span>
                        <span>
                          Votre application de paiement ({methodName}) s'ouvrira
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">3</span>
                        <span>Saisissez votre code secret pour confirmer</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">4</span>
                        <span>Attendez la confirmation du paiement</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">1</span>
                        <span>Copiez le code à l'aide du bouton ci-dessus</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">2</span>
                        <span>Allez sur votre téléphone</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">3</span>
                        <span>Ouvrez le clavier de votre téléphone</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">4</span>
                        <span>Collez et validez le code</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">5</span>
                        <span>Saisissez votre code secret {methodName}</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-primary flex-shrink-0">6</span>
                        <span>Attendez la confirmation du paiement par SMS</span>
                      </li>
                    </>
                  )}
                </ol>
              </CardContent>
            </Card>

            {/* Important Note */}
            <Alert>
              <AlertDescription className="text-foreground/80">
                <strong>Important:</strong> Après avoir effectué le paiement, notre équipe
                vérifiera votre transaction sous peu. Vous recevrez un email de confirmation
                avec le lien de téléchargement de la formation. Numéro de commande:{' '}
                <span className="font-mono font-bold">{orderId}</span>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  )
}
