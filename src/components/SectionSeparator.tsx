'use client';

interface SectionSeparatorProps {
  className?: string;
}

export default function SectionSeparator({ 
  className = ''
}: SectionSeparatorProps) {
  
  return (
    <div className={`relative w-full py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Центральная линия */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
        
        {/* Центральная точка без анимации */}
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(174,239,16,0.6)]"></div>
      </div>
    </div>
  );
}
