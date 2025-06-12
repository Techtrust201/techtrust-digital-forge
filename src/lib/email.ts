
import { Resend } from 'resend'

const resend = new Resend(process.env.SENDGRID_API_KEY)

export async function sendVerificationEmail(to: string, url: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@tech-trust.fr',
      to: [to],
      subject: 'Vérifiez votre adresse e-mail',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; text-align: center;">Vérification de votre compte</h1>
          <p style="color: #666; font-size: 16px;">
            Cliquez sur le lien ci-dessous pour vérifier votre adresse e-mail et activer votre compte :
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" 
               style="background-color: #45C7FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Vérifier mon e-mail
            </a>
          </div>
          <p style="color: #888; font-size: 14px;">
            Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending verification email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}
