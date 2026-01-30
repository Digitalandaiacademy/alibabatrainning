import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Generate a secure download token for a user
 * Token expires after a set time (default: 48 hours)
 */
export async function generateDownloadToken(
  orderId: string,
  expiresInHours: number = 48
) {
  try {
    // Generate a random token
    const token = crypto.randomBytes(32).toString('hex')

    // Calculate expiration time
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + expiresInHours)

    // Store the token in the database
    const { data, error } = await supabase
      .from('download_tokens')
      .insert({
        order_id: orderId,
        token: token,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating download token:', error)
      throw error
    }

    return {
      token: token,
      expiresAt: expiresAt,
    }
  } catch (error) {
    console.error('Failed to generate download token:', error)
    throw error
  }
}

/**
 * Verify a download token is valid and hasn't expired
 */
export async function verifyDownloadToken(
  token: string,
  orderId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('download_tokens')
      .select('*')
      .eq('token', token)
      .eq('order_id', orderId)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !data) {
      return false
    }

    return true
  } catch (error) {
    console.error('Error verifying download token:', error)
    return false
  }
}

/**
 * Generate a secure download URL for a customer
 */
export function generateDownloadUrl(token: string, orderId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL !== 'http://localhost:3000'
    ? process.env.NEXT_PUBLIC_APP_URL
    : 'https://alibaba-trainning.da-academy.digital'
  return `${baseUrl}/api/download/pdf?token=${token}&orderId=${orderId}`
}

/**
 * Invalidate a download token after use (optional)
 */
export async function invalidateDownloadToken(token: string) {
  try {
    const { error } = await supabase
      .from('download_tokens')
      .delete()
      .eq('token', token)

    if (error) {
      console.error('Error invalidating token:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Failed to invalidate token:', error)
    return false
  }
}

/**
 * Clean up expired tokens (run periodically)
 */
export async function cleanupExpiredTokens() {
  try {
    const { error } = await supabase
      .from('download_tokens')
      .delete()
      .lt('expires_at', new Date().toISOString())

    if (error) {
      console.error('Error cleaning up tokens:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Failed to cleanup tokens:', error)
    return false
  }
}
