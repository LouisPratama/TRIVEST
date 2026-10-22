import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  PackageCheck,
  Recycle,
  Scissors,
  ShoppingBag,
  Sparkles,
  Tag,
} from 'lucide-react';

const categories = [
  {
    label: 'Denim rework',
    description: 'Patchwork & sashiko',
    image: ASSET_IMAGES.denimJacket,
    tab: 'ai-studio',
  },
  {
    label: 'Utility wear',
    description: 'Cargo & outerwear',
    image: ASSET_IMAGES.cargoVest,
    tab: 'ai-studio',
  },
  {
    label: 'Karya penjahit',
    description: 'Kreasi lokal',
    image: ASSET_IMAGES.artisanWorkshop,
    tab: 'tailors',
  },
  {
    label: 'Pakaian preloved',
    description: 'Jual & temukan bahan',
    image: ASSET_IMAGES.hero,
    tab: 'reverse-market',
  },
] as const;

export const LandingPage: React.FC<{ publicMode?: boolean }> = ({ publicMode = false }) => {
  const { posts, orders, currentUser, setActiveTab } = useApp();
  const newestPosts = posts.slice(0, 4);
  const myOrders = orders.filter((order) => order.userId === currentUser.id);
  const navigate = (tab: 'ai-studio' | 'tailors' | 'reverse-market') => {
    setActiveTab(publicMode ? 'auth' : tab);
  };

  if (!publicMode) {
    return (
      <main className="min-h-full bg-[#F6F7F4] px-4 py-6 text-[#26332D] sm:px-8 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="grid overflow-hidden rounded-3xl bg-[#E9EDE7] md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#668679]">
                Beranda Trivest
              </p>
              <h1 className="mt-3 font-['Fredoka'] text-3xl font-bold leading-tight text-[#26332D] sm:text-5xl">
                Halo, {currentUser.name}.
                <span className="mt-1 block text-[#668679]">Siap buat sesuatu yang baru?</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#66716A]">
                Pilih pakaian lama, rancang ulang, lalu lanjutkan bersama penjahit lokal.
              </p>
              <button
                onClick={() => setActiveTab('ai-studio')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#315847] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#263F34]"
              >
                <Sparkles className="h-4 w-4" />
                Mulai desain AI
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative min-h-56 md:min-h-[340px]">
              <img
                src={ASSET_IMAGES.denimJacket}
                alt="Jaket denim hasil upcycling"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/45 to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#315847]">
                Beri pakaian lama cerita baru
              </span>
            </div>
          </section>

          <section aria-label="Ringkasan akun" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#E5E8E2] bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#738078]">
                <PackageCheck className="h-4 w-4 text-[#668679]" />
                Pesanan saya
              </div>
              <p className="mt-3 font-['Fredoka'] text-2xl font-bold">{myOrders.length}</p>
              <button onClick={() => setActiveTab('orders')} className="mt-2 text-xs font-bold text-[#527267] hover:underline">
                Lihat pesanan <ArrowUpRight className="inline h-3.5 w-3.5" />
              </button>
            </article>
            <article className="rounded-2xl border border-[#E5E8E2] bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#738078]">
                <Recycle className="h-4 w-4 text-[#668679]" />
                Ide berkelanjutan
              </div>
              <p className="mt-3 font-['Fredoka'] text-lg font-bold">Pakai ulang</p>
              <p className="mt-1 text-xs text-[#738078]">Mulai dari pakaian yang sudah ada.</p>
            </article>
            <button
              onClick={() => setActiveTab('reverse-market')}
              className="col-span-2 flex items-center justify-between rounded-2xl bg-[#315847] p-4 text-left text-white transition hover:bg-[#263F34] sm:col-span-1 sm:p-5"
            >
              <span>
                <span className="block text-xs font-semibold text-white/70">Komunitas</span>
                <span className="mt-2 block font-['Fredoka'] text-lg font-bold">Jelajahi Pasar</span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#668679]">Mulai berkarya</p>
                  <h2 className="mt-1 font-['Fredoka'] text-2xl font-bold">Pilih langkah berikutnya</h2>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'Desain AI', description: 'Buat konsep dari pakaianmu.', tab: 'ai-studio', Icon: Sparkles },
                  { title: 'Virtual Fit 360°', description: 'Lihat pratinjau desain.', tab: 'virtual-fit', Icon: Recycle },
                  { title: 'Cari penjahit', description: 'Pilih mitra untuk mewujudkan desain.', tab: 'tailors', Icon: Scissors },
                  { title: 'Marketplace', description: 'Cari atau tawarkan pakaian preloved.', tab: 'reverse-market', Icon: ShoppingBag },
                ].map(({ title, description, tab, Icon }) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'ai-studio' | 'virtual-fit' | 'tailors' | 'reverse-market')}
                    className="group flex min-h-28 items-start gap-4 rounded-2xl border border-[#E5E8E2] bg-white p-4 text-left transition hover:border-[#9FB6A7] hover:shadow-sm"
                  >
                    <span className="rounded-xl bg-[#E9EDE7] p-3 text-[#527267]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between font-bold text-[#26332D]">
                        {title}
                        <ArrowUpRight className="h-4 w-4 text-[#97A29A] transition group-hover:text-[#315847]" />
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#738078]">{description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#668679]">Reverse Market</p>
                  <h2 className="mt-1 font-['Fredoka'] text-2xl font-bold">Baru di pasar</h2>
                </div>
                <button
                  onClick={() => setActiveTab('reverse-market')}
                  className="text-xs font-bold text-[#527267] hover:underline"
                >
                  Lihat semua
                </button>
              </div>
              <div className="space-y-3">
                {newestPosts.slice(0, 3).map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setActiveTab('reverse-market')}
                    className="flex w-full items-center gap-3 rounded-2xl border border-[#E5E8E2] bg-white p-3 text-left transition hover:border-[#9FB6A7]"
                  >
                    <img
                      src={post.imageUrl || ASSET_IMAGES.denimJacket}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#668679]">
                        <Tag className="h-3 w-3" /> {post.category}
                      </span>
                      <span className="mt-1 block truncate text-sm font-bold text-[#26332D]">{post.title}</span>
                      <span className="mt-1 flex items-center gap-2 text-[10px] text-[#738078]">
                        <MapPin className="h-3 w-3" /> {post.location}
                        <Clock className="ml-1 h-3 w-3" /> {post.createdAt}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#97A29A]" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAF9F6] text-[#26332D] font-['Nunito']">
      {publicMode && (
        <header className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
            <img src={ASSET_IMAGES.trivestLogo} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <span className="font-['Fredoka'] text-2xl font-bold text-[#26332D]">Trivest</span>
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className="rounded-full bg-[#26332D] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#40554B] sm:px-6 sm:text-sm"
          >
            Sign-up / Login
          </button>
        </header>
      )}

      <section className="mx-auto max-w-[1500px] px-4 pt-5 sm:px-8 sm:pt-8 lg:px-12">
        <div className="grid min-h-[460px] overflow-hidden rounded-[2rem] bg-[#E9E5DE] md:min-h-[560px] md:grid-cols-[0.82fr_1.18fr]">
          <div className="relative z-10 flex flex-col items-start justify-center px-7 py-12 sm:px-12 lg:px-16">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#527267]">
              <Recycle className="h-4 w-4" />
              Fashion upcycling lokal
            </p>
            <h1 className="max-w-xl font-['Fredoka'] text-5xl font-bold uppercase leading-[0.98] tracking-tight text-[#26332D] sm:text-6xl lg:text-7xl">
              Gaya baru,
              <span className="mt-2 block text-[#668679]">cerita lama.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#5D655F] sm:text-base sm:leading-7">
              Ubah pakaian lama menjadi karya personal bersama desain AI dan penjahit lokal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => publicMode ? setActiveTab('auth') : navigate('ai-studio')}
                className="inline-flex items-center gap-2 rounded-full bg-[#26332D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#40554B]"
              >
                <Sparkles className="h-4 w-4" />
                {publicMode ? 'Sign-up / Login' : 'Mulai desain'}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => publicMode
                  ? document.getElementById('trivest-categories')?.scrollIntoView({ behavior: 'smooth' })
                  : navigate('reverse-market')}
                className="inline-flex items-center gap-2 rounded-full border border-[#26332D]/30 px-6 py-3 text-sm font-bold text-[#26332D] transition hover:bg-white/60"
              >
                {publicMode ? 'Lihat koleksi' : 'Jelajahi pasar'}
              </button>
            </div>
            <span className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#748078]">
              Pakai lagi · Rancang ulang · Buat berbeda
            </span>
          </div>
          <div className="relative min-h-[300px] md:min-h-full">
            <img
              src={ASSET_IMAGES.landingHero}
              alt="Koleksi pakaian hasil upcycling di studio Trivest"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/35 via-transparent to-transparent md:bg-gradient-to-r md:from-[#E9E5DE]/10 md:via-transparent md:to-transparent" />
            <span className="absolute bottom-5 right-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#26332D] backdrop-blur-sm sm:bottom-8 sm:right-8">
              Rancang dengan bahan yang ada
            </span>
          </div>
        </div>
      </section>

      <section id="trivest-categories" className="mx-auto max-w-[1500px] px-4 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-7 flex flex-col items-center text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#668679]">
            Jelajahi Trivest
          </p>
          <h2 className="mt-2 font-['Fredoka'] text-3xl font-bold text-[#26332D] sm:text-4xl">
            Temukan cara baru memakai
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#707871]">
            Dari inspirasi desain sampai menemukan bahan preloved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => navigate(category.tab)}
              className="group relative aspect-[0.92] overflow-hidden rounded-2xl bg-[#E7E3DC] text-left sm:aspect-[1.05]"
            >
              <img
                src={category.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <span className="block font-['Fredoka'] text-lg font-bold sm:text-xl">{category.label}</span>
                <span className="mt-0.5 flex items-center justify-between text-xs text-white/80">
                  {category.description}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#668679]">
                Reverse Market
              </p>
              <h2 className="mt-2 font-['Fredoka'] text-3xl font-bold text-[#26332D] sm:text-4xl">
                Temuan terbaru
              </h2>
              <p className="mt-2 text-sm text-[#707871]">Pakaian preloved dari komunitas.</p>
            </div>
            <button
              onClick={() => navigate('reverse-market')}
              className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#527267] hover:text-[#26332D]"
            >
              Lihat semua <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {newestPosts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {newestPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => navigate('reverse-market')}
                  className="group overflow-hidden rounded-2xl border border-[#EAE8E2] bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[0.95] overflow-hidden bg-[#F0EEE9]">
                    <img
                      src={post.imageUrl || ASSET_IMAGES.denimJacket}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#40554B]">
                      {post.type === 'wanted' ? 'Dicari' : 'Tersedia'}
                    </span>
                  </div>
                  <span className="block p-3.5 sm:p-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#668679]">
                      <Tag className="h-3 w-3" /> {post.category}
                    </span>
                    <span className="mt-2 block min-h-10 text-sm font-bold leading-5 text-[#26332D]">
                      {post.title}
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-bold text-[#40554B]">
                        Rp {post.budgetOrPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#7B817C]">
                        <MapPin className="h-3 w-3" /> {post.location}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D8D9D2] p-10 text-center text-sm text-[#707871]">
              Belum ada postingan baru di pasar.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="relative grid min-h-[340px] overflow-hidden rounded-[2rem] bg-[#34443B] md:grid-cols-2">
          <div className="relative z-10 flex flex-col items-start justify-center px-7 py-10 text-white sm:px-12 lg:px-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9D5CD]">
              Rancang. Jahit. Pakai kembali.
            </p>
            <h2 className="mt-4 max-w-lg font-['Fredoka'] text-3xl font-bold leading-tight sm:text-4xl">
              Satu pakaian lama, banyak kemungkinan.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
              Buat konsep dengan AI, coba di Virtual Fit, lalu wujudkan bersama penjahit lokal.
            </p>
            <button
              onClick={() => navigate('ai-studio')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#26332D] transition hover:bg-[#E9E5DE]"
            >
              <Scissors className="h-4 w-4" />
              Mulai upcycling
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="relative min-h-[230px] md:min-h-full">
            <img
              src={ASSET_IMAGES.artisanWorkshop}
              alt="Penjahit lokal mengerjakan pakaian upcycle"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/25 to-transparent md:bg-gradient-to-r md:from-[#34443B] md:via-[#34443B]/15 md:to-transparent" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#E4E2DA] bg-[#F1F0EB]">
        <div className="mx-auto grid max-w-[1500px] divide-y divide-[#DAD8D0] px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">
          <button
            onClick={() => navigate('ai-studio')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-[#668679] sm:px-6 sm:first:pl-0"
          >
            <span className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#668679]" />
              <span className="font-bold">Desain berbantuan AI</span>
            </span>
            <ArrowRight className="h-4 w-4 text-[#8A918C]" />
          </button>
          <button
            onClick={() => navigate('tailors')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-[#668679] sm:px-6"
          >
            <span className="flex items-center gap-3">
              <Scissors className="h-5 w-5 text-[#668679]" />
              <span className="font-bold">Penjahit lokal</span>
            </span>
            <ArrowRight className="h-4 w-4 text-[#8A918C]" />
          </button>
          <button
            onClick={() => navigate('reverse-market')}
            className="flex items-center justify-between gap-4 py-5 text-left transition hover:text-[#668679] sm:px-6 sm:pr-0"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-[#668679]" />
              <span className="font-bold">Marketplace preloved</span>
            </span>
            <ArrowRight className="h-4 w-4 text-[#8A918C]" />
          </button>
        </div>
      </section>
    </main>
  );
};
