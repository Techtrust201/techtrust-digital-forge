
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

    // Check status of existing prediction
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId);
      const prediction = await replicate.predictions.get(body.predictionId);
      console.log("Status check response:", prediction);
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate new video
    if (!body.prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { prompt, style = 'realistic', duration = 10, model = 'seedance-1-lite' } = body;
    
    // Select the appropriate Seedance model
    const modelName = model === 'seedance-1-pro' 
      ? "bytedance/seedance-1-pro" 
      : "bytedance/seedance-1-lite";

    console.log(`Generating video with ${modelName}:`, prompt);
    
    const output = await replicate.run(modelName, {
      input: {
        prompt: `${style} style: ${prompt}`,
        num_frames: duration === 5 ? 25 : 50, // 5fps for 5s or 10s
        guidance_scale: 7.5,
        num_inference_steps: 50,
        width: 1024,
        height: 576,
        fps: 5
      }
    });

    console.log("Video generation response:", output);
    return new Response(JSON.stringify({ 
      prediction: output,
      estimated_cost: model === 'seedance-1-pro' ? 0.60 : 0.40
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in generate-video function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
