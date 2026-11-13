# KALA — Toko Web Lilin Aromaterapi Sirkadian

**KALA** adalah toko web lilin aromaterapi berbahasa Indonesia (Rupiah / IDR) dengan konsep **Ritual Sirkadian Siang–Malam** yang adaptif terhadap fase waktu (*Fajar*, *Tengah Hari*, *Senja*, dan *Malam*).

## Cara Menampilkan di GitHub Pages (Penting!)

File `index.html` di folder utama adalah berkas sumber (*source*) Vite + React (`.tsx`) sehingga **browser tidak dapat menjalankannya langsung tanpa proses build** (halaman akan tampak kosong bila GitHub Pages diarahkan ke `/ (root)` mentah).

Gunakan salah satu dari 2 cara berikut agar web langsung tampil sempurna di GitHub Pages:

### Cara 1: Otomatis via GitHub Actions (Disarankan)
Proyek ini sudah dilengkapi berkas `.github/workflows/deploy.yml`.
1. Unggah seluruh isi proyek ini (termasuk folder `.github/`) ke repository GitHub Anda (`main` atau `master`).
2. Di GitHub repository, buka **Settings → Pages**.
3. Pada bagian **Build and deployment → Source**, ubah dari *Deploy from a branch* menjadi **GitHub Actions**.
4. Buka tab **Actions** dan tunggu workflow **Deploy KALA ke GitHub Pages** selesai (sekitar 1 menit), lalu buka tautan GitHub Pages Anda.

### Cara 2: Build Lokal lalu Unggah Isi Folder `dist/`
1. Jalankan di terminal komputer Anda:
   ```bash
   npm install
   npm run build
   ```
2. Hasil HTML, CSS, JS, dan seluruh 32 gambar AI siap-pakai akan dibuat di dalam folder **`dist/`** (sudah memakai path relatif `base: './'`).
3. Unggah **isi** folder `dist/` (file `index.html` hasil build + folder `assets/`) ke branch GitHub Pages Anda atau langsung ke **Vercel / Netlify**.

## Pengelolaan 32 Gambar AI & Penggantian dengan Gambar ChatGPT

Seluruh **32 gambar** (4 Hero Sirkadian, 12 Produk, 3 Wadah Kustom, 9 Bahan Minyak Botani, dan 4 Ritual Bakar & Atelier) di `src/assets/images/` dibuat dengan AI tanpa unduhan eksternal.
- Untuk melihat daftar prompt ChatGPT, klik **"Katalog 32 Gambar AI & Prompt (GitHub)"** di bagian bawah halaman.
- Untuk mengganti gambar, simpan gambar baru di `src/assets/images/` dan perbarui `src/data/assetCatalog.ts`, lalu push ulang ke GitHub.
