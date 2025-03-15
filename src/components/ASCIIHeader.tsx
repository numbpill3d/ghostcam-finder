
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ASCIIHeader = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // ASCII art frames for animation
  const asciiFrames = [
    `
 ██████╗ ███╗   ███╗███╗   ██╗██╗███████╗██╗   ██╗███████╗
██╔═══██╗████╗ ████║████╗  ██║██║██╔════╝╚██╗ ██╔╝██╔════╝
██║   ██║██╔████╔██║██╔██╗ ██║██║█████╗   ╚████╔╝ █████╗  
██║   ██║██║╚██╔╝██║██║╚██╗██║██║██╔══╝    ╚██╔╝  ██╔══╝  
╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║███████╗   ██║   ███████╗
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝   ╚═╝   ╚══════╝
    `,
    `
 ██████╗ ███╗   ███╗███╗   ██╗██╗███████╗██╗   ██╗███████╗
██╔═══██╗████╗ ████║████╗  ██║██║██╔════╝╚██╗ ██╔╝██╔════╝
██║   ██║██╔████╔██║██╔██╗ ██║██║█████╗   ╚████╔╝ █████╗  
██║   ██║██║╚██╔╝██║██║╚██╗██║██║██╔══╝    ╚██╔╝  ██╔══╝  
╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║███████╗   ██║   ███████╗
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝   ╚═╝   ╚══════╝
    `,
    `
 ▒█████   ███▄ ▄███▓ ███▄    █  ██▓▓█████  ██▓▓██   ██▓▓█████ 
▒██▒  ██▒▓██▒▀█▀ ██▒ ██ ▀█   █ ▓██▒▓█   ▀ ▓██▒ ▒██  ██▒▓█   ▀ 
▒██░  ██▒▓██    ▓██░▓██  ▀█ ██▒▒██▒▒███   ▒██░  ▒██ ██░▒███   
▒██   ██░▒██    ▒██ ▓██▒  ▐▌██▒░██░▒▓█  ▄ ▒██░  ░ ▐██▓░▒▓█  ▄ 
░ ████▓▒░▒██▒   ░██▒▒██░   ▓██░░██░░▒████▒░██████▒░ ██▒▓░░▒████▒
░ ▒░▒░▒░ ░ ▒░   ░  ░░ ▒░   ▒ ▒ ░▓  ░░ ▒░ ░░ ▒░▓  ░ ██▒▒▒ ░░ ▒░ ░
  ░ ▒ ▒░ ░  ░      ░░ ░░   ░ ▒░ ▒ ░ ░ ░  ░░ ░ ▒  ▓██ ░▒░  ░ ░  ░
░ ░ ░ ▒  ░      ░      ░   ░ ░  ▒ ░   ░     ░ ░  ▒ ▒ ░░     ░   
    ░ ░         ░            ░  ░     ░  ░    ░  ░ ░        ░  ░
                                                  ░ ░            
    `
  ];

  useEffect(() => {
    // Animation timing
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % asciiFrames.length);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link to="/">
      <div className="py-2 text-center transition-opacity">
        <pre 
          className="text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] font-mono text-primary cyber-glow inline-block"
          style={{ lineHeight: 1, letterSpacing: '0.05em', whiteSpace: 'pre' }}
        >
          {asciiFrames[currentFrame]}
        </pre>
      </div>
    </Link>
  );
};

export default ASCIIHeader;
