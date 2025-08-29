interface CodevLogoProps {
  className?: string;
  size?: number;
}

export default function CodevLogo({ className = "", size }: CodevLogoProps) {
  // Всегда используем оригинальные цвета логотипа
  const colors = {
    primary: '#aeef10',
    accent: '#aeef10'
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      className={`${className} ${!size ? 'w-full h-full' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .logo-primary { 
            fill: ${colors.primary}; 
            stroke: ${colors.primary}; 
            stroke-width: 4; 
            stroke-miterlimit: 10; 
          }
          .logo-line1 { 
            fill: none; 
            stroke: ${colors.accent}; 
            stroke-width: 20; 
            stroke-linecap: round; 
            stroke-miterlimit: 10; 
          }
          .logo-line2 { 
            fill: none; 
            stroke: ${colors.accent}; 
            stroke-width: 21; 
            stroke-linecap: round; 
            stroke-miterlimit: 10; 
          }
        `}
      </style>
      <g>
        <path 
          className="logo-primary" 
          d="M660,588c-36,2-84,49-120.91,56.33c-32.48,6.45-66.59,5.69-97.4-6.45c-27.44-10.81-51.65-29.28-69.41-52.83
            c-18.09-23.99-29.18-52.92-31.71-82.86c-2.58-30.48,3.61-61.45,17.9-88.52c13.74-26.03,34.68-48.07,59.96-63.14
            c26.48-15.79,57.3-23.57,88.1-22.43c36.66,1.36,70.31,18,100.47,38.89c27.68,19.18,56,21,56,21l113.62-129.45
            C723.79,199.85,645.75,164.94,547,160c-200-10-352,131.37-352,325.5S353,830,547,816c99.22-7.16,177.63-41.89,230.5-100.16L660,588z"
        />
      </g>
      <path 
        className="logo-line1" 
        d="M396,482c-0.26-5.55-1.39-42.9,28.48-71.5c28.96-27.72,64.78-25.89,70.52-25.5"
      />
      <line className="logo-line2" x1="710.5" y1="421" x2="710.5" y2="556"/>
      <line className="logo-line2" x1="747.5" y1="441.5" x2="747.5" y2="535.5"/>
      <line className="logo-line2" x1="784.5" y1="459.5" x2="784.5" y2="517.5"/>
    </svg>
  );
}
