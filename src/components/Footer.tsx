import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAuthModalOpen } = useApp();

  return (
    <footer className="border-t border-stone-200 bg-white py-8 px-4 lg:px-8 text-xs text-stone-600 font-['Nunito']">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-stone-700">
          <button
            onClick={() => setActiveTab('landing')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            Trending Thrift
          </button>
          <button
            onClick={() => setActiveTab('ai-studio')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            AI Studio & 360° Fit
          </button>
          <button
            onClick={() => setActiveTab('reverse-market')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            Reverse Market
          </button>
          <button
            onClick={() => setActiveTab('tailors')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            Top Penjahit
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="hover:text-[#5E8276] transition-colors cursor-pointer"
          >
            Pesanan & Kurir
          </button>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[#5E8276] hover:underline cursor-pointer"
          >
            Profil Thrifter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 font-medium">
        <div>© 2026 TRIVEST · Fashion upcycling lokal.</div>
        <div>4,8 ton tekstil terselamatkan · 84+ penjahit lokal</div>
      </div>
    </footer>
  );
};
