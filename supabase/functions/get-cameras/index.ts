
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const country = url.searchParams.get('country');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase
      .from('camera_feeds')
      .select('*')
      .limit(limit)
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    if (country) {
      query = query.eq('location_country', country);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,location_city.ilike.%${search}%,tags.cs.{${search}}`);
    }

    const { data: feeds, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Transform to match frontend format
    const transformedFeeds = feeds?.map(feed => ({
      id: feed.id,
      name: feed.title,
      status: feed.status || 'unknown',
      securityStatus: feed.security_status || 'unknown',
      location: {
        city: feed.location_city || 'Unknown',
        country: feed.location_country || 'Unknown',
        latitude: feed.latitude || 0,
        longitude: feed.longitude || 0
      },
      imageUrl: feed.screenshot_url || null,
      lastSeen: feed.last_verified_at || feed.created_at,
      type: feed.category || 'unknown',
      streamUrl: feed.stream_url,
      tags: feed.tags || [],
      vibeScore: feed.vibe_score || 0
    })) || [];

    return new Response(JSON.stringify({
      success: true,
      cameras: transformedFeeds,
      total: transformedFeeds.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Get cameras error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      cameras: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
