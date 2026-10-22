import React from 'react';
import { useApp } from '../context/AppContext';
import { TrivestLogo } from './TrivestLogo';
import { UserRound } from 'lucide-react';

const navigation = [
  { id: 'explore', label: 'Katalog' },
  { id: 'ai-studio', label: 'Desain AI' },
  { id: 'virtual-fit', label: 'Virtual Fit' },
  { id: 'reverse-market', label: 'Pasar' },
  { id: 'tailors', label: 'Penjahit' },
  { id: 'orders', label: 'Pesanan' },
] as const;

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setIsAuthModalOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab('landing')}
          className="shrink-0 cursor-pointer text-left"
          aria-label="Kembali ke beranda Trivest"
        >
          <TrivestLogo size="md" />
        </button>

        <nav className="hidden items-center gap-6 text-sm font-bold lg:flex">
          {navigation.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`border-b-2 py-2 transition ${
                activeTab === id
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-slate-600 hover:text-emerald-800'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
          title="Profil pengguna"
          aria-label="Buka profil pengguna"
        >
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto border-t border-slate-100 pt-2 text-xs font-bold lg:hidden">
        {navigation.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`shrink-0 rounded-lg px-3 py-2 transition ${
              activeTab === id
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};
