
-- Create the camera_feeds table to store live camera stream data
CREATE TABLE public.camera_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  stream_url TEXT NOT NULL UNIQUE,
  location_country TEXT,
  location_city TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  tags TEXT[], -- Array of tags/categories
  category TEXT, -- Main category (traffic, interior, landscape, etc.)
  last_verified_at TIMESTAMP WITH TIME ZONE,
  screenshot_url TEXT, -- URL to thumbnail screenshot
  status TEXT DEFAULT 'unknown' CHECK (status IN ('online', 'offline', 'unknown')),
  security_status TEXT DEFAULT 'unknown' CHECK (security_status IN ('secure', 'vulnerable', 'unknown')),
  source_website TEXT, -- Where the feed was discovered
  vibe_score INTEGER DEFAULT 0, -- For "liminal" scoring
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_camera_feeds_status ON public.camera_feeds(status);
CREATE INDEX idx_camera_feeds_category ON public.camera_feeds(category);
CREATE INDEX idx_camera_feeds_location ON public.camera_feeds(location_country, location_city);
CREATE INDEX idx_camera_feeds_last_verified ON public.camera_feeds(last_verified_at);

-- Create a table for tracking feed sources and scraping status
CREATE TABLE public.feed_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  scraper_type TEXT NOT NULL, -- 'earthcam', 'webcamtaxi', 'generic', etc.
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  feeds_found INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some initial feed sources
INSERT INTO public.feed_sources (name, base_url, scraper_type) VALUES
('EarthCam', 'https://www.earthcam.com', 'earthcam'),
('WebcamTaxi', 'https://www.webcamtaxi.com', 'webcamtaxi'),
('Insecam', 'https://www.insecam.org', 'generic');

-- Create RLS policies (make feeds publicly readable for now)
ALTER TABLE public.camera_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_sources ENABLE ROW LEVEL SECURITY;

-- Allow public read access to camera feeds
CREATE POLICY "Camera feeds are publicly readable" 
  ON public.camera_feeds 
  FOR SELECT 
  USING (true);

-- Allow public read access to feed sources
CREATE POLICY "Feed sources are publicly readable" 
  ON public.feed_sources 
  FOR SELECT 
  USING (true);

-- For admin operations, we'll add authenticated user policies later
CREATE POLICY "Authenticated users can manage camera feeds" 
  ON public.camera_feeds 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage feed sources" 
  ON public.feed_sources 
  FOR ALL 
  USING (auth.role() = 'authenticated');
