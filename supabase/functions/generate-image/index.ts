
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN');
    if (!REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not set');
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });

    const body = await req.json();
    console.log("Request body:", body);

    if (!body.prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { prompt, style = 'realistic' } = body;
    
    // Style-specific prompt modifications
    let enhancedPrompt = prompt;
    switch (style) {
      case 'realistic':
        enhancedPrompt = `photorealistic, high quality, detailed: ${prompt}`;
        break;
      case 'digital-art':
        enhancedPrompt = `digital art, artstation, concept art: ${prompt}`;
        break;
      case 'illustration':
        enhancedPrompt = `illustration, artistic, hand-drawn style: ${prompt}`;
        break;
      case 'anime':
        enhancedPrompt = `anime style, manga, japanese animation: ${prompt}`;
        break;
      case 'minimalist':
        enhancedPrompt = `minimalist, clean, simple design: ${prompt}`;
        break;
      case 'vintage':
        enhancedPrompt = `vintage, retro, old-fashioned style: ${prompt}`;
        break;
      case 'abstract':
        enhancedPrompt = `abstract art, non-representational: ${prompt}`;
        break;
      default:
        enhancedPrompt = `${style} style: ${prompt}`;
    }

    console.log(`Generating image with FLUX:`, enhancedPrompt);
    
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: enhancedPrompt,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 80,
        num_inference_steps: 4
      }
    });

    console.log("Image generation response:", output);
    
    const imageUrl = Array.isArray(output) ? output[0] : output;
    
    return new Response(JSON.stringify({ 
      imageUrl,
      estimated_cost: 0.003
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in generate-image function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
