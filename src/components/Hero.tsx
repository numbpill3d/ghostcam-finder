
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eye, Search, Shield, MapPin } from 'lucide-react';
import { useInView } from '../utils/animation';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const features = [
    {
      icon: <Search className="size-5" />,
      title: "Search & Discover",
      description: "Find live CCTV feeds worldwide using multiple data sources"
    },
    {
      icon: <MapPin className="size-5" />,
      title: "Location Filtering",
      description: "Filter results by GPS coordinates, city, or country"
    },
    {
      icon: <Shield className="size-5" />,
      title: "Security Checks",
      description: "Auto-verification of vulnerable camera systems"
    },
    {
      icon: <Eye className="size-5" />,
      title: "Live Streaming",
      description: "View multiple camera feeds in real-time with controls"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/4 size-[300px] -translate-x-1/2 -translate-y-1/2 bg-blue-400/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div 
            className={cn(
              "appear-animate mb-6 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium",
              isInView ? "opacity-100" : "opacity-0"
            )}
            style={{ '--delay': 0 } as React.CSSProperties}
          >
            Introducing OmniEye
          </div>

          {/* Heading */}
          <h1 
            className={cn(
              "appear-animate text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight tracking-tighter mb-6",
              isInView ? "opacity-100" : "opacity-0"
            )}
            style={{ '--delay': 2 } as React.CSSProperties}
          >
            Find <span className="text-gradient">Live CCTV</span> Feeds <br className="hidden md:inline" />
            Around the World
          </h1>

          {/* Description */}
          <p 
            className={cn(
              "appear-animate text-lg md:text-xl text-muted-foreground max-w-2xl mb-10",
              isInView ? "opacity-100" : "opacity-0"
            )}
            style={{ '--delay': 4 } as React.CSSProperties}
          >
            OmniEye helps you locate and view public CCTV camera feeds in real-time,
            anywhere on the planet. Advanced search, precision filtering, and seamless viewing.
          </p>

          {/* Call to Action */}
          <div 
            className={cn(
              "appear-animate flex flex-col sm:flex-row gap-4 mb-16",
              isInView ? "opacity-100" : "opacity-0"
            )}
            style={{ '--delay': 6 } as React.CSSProperties}
          >
            <Link 
              to="/discover" 
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium 
                shadow-md hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
            >
              Start Discovering
            </Link>
            <Link 
              to="/view" 
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg 
                font-medium hover:bg-secondary/80 transition-colors duration-300"
            >
              View Demo Feeds
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={cn(
                  "appear-animate rounded-xl p-6 glass glass-hover border border-border",
                  isInView ? "opacity-100" : "opacity-0"
                )}
                style={{ '--delay': 8 + index * 2 } as React.CSSProperties}
              >
                <div className="mb-4 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
