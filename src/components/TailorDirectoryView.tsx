import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TailorProfile, UpcycleConcept } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import {
  Scissors,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Ruler,
  Check,
  ChevronRight,
  ShieldCheck,
  Truck,
  X,
  Phone,
} from 'lucide-react';

export const TailorDirectoryView: React.FC = () => {
  const {
    tailors,
    currentUser,
    currentDesign,
    allDesigns,
    createOrder,
    setActiveTab,
    showNotification,
  } = useApp();

  const [selectedCity, setSelectedCity] = useState('Semua Kota');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Semua Spesialisasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingTailor, setBookingTailor] = useState<TailorProfile | null>(null);
  const [detailTailor, setDetailTailor] = useState<TailorProfile | null>(null);

  // Booking Form State
  const [chosenConcept, setChosenConcept] = useState<UpcycleConcept>(currentDesign);
  const [pickupAddress, setPickupAddress] = useState(currentUser.address);
  const [clientNotes, setClientNotes] = useState('Mohon perhatikan toleransi lingkar dada sesuai data 360° fit.');

  const cities = ['Semua Kota', 'Bandung', 'Jakarta Selatan', 'Yogyakarta', 'Surabaya'];
  const specialties = [
    'Semua Spesialisasi',
    'Denim Rework',
    'Outerwear & Blazer',
    'Japanese Boro',
    'Cargo & Utility Pants',
  ];

  const filteredTailors = tailors.filter((tailor) => {
    if (selectedCity !== 'Semua Kota' && tailor.city !== selectedCity) return false;
    if (
      selectedSpecialty !== 'Semua Spesialisasi' &&
      !tailor.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()))
    )
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tailor.name.toLowerCase().includes(q) ||
        tailor.workshopName.toLowerCase().includes(q) ||
        tailor.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingTailor) return;

    createOrder(bookingTailor.id, chosenConcept, currentUser.measurements);
    setBookingTailor(null);
    setActiveTab('orders');
    showNotification(
      `Pemesanan untuk ${bookingTailor.workshopName} berhasil! Driver siap menjemput bahan.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 bg-white font-['Nunito']">
      {/* Page Header */}
      <div className="border-b border-[#E2DDD5] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#5E8276] uppercase tracking-wider font-['Fredoka']">
            Direktori penjahit terverifikasi
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-[#7E867F]">          Mitra lokal</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#46534D] font-['Fredoka']">
          Mitra Penjahit Upcycle Lokal
        </h1>
        <p className="text-xs text-[#7E867F] mt-1 max-w-2xl font-medium">
          Temukan penjahit lokal untuk mengubah pakaian bekas dengan tarif transparan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama penjahit atau keahlian..."
            className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#1B4332]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 text-xs border border-stone-300 rounded-xl bg-[#FBFBF9] font-medium"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 text-xs border border-stone-300 rounded-xl bg-[#FBFBF9] font-medium"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tailor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTailors.map((tailor) => (
          <div
            key={tailor.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
          >
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={tailor.avatar}
                    alt={tailor.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-stone-900">{tailor.name}</h3>
                    <p className="text-xs text-[#1B4332] font-semibold">{tailor.workshopName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>
                        {tailor.city} ({tailor.distanceKm} km)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{tailor.rating}</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      ({tailor.reviewCount})
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    {tailor.completedProjects} Proyek Sukses
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                {tailor.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {tailor.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Portfolio Preview Grid */}
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden mb-3">
                {tailor.portfolioImages.slice(0, 2).map((img, idx) => (
                  <div key={idx} className="h-28 bg-stone-100 overflow-hidden">
                    <img
                      src={img}
                      alt="Portofolio karya jahit"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Booking Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                  Tarif Mulai
                </span>
                <span className="text-sm font-bold text-stone-900 tabular-nums">
                  Rp {tailor.startingPrice.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Estimasi {tailor.turnaroundDays} hari kerja
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDetailTailor(tailor)}
                  className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-stone-400 rounded-xl transition-colors"
                >
                  Detail Profil
                </button>
                <button
                  onClick={() => {
                    setBookingTailor(tailor);
                    setChosenConcept(currentDesign);
                  }}
                  className="px-4 py-2 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Pesan Jahit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tailor Detail Modal */}
      {detailTailor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FBFBF9]">
              <div>
                <h3 className="text-base font-bold text-stone-900">{detailTailor.workshopName}</h3>
                <p className="text-xs text-stone-500">Profil Lengkap Pengrajin Upcycle</p>
              </div>
              <button
                onClick={() => setDetailTailor(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={detailTailor.avatar}
                  alt={detailTailor.name}
                  className="w-16 h-16 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-base font-bold text-stone-900">{detailTailor.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>
                      {detailTailor.location}, {detailTailor.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{detailTailor.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Tentang Workshop & Pengalaman
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">{detailTailor.bio}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  Galeri Karya Upcycle Sebelumnya
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {detailTailor.portfolioImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Karya penjahit"
                      className="w-full h-32 object-cover rounded-xl border border-stone-200"
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block">Jaminan Kualitas TRIFEST</span>
                  <span className="font-bold text-emerald-950">
                    Garansi Pas Ukuran 360° & Bahan Kembali
                  </span>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#1B4332]" />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setBookingTailor(detailTailor);
                    setDetailTailor(null);
                  }}
                  className="w-full py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Lanjut Pesan Jahit ke {detailTailor.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrated Booking Modal */}
      {bookingTailor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FBFBF9]">
              <div>
                <h3 className="text-base font-bold text-stone-900">Form Pemesanan Jasa Upcycle</h3>
                <p className="text-xs text-stone-500">
                  Kepada: {bookingTailor.name} ({bookingTailor.workshopName})
                </p>
              </div>
              <button
                onClick={() => setBookingTailor(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleConfirmBooking} className="p-6 overflow-y-auto space-y-5">
              {/* Desain AI yang dilampirkan */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Konsep Desain Upcycle Terpilih
                </label>
                <select
                  value={chosenConcept.id}
                  onChange={(e) => {
                    const found = allDesigns.find((d) => d.id === e.target.value);
                    if (found) setChosenConcept(found);
                  }}
                  className="w-full p-2.5 text-xs font-semibold border border-stone-300 rounded-xl bg-stone-50"
                >
                  {allDesigns.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.aesthetic})
                    </option>
                  ))}
                </select>
                <div className="mt-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div>
                    <strong>Pola Baju Asal: </strong>
                    {chosenConcept.sourceGarment}
                  </div>
                  <div>
                    <strong>Instruksi Penjahit: </strong>
                    {chosenConcept.tailoringTips}
                  </div>
                </div>
              </div>

              {/* Data Ukuran Tubuh 360° yang Terlampir */}
              <div className="bg-[#FBFBF9] p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#1B4332]" />
                    Spesifikasi Ukuran Tubuh (360° Fit Terverifikasi)
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {chosenConcept.fitProfile}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Tinggi / Berat</span>
                    <strong className="text-stone-900 font-mono">
                      {currentUser.measurements.height}cm / {currentUser.measurements.weight}kg
                    </strong>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Dada / Pinggang</span>
                    <strong className="text-stone-900 font-mono">
                      {currentUser.measurements.chest} / {currentUser.measurements.waist}cm
                    </strong>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Lingkar Paha</span>
                    <strong className="text-stone-900 font-mono">
                      {currentUser.measurements.thigh}cm
                    </strong>
                  </div>
                </div>
              </div>

              {/* Alamat Penjemputan Driver */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2C4C64]" />
                  Alamat Penjemputan Bahan & Pengantaran (Mitra Driver)
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
                <span className="text-[10px] text-stone-500 block mt-1">
                  Driver TRIFEST akan menjemput baju bekas dari alamat ini dan mengantarkannya ke workshop {bookingTailor.name}.
                </span>
              </div>

              {/* Catatan Tambahan */}
              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">
                  Catatan Tambahan untuk Penjahit
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>

              {/* Rincian Biaya */}
              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Jasa Jahit & Rework ({bookingTailor.name}):</span>
                  <span className="font-mono tabular-nums">
                    Rp {bookingTailor.startingPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Ongkos Kirim Kurir TRIFEST (Jemput & Antar):</span>
                  <span className="font-mono tabular-nums">Rp 20.000</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-100">
                  <span>Total Biaya:</span>
                  <span className="font-mono tabular-nums text-[#1B4332]">
                    Rp {(bookingTailor.startingPrice + 20000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5E8276] hover:bg-[#46534D] text-white font-['Fredoka'] text-xs font-bold rounded-2xl shadow-xs transition-colors cursor-pointer"
                >
                  Konfirmasi & Panggil Driver Penjemputan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
