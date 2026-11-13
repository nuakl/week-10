import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Flame, X } from 'lucide-react';
import { formatIDR } from '../data/candles';
import { PRODUCT_IMAGES } from '../data/assetCatalog';
import { CandleProduct, CandleWeight } from '../types/kala';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  candle: CandleProduct | null;
  onClose: () => void;
  onAddToCart: (candle: CandleProduct, weight: CandleWeight) => void;
}

export function ProductDetailModal({
  candle,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<CandleWeight>('180g');
  const [burnMinute, setBurnMinute] = useState<number>(60);

  useEffect(() => {
    setSelectedWeight('180g');
    setBurnMinute(60);
  }, [candle?.id]);

  useEffect(() => {
    if (!candle) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [candle, onClose]);

  const burnTelemetry = useMemo(() => {
    // Model pelepasan aroma dari menit 0 hingga 240 (4 jam)
    const t = burnMinute;
    const topIntensity = Math.max(
      12,
      Math.round(92 * Math.exp(-Math.pow((t - 22) / 52, 2)))
    );
    const heartIntensity = Math.max(
      18,
      Math.round(95 * Math.exp(-Math.pow((t - 115) / 72, 2)))
    );
    const baseIntensity = Math.min(
      96,
      Math.max(10, Math.round(14 + (t / 240) * 82))
    );

    const meltPoolMm = Math.min(78, Math.round(10 + (t / 150) * 68));
    const poolTempC = Math.min(62, Math.round(28 + (t / 140) * 34));

    let phaseGuidance =
      'Awal penyalaan: Top note menguap cepat membuka karakter udara ruangan.';
    if (t >= 45 && t < 135) {
      phaseGuidance =
        'Inti pembakaran: Heart note mendominasi ruang; kolam lilin melebar merata.';
    } else if (t >= 135 && t < 210) {
      phaseGuidance =
        'Kedalaman penuh: Resin dan kayu dasar menempel hangat pada suhu optimal.';
    } else if (t >= 210) {
      phaseGuidance =
        'Batas anjuran (3.5–4 jam): Padamkan sumbu dengan snuffer agar aroma tetap bersih.';
    }

    const hrs = Math.floor(t / 60);
    const mins = t % 60;
    const clockFormatted = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    return {
      topIntensity,
      heartIntensity,
      baseIntensity,
      meltPoolMm,
      poolTempC,
      phaseGuidance,
      clockFormatted,
    };
  }, [burnMinute]);

  if (!candle) return null;

  const activePrice =
    selectedWeight === '180g' ? candle.price180g : candle.price320g;
  const activeHours =
    selectedWeight === '180g' ? candle.burnHours180g : candle.burnHours320g;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] text-[#1A1B18] dark:text-[#F2EFE9]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#191B18] flex items-center justify-center hover:bg-[#EFECE6] dark:hover:bg-[#2A2D27] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Product Imagery & Material Specs */}
          <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/45 dark:bg-[#191B18]/45">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EFECE6] dark:bg-[#191B18]">
              <ResilientImage
                src={PRODUCT_IMAGES[candle.imageKey]}
                alt={candle.name}
                fallbackTitle={candle.name}
              />
            </div>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex justify-between gap-4 py-2 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Formula Lilin
                </span>
                <span className="font-medium text-right">
                  {candle.waxFormula}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-2 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Material Wadah
                </span>
                <span className="font-medium text-right">
                  {candle.vesselMaterial}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-2 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Jenis Sumbu
                </span>
                <span className="font-medium text-right">{candle.wickType}</span>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Jam Ritual Ideal
                </span>
                <span className="font-mono-tabular font-medium">
                  {candle.phaseLabel} ({candle.recommendedHours})
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module + 4-Hour Burn-Time Scrubber */}
          <div className="lg:col-span-7 p-6 lg:p-8 space-y-7">
            {/* Contiguous Purchase Module */}
            <div className="space-y-4 pb-6 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
              <p className="text-xs text-[#6B6A63] dark:text-[#A39E93]">
                {candle.phaseLabel} ({candle.recommendedHours}) ·{' '}
                {candle.familyLabel}
              </p>

              <div className="flex flex-wrap items-baseline justify-between gap-4 pr-10">
                <h2
                  id="pdp-title"
                  className="font-display text-3xl text-[#1A1B18] dark:text-[#F2EFE9]"
                >
                  {candle.name}
                </h2>
                <span className="font-mono-tabular text-2xl font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
                  {formatIDR(activePrice)}
                </span>
              </div>

              <p className="text-sm text-[#57564F] dark:text-[#B5B0A6]">
                {candle.subtitle}
              </p>

              {/* Variant Selector */}
              <div className="pt-2">
                <span className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-2">
                  Pilih Ukuran & Durasi Bakar
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(['180g', '320g'] as CandleWeight[]).map((weight) => {
                    const isSelected = selectedWeight === weight;
                    const price =
                      weight === '180g' ? candle.price180g : candle.price320g;
                    const hours =
                      weight === '180g'
                        ? candle.burnHours180g
                        : candle.burnHours320g;
                    return (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#B45309] bg-[#B45309]/8 dark:border-[#E59A3C] dark:bg-[#E59A3C]/12'
                            : 'border-[#E2DDD3] dark:border-[#2A2D27] hover:border-[#B45309]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-sm font-semibold">
                          <span className="font-mono-tabular">{weight}</span>
                          <span className="font-mono-tabular text-xs font-medium text-[#6B6A63] dark:text-[#A39E93]">
                            {hours} Jam
                          </span>
                        </div>
                        <p className="font-mono-tabular text-xs text-[#57564F] dark:text-[#B5B0A6] mt-1">
                          {formatIDR(price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15803D] dark:text-[#86EFAC]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tersedia · Siap Kirim ({activeHours} Jam Bakar)</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(candle, selectedWeight);
                    onClose();
                  }}
                  className="px-6 py-3 text-xs font-semibold rounded-lg bg-[#B45309] text-[#F8F7F4] hover:bg-[#92400E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors cursor-pointer"
                >
                  Tambah {selectedWeight} ke Tas Belanja
                </button>
              </div>
            </div>

            {/* Innovative Interactive 4-Hour Burn-Time & Scent Layering Scrubber */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#B45309] dark:text-[#E59A3C]" />
                  <h3 className="text-sm font-semibold">
                    Jurnal Waktu Bakar & Evolusi Lapisan Aroma
                  </h3>
                </div>
                <span className="font-mono-tabular text-sm font-medium text-[#B45309] dark:text-[#E59A3C]">
                  Jam ke-{burnTelemetry.clockFormatted}
                </span>
              </div>

              <p className="text-xs text-[#6B6A63] dark:text-[#A39E93]">
                Geser penanda waktu dari penyalaan awal hingga jam ke-4 untuk
                melihat bagaimana lapisan aroma berevolusi di ruangan Anda.
              </p>

              {/* Time Scrubber */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={240}
                  step={15}
                  value={burnMinute}
                  onChange={(e) => setBurnMinute(Number(e.target.value))}
                  aria-label="Simulasi menit pembakaran lilin"
                  className="w-full accent-[#B45309] dark:accent-[#E59A3C] cursor-pointer"
                />
                <div className="flex justify-between font-mono-tabular text-[11px] text-[#6B6A63] dark:text-[#A39E93] mt-1">
                  <span>00:00 (Nyala)</span>
                  <span>01:00</span>
                  <span>02:00</span>
                  <span>03:00</span>
                  <span>04:00 (Batas)</span>
                </div>
              </div>

              {/* Scent Pyramid Intensity Bars */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    label: 'Lapisan Atas (Top)',
                    layer: candle.notes.top,
                    value: burnTelemetry.topIntensity,
                  },
                  {
                    label: 'Lapisan Inti (Heart)',
                    layer: candle.notes.heart,
                    value: burnTelemetry.heartIntensity,
                  },
                  {
                    label: 'Lapisan Dasar (Base)',
                    layer: candle.notes.base,
                    value: burnTelemetry.baseIntensity,
                  },
                ].map((row) => (
                  <div key={row.label} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="font-medium">
                        {row.label}:{' '}
                        <span className="text-[#57564F] dark:text-[#B5B0A6] font-normal">
                          {row.layer.ingredients}
                        </span>
                      </span>
                      <span className="font-mono-tabular text-[#6B6A63] dark:text-[#A39E93] shrink-0">
                        {row.value}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#EFECE6] dark:bg-[#222520] overflow-hidden">
                      <div
                        className="h-full bg-[#B45309] dark:bg-[#E59A3C] transition-all duration-200"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Melt Pool Telemetry & Guidance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-[#EFECE6]/70 dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27]">
                  <span className="text-[#6B6A63] dark:text-[#A39E93] block">
                    Diameter Kolam Lilin
                  </span>
                  <span className="font-mono-tabular text-sm font-semibold mt-0.5 block">
                    {burnTelemetry.meltPoolMm} mm
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#EFECE6]/70 dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27]">
                  <span className="text-[#6B6A63] dark:text-[#A39E93] block">
                    Suhu Permukaan Lilin
                  </span>
                  <span className="font-mono-tabular text-sm font-semibold mt-0.5 block">
                    {burnTelemetry.poolTempC} °C
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#EFECE6]/70 dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] sm:col-span-1">
                  <span className="text-[#6B6A63] dark:text-[#A39E93] block">
                    Catatan Fase
                  </span>
                  <span className="font-medium mt-0.5 block leading-snug">
                    {burnTelemetry.phaseGuidance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
