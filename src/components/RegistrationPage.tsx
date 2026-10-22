import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone, UserRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';

export const RegistrationPage: React.FC = () => {
  const { registerUser, loginUser, continueAsGuest, setActiveTab } = useApp();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const email = String(formData.get('email')).trim();
      const password = String(formData.get('password'));
      if (mode === 'register') {
        await registerUser(
          {
            name: String(formData.get('name')).trim(),
            email,
            phone: String(formData.get('phone')).trim(),
            address: String(formData.get('address')).trim(),
          },
          password
        );
      } else {
        await loginUser(email, password);
      }
      setActiveTab('landing');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Tidak dapat memproses akun. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-[#26332D] sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12">
      <section className="mx-auto w-full max-w-xl space-y-6">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.trivestLogo}
            alt="Logo Trivest"
            className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
          />
          <div>
            <p className="font-['Fredoka'] text-2xl font-bold text-emerald-800">Trivest</p>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-['Fredoka'] text-3xl font-bold text-slate-950 sm:text-4xl">
            {mode === 'register' ? 'Daftar akun Trivest' : 'Masuk ke Trivest'}
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            {mode === 'register'
              ? 'Buat akun untuk mulai merancang ulang pakaian.'
              : 'Masuk dengan email dan kata sandi akunmu.'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid grid-cols-2 rounded-xl bg-[#F1EFE8] p-1">
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
              }}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                mode === 'register' ? 'bg-white text-[#5E8276] shadow-sm' : 'text-[#7E867F]'
              }`}
            >
              Daftar
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                mode === 'login' ? 'bg-white text-[#5E8276] shadow-sm' : 'text-[#7E867F]'
              }`}
            >
              Masuk
            </button>
          </div>

          {mode === 'register' && (
            <label className="block space-y-1.5">
              <span className="flex items-center gap-2 text-xs font-bold text-[#46534D]">
                <UserRound className="h-4 w-4 text-[#5E8276]" />
                Nama lengkap
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Nama kamu"
                required
                maxLength={80}
                className="w-full rounded-xl border border-[#D8D2C7] px-3.5 py-3 text-sm outline-none transition focus:border-[#5E8276] focus:ring-2 focus:ring-[#9FB6A7]/40"
              />
            </label>
          )}

          <label className="block space-y-1.5">
            <span className="flex items-center gap-2 text-xs font-bold text-[#46534D]">
              <Mail className="h-4 w-4 text-[#5E8276]" />
              Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              required
              maxLength={254}
              className="w-full rounded-xl border border-[#D8D2C7] px-3.5 py-3 text-sm outline-none transition focus:border-[#5E8276] focus:ring-2 focus:ring-[#9FB6A7]/40"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="flex items-center gap-2 text-xs font-bold text-[#46534D]">
              <span aria-hidden="true" className="text-base leading-none">••</span>
              Kata sandi
            </span>
            <input
              name="password"
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              placeholder="Minimal 8 karakter"
              required
              minLength={8}
              maxLength={128}
              className="w-full rounded-xl border border-[#D8D2C7] px-3.5 py-3 text-sm outline-none transition focus:border-[#5E8276] focus:ring-2 focus:ring-[#9FB6A7]/40"
            />
          </label>

          {mode === 'register' && (
            <>
              <label className="block space-y-1.5">
                <span className="flex items-center gap-2 text-xs font-bold text-[#46534D]">
                  <Phone className="h-4 w-4 text-[#5E8276]" />
                  Nomor WhatsApp
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  required
                  maxLength={24}
                  className="w-full rounded-xl border border-[#D8D2C7] px-3.5 py-3 text-sm outline-none transition focus:border-[#5E8276] focus:ring-2 focus:ring-[#9FB6A7]/40"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="flex items-center gap-2 text-xs font-bold text-[#46534D]">
                  <MapPin className="h-4 w-4 text-[#5E8276]" />
                  Alamat pengiriman dan penjemputan
                </span>
                <textarea
                  name="address"
                  autoComplete="street-address"
                  placeholder="Alamat lengkap"
                  required
                  maxLength={300}
                  rows={3}
                  className="w-full resize-y rounded-xl border border-[#D8D2C7] px-3.5 py-3 text-sm outline-none transition focus:border-[#5E8276] focus:ring-2 focus:ring-[#9FB6A7]/40"
                />
              </label>
            </>
          )}

          {errorMessage && (
            <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5E8276] px-4 py-3.5 font-['Fredoka'] text-sm font-bold text-white transition hover:bg-[#46534D] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? 'Memproses...' : mode === 'register' ? 'Daftar & mulai' : 'Masuk'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
          <p className="text-center text-[11px] leading-relaxed text-[#7E867F]">
            Akun lokal hanya tersedia di browser ini. Kata sandi disimpan sebagai hash di perangkat ini.
          </p>
        </form>

        <button
          type="button"
          onClick={() => {
            continueAsGuest();
            setActiveTab('landing');
          }}
          className="w-full rounded-xl border-2 border-[#9FB6A7] bg-white px-4 py-3 font-['Fredoka'] text-sm font-bold text-[#5E8276] transition hover:bg-[#F1EFE8]"
        >
          Lanjutkan sebagai tamu
        </button>
      </section>

      <aside className="mx-auto mt-8 hidden w-full max-w-xl overflow-hidden rounded-3xl bg-emerald-50 p-3 lg:block">
        <img
          src={ASSET_IMAGES.hero}
          alt="Maskot kelinci Trivest"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </aside>
    </main>
  );
};
