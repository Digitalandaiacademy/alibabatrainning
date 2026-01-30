'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export function CheckoutForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'orange' | 'mtn' | 'stripe' | null>(null)
  const [orderId, setOrderId] = useState('')

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    const firstName = firstNameRef.current?.value || ''
    const lastName = lastNameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const phone = phoneRef.current?.value || ''

    if (!firstName.trim()) {
      setError('Le prénom est requis')
      return false
    }
    if (!lastName.trim()) {
      setError('Le nom est requis')
      return false
    }
    if (!email.trim()) {
      setError('L\'email est requis')
      return false
    }
    if (!phone.trim()) {
      setError('Le numéro de téléphone est requis')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer un email valide')
      return false
    }

    const phoneRegex = /^[0-9+\-\s()]{8,}$/
    if (!phoneRegex.test(phone)) {
      setError('Veuillez entrer un numéro de téléphone valide')
      return false
    }

    return true
  }

  const handlePayment = async (method: 'orange' | 'mtn' | 'stripe') => {
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const firstName = firstNameRef.current?.value || ''
      const lastName = lastNameRef.current?.value || ''
      const email = emailRef.current?.value || ''
      const phone = phoneRef.current?.value || ''

      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 5000,
          currency: 'XAF',
          method,
          firstName,
          lastName,
          email,
          phone,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Payment initiation failed')
      }

      const data = await response.json()

      if (method === 'orange' || method === 'mtn') {
        // Redirect to payment instructions page
        setOrderId(data.orderId)
        window.location.href = `/payment?orderId=${data.orderId}&method=${method}&amount=5000&email=${email}`
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setSuccess(true)
        setPaymentMethod(method)
        setOrderId(data.orderId)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur s\'est produite')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-green-900">Paiement en cours de traitement</CardTitle>
              <CardDescription className="text-green-700">
                Votre commande a été créée. Vous recevrez un email avec les instructions.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-foreground/70 mb-6">
                Méthode de paiement: <span className="font-semibold uppercase">{paymentMethod}</span>
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 sm:py-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Finaliser votre achat
          </h1>
          <p className="text-foreground/70 mt-2 text-lg">
            Formation: Chine → Afrique | Importation, Dropshipping et Profits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-foreground/60">Formation PDF</p>
                  <p className="text-lg font-semibold text-foreground">
                    Chine → Afrique
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground/70">Sous-total</span>
                    <span>5000 FCFA</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-foreground/70">Frais</span>
                    <span>0 FCFA</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">5000 FCFA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Prénom *
                    </label>
                    <input
                      ref={firstNameRef}
                      type="text"
                      placeholder="Jean"
                      className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Nom *
                    </label>
                    <input
                      ref={lastNameRef}
                      type="text"
                      placeholder="Dupont"
                      className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Email *
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Numéro de téléphone *
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="+237 6XX XXX XXX"
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <p className="text-xs text-foreground/60">
                  * Les champs marqués d'un astérisque sont obligatoires
                </p>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Méthode de paiement</CardTitle>
                <CardDescription>
                  Choisissez votre méthode de paiement préférée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => handlePayment('orange')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Orange Money</p>
                      <p className="text-sm text-foreground/60">Paiement par portefeuille mobile</p>
                    </div>
                    {loading && paymentMethod === 'orange' && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handlePayment('mtn')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">MTN Mobile Money</p>
                      <p className="text-sm text-foreground/60">Paiement par portefeuille mobile</p>
                    </div>
                    {loading && paymentMethod === 'mtn' && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handlePayment('stripe')}
                  disabled={loading}
                  className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Carte bancaire</p>
                      <p className="text-sm text-foreground/60">Visa, Mastercard via Stripe</p>
                    </div>
                    {loading && paymentMethod === 'stripe' && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                  </div>
                </button>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">Note:</span> Les paiements Orange Money et MTN sont directement gérés par nos partenaires de paiement sécurisés. Vous serez redirigé vers leur plateforme pour compléter le paiement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
