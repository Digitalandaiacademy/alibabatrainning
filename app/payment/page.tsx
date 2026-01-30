'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { USSDPaymentInstructions } from '@/components/ussd-payment-instructions'
import { getUSSDCode, type PaymentMethod } from '@/lib/ussd'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const method = searchParams.get('method') as PaymentMethod
  const amount = searchParams.get('amount')
  const email = searchParams.get('email')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')
  const [ussdCode, setUssdCode] = useState('')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          setError('Order ID not found')
          setLoading(false)
          return
        }

        // Fetch order details from the server
        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const order = await response.json()

        // Validate payment method
        if (method !== 'orange' && method !== 'mtn') {
          setError('Invalid payment method')
          setLoading(false)
          return
        }

        // Generate USSD code
        const code = getUSSDCode(method, {
          amount: order.amount,
          phone: order.phone,
          orderId: order.id,
        })

        setPhone(order.phone)
        setUssdCode(code)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, method])

  if (loading) {
    return (
      <section className="py-20 sm:py-32 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/70">Préparation du paiement...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">Erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (!ussdCode || !method || !orderId) {
    return (
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">Données manquantes</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  Impossible de traiter votre demande. Veuillez réessayer.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <main>
      <USSDPaymentInstructions
        ussdCode={ussdCode}
        method={method}
        amount={parseInt(amount || '5000')}
        orderId={orderId}
        customerEmail={email || ''}
      />
    </main>
  )
}
