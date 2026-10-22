import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import { ArrowRight, MapPin, Scissors, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { posts, setActiveTab } = useApp();
  const newestPosts = posts.slice(0, 3);

  return (
    <main className="bg-white text-slate-900 font-['Nunito']">
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Homepage</p>
            <h1 className="mt-1 font-['Fredoka'] text-3xl font-bold text-slate-950">
              Selamat datang di Trivest
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Jelajahi desain, pakaian, dan layanan upcycling dari komunitas.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('ai-studio')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <Sparkles className="h-4 w-4" />
            Mulai desain AI
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Reverse Market
                </p>
                <h2 className="mt-1 font-['Fredoka'] text-xl font-bold text-slate-900">
                  Baru masuk
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('reverse-market')}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
              >
                Lihat semua <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {newestPosts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {newestPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setActiveTab('reverse-market')}
                    className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-emerald-50/50 sm:p-5"
                  >
                    <img
                      src={post.imageUrl || ASSET_IMAGES.denimJacket}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                          {post.type === 'wanted' ? 'Dicari' : 'Tersedia'}
                        </span>
                        <span className="text-[11px] text-slate-500">{post.createdAt}</span>
                      </span>
                      <span className="block truncate font-bold text-slate-900">{post.title}</span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <Tag className="h-3.5 w-3.5" /> {post.category}
                        <MapPin className="ml-2 h-3.5 w-3.5" /> {post.location}
                      </span>
                      <span className="mt-1 block text-sm font-bold text-emerald-800">
                        Rp {post.budgetOrPrice.toLocaleString('id-ID')}
                      </span>
                    </span>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-slate-500">
                Belum ada postingan baru. Jadilah yang pertama berbagi di Reverse Market.
              </div>
            )}
          </div>
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
