
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
    const SHOTSTACK_API_KEY = Deno.env.get('SHOTSTACK_API_KEY');
    if (!SHOTSTACK_API_KEY) {
      throw new Error('SHOTSTACK_API_KEY is not set');
    }

    const body = await req.json();
    const { videoClips, subtitles, music, tts } = body;

    // Compose multiple video clips into one minute video
    const timeline = {
      soundtrack: music ? {
        src: music.url,
        effect: "fadeIn"
      } : null,
      tracks: [
        {
          clips: videoClips.map((clip: any, index: number) => ({
            asset: {
              type: "video",
              src: clip.url
            },
            start: index * 10, // Each clip is 10 seconds
            length: 10,
            effect: index > 0 ? "fadeIn" : null
          }))
        },
        // Subtitles track
        subtitles ? {
          clips: subtitles.map((subtitle: any) => ({
            asset: {
              type: "title",
              text: subtitle.text,
              style: "future"
            },
            start: subtitle.start,
            length: subtitle.duration
          }))
        } : null
      ].filter(Boolean)
    };

    const edit = {
      timeline,
      output: {
        format: "mp4",
        resolution: "hd"
      }
    };

    console.log("Sending edit to Shotstack:", JSON.stringify(edit, null, 2));

    const response = await fetch('https://api.shotstack.io/stage/render', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SHOTSTACK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edit),
    });

    const data = await response.json();
    console.log("Shotstack response:", data);

    return new Response(JSON.stringify({
      renderId: data.response?.id,
      status: 'processing',
      estimated_cost: 0.30
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in compose-video function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
