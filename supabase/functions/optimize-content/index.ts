
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { prompt, contentType, style } = await req.json();
    
    console.log(`Optimizing ${contentType} prompt:`, prompt);

    const systemPrompt = `Tu es un expert en création de contenu viral pour les réseaux sociaux. 
    Ton rôle est d'optimiser les prompts utilisateur pour générer du contenu qui performe bien.
    
    Analyse le prompt utilisateur et:
    1. Optimise-le pour être plus précis et créatif
    2. Génère 5-8 hashtags pertinents et populaires
    3. Crée une description engageante pour les réseaux sociaux
    4. Propose 3 suggestions d'amélioration
    5. Donne un score de confiance (0-100)
    
    Réponds UNIQUEMENT en JSON valide avec cette structure:
    {
      "optimizedPrompt": "prompt optimisé",
      "hashtags": ["#hashtag1", "#hashtag2", ...],
      "description": "Description engageante pour les réseaux sociaux",
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "confidence": 85
    }`;

    const userPrompt = `Prompt original: "${prompt}"
    Type de contenu: ${contentType}
    Style visuel: ${style}
    
    Optimise ce contenu pour qu'il soit viral et engageant.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const optimizedContent = JSON.parse(content);
      console.log('Optimization result:', optimizedContent);
      
      return new Response(JSON.stringify(optimizedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

  } catch (error) {
    console.error('Error in optimize-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
