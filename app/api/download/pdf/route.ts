import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const orderId = searchParams.get('orderId')

    if (!token || !orderId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify the order exists and has access granted
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('access_granted', true)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found or access not granted' },
        { status: 404 }
      )
    }

    // In production, you would:
    // 1. Verify the token against a secure session/database
    // 2. Check if the download hasn't exceeded rate limits
    // 3. Log the download for audit purposes
    // 4. Serve the PDF from Vercel Blob Storage or S3

    // For now, return a placeholder response
    return NextResponse.json({
      message: 'Download token verified',
      orderId: order.id,
      email: order.email,
      downloadUrl: '/api/download/pdf/file?token=' + token,
    })
  } catch (error) {
    console.error('Download verification error:', error)
    return NextResponse.json(
      { error: 'Download verification failed' },
      { status: 500 }
    )
  }
}
