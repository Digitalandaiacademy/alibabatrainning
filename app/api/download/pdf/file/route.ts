import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { verifyDownloadToken } from '@/lib/tokens'

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

    // Step 1: Verify the token is valid and not expired
    const isValidToken = await verifyDownloadToken(token, orderId)

    if (!isValidToken) {
      return NextResponse.json(
        {
          error: 'Invalid or expired download link',
          message: 'This download link has expired or is invalid. Please request a new one.',
        },
        { status: 403 }
      )
    }

    // Step 2: Verify the order exists and access is granted
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

    if (order.status !== 'completed' && !order.access_granted) {
      return NextResponse.json(
        {
          error: 'Access not granted',
          message: 'Your payment has not been verified yet. Please wait or contact support.',
        },
        { status: 403 }
      )
    }

    // Step 3: Log the download
    await supabase.from('payment_logs').insert({
      order_id: orderId,
      action: 'pdf_downloaded',
      status: 'success',
      response_data: {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    })

    // Step 4: Serve the PDF file
    // Option A: If stored in Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await fetch(
          `https://blob.vercel-storage.com/list?token=${process.env.BLOB_READ_WRITE_TOKEN}`
        )

        if (blob.ok) {
          // Return a redirect to the blob URL
          return NextResponse.json({
            success: true,
            message: 'Download initiated',
            // In production, implement proper blob retrieval
            downloadUrl: '/api/download/pdf/file?token=' + token,
          })
        }
      } catch (error) {
        console.log('Blob storage not configured, using alternative method')
      }
    }

    // Option B: Return a placeholder response for demo
    // In production, you would stream the actual PDF file
    return NextResponse.json({
      success: true,
      message: 'PDF download ready',
      orderId: order.id,
      email: order.email,
      downloadInitialized: true,
      instructions:
        'The PDF download should start automatically. If not, please contact support.',
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
}
