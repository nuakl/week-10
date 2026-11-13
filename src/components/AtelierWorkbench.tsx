import { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { OIL_IMAGES, VESSEL_IMAGES } from '../data/assetCatalog';
import {
  BOTANICAL_OILS,
  CUSTOM_BASE_PRICE,
  VESSEL_OPTIONS,
  WICK_OPTIONS,
  formatIDR,
} from '../data/candles';
import { CustomCandleDraft } from '../types/kala';
import { ResilientImage } from './ResilientImage';

interface AtelierWorkbenchProps {
  onAddCustomCandle: (draft: CustomCandleDraft, price: number) => void;
}

export function AtelierWorkbench({
  onAddCustomCandle,
}: AtelierWorkbenchProps) {
  const [draft, setDraft] = useState<CustomCandleDraft>({
    vesselId: 'keramik',
    wickId: 'kapas',
    topOilId: 'top-bergamot',
    heartOilId: 'heart-teh',
    baseOilId: 'base-cendana',
    concentration: 'seimbang',
    engravingText: 'RUANG TENANG',
  });

  const selectedVessel =
    VESSEL_OPTIONS.find((v) => v.id === draft.vesselId) || VESSEL_OPTIONS[0];
  const selectedWick =
    WICK_OPTIONS.find((w) => w.id === draft.wickId) || WICK_OPTIONS[0];
  const topOil =
    BOTANICAL_OILS.find((o) => o.id === draft.topOilId) || BOTANICAL_OILS[0];
  const heartOil =
    BOTANICAL_OILS.find((o) => o.id === draft.heartOilId) || BOTANICAL_OILS[3];
  const baseOil =
    BOTANICAL_OILS.find((o) => o.id === draft.baseOilId) || BOTANICAL_OILS[6];

  const concentrationExtra =
    draft.concentration === 'pekat'
      ? 35000
      : draft.concentration === 'seimbang'
        ? 15000
        : 0;
  const customPrice =
    CUSTOM_BASE_PRICE +
    selectedVessel.extraPrice +
    selectedWick.extraPrice +
    concentrationExtra;

  const handleEngravingChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9 .&'-]/g, '').slice(0, 24);
    setDraft((prev) => ({ ...prev, engravingText: cleaned }));
  };

  return (
    <section
      id="atelier-studio"
      className="border-b border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/45 dark:bg-[#161714] transition-colors duration-200"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-[#E2DDD3] dark:border-[#2A2D27]">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B45309] dark:text-[#E59A3C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Racik Lilin Kustom</span>
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display text-3xl lg:text-4xl font-normal text-[#1A1B18] dark:text-[#F2EFE9] mt-2"
            >
              Susun wadah, sumbu, dan tiga lapis minyak botani pribadi.
            </h2>
          </div>
          <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] max-w-[38ch]">
            Dituang khusus per pesanan dalam batch tunggal 220g menggunakan
            ekstrak botani murni dan ukiran label pilihan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          {/* Left: Composer Controls */}
          <div className="lg:col-span-7 p-6 lg:p-8 rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#191B18] space-y-8">
            {/* Step 1: Vessel with Real AI Studio Photos */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                01. Pilih Material Wadah (220g)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {VESSEL_OPTIONS.map((vessel) => {
                  const active = draft.vesselId === vessel.id;
                  return (
                    <button
                      key={vessel.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({ ...prev, vesselId: vessel.id }))
                      }
                      className={`group rounded-lg border overflow-hidden text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-[#B45309] bg-[#B45309]/8 dark:border-[#E59A3C] dark:bg-[#E59A3C]/12'
                          : 'border-[#E2DDD3] dark:border-[#2A2D27] hover:border-[#B45309]/50'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] dark:bg-[#141512]">
                        <ResilientImage
                          src={VESSEL_IMAGES[vessel.id]}
                          alt={vessel.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          fallbackTitle={vessel.name}
                        />
                      </div>
                      <div className="p-3">
                        <span className="block text-xs font-semibold">
                          {vessel.name}
                        </span>
                        <span className="block text-[11px] text-[#6B6A63] dark:text-[#A39E93] mt-0.5">
                          {vessel.finish}
                        </span>
                        <span className="block font-mono-tabular text-xs font-medium mt-1.5 text-[#B45309] dark:text-[#E59A3C]">
                          {vessel.extraPrice === 0
                            ? 'Termasuk'
                            : `+${formatIDR(vessel.extraPrice)}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wick */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                02. Pilih Karakter Sumbu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WICK_OPTIONS.map((wick) => {
                  const active = draft.wickId === wick.id;
                  return (
                    <button
                      key={wick.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({ ...prev, wickId: wick.id }))
                      }
                      className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-[#B45309] bg-[#B45309]/8 dark:border-[#E59A3C] dark:bg-[#E59A3C]/12'
                          : 'border-[#E2DDD3] dark:border-[#2A2D27] hover:border-[#B45309]/50'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold">
                          {wick.name}
                        </span>
                        <span className="font-mono-tabular text-xs font-medium shrink-0">
                          {wick.extraPrice === 0
                            ? 'Termasuk'
                            : `+${formatIDR(wick.extraPrice)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6A63] dark:text-[#A39E93] mt-1">
                        {wick.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: 3 Botanical Layers with Real 1:1 Macro AI Photos */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold">
                03. Susun Piramida Lapisan Aroma
              </h3>

              {(
                [
                  {
                    layer: 'top' as const,
                    title: 'Lapisan Atas (00:00 – 00:45)',
                    key: 'topOilId' as const,
                  },
                  {
                    layer: 'heart' as const,
                    title: 'Lapisan Inti (00:45 – 02:30)',
                    key: 'heartOilId' as const,
                  },
                  {
                    layer: 'base' as const,
                    title: 'Lapisan Dasar (02:30 – 04:00)',
                    key: 'baseOilId' as const,
                  },
                ] as const
              ).map((group) => (
                <div key={group.layer} className="space-y-2">
                  <span className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93]">
                    {group.title}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {BOTANICAL_OILS.filter((o) => o.layer === group.layer).map(
                      (oil) => {
                        const active = draft[group.key] === oil.id;
                        return (
                          <button
                            key={oil.id}
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                [group.key]: oil.id,
                              }))
                            }
                            className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                              active
                                ? 'border-[#B45309] bg-[#B45309]/8 dark:border-[#E59A3C] dark:bg-[#E59A3C]/12'
                                : 'border-[#E2DDD3] dark:border-[#2A2D27] hover:border-[#B45309]/50'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-[#EFECE6] dark:bg-[#141512]">
                              <ResilientImage
                                src={OIL_IMAGES[oil.id]}
                                alt={oil.name}
                                fallbackTitle={oil.name}
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-xs font-semibold truncate">
                                {oil.name}
                              </span>
                              <span className="block text-[11px] text-[#6B6A63] dark:text-[#A39E93] truncate">
                                {oil.origin}
                              </span>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 4 & 5: Intensity & Engraving */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
              <div>
                <span className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-2">
                  04. Konsentrasi Minyak Esensial
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'halus', label: 'Halus (8%)' },
                      { id: 'seimbang', label: 'Seimbang (10%)' },
                      { id: 'pekat', label: 'Pekat (12%)' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          concentration: item.id,
                        }))
                      }
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        draft.concentration === item.id
                          ? 'border-[#1A1B18] bg-[#1A1B18] text-[#F8F7F4] dark:border-[#E59A3C] dark:bg-[#E59A3C] dark:text-[#111210]'
                          : 'border-[#E2DDD3] dark:border-[#2A2D27]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="engraving-input"
                  className="block text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-2"
                >
                  05. Ukiran Label Pribadi (Maks. 24 Karakter)
                </label>
                <input
                  id="engraving-input"
                  type="text"
                  maxLength={24}
                  value={draft.engravingText}
                  onChange={(e) => handleEngravingChange(e.target.value)}
                  placeholder="Contoh: RUANG TENANG"
                  className="w-full px-3.5 py-2 text-xs font-medium rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/60 dark:bg-[#141512] text-[#1A1B18] dark:text-[#F2EFE9] focus:outline-none focus:border-[#B45309] dark:focus:border-[#E59A3C]"
                />
              </div>
            </div>
          </div>

          {/* Right: Live Vessel AI Preview & Checkout Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 p-6 lg:p-8 rounded-xl border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#191B18] flex flex-col justify-between space-y-6">
            {/* Real AI Vessel Photograph + Live Custom Label Overlay */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#EFECE6] dark:bg-[#141512]">
              <ResilientImage
                src={VESSEL_IMAGES[draft.vesselId]}
                alt={`Pratinjau wadah ${selectedVessel.name}`}
                fallbackTitle={selectedVessel.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-[#F8F7F4]">
                <div className="min-w-0">
                  <p className="text-[11px] text-[#E5E0D5]">
                    Pratinjau Wadah · {selectedVessel.name}
                  </p>
                  <p className="font-mono-tabular text-sm font-semibold tracking-wider mt-0.5 truncate">
                    {draft.engravingText.trim() || 'TANPA UKIRAN'}
                  </p>
                </div>
                <span className="text-[11px] font-mono-tabular text-[#E5E0D5] shrink-0">
                  220g
                </span>
              </div>
            </div>

            {/* Selected 3 Botanical Oil Thumbnails */}
            <div>
              <p className="text-xs font-medium text-[#6B6A63] dark:text-[#A39E93] mb-2.5">
                Komposisi Bahan Terpilih
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: 'Atas', oil: topOil },
                  { label: 'Inti', oil: heartOil },
                  { label: 'Dasar', oil: baseOil },
                ].map((slot) => (
                  <div
                    key={slot.label}
                    className="p-2 rounded-lg bg-[#EFECE6]/70 dark:bg-[#141512] border border-[#E2DDD3] dark:border-[#2A2D27]"
                  >
                    <div className="aspect-square w-full rounded-md overflow-hidden mb-2">
                      <ResilientImage
                        src={OIL_IMAGES[slot.oil.id]}
                        alt={slot.oil.name}
                        fallbackTitle={slot.oil.name}
                      />
                    </div>
                    <p className="text-[10px] text-[#6B6A63] dark:text-[#A39E93]">
                      {slot.label}
                    </p>
                    <p className="text-[11px] font-semibold truncate">
                      {slot.oil.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula Breakdown & Price */}
            <div className="space-y-3 text-xs pt-2 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
              <div className="flex justify-between gap-4">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Sumbu Pilihan
                </span>
                <span className="font-medium text-right">
                  {selectedWick.name}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#6B6A63] dark:text-[#A39E93]">
                  Estimasi Bakar
                </span>
                <span className="font-medium text-right">
                  {selectedWick.burnCharacter}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-3 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
                <span className="text-sm font-semibold">
                  Total Racikan Kustom
                </span>
                <span className="font-mono-tabular text-2xl font-medium text-[#1A1B18] dark:text-[#F2EFE9]">
                  {formatIDR(customPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddCustomCandle(draft, customPrice)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold rounded-lg bg-[#B45309] text-[#F8F7F4] hover:bg-[#92400E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>Masukkan Racikan ke Tas Belanja</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
