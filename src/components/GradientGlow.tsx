'use client';

interface GradientGlowProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  direction?: 'top' | 'bottom' | 'both';
}

export default function GradientGlow({ 
  className = '', 
  intensity = 'medium',
  direction = 'top' 
}: GradientGlowProps) {
  
  const getIntensityClass = () => {
    switch (intensity) {
      case 'light':
        return 'from-primary/10 via-primary/5 to-transparent';
      case 'strong':
        return 'from-primary/30 via-primary/15 to-transparent';
      default:
        return 'from-primary/20 via-primary/10 to-transparent';
    }
  };

  const getDirectionClass = () => {
    switch (direction) {
      case 'bottom':
        return 'bg-gradient-to-t';
      case 'both':
        return 'bg-gradient-to-b';
      default:
        return 'bg-gradient-to-b';
    }
  };

  if (direction === 'both') {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Верхнее свечение */}
        <div className={`absolute top-0 left-0 w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-b ${getIntensityClass()} pointer-events-none`}></div>
        
        {/* Нижнее свечение */}
        <div className={`absolute bottom-0 left-0 w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-t ${getIntensityClass()} pointer-events-none`}></div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`absolute ${direction === 'bottom' ? 'bottom-0' : 'top-0'} left-0 w-full h-32 sm:h-40 lg:h-48 ${getDirectionClass()} ${getIntensityClass()} pointer-events-none`}></div>
    </div>
  );
}


