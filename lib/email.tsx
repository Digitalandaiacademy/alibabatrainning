import nodemailer from 'nodemailer'

// Initialize email transporter
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  // Configure based on your email provider
  // Configure based on your email provider
  // Example: Gmail
  if (process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  // Alternative: Custom SMTP
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  ) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  if (!transporter) {
    console.warn(
      'Email transporter not configured. Set EMAIL_FROM and EMAIL_PASSWORD or SMTP_* variables.'
    )
  }

  return transporter
}

export async function sendDownloadEmail(
  email: string,
  orderId: string,
  downloadUrl: string
) {
  const transporter = getTransporter()

  if (!transporter) {
    console.warn('Cannot send email: transporter not configured')
    return false
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@da-academy.digital',
      to: email,
      subject:
        'Votre formation Chine → Afrique est prête à télécharger!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #5B21B6 0%, #DC2626 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .button { display: inline-block; background: #5B21B6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 10px 15px; border-radius: 4px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue à Digital & AI Academy!</h1>
            </div>
            
            <div class="content">
              <h2>Votre formation est prête</h2>
              <p>Merci pour votre achat! Votre formation "Chine → Afrique: Importation, Dropshipping et Profits" est maintenant disponible.</p>
              
              <div class="warning">
                <p><strong>⏰ Important:</strong> Ce lien est valide pendant 48 heures. Téléchargez votre PDF avant l'expiration.</p>
              </div>

              <div style="background-color: #e5e7eb; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #555;">Votre Numéro de Commande :</p>
                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #000; letter-spacing: 1px;">${orderId}</p>
              </div>
              
              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://alibaba-trainning.da-academy.digital'}/download" class="button">Accéder à la page de téléchargement</a>
              </p>
              
              <p>Une fois sur la page, entrez simplement votre numéro de commande ci-dessus.</p>
            </div>
            
            <div class="content">
              <h3>Contenu de la formation</h3>
              <ul>
                <li>100+ pages de contenu détaillé</li>
                <li>Guides pratiques sur l'importation depuis la Chine</li>
                <li>Stratégies de dropshipping testées</li>
                <li>Méthodes de négociation et pricing</li>
                <li>Gestion logistique et douanes</li>
                <li>Études de marché pour l'Afrique</li>
                <li>Cas pratiques et études de cas</li>
              </ul>
            </div>
            
            <div class="content">
              <h3>Questions ou problèmes?</h3>
              <p>Contactez-nous:</p>
              <ul>
                <li>📱 WhatsApp Business: <a href="https://wa.me/237672991834">+237 672 991 834</a></li>
                <li>📧 Email: joseph@da-academy.digital</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>Digital & AI Academy - Douala, Cameroon</p>
              <p>© ${new Date().getFullYear()} Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log(`Download email sent to ${email}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  amount: number,
  paymentMethod: string
) {
  const transporter = getTransporter()

  if (!transporter) {
    console.warn('Cannot send email: transporter not configured')
    return false
  }

  const methodName =
    paymentMethod === 'orange'
      ? 'Orange Money'
      : paymentMethod === 'mtn'
        ? 'MTN Mobile Money'
        : 'Stripe'

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@da-academy.digital',
      to: email,
      subject: 'Commande confirmée - Formation Chine → Afrique',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #5B21B6 0%, #DC2626 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .order-info { background: white; padding: 15px; border-left: 4px solid #5B21B6; border-radius: 4px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Merci pour votre commande, ${firstName}!</h1>
            </div>
            
            <div class="content">
              <h2>Commande reçue</h2>
              <p>Votre commande a été créée avec succès. Nous vérifierons votre paiement rapidement.</p>
              
              <div class="order-info">
                <p><strong>N° de commande:</strong> ${orderId}</p>
                <p><strong>Montant:</strong> ${amount} FCFA</p>
                <p><strong>Méthode de paiement:</strong> ${methodName}</p>
                <p><strong>Status:</strong> En attente de vérification</p>
              </div>
              
              <p style="margin-top: 20px;">
                Vous recevrez un email de confirmation dès que votre paiement sera vérifié (généralement dans les 2-4 heures).
              </p>
            </div>
            
            <div class="footer">
              <p>Digital & AI Academy - Douala, Cameroon</p>
              <p>© ${new Date().getFullYear()} Tous droits réservés.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log(`Order confirmation email sent to ${email}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
