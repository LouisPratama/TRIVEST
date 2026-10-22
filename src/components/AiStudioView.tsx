import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UpcycleConcept } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import {
  Sparkles,
  Upload,
  Ruler,
  Scissors,
  Check,
  RotateCw,
  Clock,
  Banknote,
  Layers,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

const PRESET_GARMENTS = [
  {
    name: 'Celana Jeans Denim Pudar',
    material: 'Denim Katun 14oz Washed',
    condition: 'Pudar vintage, sedikit sobek di lutut',
    image: ASSET_IMAGES.denimJacket,
    defaultStyle: 'Japanese Boro & Sashiko Patchwork',
  },
  {
    name: 'Kemeja Flanel Oversized',
    material: 'Flanel Katun Tartan Kotak',
    condition: 'Baik, kancing lengkap',
    image: ASSET_IMAGES.cargoVest,
    defaultStyle: 'Modular Utility Cargo Vest',
  },
  {
    name: 'Kaos Vintage Heavy Cotton',
    material: 'Katun Combed 16s Tebal',
    condition: 'Warna washed charcoal alami',
    image: ASSET_IMAGES.hero,
    defaultStyle: 'Boxy Drop-Shoulder Tee with Pockets',
  },
];

const ConceptPreview: React.FC<{ concept: UpcycleConcept }> = ({ concept }) => {
  const isCorset = /corset|bustier/i.test(concept.title);
  const isVest = /vest|corset/i.test(concept.title);
  const isTee = /tee|t-shirt|kaos/i.test(concept.title);
  const primaryColor = concept.previewColorPrimary || '#2C4C64';
  const accentColor = concept.previewColorAccent || '#D97706';
  const garmentShape = isCorset
    ? 'M68 22 L84 31 L90 42 L96 31 L112 22 L132 37 L119 57 L111 53 L121 127 L59 127 L69 53 L61 57 L48 37 Z'
    : isTee
      ? 'M66 23 L84 31 L96 31 L114 23 L137 38 L157 65 L137 78 L123 60 L120 127 L60 127 L57 60 L43 78 L23 65 L43 38 Z'
      : isVest
        ? 'M68 22 L83 31 L90 41 L97 31 L112 22 L139 37 L129 59 L117 53 L114 127 L66 127 L63 53 L51 59 L41 37 Z'
        : 'M66 22 L84 30 L96 30 L114 22 L133 36 L153 67 L135 77 L123 60 L119 128 L61 128 L57 60 L45 77 L27 67 L47 36 Z';
  const placketShape = isCorset
    ? 'M84 32 L90 44 L96 32 L105 126 L75 126 Z'
    : isTee
      ? 'M84 31 L90 40 L96 31 L95 126 L85 126 Z'
      : isVest
        ? 'M83 31 L90 43 L97 31 L94 82 L86 82 Z'
        : 'M84 30 L90 40 L96 30 L95 126 L85 126 Z';
  const pockets = isCorset
    ? ['M72 77 L87 73 L90 94 L75 98 Z', 'M93 73 L108 77 L105 98 L90 94 Z']
    : ['M68 82 H82 V101 H68 Z', 'M98 82 H112 V101 H98 Z'];

  return (
    <div className="grid h-40 overflow-hidden rounded-2xl border border-[#E2DDD5] bg-[#F1EFE8] sm:grid-cols-[1fr_150px]">
      <div className="relative flex items-center justify-center bg-gradient-to-br from-[#E8EDE7] to-[#F6F1E9]">
        <svg
          viewBox="0 0 180 150"
          role="img"
          aria-label={`Ilustrasi desain ${concept.title}`}
          className="h-full w-full max-w-[230px] drop-shadow-md"
        >
          <path
            d={garmentShape}
            fill={primaryColor}
            stroke="#26332D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d={placketShape}
            fill={accentColor}
            opacity="0.95"
          />
          <path
            d={`${pockets[0]} ${pockets[1]}`}
            fill={accentColor}
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M72 36 L82 47 M108 36 L98 47"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
        </svg>
        <span className="absolute bottom-2 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#46534D]">
          Ilustrasi konsep
        </span>
      </div>
      <div className="relative hidden overflow-hidden sm:block">
        <img
          src={concept.userImageUrl || ASSET_IMAGES.denimJacket}
          alt={`Foto bahan referensi untuk ${concept.title}`}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#46534D]">
          Foto bahan
        </span>
      </div>
    </div>
  );
};

export const AiStudioView: React.FC = () => {
  const { currentDesign, setCurrentDesign, saveDesign, setActiveTab, showNotification } = useApp();

  const [garmentType, setGarmentType] = useState('Celana Jeans Denim Pudar');
  const [material, setMaterial] = useState('Denim Katun 14oz Washed');
  const [condition, setCondition] = useState('Pudar vintage, kain masih kokoh');
  const [desiredStyle, setDesiredStyle] = useState('Japanese Boro & Sashiko Patchwork');
  const [notes, setNotes] = useState('Ingin potongan cropped modern dan saku serbaguna.');
  const [userPhotoBase64, setUserPhotoBase64] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConcepts, setGeneratedConcepts] = useState<UpcycleConcept[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotoBase64(reader.result as string);
        showNotification('Foto baju bekas berhasil diunggah');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (p: (typeof PRESET_GARMENTS)[0]) => {
    setGarmentType(p.name);
    setMaterial(p.material);
    setCondition(p.condition);
    setDesiredStyle(p.defaultStyle);
    setUserPhotoBase64(null);
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/upcycle-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentType,
          material,
          condition,
          desiredStyle,
          notes,
          userPhotoBase64,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server AI tidak dapat memproses permintaan.');
      }
      if (!Array.isArray(data.ideas) || data.ideas.length === 0) {
        throw new Error('AI belum menghasilkan konsep desain. Silakan coba lagi.');
      }

      const mapped: UpcycleConcept[] = data.ideas.map((item: any, idx: number) => ({
          id: `ai-concept-${Date.now()}-${idx}`,
          title: item.title || `Upcycle ${garmentType} Refashion`,
          aesthetic: item.aesthetic || desiredStyle,
          difficulty: item.difficulty || 'Sedang',
          estimatedTailorHours: item.estimatedTailorHours || 4,
          estimatedCost: item.estimatedCost || 'Rp 95.000 - Rp 135.000',
          deconstructionSteps: item.deconstructionSteps || [
            'Dekomposisi kelim jahitan',
            'Pola ulang panel badan',
            'Rekonstruksi & aksen rework',
          ],
          tailoringTips: item.tailoringTips || 'Gunakan jarum tebal dan benang katun kontras.',
          recommendedAdditionalFabrics: item.recommendedAdditionalFabrics || 'Kain katun perca kontras',
          fitProfile: item.fitProfile || 'Regular Fit',
          sourceGarment: garmentType,
          userImageUrl:
            userPhotoBase64 ||
            PRESET_GARMENTS.find((preset) => preset.name === garmentType)?.image ||
            ASSET_IMAGES.denimJacket,
          previewColorPrimary:
            item.previewColorPrimary || ['#2C4C64', '#3F4E3E', '#704C3A'][idx % 3],
          previewColorAccent:
            item.previewColorAccent || ['#D97706', '#D4A373', '#C06C84'][idx % 3],
      }));

      setGeneratedConcepts(mapped);
      setCurrentDesign(mapped[0]);
      showNotification(`Gemini AI berhasil merancang ${mapped.length} konsep upcycle!`, 'success');
    } catch (err) {
      console.error(err);
      showNotification(
        err instanceof Error ? err.message : 'Gagal menghubungi AI. Silakan coba lagi.',
        'info'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyTo360 = (concept: UpcycleConcept) => {
    setCurrentDesign(concept);
    saveDesign(concept);
    setActiveTab('virtual-fit');
    showNotification(`Konsep "${concept.title}" siap dicoba pada Virtual Fit 360°`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#5E8276] uppercase tracking-wider font-['Fredoka']">
              AI Design Studio
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#46534D] font-['Fredoka']">
            Desain AI
          </h1>
          <p className="text-xs text-[#7E867F] mt-1 max-w-2xl font-['Nunito']">
            Ubah pakaian bekas menjadi konsep desain baru.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Left Form: Input Garment & Prompt (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#1B4332]" />
                Foto atau Bahan Baju Bekas
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Pilih dari kurasi contoh atau unggah foto baju Anda sendiri
              </p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              {PRESET_GARMENTS.map((p) => {
                const isSelected = garmentType === p.name && !userPhotoBase64;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#1B4332] bg-emerald-50/40 ring-1 ring-[#1B4332]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-16 object-cover rounded-lg mb-1.5"
                    />
                    <span className="text-[11px] font-bold text-stone-900 block truncate">
                      {p.name}
                    </span>
                    <span className="text-[9px] text-stone-500 block truncate">{p.material}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Photo Upload */}
            <div className="border border-dashed border-stone-300 rounded-xl p-3.5 text-center hover:bg-stone-50/50 transition-colors">
              {userPhotoBase64 ? (
                <div className="flex items-center gap-3">
                  <img
                    src={userPhotoBase64}
                    alt="Unggahan baju user"
                    className="w-14 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <span className="text-xs font-bold text-stone-900 block truncate">
                      Foto Baju Siap Dianalisis
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium block">
                      Berhasil diunggah
                    </span>
                    <label className="text-[11px] text-stone-500 underline cursor-pointer hover:text-stone-800">
                      Ganti Foto
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-stone-800 block">
                    Unggah Foto Baju Bekas Sendiri
                  </span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    JPG, PNG, atau WEBP hingga 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5 pt-2 border-t border-stone-200">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Jenis Pakaian Asal
                </label>
                <input
                  type="text"
                  value={garmentType}
                  onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                  placeholder="Misal: Kemeja Flanel / Celana Jeans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Bahan / Material
                  </label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Kondisi Pakaian
                  </label>
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Gaya Target yang Diinginkan
                </label>
                <select
                  value={desiredStyle}
                  onChange={(e) => setDesiredStyle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] bg-white"
                >
                  <option value="Japanese Boro & Sashiko Patchwork">
                    Japanese Boro & Sashiko Patchwork (Wabi-sabi)
                  </option>
                  <option value="Modular Utility Cargo Vest">
                    Modular Utility Cargo Vest (Gorpcore Urban)
                  </option>
                  <option value="Cropped Minimalist Boxy Jacket">
                    Cropped Minimalist Boxy Jacket (Contemporary Streetwear)
                  </option>
                  <option value="Asymmetric Corset Rework">
                    Asymmetric Corset Rework (High Fashion Chic)
                  </option>
                  <option value="Zero-Waste Reversible Outerwear">
                    Zero-Waste Reversible Outerwear
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Catatan untuk Penjahit / Detail Tambahan
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                  placeholder="Tambahkan detail saku, ukuran preferensi, atau ritsleting..."
                />
              </div>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateAI}
                className="w-full py-3 px-4 bg-[#5E8276] hover:bg-[#46534D] disabled:opacity-70 text-white font-['Fredoka'] text-xs font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI Sedang Merancang Pola Upcycle...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#E8C5C8]" />
                    <span>Hasilkan Ide Desain dengan AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Results: 3 AI Concepts Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#46534D] font-['Fredoka']">
                  Rekomendasi Konsep Desain AI ({generatedConcepts.length})
                </h3>
                <p className="text-xs text-[#7E867F]">
                  Dihasilkan khusus berdasarkan jenis serat bahan dan siluet baju bekas Anda
                </p>
              </div>
            </div>

            {/* Concept Cards */}
            <div className="space-y-4">
              {generatedConcepts.length === 0 && (
                <div className="rounded-3xl border border-dashed border-[#9FB6A7] bg-[#F7F8F4] p-8 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-[#5E8276]" />
                  <h4 className="mt-3 font-['Fredoka'] text-base font-bold text-[#46534D]">
                    Desain AI akan tampil di sini
                  </h4>
                  <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#7E867F]">
                    Buat desain AI atau pilih desain yang sudah tersimpan untuk mencoba Virtual Fit.
                  </p>
                </div>
              )}
              {generatedConcepts.map((concept, index) => {
                const isSelected = currentDesign.id === concept.id;
                return (
                  <div
                    key={concept.id}
                    className={`bg-white rounded-3xl border-2 p-5 transition-all shadow-xs ${
                      isSelected
                        ? 'border-[#5E8276] ring-1 ring-[#5E8276]'
                        : 'border-[#E2DDD5] hover:border-[#5E8276]'
                    }`}
                  >
                    <ConceptPreview concept={concept} />

                    {/* Header */}
                    <div className="mt-4 flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#7E867F] mb-1 font-['Fredoka']">
                          <span className="font-bold text-[#5E8276]">Konsep 0{index + 1}</span>
                          <span>·</span>
                          <span>Tingkat: {concept.difficulty}</span>
                          <span>·</span>
                          <span>Profil: {concept.fitProfile}</span>
                        </div>
                        <h4 className="text-base font-bold text-[#46534D] font-['Fredoka']">{concept.title}</h4>
                        <p className="text-xs text-[#7E867F] mt-0.5">{concept.aesthetic}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#5E8276] block tabular-nums font-['Fredoka']">
                          {concept.estimatedCost}
                        </span>
                        <span className="text-[10px] text-[#7E867F] flex items-center justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-[#9FB6A7]" /> ~{concept.estimatedTailorHours} Jam Jahit
                        </span>
                      </div>
                    </div>

                    {/* Deconstruction Steps */}
                    <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E2DDD5] mb-3.5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E8276] block flex items-center gap-1.5 font-['Fredoka']">
                        <Scissors className="w-3.5 h-3.5 text-[#5E8276]" />
                        Tahap Dekonstruksi & Rekonstruksi:
                      </span>
                      <ol className="list-decimal list-inside space-y-1 text-xs text-[#46534D]">
                        {concept.deconstructionSteps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tailor Tips */}
                    <div className="flex items-start gap-2 text-xs text-[#5E8276] mb-4 bg-[#F1EFE8] p-2.5 rounded-xl border border-[#9FB6A7]/40">
                      <Lightbulb className="w-4 h-4 text-[#5E8276] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#46534D] font-semibold">Instruksi Teknis: </strong>
                        <span>{concept.tailoringTips}</span>
                        {concept.recommendedAdditionalFabrics && (
                          <span className="block mt-0.5 text-[#7E867F] text-[11px]">
                            Bahan perca tambahan: {concept.recommendedAdditionalFabrics}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => saveDesign(concept)}
                        className="text-xs font-semibold text-[#7E867F] hover:text-[#46534D] px-3 py-1.5 rounded-xl hover:bg-[#F1EFE8] transition-colors cursor-pointer"
                      >
                        Simpan ke Koleksi
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApplyTo360(concept)}
                          className="px-4 py-2 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Lanjut ke Virtual Fit 360°</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
};
