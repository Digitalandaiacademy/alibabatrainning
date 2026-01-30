import { CheckoutForm } from '@/components/checkout-form'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Achetez la formation | Digital & AI Academy',
  description: 'Complétez votre achat de la formation Chine → Afrique avec Orange Money, MTN, ou Stripe.',
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <CheckoutForm />
      </div>
      <Footer />
    </main>
  )
}
