import { ArrowUpRight, Clock, Moon, Sun } from 'lucide-react';
import { CIRCADIAN_PHASES, CANDLE_CATALOG, formatIDR } from '../data/candles';
import { HERO_IMAGES, PRODUCT_IMAGES } from '../data/assetCatalog';
import { CandleProduct, CircadianPhase } from '../types/kala';
import { ResilientImage } from './ResilientImage';

interface CircadianHeroProps {
  activePhase: CircadianPhase;
  onChangePhase: (phase: CircadianPhase) => void;
  onInspectCandle: (candle: CandleProduct) => void;
  onQuickAdd: (candle: CandleProduct) => void;
}

export function CircadianHero({
  activePhase,
  onChangePhase,
  onInspectCandle,
  onQuickAdd,
}: CircadianHeroProps) {
  const currentConfig =
    CIRCADIAN_PHASES.find((p) => p.id === activePhase) || CIRCADIAN_PHASES[0];
  const featuredCandle =
    CANDLE_CATALOG.find((c) => c.slug === currentConfig.featuredSlug) ||
    CANDLE_CATALOG[0];

  const heroImageSrc = HERO_IMAGES[activePhase];

  return (
    <section
      id="top"
      className="border-b border-[#E2DDD3] dark:border-[#2A2D27] transition-colors duration-200"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
        {/* Circadian Ritual Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
          <div className="flex items-center gap-2.5 text-xs font-medium text-[#6B6A63] dark:text-[#A39E93]">
            {currentConfig.isDark ? (
              <Moon className="w-3.5 h-3.5 text-[#E59A3C]" strokeWidth={1.75} />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#B45309]" strokeWidth={1.75} />
            )}
            <span>Ritme Sirkadian Aktif</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-[#1A1B18] dark:text-[#F2EFE9]">
              {currentConfig.timeRange}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Pilih Fase Waktu Sirkadian"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#EFECE6] dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] overflow-x-auto"
          >
            {CIRCADIAN_PHASES.map((phase) => {
              const isSelected = phase.id === activePhase;
              return (
                <button
                  key={phase.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onChangePhase(phase.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F8F7F4] text-[#1A1B18] shadow-xs dark:bg-[#2A2D27] dark:text-[#F2EFE9]'
                      : 'text-[#6B6A63] hover:text-[#1A1B18] dark:text-[#A39E93] dark:hover:text-[#F2EFE9]'
                  }`}
                >
                  {phase.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric 2-Column Split Hero (Balanced Height with items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wide text-[#B45309] dark:text-[#E59A3C]">
                {currentConfig.ritualFocus} · Atelier Jakarta
              </p>

              <h1
                style={{ textWrap: 'balance' }}
                className="font-display text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.12] font-normal tracking-tight text-[#1A1B18] dark:text-[#F2EFE9]"
              >
                {currentConfig.headline}
              </h1>

              <p className="text-[15px] leading-relaxed text-[#57564F] dark:text-[#B5B0A6] max-w-[52ch]">
                {currentConfig.lead}
              </p>
            </div>

            {/* Active Circadian Spotlight Card (Clean single surface, no nested boxes) */}
            <div className="pt-6 border-t border-[#E2DDD3] dark:border-[#2A2D27] space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#EFECE6] dark:bg-[#191B18]">
                    <ResilientImage
                      src={PRODUCT_IMAGES[featuredCandle.imageKey]}
                      alt={featuredCandle.name}
                      fallbackTitle={featuredCandle.name}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6A63] dark:text-[#A39E93]">
                      Rekomendasi Jam Ini · {featuredCandle.familyLabel}
                    </p>
                    <h2 className="font-display text-xl text-[#1A1B18] dark:text-[#F2EFE9] mt-0.5">
                      {featuredCandle.name}
                    </h2>
                    <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-0.5">
                      {featuredCandle.subtitle}
                    </p>
                  </div>
                </div>
                <span className="font-mono-tabular text-sm font-medium text-[#1A1B18] dark:text-[#F2EFE9] whitespace-nowrap shrink-0">
                  {formatIDR(featuredCandle.price180g)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onQuickAdd(featuredCandle)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#B45309] text-[#F8F7F4] hover:bg-[#92400E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Tambah Varian 180g ke Tas
                </button>
                <button
                  type="button"
                  onClick={() => onInspectCandle(featuredCandle)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg border border-[#D4CEC2] dark:border-[#343830] text-[#1A1B18] dark:text-[#F2EFE9] hover:bg-[#EFECE6] dark:hover:bg-[#191B18] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Buka Jurnal Bakar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Media Column (Matches Left Column Height via lg:h-full) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full min-h-[340px] rounded-xl overflow-hidden bg-[#EFECE6] dark:bg-[#191B18]">
              <ResilientImage
                src={heroImageSrc}
                alt={`Suasana lilin aromaterapi KALA pada fase ${currentConfig.label}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                fallbackTitle={`Ritual ${currentConfig.label}`}
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-[#F8F7F4]">
                <div>
                  <p className="text-xs text-[#E5E0D5]">
                    Fase {currentConfig.label} · Pencahayaan{' '}
                    {currentConfig.isDark ? 'Nokturnal' : 'Alami'}
                  </p>
                  <p className="font-display text-lg mt-0.5">
                    {featuredCandle.vesselMaterial}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E5E0D5]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredCandle.burnHours180g}–{featuredCandle.burnHours320g} Jam Bakar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Craftsmanship Strip Below Hero Split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 mt-10 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
          <div>
            <p className="font-mono-tabular text-lg font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
              100% Nabati
            </p>
            <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Paduan kedelai organik & lilin lebah tanpa parafin
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-lg font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
              45–82 Jam
            </p>
            <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Pembakaran lambat dengan kolam lelehan merata
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-lg font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
              Minyak Murni
            </p>
            <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Ekstrak botani Nusantara & resin tanpa ftalat
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-lg font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
              Wadah Ulang
            </p>
            <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1">
              Keramik stoneware & batu alam siap isi ulang
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
