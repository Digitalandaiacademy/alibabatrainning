import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// The actual file URL
const FILE_URL = "https://bhllu99dhywbbuyj.public.blob.vercel-storage.com/Chine%20%E2%86%92%20Afrique%20%20Importation%2C%20Dropshipping%20et%20Profits%20Pas%20%C3%A0%20Pas%20Alibaba%2C%20Pinduoduo%2C%20Paiements%2C%20Transitaires%2C%20Dropshipping%20%E2%80%94%20M%C3%A9thode%20claire%20pour%20d%C3%A9butants%20africains.pdf"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const rawOrderId = searchParams.get('orderId')
    const orderId = rawOrderId?.trim()

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    try {
        // 1. Verify Access
        const { data: order, error } = await supabase
            .from('orders')
            .select('access_granted, status')
            .eq('id', orderId)
            .single()

        if (error || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        if (!order.access_granted) {
            return NextResponse.json({ error: 'Access denied. Payment not yet verified.' }, { status: 403 })
        }

        // 2. Fetch File from Blob Storage
        const fileResponse = await fetch(FILE_URL)
        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch file from storage: ${fileResponse.statusText}`)
        }

        const fileBlob = await fileResponse.blob()

        // 3. Return File to User
        const headers = new Headers()
        headers.set('Content-Type', 'application/pdf')
        headers.set('Content-Disposition', 'attachment; filename="Formation-Chine-Afrique.pdf"')
        headers.set('Content-Length', fileBlob.size.toString())

        return new NextResponse(fileBlob, {
            status: 200,
            headers,
        })

    } catch (err) {
        console.error("Download error:", err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
