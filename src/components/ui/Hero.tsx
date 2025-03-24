
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  className?: string;
}

const Hero = ({ title, subtitle, backgroundImage, className }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      className={cn(
        'relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
        </>
      )}
      
      <div 
        className={cn(
          'container-custom relative z-20 text-center transition-all duration-1000 transform',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight text-white">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 text-balance">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
