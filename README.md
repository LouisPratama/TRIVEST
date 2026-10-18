# TRIVEST

Platform upcycling fashion berbasis React, Vite, dan API Gemini.

## Menjalankan secara lokal

Persyaratan: Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Tambahkan `GEMINI_API_KEY` ke file `.env` untuk mengaktifkan Gemini. Jika tidak diisi, API akan memberikan konsep desain terkurasi sebagai fallback.

## Deploy ke Vercel

1. Import repository ini di Vercel. Konfigurasi build memakai `npm run build` dan output `dist` melalui [vercel.json](./vercel.json).
2. Tambahkan `GEMINI_API_KEY` di **Project Settings → Environment Variables** pada Vercel. Jangan menaruh API key di variabel berawalan `VITE_` atau di kode frontend.
3. Deploy. Gambar di `public/images` akan disajikan sebagai aset statis, sementara endpoint `/api/gemini/upcycle-design` berjalan sebagai Vercel Function.

Uji build lokal dengan:

```bash
npm run build
```
