
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Exemple de récupération de contacts (à adapter selon vos besoins)
    const contacts = await db.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Ici vous pouvez traiter le contact (envoyer un email, sauvegarder en DB, etc.)
    console.log('Nouveau contact:', validatedData)

    // Exemple de sauvegarde (à adapter selon votre modèle)
    // const contact = await db.contact.create({
    //   data: validatedData,
    // })

    return NextResponse.json(
      { message: 'Contact envoyé avec succès' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du contact' },
      { status: 500 }
    )
  }
}
