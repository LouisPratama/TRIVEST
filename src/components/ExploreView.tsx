import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import { UpcycleConcept } from '../types';
import { Sparkles, Scissors, Clock, Repeat, ArrowRight, Bookmark, Leaf, Eye, Tag } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { allDesigns, setCurrentDesign, setActiveTab, saveDesign, showNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Fashion');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
      showNotification('Dihapus dari daftar favorit');
    } else {
      setWishlist([...wishlist, id]);
      showNotification('Ditambahkan ke daftar favorit');
    }
  };

  const categories = ['Fashion', 'Denim Vintage', 'Kemeja & Flanel', 'Outerwear', 'Kain Perca'];

  const filteredDesigns = allDesigns.filter((d) => {
    if (selectedCategory === 'Fashion') return true;
    if (selectedCategory === 'Denim Vintage')
      return d.title.toLowerCase().includes('denim') || d.title.toLowerCase().includes('sashiko');
    return true;
  });

  const handleTryIn360 = (concept: UpcycleConcept) => {
    setCurrentDesign(concept);
    saveDesign(concept);
    setActiveTab('ai-studio');
    showNotification(`Desain "${concept.title}" siap dicoba pada Virtual Fit 360°`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 bg-white font-['Nunito']">
      {/* Header with Location & Eco Impact Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 lg:p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5E8276]">
            <span>Jakarta & Bandung, Indonesia</span>
            <span>·</span>
            <span className="bg-white px-2 py-0.5 rounded-full text-[10px] text-[#5E8276] border border-[#9FB6A7]">
              Komunitas thrift aktif
            </span>
          </div>
          <h1 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-[#46534D]">
            Jelajahi pakaian preloved dan rework
          </h1>
          <p className="text-xs text-[#7E867F] font-medium">
            Temukan ribuan produk second-hand berkualitas dan pola upcycling yang pas untuk gayamu!
          </p>
        </div>

        {/* Eco Impact Box (Page 9 Brand Presentation) */}
        <div className="bg-white p-3.5 rounded-2xl border-2 border-[#9FB6A7] shadow-xs flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] text-[#5E8276] flex items-center justify-center text-lg">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#7E867F]">
              Dampakmu
            </div>
            <div className="font-['Fredoka'] text-sm font-bold text-[#5E8276]">
              12,5 kg CO₂ dihemat
            </div>
            <div className="text-[10px] font-bold text-[#7E867F] font-['Fredoka']">Eco Score: 850</div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-['Fredoka'] font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl border transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#5E8276] text-white border-[#46534D] shadow-xs'
                : 'bg-white text-[#7E867F] border-[#E2DDD5] hover:bg-[#F1EFE8] hover:text-[#5E8276]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product & Rework Design Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((concept) => {
          const isFavorited = wishlist.includes(concept.id);

          return (
            <div
              key={concept.id}
              className="bg-white rounded-3xl border-2 border-[#E2DDD5] overflow-hidden shadow-xs hover:border-[#5E8276] transition-all flex flex-col justify-between group p-3.5 space-y-3"
            >
              <div>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 relative">
                  <img
                    src={concept.userImageUrl || ASSET_IMAGES.denimJacket}
                    alt={concept.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        concept.id === 'concept-002'
                          ? ASSET_IMAGES.cargoVest
                          : ASSET_IMAGES.denimJacket;
                    }}
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#5E8276] font-['Fredoka'] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#9FB6A7] shadow-xs">
                    Kondisi: Excellent
                  </span>

                  <button
                    onClick={() => toggleWishlist(concept.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 transition-colors shadow-xs"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isFavorited ? 'fill-emerald-600 text-emerald-600' : ''}`}
                    />
                  </button>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7E867F]">
                    <span className="font-['Fredoka'] text-[#5E8276] font-bold">
                      {concept.fitProfile}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[#7E867F]">
                      <Clock className="w-3 h-3 text-[#9FB6A7]" />
                      ~{concept.estimatedTailorHours} Jam Jahit
                    </span>
                  </div>

                  <div>
                    <h3 className="font-['Fredoka'] text-base font-bold text-[#46534D] group-hover:text-[#5E8276] transition-colors">
                      {concept.title}
                    </h3>
                    <p className="text-xs text-[#7E867F] font-['Nunito'] mt-0.5">
                      {concept.aesthetic}
                    </p>
                  </div>

                  <div className="text-xs text-[#5E8276] bg-[#F1EFE8] p-2 rounded-xl border border-[#9FB6A7]/40 font-['Nunito'] font-semibold">
                    <span>Bahan: {concept.sourceGarment}</span>
                  </div>

                  <div className="font-['Fredoka'] text-sm font-bold text-[#5E8276] pt-1">
                    Estimasi: {concept.estimatedCost}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTryIn360(concept)}
                  className="flex-1 py-2 px-3 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Uji Pas 360°</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentDesign(concept);
                    setActiveTab('tailors');
                  }}
                  className="py-2 px-3 bg-[#F1EFE8] hover:bg-[#E2DDD5] text-[#5E8276] font-['Fredoka'] text-xs font-bold rounded-xl transition-colors cursor-pointer border border-[#9FB6A7]"
                >
                  Pesan Penjahit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reverse Market Helper Callout */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-['Fredoka'] text-base font-bold text-[#46534D]">
              Belum menemukan bahan yang cocok?
            </h3>
            <p className="text-xs text-[#7E867F] font-['Nunito'] font-medium">
              Cari pakaian bekas atau tawarkan bahan di marketplace.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('reverse-market')}
          className="px-5 py-2.5 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer"
        >
          Buka marketplace
        </button>
      </div>
    </div>
  );
};
