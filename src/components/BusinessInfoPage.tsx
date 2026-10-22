import React from 'react';
import { ArrowRight, Recycle, Scissors, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrivestLogo } from './TrivestLogo';

const services = [
  {
    title: 'Desain berbantuan AI',
    description:
      'Ubah ide dan pakaian lama menjadi konsep desain personal, lalu lihat pratinjaunya dalam Virtual Fit 360°.',
    Icon: Sparkles,
  },
  {
    title: 'Mitra penjahit lokal',
    description:
      'Wujudkan desain bersama penjahit lokal, dengan dukungan pengiriman dan pelacakan pesanan.',
    Icon: Scissors,
  },
  {
    title: 'Fashion sirkular',
    description:
      'Perpanjang umur pakai pakaian dan temukan bahan preloved melalui Reverse Market.',
    Icon: Recycle,
  },
];

export const BusinessInfoPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <main className="flex min-h-screen items-center bg-[#FCFCFB] px-5 py-10 text-center text-slate-900 sm:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <TrivestLogo size="lg" className="justify-center" />

        <div className="mx-auto mt-8 max-w-4xl">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
            Informasi Bisnis
          </span>
          <h1 className="mt-5 font-['Fredoka'] text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Pakaian lama, gaya baru.
          </h1>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            Trivest menghubungkan desain AI, penjahit lokal, dan marketplace pakaian preloved
            untuk mengubah pakaian lama menjadi karya baru.
          </p>
        </div>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          {services.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5 sm:p-6"
            >
              <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h2 className="mt-4 text-sm font-bold text-slate-900 sm:text-base">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {description}
              </p>
            </article>
          ))}
        </div>

        <button
          onClick={() => setActiveTab('auth')}
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          Sign-up / Login
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </main>
  );
};
