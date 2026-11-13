# KALA — Toko Web Lilin Aromaterapi Sirkadian

**KALA** adalah toko web lilin aromaterapi berbahasa Indonesia (Rupiah / IDR) dengan konsep **Ritual Sirkadian Siang–Malam** yang adaptif terhadap fase waktu (*Fajar*, *Tengah Hari*, *Senja*, dan *Malam*).

Seluruh aplikasi dibangun sebagai proyek statis Vite + React + TypeScript + Tailwind CSS tanpa dependensi server wajib sehingga dapat langsung diunggah ke **GitHub** dan di-deploy ke **GitHub Pages**, **Vercel**, atau **Netlify**.

## Fitur Utama

1. **Ritual Sirkadian Siang–Malam**: Pengalih ritme waktu (*Fajar 06:00*, *Tengah Hari 12:00*, *Senja 18:00*, *Malam 22:00*) yang mengubah tema Terang Alabaster ↔ Gelap Obsidian, foto Hero AI khusus tiap fase, serta rekomendasi lilin jam tersebut.
2. **Koleksi Kurasi (12 Varian) & Jurnal Waktu Bakar 0–4 Jam**: Katalog 12 varian lilin (3 per fase sirkadian) dengan saringan waktu, keluarga aroma, pencarian, serta modul detail produk interaktif lengkap dengan penggeser evolusi *Top*, *Heart*, dan *Base Note* dari menit ke-0 hingga ke-240.
3. **Atelier Racik Lilin Kustom**: Racik wadah (*Keramik*, *Obsidian*, *Travertine*), sumbu (*Kapas Kepang* atau *Kayu Cendana*), tiga lapisan minyak esensial bergambar makro botani, konsentrasi aroma, dan ukiran label pribadi dengan pratinjau langsung.
4. **Catatan Sesi Pembakaran & Tas Belanja Lokal**: Buku catatan sesi pembakaran pribadi dan laci keranjang belanja (`localStorage`) lengkap dengan checkout Transfer/COD.

## Pengelolaan 32 Gambar AI & Penggantian dengan Gambar ChatGPT

Seluruh **32 gambar** (4 Hero Sirkadian, 12 Produk, 3 Wadah Kustom, 9 Bahan Minyak Botani, dan 4 Ritual Bakar & Atelier) di folder `src/assets/images/` dibuat menggunakan generasi gambar AI tanpa unduhan eksternal.

Jika Anda ingin mengganti gambar dengan gambar buatan **ChatGPT (DALL·E)**:
1. Buka modal **"Katalog 32 Gambar AI & Prompt (GitHub)"** di bagian footer untuk menyalin prompt per gambar.
2. Simpan gambar hasil ChatGPT ke dalam folder `src/assets/images/`.
3. Perbarui path `import` di berkas tunggal **`src/data/assetCatalog.ts`**.

## Menjalankan & Membuild HTML Statis

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan mode pengembangan lokal
npm run dev

# 3. Bangun berkas HTML/JS/CSS statis untuk GitHub Pages / Hosting
npm run build
```

Hasil build statis siap-unggah tersedia di direktori `dist/`. Jika men-deploy ke GitHub Pages di sub-path repository (misalnya `https://username.github.io/nama-repo/`), tambahkan `base: '/nama-repo/'` pada `vite.config.ts`.
