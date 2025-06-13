import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Ici vous pourrez ajouter la logique pour sauvegarder en base
    // Pour l'instant, on simule juste une réponse réussie
    console.log('Contact form submission:', body)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message reçu avec succès' 
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement' },
      { status: 500 }
    )
  }
}
