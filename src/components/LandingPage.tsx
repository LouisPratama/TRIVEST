import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import {
  Sparkles,
  Scissors,
  Repeat,
  Truck,
  RotateCw,
  Heart,
  Leaf,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Layers,
  Smile,
  ShieldCheck,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 bg-[#FAF8F5] text-[#46534D] overflow-hidden font-['Nunito']">
      {/* 1. Hero Section (Sesuai Cover & Page 1 Brand Identity Presentation) */}
      <section className="relative pt-6 lg:pt-10 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-6">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 bg-[#F1EFE8] border border-[#9FB6A7]/60 px-4 py-1.5 rounded-full shadow-xs">
            <span className="text-sm">🌱</span>
            <span className="font-['Fredoka'] font-bold text-xs text-[#5E8276] tracking-wide">
              Rewear · Redesign · Reimagine ♡
            </span>
          </div>

          {/* Centered Large Official Trivest Logo */}
          <div className="flex justify-center items-center py-2">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-3 border-[#9FB6A7] shadow-sm bg-[#F1EFE8] p-1.5 mb-2 hover:scale-105 transition-transform">
                <img
                  src={ASSET_IMAGES.trivestLogo}
                  alt="Trivest Official Logo"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h1 className="font-['Fredoka'] text-4xl sm:text-6xl font-bold tracking-tight text-[#5E8276] leading-none">
                Trivest
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <p className="font-['Fredoka'] text-xl sm:text-2xl font-semibold text-[#7E867F]">
            "Bikin Ulang Gayamu, Tanpa Beli Baru."
          </p>

          <p className="text-xs sm:text-sm text-[#7E867F] max-w-xl mx-auto leading-relaxed font-medium">
            Trivest adalah platform digital berbasis upcycling fashion yang membantu kamu mengubah pakaian bekas menjadi produk baru yang lebih menarik, personal, dan bernilai!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ai-studio')}
              className="px-6 py-3 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-sm font-bold rounded-2xl shadow-sm hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border-2 border-[#5E8276]"
            >
              <Sparkles className="w-4 h-4 text-[#E8C5C8]" />
              <span>Mulai Rancang Desain AI & 360° Fit</span>
            </button>

            <button
              onClick={() => setActiveTab('reverse-market')}
              className="px-6 py-3 bg-white hover:bg-[#F1EFE8] text-[#5E8276] font-['Fredoka'] text-sm font-bold rounded-2xl shadow-xs border-2 border-[#9FB6A7] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Repeat className="w-4 h-4 text-[#5E8276]" />
              <span>Jelajahi Reverse Market 🐰</span>
            </button>
          </div>
        </div>

        {/* Mascot Squad Illustration Showcase */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-3 border-[#E2DDD5] shadow-md bg-white">
          <img
            src={ASSET_IMAGES.bunnyHero}
            alt="Trivest Mascot Community"
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[#9FB6A7] text-[11px] font-bold text-[#5E8276] flex items-center gap-1.5 shadow-xs">
            <span>♡ Sustainable, Fun, and Tech-Enabled Upcycling</span>
          </div>
        </div>
      </section>

      {/* 2. Konsep & Karakter Brand (Page 3 & Page 5 in Brand Identity Presentation) */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="bg-[#F1EFE8] border-2 border-[#9FB6A7]/50 rounded-3xl p-6 lg:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Mascot with 3D Phone Try-On */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#9FB6A7] shadow-sm bg-white p-2">
                <img
                  src={ASSET_IMAGES.bunnyPhone3D}
                  alt="3D Virtual Try-On Trivest"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content from Page 2 & 3 */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white text-[#5E8276] font-['Fredoka'] text-xs font-bold px-3 py-1 rounded-full border border-[#9FB6A7]">
                <span>🌱</span>
                <span>IDE BISNIS & KONSEP BRAND</span>
              </div>

              <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-[#5E8276] leading-tight">
                Fashion Lebih Personal, Lebih Kreatif, Lebih Berkelanjutan ♡
              </h2>

              <p className="font-['Nunito'] font-semibold text-[#46534D] text-sm sm:text-base leading-relaxed">
                Trivest menggabungkan teknologi digital, jasa modifikasi pakaian (rework), dan marketplace dalam satu ekosistem ramah pengguna.
              </p>

              {/* 4 Brand Pillars (Page 3) */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-['Nunito'] font-bold">
                <div className="p-3 rounded-2xl bg-white border border-[#9FB6A7] text-[#5E8276] flex items-center gap-2">
                  <span className="text-base">🎨</span>
                  <span>Creativity (Ekspresi Bebas)</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#9FB6A7] text-[#5E8276] flex items-center gap-2">
                  <span className="text-base">♻️</span>
                  <span>Sustainability (Masa Depan)</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#9FB6A7] text-[#5E8276] flex items-center gap-2">
                  <span className="text-base">✨</span>
                  <span>Personal Expression (Gaya Unik)</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#9FB6A7] text-[#5E8276] flex items-center gap-2">
                  <span className="text-base">📱</span>
                  <span>Digital Innovation (Teknologi Pas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Trivest & Lemari Penuh Pakaian (Page 4 & Page 6 Brand Identity) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#FAF8F5] border-2 border-[#E2DDD5] rounded-3xl p-6 lg:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#E8C5C8]/40 text-[#5E8276] font-['Fredoka'] text-xs font-bold px-3 py-1 rounded-full border border-[#E8C5C8]">
                <span>♡</span>
                <span>WHY TRIVEST?</span>
              </div>
              <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-[#46534D]">
                Punya Pakaian Lama yang Jarang Dipakai?
              </h2>
              <p className="text-xs sm:text-sm text-[#7E867F] font-medium max-w-xl">
                Pakaian yang sudah jarang digunakan sering kali tidak dimanfaatkan kembali. Trivest mengubah pandangan bahwa pakaian lama masih memiliki potensi untuk diubah menjadi sesuatu yang baru, unik, dan bernilai!
              </p>
            </div>

            {/* Closet Illustration */}
            <div className="w-56 h-48 sm:w-64 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#9FB6A7] shadow-xs bg-white shrink-0">
              <img
                src={ASSET_IMAGES.bunnyCloset}
                alt="Trivest Closet Wardrobe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4 Fitur Utama (Page 2 Brand Identity) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#9FB6A7]/50 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#F1EFE8] text-[#5E8276] flex items-center justify-center font-['Fredoka'] font-bold text-sm">
                01
              </div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-[#5E8276]">
                Clothing Scanning & Digital Redesign
              </h4>
              <p className="text-xs text-[#7E867F] font-medium leading-relaxed">
                Analisis AI terhadap serat kain dan panduan dekonstruksi pola untuk menciptakan pakaian baru.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#9FB6A7]/50 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#F1EFE8] text-[#5E8276] flex items-center justify-center font-['Fredoka'] font-bold text-sm">
                02
              </div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-[#5E8276]">
                3D Virtual Try-On
              </h4>
              <p className="text-xs text-[#7E867F] font-medium leading-relaxed">
                Pratinjau visual 360° yang menyesuaikan ukuran tinggi, dada, dan pinggang pengguna.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#9FB6A7]/50 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#F1EFE8] text-[#5E8276] flex items-center justify-center font-['Fredoka'] font-bold text-sm">
                03
              </div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-[#5E8276]">
                Layanan Rework Mitra Penjahit
              </h4>
              <p className="text-xs text-[#7E867F] font-medium leading-relaxed">
                Terhubung dengan penjahit lokal terampil yang siap mengeksekusi pola dengan rapi.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#9FB6A7]/50 shadow-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#F1EFE8] text-[#5E8276] flex items-center justify-center font-['Fredoka'] font-bold text-sm">
                04
              </div>
              <h4 className="font-['Fredoka'] text-sm font-bold text-[#5E8276]">
                Marketplace & Reverse Market
              </h4>
              <p className="text-xs text-[#7E867F] font-medium leading-relaxed">
                Jual hasil rework, cari bahan baju bekas spesifik, dan nikmati kurir jemput-antar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Transformations Before & After (Page 8 Brand Identity) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#F1EFE8] text-[#5E8276] font-['Fredoka'] text-xs font-bold px-3 py-1 rounded-full border border-[#9FB6A7] mb-2">
              <span>✂️</span>
              <span>FROM BRAND CONCEPT TO REAL PRODUCTS</span>
            </div>
            <h2 className="font-['Fredoka'] text-3xl sm:text-4xl font-bold text-[#46534D]">
              Transformasi Nyata Rework Pakaian
            </h2>
            <p className="text-xs sm:text-sm text-[#7E867F]">
              Karya upcycle nyata dari bahan baju bekas menjadi pakaian stylish yang pas di tubuh
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="px-4 py-2 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-xl transition-all self-start md:self-auto flex items-center gap-1.5 cursor-pointer"
          >
            <span>Jelajahi Koleksi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-[#9FB6A7]/60 overflow-hidden shadow-xs p-4 space-y-3 hover:border-[#5E8276] transition-colors">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={ASSET_IMAGES.denimJacket}
                alt="Vintage Jeans into Sashiko Jacket"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#5E8276]">
                <span>Vintage Jeans ➔ Sashiko Jacket</span>
                <span>⭐ 4.9 (84 Ulasan)</span>
              </div>
              <h3 className="font-['Fredoka'] text-base font-bold text-[#46534D]">
                Boro Sashiko Denim Rework
              </h3>
              <p className="text-xs text-[#7E867F]">
                Patchwork denim dengan sulam tangan sashiko geometris dan potongan cropped.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-['Fredoka'] font-bold text-[#5E8276]">Mulai Rp 120.000</span>
              <button
                onClick={() => setActiveTab('ai-studio')}
                className="px-3 py-1.5 bg-[#F1EFE8] hover:bg-[#9FB6A7]/30 text-[#5E8276] font-['Fredoka'] font-bold rounded-xl"
              >
                Coba 360° Fit
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-[#9FB6A7]/60 overflow-hidden shadow-xs p-4 space-y-3 hover:border-[#5E8276] transition-colors">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={ASSET_IMAGES.denimJacket}
                alt="Jaket denim patchwork asli tanpa model"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#5E8276]">
                <span>Denim Vintage ➔ Jaket Utility</span>
                <span>⭐ 4.8 (62 Ulasan)</span>
              </div>
              <h3 className="font-['Fredoka'] text-base font-bold text-[#46534D]">
                Jaket Utility Denim Rework
              </h3>
              <p className="text-xs text-[#7E867F]">
                Jaket denim asli dengan panel patchwork dan detail saku fungsional.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-['Fredoka'] font-bold text-[#5E8276]">Mulai Rp 85.000</span>
              <button
                onClick={() => setActiveTab('ai-studio')}
                className="px-3 py-1.5 bg-[#F1EFE8] hover:bg-[#9FB6A7]/30 text-[#5E8276] font-['Fredoka'] font-bold rounded-xl"
              >
                Coba 360° Fit
              </button>
            </div>
          </div>

          {/* Card 3: Artisan Tailor */}
          <div className="bg-white rounded-3xl border border-[#9FB6A7]/60 overflow-hidden shadow-xs p-4 space-y-3 hover:border-[#5E8276] transition-colors">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={ASSET_IMAGES.artisanWorkshop}
                alt="Penjahit lokal sedang mengerjakan pakaian"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#5E8276]">
                <span>Mitra Penjahit Lokal</span>
                <span>⭐ 5.0 Rating</span>
              </div>
              <h3 className="font-['Fredoka'] text-base font-bold text-[#46534D]">
                Atelier Jahit Bergaransi
              </h3>
              <p className="text-xs text-[#7E867F]">
                Penjahit lokal teruji yang mengeksekusi desain AI dengan presisi ukuran tubuh.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-['Fredoka'] font-bold text-[#5E8276]">84+ Penjahit</span>
              <button
                onClick={() => setActiveTab('tailors')}
                className="px-3 py-1.5 bg-[#F1EFE8] hover:bg-[#9FB6A7]/30 text-[#5E8276] font-['Fredoka'] font-bold rounded-xl"
              >
                Pesan Penjahit
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
