import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { AtelierWorkbench } from './components/AtelierWorkbench';
import {
  BurnJournalAndFooter,
  BurnLogEntry,
} from './components/BurnJournalAndFooter';
import { CartDrawer } from './components/CartDrawer';
import { CircadianHero } from './components/CircadianHero';
import { CollectionSection } from './components/CollectionSection';
import { Header } from './components/Header';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PRODUCT_IMAGES } from './data/assetCatalog';
import {
  BOTANICAL_OILS,
  CIRCADIAN_PHASES,
  VESSEL_OPTIONS,
  WICK_OPTIONS,
} from './data/candles';
import {
  CandleProduct,
  CandleWeight,
  CartItem,
  CircadianPhase,
  CustomCandleDraft,
  OrderRecord,
} from './types/kala';

const STORAGE_KEYS = {
  cart: 'kala_cart_v1',
  phase: 'kala_circadian_phase_v1',
  burnLogs: 'kala_burn_logs_v1',
  orders: 'kala_orders_v1',
};

const INITIAL_BURN_LOGS: BurnLogEntry[] = [
  {
    id: 'log-seed-1',
    candleName: 'Embun Fajar',
    durationMinutes: 120,
    note: 'Menit ke-90 aroma daun teh putih terasa paling jernih saat ruang kerja terkena cahaya pagi.',
    loggedAt: '08 Nov 2026',
  },
];

export default function App() {
  const [activePhase, setActivePhase] = useState<CircadianPhase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.phase) as CircadianPhase;
      if (saved && CIRCADIAN_PHASES.some((p) => p.id === saved)) return saved;
    } catch {
      // ignore storage failure
    }
    return 'fajar';
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.cart);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [burnLogs, setBurnLogs] = useState<BurnLogEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.burnLogs);
      return raw ? JSON.parse(raw) : INITIAL_BURN_LOGS;
    } catch {
      return INITIAL_BURN_LOGS;
    }
  });

  const [selectedCandle, setSelectedCandle] = useState<CandleProduct | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Circadian Dark/Light theme class on <html>
  useEffect(() => {
    const phaseConfig = CIRCADIAN_PHASES.find((p) => p.id === activePhase);
    const shouldBeDark = phaseConfig?.isDark ?? false;
    document.documentElement.classList.toggle('dark', shouldBeDark);
    try {
      localStorage.setItem(STORAGE_KEYS.phase, activePhase);
    } catch {
      // ignore
    }
  }, [activePhase]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.burnLogs, JSON.stringify(burnLogs));
    } catch {
      // ignore
    }
  }, [burnLogs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleAddCatalogCandle = (
    candle: CandleProduct,
    weight: CandleWeight = '180g'
  ) => {
    const unitPrice = weight === '180g' ? candle.price180g : candle.price320g;
    const cartId = `${candle.id}-${weight}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          type: 'catalog',
          productId: candle.id,
          title: candle.name,
          variantLabel: `${weight} · ${candle.phaseLabel}`,
          unitPrice,
          quantity: 1,
          imageSrc: PRODUCT_IMAGES[candle.imageKey],
        },
      ];
    });

    showToast(`${candle.name} (${weight}) ditambahkan ke Tas Belanja.`);
  };

  const handleAddCustomCandle = (draft: CustomCandleDraft, price: number) => {
    const vessel =
      VESSEL_OPTIONS.find((v) => v.id === draft.vesselId) || VESSEL_OPTIONS[0];
    const wick =
      WICK_OPTIONS.find((w) => w.id === draft.wickId) || WICK_OPTIONS[0];
    const top = BOTANICAL_OILS.find((o) => o.id === draft.topOilId);
    const heart = BOTANICAL_OILS.find((o) => o.id === draft.heartOilId);
    const base = BOTANICAL_OILS.find((o) => o.id === draft.baseOilId);

    const engraving = draft.engravingText.trim() || 'TANPA UKIRAN';
    const concLabel =
      draft.concentration === 'pekat'
        ? 'Pekat 12%'
        : draft.concentration === 'seimbang'
          ? 'Seimbang 10%'
          : 'Halus 8%';

    const notesLabel = `${top?.name || ''} · ${heart?.name || ''} · ${base?.name || ''}`;
    const customId = `custom-${draft.vesselId}-${draft.wickId}-${draft.topOilId}-${draft.heartOilId}-${draft.baseOilId}-${draft.concentration}-${engraving}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === customId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === customId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartId: customId,
          type: 'custom',
          title: `Racikan Kustom — ${engraving}`,
          variantLabel: `220g · ${concLabel}`,
          unitPrice: price,
          quantity: 1,
          customSummary: {
            vesselName: vessel.name,
            wickName: wick.name,
            notesLabel,
            concentrationLabel: concLabel,
            engravingText: engraving,
          },
        },
      ];
    });

    showToast(`Racikan "${engraving}" ditambahkan ke Tas Belanja.`);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderConfirmed = (order: OrderRecord) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.orders);
      const existing: OrderRecord[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(
        STORAGE_KEYS.orders,
        JSON.stringify([order, ...existing].slice(0, 10))
      );
    } catch {
      // ignore
    }
  };

  const handleAddBurnLog = (entry: Omit<BurnLogEntry, 'id' | 'loggedAt'>) => {
    const nowLabel = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const newEntry: BurnLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      loggedAt: nowLabel,
    };
    setBurnLogs((prev) => [newEntry, ...prev]);
    showToast('Catatan sesi pembakaran disimpan.');
  };

  const handleDeleteBurnLog = (id: string) => {
    setBurnLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1B18] dark:bg-[#111210] dark:text-[#F2EFE9] transition-colors duration-200">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <CircadianHero
          activePhase={activePhase}
          onChangePhase={setActivePhase}
          onInspectCandle={(candle) => setSelectedCandle(candle)}
          onQuickAdd={(candle) => handleAddCatalogCandle(candle, '180g')}
        />

        <CollectionSection
          onSelectCandle={(candle) => setSelectedCandle(candle)}
          onQuickAdd={(candle) => handleAddCatalogCandle(candle, '180g')}
        />

        <AtelierWorkbench onAddCustomCandle={handleAddCustomCandle} />

        <BurnJournalAndFooter
          burnLogs={burnLogs}
          onAddBurnLog={handleAddBurnLog}
          onDeleteBurnLog={handleDeleteBurnLog}
        />
      </main>

      <ProductDetailModal
        candle={selectedCandle}
        onClose={() => setSelectedCandle(null)}
        onAddToCart={handleAddCatalogCandle}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Non-intrusive Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#1A1B18] text-[#F8F7F4] dark:bg-[#F2EFE9] dark:text-[#111210] shadow-md text-xs font-medium"
        >
          <Check className="w-4 h-4 text-[#E59A3C] dark:text-[#B45309] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="underline underline-offset-2 font-semibold cursor-pointer"
          >
            Lihat Tas
          </button>
        </div>
      )}
    </div>
  );
}
