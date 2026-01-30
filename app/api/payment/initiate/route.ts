import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmationEmail } from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, method, firstName, lastName, email, phone } = await request.json()

    if (!firstName || !lastName || !email || !phone || !method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create an order in the database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        amount,
        currency: currency || 'XAF',
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        payment_method: method,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Send confirmation email
    await sendOrderConfirmationEmail(email, firstName, order.id, amount, method)

    // Log payment initiation
    await supabase.from('payment_logs').insert({
      order_id: order.id,
      action: 'payment_initiated',
      status: 'pending',
      response_data: {
        method,
        amount,
        currency: currency || 'XAF',
      },
    })

    // In a real implementation, you would:
    // 1. For Orange Money/MTN: Call Flutterwave or Paytech APIs
    // 2. For Stripe: Use Stripe Hosted Checkout
    // 3. Generate and return the payment URL

    return NextResponse.json({
      orderId: order.id,
      status: 'pending',
      message: 'Order created successfully. Check your email for next steps.',
      redirectUrl: null,
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { error: 'Payment initiation failed' },
      { status: 500 }
    )
  }
}
