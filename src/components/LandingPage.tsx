import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import { ArrowRight, Scissors, ShoppingBag, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <main className="bg-white text-slate-900 font-['Nunito']">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">
            FASHION UPCYCLING
          </span>
          <h1 className="max-w-xl font-['Fredoka'] text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Pakaian lama, gaya baru.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            Rancang ulang pakaianmu dan wujudkan bersama penjahit lokal.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => setActiveTab('ai-studio')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              <Sparkles className="h-4 w-4" />
              Mulai desain
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              Lihat inspirasi
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-3 rounded-[2rem] bg-emerald-50" />
          <img
            src={ASSET_IMAGES.hero}
            alt="Maskot kelinci Trivest"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          <button
            onClick={() => setActiveTab('ai-studio')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-emerald-800 sm:px-6 sm:first:pl-0"
          >
            <span className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-emerald-700" />
              <span className="font-bold">Rancang dengan AI</span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveTab('tailors')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-emerald-800 sm:px-6"
          >
            <span className="flex items-center gap-3">
              <Scissors className="h-5 w-5 text-emerald-700" />
              <span className="font-bold">Temukan penjahit</span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => setActiveTab('reverse-market')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-emerald-800 sm:px-6 sm:pr-0"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-emerald-700" />
              <span className="font-bold">Jelajahi marketplace</span>
            </span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </section>
    </main>
  );
};
