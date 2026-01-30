import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { generateDownloadToken, generateDownloadUrl } from '@/lib/tokens'
import { sendDownloadEmail } from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const { orderId, adminPassword } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing orderId' },
        { status: 400 }
      )
    }

    // Verify admin password
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (adminPassword !== adminPass) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Generate a secure download token
    const { token } = await generateDownloadToken(orderId, 48) // 48 hour expiry

    // Generate the download URL
    const downloadUrl = generateDownloadUrl(token, orderId)

    // Update the order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        access_granted: true,
        payment_verified_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating order:', updateError)
      throw updateError
    }

    // Send the download email to the customer
    let emailSent = false
    try {
      emailSent = await sendDownloadEmail(order.email, orderId, downloadUrl)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // We continue even if email fails, because the database is already updated
    }

    // Log the action
    await supabase.from('payment_logs').insert({
      order_id: orderId,
      action: 'access_granted',
      status: 'success',
      response_data: {
        downloadUrl,
        emailSent,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Access granted and email sent',
      orderId,
      email: order.email,
      downloadUrl,
      emailSent,
    })
  } catch (error) {
    console.error('Grant access error:', error)
    return NextResponse.json(
      { error: 'Failed to grant access' },
      { status: 500 }
    )
  }
}
