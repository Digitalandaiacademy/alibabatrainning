import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
    try {
        const { adminPassword } = await request.json()

        // Verify admin password
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
        if (adminPassword !== adminPass) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Fetch orders error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}
