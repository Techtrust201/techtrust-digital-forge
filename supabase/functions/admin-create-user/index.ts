
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, password, name, profile, packages } = await req.json()

    // Vérifier que l'utilisateur qui fait la requête est admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Créer l'utilisateur avec Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name
      }
    })

    if (authError) {
      console.error('Erreur création auth:', authError)
      return new Response(
        JSON.stringify({ error: authError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mettre à jour le profil avec les informations supplémentaires
    if (profile && authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          phone: profile.phone,
          company: profile.company,
          position: profile.position,
          industry: profile.industry,
          address: profile.address,
          notes: profile.notes,
          tier: profile.tier || 'bronze'
        })
        .eq('id', authData.user.id)

      if (profileError) {
        console.error('Erreur mise à jour profil:', profileError)
      }

      // Ajouter les packages/subscriptions
      if (packages && packages.length > 0) {
        const subscriptions = packages.map((packageId: string) => ({
          user_id: authData.user.id,
          package_id: packageId,
          package_name: packageId,
          package_category: 'general',
          status: 'active'
        }))

        const { error: subsError } = await supabase
          .from('user_subscriptions')
          .insert(subscriptions)

        if (subsError) {
          console.error('Erreur création subscriptions:', subsError)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: authData.user,
        message: 'Utilisateur créé avec succès'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
