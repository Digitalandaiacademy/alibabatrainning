/**
 * USSD Code Generation for Orange Money and MTN MoMo
 * Cameroon Payment Methods
 */

export type PaymentMethod = 'orange' | 'mtn'

interface USSDConfig {
  amount: number
  phone: string
  orderId: string
}

/**
 * Generate Orange Money USSD code
 * Format: #150*46*MERCHANT_CODE*AMOUNT#
 * 
 * In Cameroon:
 * - Merchant Code: 0525056 (this is an example, should be your actual merchant code)
 * - Amount in XAF
 * 
 * Phone number format: 237XXXXXXXXX or 6XXXXXXXX
 */
export function generateOrangeMoneyUSSD(config: USSDConfig): string {
  // Orange Money USSD: #150*46*MERCHANT_CODE*AMOUNT#
  const merchantCode = '0525056' // This should be your actual Orange Money merchant code
  const amount = config.amount.toString()
  
  return `#150*46*${merchantCode}*${amount}#`
}

/**
 * Generate MTN MoMo USSD code
 * Format: *126*1*1*MERCHANT_ID*AMOUNT#
 * 
 * In Cameroon:
 * - Merchant ID: Customer phone number
 * - Amount in XAF
 * 
 * Phone number format: 237XXXXXXXXX or 6XXXXXXXX
 */
export function generateMTNMoneyUSSD(config: USSDConfig): string {
  // MTN MoMo USSD: *126*1*1*MERCHANT_ID*AMOUNT#
  const merchantId = formatPhoneNumber(config.phone)
  const amount = config.amount.toString()
  
  return `*126*1*1*${merchantId}*${amount}#`
}

/**
 * Format phone number to standard Cameroon format
 * Input: 6XXXXXXXX, +2376XXXXXXXX, 2376XXXXXXXX
 * Output: 237XXXXXXXX (standard format)
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')
  
  // If starts with 237, it's already good
  if (cleaned.startsWith('237')) {
    return cleaned
  }
  
  // If starts with 6, 2, or 7, add 237 prefix
  if (cleaned.match(/^[627]/)) {
    return `237${cleaned}`
  }
  
  // If it's just 9 digits, add 237 prefix
  if (cleaned.length === 9) {
    return `237${cleaned}`
  }
  
  return cleaned
}

/**
 * Get the USSD code based on payment method
 */
export function getUSSDCode(
  method: PaymentMethod,
  config: USSDConfig
): string {
  if (method === 'orange') {
    return generateOrangeMoneyUSSD(config)
  } else if (method === 'mtn') {
    return generateMTNMoneyUSSD(config)
  }
  
  throw new Error(`Unknown payment method: ${method}`)
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  return /mobile|android|iphone|ipad|phone/.test(userAgent)
}

/**
 * Generate USSD dial URL for mobile devices
 * Mobile browsers can use tel: protocol
 */
export function generateUSSDDialURL(ussdCode: string): string {
  // Remove # characters for tel: protocol
  const cleanCode = ussdCode.replace(/#/g, '')
  return `tel:${cleanCode}`
}

/**
 * Payment method friendly names in French
 */
export const PAYMENT_METHOD_NAMES: Record<PaymentMethod, string> = {
  orange: 'Orange Money',
  mtn: 'MTN Mobile Money',
}

/**
 * Payment method descriptions in French
 */
export const PAYMENT_METHOD_DESCRIPTIONS: Record<PaymentMethod, string> = {
  orange: 'Paiement via Orange Money - Code USSD automatique',
  mtn: 'Paiement via MTN Mobile Money - Code USSD automatique',
}

/**
 * USSD instructions for each method
 */
export function getUSSDInstructions(method: PaymentMethod): string {
  if (method === 'orange') {
    return `
1. Tapez le code fourni dans votre clavier de téléphone
2. Validez avec votre code secret Orange Money
3. Vous recevrez une confirmation par SMS
4. Votre accès à la formation sera activé automatiquement
    `
  } else if (method === 'mtn') {
    return `
1. Tapez le code fourni dans votre clavier de téléphone
2. Validez avec votre code secret MTN Mobile Money
3. Vous recevrez une confirmation par SMS
4. Votre accès à la formation sera activé automatiquement
    `
  }
  
  return ''
}
