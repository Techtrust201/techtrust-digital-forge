
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@4.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { InvitationEmail } from "./_templates/invitation-email.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  name: string;
  company?: string;
  phone?: string;
  position?: string;
  industry?: string;
  address?: any;
  selectedPackages: string[];
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[INVITATION] Starting invitation process");
    
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Authorization header required");
    }

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const requestData: InvitationRequest = await req.json();
    console.log("[INVITATION] Request data received for:", requestData.email);

    // Générer un token d'invitation
    const { data: tokenData, error: tokenError } = await supabase
      .rpc("generate_invitation_token");

    if (tokenError) {
      console.error("[INVITATION] Error generating token:", tokenError);
      throw new Error("Failed to generate invitation token");
    }

    const invitationToken = tokenData;
    console.log("[INVITATION] Token generated successfully");

    // Créer l'entrée d'invitation dans la base de données
    const { data: invitation, error: invitationError } = await supabase
      .from("user_invitations")
      .insert({
        email: requestData.email,
        name: requestData.name,
        company: requestData.company,
        phone: requestData.phone,
        position: requestData.position,
        industry: requestData.industry,
        address: requestData.address,
        selected_packages: requestData.selectedPackages,
        notes: requestData.notes,
        invitation_token: invitationToken,
        created_by: user.id,
      })
      .select()
      .single();

    if (invitationError) {
      console.error("[INVITATION] Error creating invitation:", invitationError);
      throw new Error("Failed to create invitation");
    }

    console.log("[INVITATION] Invitation created in database");

    // Générer l'URL d'activation
    const activationUrl = `${Deno.env.get("SUPABASE_URL")}/activate-account?token=${invitationToken}`;

    // Rendre le template email
    const emailHtml = await renderAsync(
      React.createElement(InvitationEmail, {
        recipientName: requestData.name,
        companyName: requestData.company || "votre entreprise",
        activationUrl,
        senderName: "L'équipe Tech Trust",
      })
    );

    // Envoyer l'email
    const emailResponse = await resend.emails.send({
      from: "Tech Trust <onboarding@resend.dev>",
      to: [requestData.email],
      subject: "Bienvenue chez Tech Trust - Activez votre compte",
      html: emailHtml,
    });

    if (emailResponse.error) {
      console.error("[INVITATION] Email sending error:", emailResponse.error);
      throw new Error("Failed to send invitation email");
    }

    console.log("[INVITATION] Email sent successfully:", emailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        invitationId: invitation.id,
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("[INVITATION] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
