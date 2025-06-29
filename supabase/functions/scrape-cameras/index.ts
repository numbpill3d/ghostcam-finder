
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CameraFeed {
  title: string;
  stream_url: string;
  location_country?: string;
  location_city?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  tags?: string[];
  source_website: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting camera feed scraping...');

    // Get active feed sources
    const { data: sources, error: sourcesError } = await supabase
      .from('feed_sources')
      .select('*')
      .eq('active', true);

    if (sourcesError) {
      throw new Error(`Failed to fetch sources: ${sourcesError.message}`);
    }

    const allFeeds: CameraFeed[] = [];

    // Scrape each source
    for (const source of sources || []) {
      try {
        console.log(`Scraping ${source.name}...`);
        let feeds: CameraFeed[] = [];

        switch (source.scraper_type) {
          case 'earthcam':
            feeds = await scrapeEarthCam();
            break;
          case 'webcamtaxi':
            feeds = await scrapeWebcamTaxi();
            break;
          case 'generic':
            feeds = await scrapeGenericSources();
            break;
        }

        // Add source info to feeds
        feeds = feeds.map(feed => ({
          ...feed,
          source_website: source.base_url
        }));

        allFeeds.push(...feeds);

        // Update source stats
        await supabase
          .from('feed_sources')
          .update({
            last_scraped_at: new Date().toISOString(),
            feeds_found: feeds.length
          })
          .eq('id', source.id);

      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error);
      }
    }

    console.log(`Found ${allFeeds.length} total feeds`);

    // Insert/update feeds in database
    let insertedCount = 0;
    for (const feed of allFeeds) {
      try {
        const { error } = await supabase
          .from('camera_feeds')
          .upsert({
            ...feed,
            status: 'unknown',
            security_status: 'unknown',
            last_verified_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'stream_url'
          });

        if (!error) {
          insertedCount++;
        }
      } catch (error) {
        console.error('Error inserting feed:', error);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      totalFeeds: allFeeds.length,
      insertedFeeds: insertedCount,
      message: `Successfully scraped and stored ${insertedCount} camera feeds`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Scraping functions for different sources
async function scrapeEarthCam(): Promise<CameraFeed[]> {
  const feeds: CameraFeed[] = [];
  
  // Sample EarthCam feeds (in a real implementation, you'd scrape their API or pages)
  const sampleFeeds = [
    {
      title: "Times Square - NYC",
      stream_url: "https://www.earthcam.com/usa/newyork/timessquare/?cam=tsstreet",
      location_country: "United States",
      location_city: "New York",
      latitude: 40.7580,
      longitude: -73.9855,
      category: "urban",
      tags: ["traffic", "street", "urban", "busy"]
    },
    {
      title: "Abbey Road Crossing - London",
      stream_url: "https://www.earthcam.com/world/england/london/abbeyroad/?cam=abbeyroad",
      location_country: "United Kingdom", 
      location_city: "London",
      latitude: 51.5319,
      longitude: -0.1819,
      category: "street",
      tags: ["street", "historic", "pedestrian"]
    }
  ];
  
  feeds.push(...sampleFeeds);
  return feeds;
}

async function scrapeWebcamTaxi(): Promise<CameraFeed[]> {
  const feeds: CameraFeed[] = [];
  
  // Sample WebcamTaxi feeds
  const sampleFeeds = [
    {
      title: "Prague Old Town Square",
      stream_url: "https://www.webcamtaxi.com/en/czech-republic/prague-region/prague.html",
      location_country: "Czech Republic",
      location_city: "Prague", 
      latitude: 50.0755,
      longitude: 14.4378,
      category: "urban",
      tags: ["square", "historic", "tourism"]
    },
    {
      title: "Venice St. Mark's Square",
      stream_url: "https://www.webcamtaxi.com/en/italy/veneto/venice.html",
      location_country: "Italy",
      location_city: "Venice",
      latitude: 45.4342,
      longitude: 12.3388,
      category: "urban", 
      tags: ["square", "historic", "tourism", "water"]
    }
  ];
  
  feeds.push(...sampleFeeds);
  return feeds;
}

async function scrapeGenericSources(): Promise<CameraFeed[]> {
  const feeds: CameraFeed[] = [];
  
  // Sample generic/insecam style feeds (placeholder URLs)
  const sampleFeeds = [
    {
      title: "Airport Terminal View",
      stream_url: "http://example-cam-1.com/mjpg/video.mjpg",
      location_country: "Unknown",
      location_city: "Unknown",
      category: "interior",
      tags: ["airport", "terminal", "interior", "liminal"]
    },
    {
      title: "Office Lobby Camera",
      stream_url: "http://example-cam-2.com/mjpg/video.mjpg", 
      location_country: "Unknown",
      location_city: "Unknown",
      category: "interior",
      tags: ["office", "lobby", "interior", "liminal", "corporate"]
    },
    {
      title: "Parking Garage View",
      stream_url: "http://example-cam-3.com/mjpg/video.mjpg",
      location_country: "Unknown", 
      location_city: "Unknown",
      category: "interior",
      tags: ["parking", "garage", "interior", "liminal", "concrete"]
    }
  ];
  
  feeds.push(...sampleFeeds);
  return feeds;
}
