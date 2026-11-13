import { useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { CANDLE_CATALOG, formatIDR } from '../data/candles';
import { PRODUCT_IMAGES } from '../data/assetCatalog';
import { CandleProduct, CircadianPhase, ScentFamily } from '../types/kala';
import { ResilientImage } from './ResilientImage';

interface CollectionSectionProps {
  onSelectCandle: (candle: CandleProduct) => void;
  onQuickAdd: (candle: CandleProduct) => void;
}

const PHASE_FILTERS: { id: 'all' | CircadianPhase; label: string }[] = [
  { id: 'all', label: 'Semua Waktu' },
  { id: 'fajar', label: 'Fajar' },
  { id: 'siang', label: 'Tengah Hari' },
  { id: 'senja', label: 'Senja' },
  { id: 'malam', label: 'Malam' },
];

const FAMILY_FILTERS: { id: 'all' | ScentFamily; label: string }[] = [
  { id: 'all', label: 'Semua Aroma' },
  { id: 'botani', label: 'Botani' },
  { id: 'kayu', label: 'Kayu' },
  { id: 'rempah', label: 'Rempah' },
  { id: 'mineral', label: 'Mineral' },
];

export function CollectionSection({
  onSelectCandle,
  onQuickAdd,
}: CollectionSectionProps) {
  const [phaseFilter, setPhaseFilter] = useState<'all' | CircadianPhase>('all');
  const [familyFilter, setFamilyFilter] = useState<'all' | ScentFamily>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCandles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CANDLE_CATALOG.filter((item) => {
      const matchesPhase =
        phaseFilter === 'all' || item.circadianPhase === phaseFilter;
      const matchesFamily =
        familyFilter === 'all' || item.scentFamily === familyFilter;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.notes.top.ingredients.toLowerCase().includes(q) ||
        item.notes.heart.ingredients.toLowerCase().includes(q) ||
        item.notes.base.ingredients.toLowerCase().includes(q);
      return matchesPhase && matchesFamily && matchesQuery;
    });
  }, [phaseFilter, familyFilter, searchQuery]);

  const resetFilters = () => {
    setPhaseFilter('all');
    setFamilyFilter('all');
    setSearchQuery('');
  };

  return (
    <section
      id="koleksi"
      className="border-b border-[#E2DDD3] dark:border-[#2A2D27] transition-colors duration-200"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
        {/* Section Heading & Search Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
          <div>
            <p className="text-xs font-medium text-[#B45309] dark:text-[#E59A3C]">
              Koleksi Kurasi Sirkadian
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display text-3xl lg:text-4xl font-normal text-[#1A1B18] dark:text-[#F2EFE9] mt-2"
            >
              Dua belas komposisi untuk empat ritme hari.
            </h2>
          </div>

          <div className="w-full lg:w-80 relative">
            <Search
              className="w-4 h-4 text-[#6B6A63] dark:text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau bahan aroma..."
              aria-label="Cari produk lilin"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-[#EFECE6] dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] text-[#1A1B18] dark:text-[#F2EFE9] placeholder:text-[#6B6A63] dark:placeholder:text-[#7F7B72] focus:outline-none focus:border-[#B45309] dark:focus:border-[#E59A3C] transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
          <div
            role="tablist"
            aria-label="Saring berdasarkan fase waktu"
            className="flex items-center gap-1 p-1 rounded-lg bg-[#EFECE6] dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] overflow-x-auto"
          >
            {PHASE_FILTERS.map((f) => {
              const active = phaseFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPhaseFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#F8F7F4] text-[#1A1B18] shadow-xs dark:bg-[#2A2D27] dark:text-[#F2EFE9]'
                      : 'text-[#6B6A63] hover:text-[#1A1B18] dark:text-[#A39E93] dark:hover:text-[#F2EFE9]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B6A63] dark:text-[#A39E93] shrink-0" />
            <span className="text-xs text-[#6B6A63] dark:text-[#A39E93] shrink-0 mr-1">
              Keluarga:
            </span>
            <div className="flex items-center gap-1.5">
              {FAMILY_FILTERS.map((fam) => {
                const active = familyFilter === fam.id;
                return (
                  <button
                    key={fam.id}
                    type="button"
                    onClick={() => setFamilyFilter(fam.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'border-[#1A1B18] bg-[#1A1B18] text-[#F8F7F4] dark:border-[#E59A3C] dark:bg-[#E59A3C] dark:text-[#111210]'
                        : 'border-[#E2DDD3] dark:border-[#2A2D27] text-[#57564F] dark:text-[#B5B0A6] hover:border-[#B45309] dark:hover:border-[#E59A3C]'
                    }`}
                  >
                    {fam.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3-Column Uniform Product Grid */}
        {filteredCandles.length === 0 ? (
          <div className="py-16 text-center border border-[#E2DDD3] dark:border-[#2A2D27] rounded-xl bg-[#EFECE6]/50 dark:bg-[#191B18]/60">
            <p className="font-display text-xl text-[#1A1B18] dark:text-[#F2EFE9]">
              Tidak ada varian yang sesuai dengan saringan ini.
            </p>
            <p className="text-sm text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Coba hapus kata kunci atau atur ulang fase waktu sirkadian.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1A1B18] text-[#F8F7F4] dark:bg-[#E59A3C] dark:text-[#111210] cursor-pointer"
            >
              Atur Ulang Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-2">
            {filteredCandles.map((candle) => (
              <article
                key={candle.id}
                className="group flex flex-col rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#191B18] overflow-hidden transition-transform duration-200 ease-atelier hover:-translate-y-0.5"
              >
                {/* 4:3 Image occupying top ~70% */}
                <button
                  type="button"
                  onClick={() => onSelectCandle(candle)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] dark:bg-[#141512] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B45309]"
                >
                  <ResilientImage
                    src={PRODUCT_IMAGES[candle.imageKey]}
                    alt={`${candle.name} — ${candle.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-atelier group-hover:scale-[1.02]"
                    fallbackTitle={candle.name}
                  />
                </button>

                {/* Uniform Card Body */}
                <div className="flex-1 p-5 flex flex-col">
                  {/* Quiet 1-line unboxed metadata (Zero Pill Discipline) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#6B6A63] dark:text-[#A39E93]">
                    <span className="truncate">
                      {candle.phaseLabel} · {candle.familyLabel} ·{' '}
                      <span className="font-mono-tabular">
                        {candle.burnHours180g}j
                      </span>
                    </span>
                    {candle.editorialTag && (
                      <span className="text-[#B45309] dark:text-[#E59A3C] font-medium whitespace-nowrap shrink-0">
                        {candle.editorialTag}
                      </span>
                    )}
                  </div>

                  {/* Title & Price Baseline */}
                  <div className="flex items-baseline justify-between gap-3 mt-2">
                    <h3 className="font-display text-xl text-[#1A1B18] dark:text-[#F2EFE9]">
                      <button
                        type="button"
                        onClick={() => onSelectCandle(candle)}
                        className="text-left hover:underline underline-offset-4 cursor-pointer"
                      >
                        {candle.name}
                      </button>
                    </h3>
                    <span className="font-mono-tabular text-[15px] font-medium text-[#1A1B18] dark:text-[#F2EFE9] whitespace-nowrap shrink-0">
                      {formatIDR(candle.price180g)}
                    </span>
                  </div>

                  <p className="text-xs text-[#57564F] dark:text-[#B5B0A6] mt-1.5 line-clamp-1">
                    {candle.subtitle}
                  </p>

                  {/* Actions aligned to bottom */}
                  <div className="mt-auto pt-4 flex items-center gap-2.5 border-t border-[#E2DDD3] dark:border-[#2A2D27] mt-5">
                    <button
                      type="button"
                      onClick={() => onSelectCandle(candle)}
                      className="flex-1 py-2 px-3 text-xs font-medium rounded-lg border border-[#D4CEC2] dark:border-[#343830] text-[#1A1B18] dark:text-[#F2EFE9] hover:bg-[#EFECE6] dark:hover:bg-[#222520] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Detail & Jurnal Bakar
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(candle)}
                      aria-label={`Tambah ${candle.name} 180g ke tas belanja`}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3.5 text-xs font-semibold rounded-lg bg-[#1A1B18] text-[#F8F7F4] hover:bg-[#32342E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
