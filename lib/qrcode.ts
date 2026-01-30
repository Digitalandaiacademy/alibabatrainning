/**
 * QR Code generation for USSD codes
 * Uses QR Server API (free, no dependencies)
 */

/**
 * Generate QR code URL for a USSD code
 * Uses QR Server API: https://api.qrserver.com/v1/create-qr-code/
 */
export function generateQRCodeURL(
  ussdCode: string,
  size: number = 300
): string {
  // QR codes need the text to be URL encoded
  const encodedCode = encodeURIComponent(ussdCode)
  
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedCode}`
}

/**
 * Generate a data URL QR code (base64 encoded PNG)
 * This is useful for embedding directly in the page
 */
export async function generateQRCodeDataURL(
  ussdCode: string,
  size: number = 300
): Promise<string> {
  try {
    const url = generateQRCodeURL(ussdCode, size)
    const response = await fetch(url)
    const blob = await response.blob()
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

/**
 * Get QR code options based on device type
 */
export function getQRCodeOptions(isMobile: boolean) {
  return {
    size: isMobile ? 250 : 350,
    errorCorrection: 'H' as const,
    margin: 2,
  }
}
