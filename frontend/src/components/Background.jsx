import React, { useEffect, useState, useRef } from "react";

const Background = ({ 
  particleCount = 40,
  particleColors = ["#06b6d4", "#0ea5e9", "#22d3ee"], // cyan/blue variations
  gridEnabled = true,
  pulseEffect = true,
  blurAmount = 2, // in px
  glowIntensity = 0.6
}) => {
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());

  useEffect(() => {
    // Initialize particles with more properties
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.3 + 0.1,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      pulsePhase: Math.random() * Math.PI * 2, // random starting phase
      pulseSpeed: Math.random() * 0.005 + 0.002,
      wobbleAmplitude: Math.random() * 1.5,
      wobbleFrequency: Math.random() * 0.05 + 0.01
    }));
    
    setParticles(newParticles);

    // Use requestAnimationFrame for smoother animation
    const updateParticles = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = now;

      setParticles(prev =>
        prev.map(p => {
          const newY = p.y + (p.speed * deltaTime) / 20;
          
          // Calculate horizontal wobble
          const wobble = Math.sin(now * p.wobbleFrequency) * p.wobbleAmplitude;
          
          return {
            ...p,
            y: newY > 100 ? -5 : newY,
            x: p.x + wobble * deltaTime / 500,
            opacity: pulseEffect ? 0.4 + Math.sin(now * p.pulseSpeed + p.pulsePhase) * 0.3 : 0.7
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(updateParticles);
    };

    animationRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColors, pulseEffect]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.size * glowIntensity}px ${p.color}`,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      {gridEnabled && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00fdd5 1px, transparent 1px),
              linear-gradient(to bottom, #00fdd5 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      )}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/60 to-black/80 z-5" />
      
      {/* Subtle light source from top-left */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl z-5" />
      
      {/* Blur effect */}
      <div 
        className="absolute inset-0 bg-black/40 z-10" 
        style={{ backdropFilter: `blur(${blurAmount}px)` }}
      />
    </div>
  );
};

export default Background;