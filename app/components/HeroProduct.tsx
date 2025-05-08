'use client';

export default function HeroProduct() {
  return (
    <svg 
      width="300" 
      height="300" 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* Main cylindrical product */}
      <g className="filter drop-shadow-xl">
        {/* Product base */}
        <rect x="100" y="60" width="100" height="180" rx="10" fill="#D4A76A" />
        
        {/* Product shine */}
        <rect x="110" y="70" width="80" height="160" rx="8" fill="#F1BE6E" />
        
        {/* Product label */}
        <rect x="120" y="90" width="60" height="120" rx="4" fill="#222222" />
        
        {/* RAW logo */}
        <text 
          x="150" 
          y="150" 
          fontSize="28" 
          fontWeight="bold" 
          fill="#D4A76A" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          RAW
        </text>
        
        {/* Product details text */}
        <text 
          x="150" 
          y="175" 
          fontSize="10" 
          fill="#FFFFFF" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          PREMIUM QUALITY
        </text>
      </g>
      
      {/* Decorative elements */}
      <circle cx="150" cy="150" r="120" stroke="#D4A76A" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="150" cy="150" r="100" stroke="#D4A76A" strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  );
} 