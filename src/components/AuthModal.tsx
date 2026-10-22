import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Phone, LogOut } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    updateProfile,
    logout,
  } = useApp();

  const [address, setAddress] = useState(currentUser.address);
  const [phone, setPhone] = useState(currentUser.phone);

  if (!isAuthModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ address, phone });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FBFBF9]">
          <div>
            <h3 className="text-base font-bold text-[#1C1E1B]">Profil & Akun Pengguna</h3>
            <p className="text-xs text-[#6B7065]">
              Kelola informasi kontak dan alamat pengiriman
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
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-3">
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
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Keluar / ganti akun
          </button>
        </div>
      </div>
    </div>
  );
};
