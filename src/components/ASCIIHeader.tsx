
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ASCIIHeader = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Single ASCII art frame that won't cause layout shifts
  const asciiArt = `
 ██████╗ ███╗   ███╗███╗   ██╗██╗███████╗██╗   ██╗███████╗
██╔═══██╗████╗ ████║████╗  ██║██║██╔════╝╚██╗ ██╔╝██╔════╝
██║   ██║██╔████╔██║██╔██╗ ██║██║█████╗   ╚████╔╝ █████╗  
██║   ██║██║╚██╔╝██║██║╚██╗██║██║██╔══╝    ╚██╔╝  ██╔══╝  
╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║███████╗   ██║   ███████╗
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝   ╚═╝   ╚══════╝
  `;
  
  useEffect(() => {
    // Subtle pulsing effect without animation frames
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 2);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link to="/">
      <div className="py-2 text-center">
        <pre 
          className={`text-[0.5rem] sm:text-[0.6rem] md:text-[0.65rem] font-mono text-primary cyber-glow inline-block transition-opacity duration-1000 ${currentFrame === 1 ? 'opacity-80' : 'opacity-100'}`}
          style={{ lineHeight: 1, letterSpacing: '0.05em', whiteSpace: 'pre' }}
        >
          {asciiArt}
        </pre>
      </div>
    </Link>
  );
};

export default ASCIIHeader;
