import React from 'react';
import { useApp } from '../context/AppContext';
import { TrivestLogo } from './TrivestLogo';
import { Sparkles, Compass, Repeat, Scissors, PackageCheck, Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    setIsAuthModalOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b-2 border-[#E2DDD5] px-4 lg:px-8 py-2.5 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Official Trivest Brand Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center text-left group shrink-0 cursor-pointer"
        >
          <TrivestLogo size="md" showTagline={true} />
        </button>

        {/* Zone 2: Navigation Links (Trivest Brand Style) */}
        <nav className="hidden lg:flex items-center gap-1.5 font-['Nunito'] font-bold text-xs">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <span>Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#9FB6A7]" />
            <span>Thrift & Katalog</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'ai-studio'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Design</span>
          </button>

          <button
            onClick={() => setActiveTab('reverse-market')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'reverse-market'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Reverse Market</span>
          </button>

          <button
            onClick={() => setActiveTab('tailors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'tailors'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Penjahit Lokal</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Pesanan & Kurir</span>
          </button>
        </nav>

        {/* Zone 3: Eco Impact & User Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Eco Score pill (from Brand Identity presentation) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#F1EFE8] border border-[#9FB6A7]/60 px-2.5 py-1 rounded-xl text-xs font-bold text-[#5E8276]">
            <Leaf className="w-3.5 h-3.5 text-[#5E8276]" />
            <span className="font-['Fredoka'] text-sm">Eco Score: 850</span>
          </div>

          {/* User Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 p-1 bg-white hover:bg-[#F1EFE8] border-2 border-[#E2DDD5] rounded-xl transition-all cursor-pointer"
            title="Profil Pengguna & Ukuran Tubuh"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="lg:hidden flex items-center justify-between gap-1 mt-2 pt-2 border-t border-[#E2DDD5] overflow-x-auto text-[11px] font-['Nunito'] font-bold">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'landing' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          Beranda
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'explore' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          Katalog
        </button>
        <button
          onClick={() => setActiveTab('ai-studio')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'ai-studio' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          AI Design
        </button>
        <button
          onClick={() => setActiveTab('reverse-market')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'reverse-market' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          Reverse Market
        </button>
        <button
          onClick={() => setActiveTab('tailors')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'tailors' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          Penjahit
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-[#5E8276] text-white' : 'text-[#7E867F]'
          }`}
        >
          Pesanan
        </button>
      </div>
    </header>
  );
};
