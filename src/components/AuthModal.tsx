import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Ruler, MapPin, Phone } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    updateMeasurements,
    showNotification,
  } = useApp();

  const [formMeasurements, setFormMeasurements] = useState(currentUser.measurements);
  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);

  if (!isAuthModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements(formMeasurements);
    setIsAuthModalOpen(false);
    showNotification('Profil dan ukuran tubuh berhasil disimpan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FBFBF9]">
          <div>
            <h3 className="text-base font-bold text-[#1C1E1B]">Profil & Akun Pengguna</h3>
            <p className="text-xs text-[#6B7065]">
              Sesuaikan ukuran tubuh dan detail pengiriman untuk pengalaman yang lebih personal
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Form Measurements for 360 Virtual Fit */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
              <Ruler className="w-4 h-4 text-[#1B4332]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1E1B]">
                Ukuran Tubuh (Untuk Pratinjau 360° Fit)
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Tinggi Badan (cm)
                </label>
                <input
                  type="number"
                  value={formMeasurements.height}
                  onChange={(e) =>
                    setFormMeasurements({ ...formMeasurements, height: Number(e.target.value) })
                  }
                  min={130}
                  max={210}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332] tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Berat Badan (kg)
                </label>
                <input
                  type="number"
                  value={formMeasurements.weight}
                  onChange={(e) =>
                    setFormMeasurements({ ...formMeasurements, weight: Number(e.target.value) })
                  }
                  min={35}
                  max={150}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332] tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Lingkar Dada (cm)
                </label>
                <input
                  type="number"
                  value={formMeasurements.chest}
                  onChange={(e) =>
                    setFormMeasurements({ ...formMeasurements, chest: Number(e.target.value) })
                  }
                  min={60}
                  max={140}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332] tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Lingkar Pinggang (cm)
                </label>
                <input
                  type="number"
                  value={formMeasurements.waist}
                  onChange={(e) =>
                    setFormMeasurements({ ...formMeasurements, waist: Number(e.target.value) })
                  }
                  min={50}
                  max={130}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332] tabular-nums"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Lingkar Paha (cm)
                </label>
                <input
                  type="number"
                  value={formMeasurements.thigh}
                  onChange={(e) =>
                    setFormMeasurements({ ...formMeasurements, thigh: Number(e.target.value) })
                  }
                  min={40}
                  max={90}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-[#1B4332] tabular-nums"
                />
              </div>
            </div>

            {/* Address & Phone */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  Alamat Pengiriman & Penjemputan
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  Nomor Kontak WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1C1E1B] hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Simpan & Terapkan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
