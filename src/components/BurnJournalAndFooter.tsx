import { useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { ASSET_PROMPT_CATALOG, RITUAL_IMAGES } from '../data/assetCatalog';
import { CANDLE_CATALOG } from '../data/candles';
import { ResilientImage } from './ResilientImage';

export interface BurnLogEntry {
  id: string;
  candleName: string;
  durationMinutes: number;
  note: string;
  loggedAt: string;
}

interface BurnJournalAndFooterProps {
  burnLogs: BurnLogEntry[];
  onAddBurnLog: (entry: Omit<BurnLogEntry, 'id' | 'loggedAt'>) => void;
  onDeleteBurnLog: (id: string) => void;
}

const RITUAL_STEPS = [
  {
    title: '01. Pangkas Sumbu Sebelum Setiap Nyala (5 mm)',
    desc: 'Sumbu yang terlalu panjang membakar minyak esensial lebih cepat dari titik didihnya. Pertahankan panjang 5 mm agar nyala stabil dan bebas jelaga.',
    image: RITUAL_IMAGES.pangkas_sumbu,
    alt: 'Pemangkasan sumbu lilin menggunakan gunting kuningan hingga 5 mm',
  },
  {
    title: '02. Pembakaran Perdana Minimal 2 Jam',
    desc: 'Lilin lebah dan kedelai memiliki memori lelehan. Biarkan kolam cair menyentuh bibir wadah sebelum dipadamkan agar tidak terbentuk terowongan di tengah.',
    image: RITUAL_IMAGES.kolam_lilin,
    alt: 'Kolam lelehan lilin lebah cair yang merata hingga tepi wadah',
  },
  {
    title: '03. Batas Maksimal 4 Jam & Padamkan Tanpa Tiupan',
    desc: 'Setelah jam ke-4, padamkan menggunakan penutup api (snuffer) agar base note kayu dan resin tetap murni tanpa bau asap.',
    image: RITUAL_IMAGES.snuffer_padam,
    alt: 'Penutup api snuffer perunggu memadamkan api lilin kaca obsidian',
  },
];

export function BurnJournalAndFooter({
  burnLogs,
  onAddBurnLog,
  onDeleteBurnLog,
}: BurnJournalAndFooterProps) {
  const [candleName, setCandleName] = useState(CANDLE_CATALOG[0].name);
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [note, setNote] = useState('');
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [assetCategoryFilter, setAssetCategoryFilter] =
    useState<string>('Semua');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddBurnLog({
      candleName,
      durationMinutes,
      note: note.trim(),
    });
    setNote('');
  };

  const handleCopyPrompt = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard API fallback ignored safely
    }
  };

  const filteredAssets =
    assetCategoryFilter === 'Semua'
      ? ASSET_PROMPT_CATALOG
      : ASSET_PROMPT_CATALOG.filter((a) => a.category === assetCategoryFilter);

  return (
    <>
      <section id="jurnal-bakar" className="transition-colors duration-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: Editorial 3-Step Burn Ritual with AI Photos */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-medium text-[#B45309] dark:text-[#E59A3C]">
                  Jurnal Waktu Bakar & Perawatan
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="font-display text-3xl font-normal text-[#1A1B18] dark:text-[#F2EFE9] mt-2"
                >
                  Merawat sumbu agar setiap lapis aroma bekerja utuh.
                </h2>
              </div>

              <div className="divide-y divide-[#E2DDD3] dark:divide-[#2A2D27] border-t border-b border-[#E2DDD3] dark:border-[#2A2D27]">
                {RITUAL_STEPS.map((step) => (
                  <div
                    key={step.title}
                    className="py-5 flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="w-full sm:w-32 aspect-[4/3] rounded-lg overflow-hidden shrink-0 bg-[#EFECE6] dark:bg-[#191B18]">
                      <ResilientImage
                        src={step.image}
                        alt={step.alt}
                        fallbackTitle={step.title}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A1B18] dark:text-[#F2EFE9]">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#57564F] dark:text-[#B5B0A6] mt-1.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Atelier Craftsmanship Card + Personal Burn Log Notebook */}
            <div className="lg:col-span-6 space-y-6">
              {/* Atelier Hand-Pouring Visual Feature */}
              <div
                id="tentang-tuang"
                className="rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/55 dark:bg-[#191B18] overflow-hidden grid grid-cols-1 sm:grid-cols-12"
              >
                <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto">
                  <ResilientImage
                    src={RITUAL_IMAGES.atelier_tuang}
                    alt="Proses penuangan manual lilin lebah dan kedelai di studio KALA"
                    fallbackTitle="Atelier KALA"
                  />
                </div>
                <div className="sm:col-span-7 p-5 flex flex-col justify-center">
                  <p className="text-xs font-medium text-[#B45309] dark:text-[#E59A3C]">
                    Atelier Jakarta · Batch Kecil
                  </p>
                  <h3 className="font-display text-xl text-[#1A1B18] dark:text-[#F2EFE9] mt-1">
                    Dituang Manual Pada Suhu Terukur
                  </h3>
                  <p className="text-xs leading-relaxed text-[#57564F] dark:text-[#B5B0A6] mt-2">
                    Setiap wadah diisi pada suhu 62°C agar minyak esensial
                    Nusantara tidak menguap sebelum sumbu dinyalakan, kemudian
                    didiamkan 14 hari untuk penyatuan molekul.
                  </p>
                </div>
              </div>

              {/* Personal Burn Log Notebook */}
              <div className="p-6 lg:p-7 rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/55 dark:bg-[#191B18] space-y-5">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#B45309] dark:text-[#E59A3C]" />
                  <h3 className="text-base font-semibold text-[#1A1B18] dark:text-[#F2EFE9]">
                    Catatan Sesi Pembakaran Pribadi
                  </h3>
                </div>

                <form onSubmit={handleLogSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-1">
                        Varian Lilin
                      </label>
                      <select
                        value={candleName}
                        onChange={(e) => setCandleName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] text-[#1A1B18] dark:text-[#F2EFE9]"
                      >
                        {CANDLE_CATALOG.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                        <option value="Racikan Kustom KALA">
                          Racikan Kustom KALA
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-1">
                        Durasi Sesi (Menit)
                      </label>
                      <input
                        type="number"
                        min={15}
                        max={240}
                        step={15}
                        value={durationMinutes}
                        onChange={(e) =>
                          setDurationMinutes(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] text-[#1A1B18] dark:text-[#F2EFE9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-1">
                      Kesan Aroma & Suasana Ruangan
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Contoh: Menit 90, aroma teh putih terasa paling jernih saat hujan."
                        className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] text-[#1A1B18] dark:text-[#F2EFE9]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1A1B18] text-[#F8F7F4] dark:bg-[#E59A3C] dark:text-[#111210] shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Catat</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Saved Burn Logs List */}
                <div className="space-y-2.5 pt-2 max-h-52 overflow-y-auto">
                  {burnLogs.length === 0 ? (
                    <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] py-4 text-center border border-dashed border-[#D4CEC2] dark:border-[#343830] rounded-lg">
                      Belum ada catatan pembakaran tersimpan.
                    </p>
                  ) : (
                    burnLogs.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[#F8F7F4] dark:bg-[#111210] border border-[#E2DDD3] dark:border-[#2A2D27]"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold">
                            {entry.candleName}{' '}
                            <span className="font-mono-tabular font-normal text-[#6B6A63] dark:text-[#A39E93]">
                              · {entry.durationMinutes} mnt · {entry.loggedAt}
                            </span>
                          </p>
                          <p className="text-xs text-[#57564F] dark:text-[#B5B0A6] mt-1">
                            {entry.note}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Hapus catatan"
                          onClick={() => onDeleteBurnLog(entry.id)}
                          className="p-1.5 text-[#6B6A63] hover:text-[#B91C1C] dark:text-[#A39E93] dark:hover:text-[#F87171] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/40 dark:bg-[#111210] transition-colors duration-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg font-semibold text-[#1A1B18] dark:text-[#F2EFE9]">
              KALA
            </span>
            <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Studio Lilin Aromaterapi Sirkadian · Dituang manual dalam batch
              kecil di Jakarta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#57564F] dark:text-[#B5B0A6]">
            <a href="#koleksi" className="hover:underline underline-offset-4">
              Koleksi
            </a>
            <a
              href="#atelier-studio"
              className="hover:underline underline-offset-4"
            >
              Racik Kustom
            </a>
            <button
              type="button"
              onClick={() => setAssetModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#B45309] dark:text-[#E59A3C] font-medium hover:underline underline-offset-4 cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>
                Katalog {ASSET_PROMPT_CATALOG.length} Gambar AI & Prompt
                (GitHub)
              </span>
            </button>
            <span className="text-[#6B6A63] dark:text-[#7F7B72]">
              © 2026 KALA Atelier
            </span>
          </div>
        </div>
      </footer>

      {/* Modal: 32 AI Image Assets & ChatGPT Prompts */}
      {assetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="asset-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-black/60 backdrop-blur-xs"
          onClick={() => setAssetModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] p-6 lg:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
              <div>
                <h2
                  id="asset-modal-title"
                  className="font-display text-2xl text-[#1A1B18] dark:text-[#F2EFE9]"
                >
                  Katalog {ASSET_PROMPT_CATALOG.length} Aset Gambar AI & Prompt
                  ChatGPT
                </h2>
                <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
                  Seluruh {ASSET_PROMPT_CATALOG.length} gambar di toko ini
                  dibuat dengan AI tanpa unduhan eksternal. Simpan gambar hasil
                  ChatGPT ke folder aset lokal lalu perbarui katalog aset
                  sebelum diunggah ke GitHub.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAssetModalOpen(false)}
                aria-label="Tutup katalog aset"
                className="w-9 h-9 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'Semua',
                'Hero Sirkadian',
                'Koleksi Produk',
                'Wadah Kustom',
                'Bahan Minyak Botani',
                'Jurnal Bakar & Atelier',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAssetCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                    assetCategoryFilter === cat
                      ? 'border-[#1A1B18] bg-[#1A1B18] text-[#F8F7F4] dark:border-[#E59A3C] dark:bg-[#E59A3C] dark:text-[#111210]'
                      : 'border-[#E2DDD3] dark:border-[#2A2D27] text-[#57564F] dark:text-[#B5B0A6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.key}
                  className="p-4 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/55 dark:bg-[#191B18] flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-24 aspect-[4/3] rounded-md overflow-hidden shrink-0 bg-[#EFECE6] dark:bg-[#141512]">
                    <ResilientImage
                      src={asset.src}
                      alt={asset.title}
                      fallbackTitle={asset.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold">
                        {asset.title}{' '}
                        <span className="font-mono-tabular text-[#6B6A63] dark:text-[#A39E93] font-normal">
                          · {asset.category} ({asset.aspectRatio} ·{' '}
                          {asset.filenameHint})
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPrompt(asset.key, asset.chatgptPrompt)
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border border-[#D4CEC2] dark:border-[#343830] hover:bg-[#F8F7F4] dark:hover:bg-[#2A2D27] cursor-pointer"
                      >
                        {copiedKey === asset.key ? (
                          <>
                            <Check className="w-3 h-3 text-[#15803D]" />
                            <span>Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#57564F] dark:text-[#B5B0A6] leading-relaxed">
                      {asset.chatgptPrompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
