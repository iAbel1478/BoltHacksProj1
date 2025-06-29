
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  type: 'fragment' | 'bubble' | 'shard' | 'spore' | 'smoke';
}

interface ParticleSystemProps {
  particles: Particle[];
  onParticleComplete: (id: number) => void;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles, onParticleComplete }) => {
  const [animatedParticles, setAnimatedParticles] = useState<Particle[]>(particles);

  useEffect(() => {
    if (particles.length === 0) return;

    const animationInterval = setInterval(() => {
      setAnimatedParticles(prevParticles => {
        return prevParticles.map(particle => {
          const newLife = particle.life - 1;
          if (newLife <= 0) {
            onParticleComplete(particle.id);
            return null;
          }

          return {
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2, // gravity
            life: newLife,
            size: particle.size * (newLife / particle.maxLife)
          };
        }).filter(Boolean) as Particle[];
      });
    }, 16);

    return () => clearInterval(animationInterval);
  }, [particles, onParticleComplete]);

  const getParticleStyle = (particle: Particle) => {
    const opacity = particle.life / particle.maxLife;
    const transform = particle.type === 'smoke' ? 
      `scale(${1 + (1 - opacity)})` : 
      'scale(1)';

    return {
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: particle.color,
      opacity,
      transform,
      borderRadius: particle.type === 'shard' ? '0' : '50%',
      filter: particle.type === 'bubble' ? 'blur(1px)' : 'none'
    };
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {animatedParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-all duration-75"
          style={getParticleStyle(particle)}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
