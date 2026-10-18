import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAuthModalOpen } = useApp();

  return (
    <footer className="border-t-2 border-[#F0E6D2] bg-[#FFFDF6] py-10 px-4 lg:px-8 text-xs text-stone-600 font-['Quicksand']">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-['Fredoka'] font-bold text-xl text-[#E05780]">TRIVEST</span>
            <span className="text-[10px] bg-[#D8F3DC] text-[#1B4332] font-bold px-2 py-0.5 rounded-full border border-[#95D5B2]">
              Eco-Cute Atelier 🐰
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium max-w-sm">
            Bikin Ulang Gayamu, Tanpa Beli Baru. Menghidupkan kembali pakaian bekas menjadi karya baru yang stylish dengan bantuan AI & komunitas.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-stone-700 font-['Fredoka']">
          <button
            onClick={() => setActiveTab('landing')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            Trending Thrift
          </button>
          <button
            onClick={() => setActiveTab('ai-studio')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            AI Studio & 360° Fit
          </button>
          <button
            onClick={() => setActiveTab('reverse-market')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            Reverse Market
          </button>
          <button
            onClick={() => setActiveTab('tailors')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            Top Penjahit
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="hover:text-[#E05780] transition-colors cursor-pointer"
          >
            Pesanan & Kurir
          </button>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[#E05780] hover:underline cursor-pointer"
          >
            Profil Thrifter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-[#F0E6D2] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 font-medium">
        <div>© 2026 TRIVEST. Gerakan Daur Ulang Pakaian Berkelanjutan Ramah Lingkungan.</div>
        <div className="flex items-center gap-3">
          <span>🌱 4.8 Ton Tekstil Terselamatkan</span>
          <span>·</span>
          <span>🧵 84+ Penjahit Lokal Berdaya</span>
        </div>
      </div>
    </footer>
  );
};
