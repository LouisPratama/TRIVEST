import React from 'react';

interface TrivestLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
}

export const TrivestLogo: React.FC<TrivestLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  className = '',
}) => {
  const logoPath = '/images/trivest_brand_logo_bunny_1792116127645.jpg';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Mascot Logo Mark */}
      <div
        className={`${iconSizes[size]} rounded-2xl overflow-hidden border-2 border-[#9FB6A7]/40 shadow-xs bg-[#F1EFE8] flex items-center justify-center shrink-0 relative`}
      >
        <img
          src={logoPath}
          alt="Trivest Official Logo - Bunny with Circular Recycling Arrows"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Elegant SVG fallback if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Wordmark and optional Tagline */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-['Fredoka'] ${textSizes[size]} font-bold tracking-tight text-[#5E8276] leading-none`}
            >
              Trivest
            </span>
            <span className="text-[10px] bg-[#E8C5C8]/40 text-[#7E867F] font-bold px-1.5 py-0.5 rounded-full border border-[#E8C5C8]">
              ♡
            </span>
          </div>

          {showTagline && (
            <span className="text-[11px] font-['Nunito'] font-bold text-[#7E867F] tracking-tight mt-0.5">
              Bikin Ulang Gayamu, Tanpa Beli Baru.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
