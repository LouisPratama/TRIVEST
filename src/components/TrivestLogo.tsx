import React from 'react';
import { ASSET_IMAGES } from '../data/mockData';

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
        className={`${iconSizes[size]} rounded-2xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center shrink-0 relative`}
      >
        <img
          src={ASSET_IMAGES.trivestLogo}
          alt="Trivest Official Logo - Bunny with Circular Recycling Arrows"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Wordmark and optional Tagline */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-['Fredoka'] ${textSizes[size]} font-bold tracking-tight text-emerald-800 leading-none`}
            >
              Trivest
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
