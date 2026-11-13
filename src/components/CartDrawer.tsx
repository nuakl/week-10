import { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatIDR } from '../data/candles';
import { CartItem, OrderRecord } from '../types/kala';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOrderConfirmed: (order: OrderRecord) => void;
}

const FREE_SHIPPING_THRESHOLD = 500000;
const BASE_SHIPPING_FEE = 25000;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderConfirmed,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cod'>(
    'transfer'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('cart');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee =
    items.length === 0 || qualifiesFreeShipping ? 0 : BASE_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShipProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Mohon lengkapi nama penerima, nomor WhatsApp, dan alamat.');
      return;
    }
    if (postalCode.trim().length < 5) {
      setErrorMsg('Kode pos harus terdiri dari 5 digit.');
      return;
    }
    setErrorMsg('');

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const order: OrderRecord = {
      orderNumber: `#KL-${randomCode}`,
      createdAt: new Date().toLocaleString('id-ID'),
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      shippingFee,
      total,
    };

    setConfirmedOrder(order);
    onOrderConfirmed(order);
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tas Belanja KALA"
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#F8F7F4] dark:bg-[#111210] text-[#1A1B18] dark:text-[#F2EFE9] border-l border-[#E2DDD3] dark:border-[#2A2D27] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E2DDD3] dark:border-[#2A2D27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#B45309] dark:text-[#E59A3C]" />
            <h2 className="font-display text-xl">
              {step === 'cart'
                ? 'Tas Belanja'
                : step === 'checkout'
                  ? 'Rincian Pengiriman'
                  : 'Pesanan Dikonfirmasi'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tas belanja"
            className="w-9 h-9 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] flex items-center justify-center hover:bg-[#EFECE6] dark:hover:bg-[#191B18] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Cart Items */}
        {step === 'cart' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3.5 bg-[#EFECE6]/70 dark:bg-[#191B18] border-b border-[#E2DDD3] dark:border-[#2A2D27]">
                <p className="text-xs text-[#57564F] dark:text-[#B5B0A6]">
                  {qualifiesFreeShipping ? (
                    'Anda berhak mendapatkan Gratis Ongkos Kirim.'
                  ) : (
                    <>
                      Tambah{' '}
                      <span className="font-mono-tabular font-semibold text-[#1A1B18] dark:text-[#F2EFE9]">
                        {formatIDR(remainingForFreeShipping)}
                      </span>{' '}
                      lagi untuk Gratis Ongkir.
                    </>
                  )}
                </p>
                <div className="h-1.5 w-full rounded-full bg-[#E2DDD3] dark:bg-[#2A2D27] overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#B45309] dark:bg-[#E59A3C] transition-all duration-300"
                    style={{ width: `${freeShipProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag
                    className="w-8 h-8 text-[#6B6A63] dark:text-[#A39E93] mb-3"
                    strokeWidth={1.5}
                  />
                  <p className="font-display text-lg">
                    Tas belanja Anda masih kosong.
                  </p>
                  <p className="text-xs text-[#6B6A63] dark:text-[#A39E93] mt-1 max-w-[28ch]">
                    Pilih lilin dari koleksi sirkadian atau racik komposisi
                    khusus Anda di Studio Atelier.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-3.5 pb-4 border-b border-[#E2DDD3] dark:border-[#2A2D27]"
                  >
                    {item.imageSrc ? (
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#EFECE6] dark:bg-[#191B18]">
                        <ResilientImage
                          src={item.imageSrc}
                          alt={item.title}
                          fallbackTitle={item.title}
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg shrink-0 bg-[#EFECE6] dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] flex items-center justify-center text-center p-2">
                        <span className="font-display text-[10px] leading-tight">
                          RACIKAN KUSTOM
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#6B6A63] dark:text-[#A39E93]">
                            {item.variantLabel}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label={`Hapus ${item.title}`}
                          className="p-1 text-[#6B6A63] hover:text-[#B91C1C] dark:text-[#A39E93] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.customSummary && (
                        <div className="mt-1.5 text-[11px] text-[#57564F] dark:text-[#B5B0A6] space-y-0.5">
                          <p className="truncate">
                            {item.customSummary.vesselName} ·{' '}
                            {item.customSummary.wickName}
                          </p>
                          <p className="truncate">
                            Aroma: {item.customSummary.notesLabel}
                          </p>
                          {item.customSummary.engravingText && (
                            <p className="font-mono-tabular">
                              Ukiran: &ldquo;{item.customSummary.engravingText}
                              &rdquo;
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#D4CEC2] dark:border-[#343830] rounded-md">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            aria-label="Kurangi jumlah"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#EFECE6] dark:hover:bg-[#191B18] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono-tabular text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            aria-label="Tambah jumlah"
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#EFECE6] dark:hover:bg-[#191B18] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono-tabular text-sm font-medium">
                          {formatIDR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/45 dark:bg-[#191B18]/65 space-y-3">
                <div className="flex justify-between text-xs text-[#57564F] dark:text-[#B5B0A6]">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular">
                    {formatIDR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#57564F] dark:text-[#B5B0A6]">
                  <span>Pengiriman Terlindungi</span>
                  <span className="font-mono-tabular">
                    {shippingFee === 0 ? 'Gratis' : formatIDR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="font-mono-tabular text-xl font-semibold">
                    {formatIDR(total)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 px-4 text-xs font-semibold rounded-lg bg-[#B45309] text-[#F8F7F4] hover:bg-[#92400E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors cursor-pointer"
                >
                  Lanjutkan ke Pengiriman
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Verification Form */}
        {step === 'checkout' && (
          <form
            onSubmit={handleConfirmOrder}
            className="flex-1 overflow-y-auto p-6 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              {errorMsg && (
                <p className="p-3 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#991B1B] dark:bg-[#7F1D1D]/40 dark:text-[#FCA5A5]">
                  {errorMsg}
                </p>
              )}

              <div>
                <label className="block text-xs font-medium mb-1">
                  Nama Lengkap Penerima
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Nadira Pratiwi"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/60 dark:bg-[#191B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full px-3.5 py-2.5 text-xs font-mono-tabular rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/60 dark:bg-[#191B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Alamat Pengiriman Lengkap
                </label>
                <textarea
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, kecamatan, kota"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/60 dark:bg-[#191B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Kode Pos
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={postalCode}
                  onChange={(e) =>
                    setPostalCode(e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="12190"
                  className="w-full px-3.5 py-2.5 text-xs font-mono-tabular rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] bg-[#EFECE6]/60 dark:bg-[#191B18]"
                />
              </div>

              <div>
                <span className="block text-xs font-medium mb-2">
                  Metode Pembayaran
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-lg border text-left text-xs font-medium cursor-pointer ${
                      paymentMethod === 'transfer'
                        ? 'border-[#B45309] bg-[#B45309]/10 dark:border-[#E59A3C]'
                        : 'border-[#E2DDD3] dark:border-[#2A2D27]'
                    }`}
                  >
                    Transfer Bank / QRIS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-left text-xs font-medium cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#B45309] bg-[#B45309]/10 dark:border-[#E59A3C]'
                        : 'border-[#E2DDD3] dark:border-[#2A2D27]'
                    }`}
                  >
                    Bayar di Tempat (COD)
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E2DDD3] dark:border-[#2A2D27]">
              <div className="flex justify-between items-baseline text-sm font-semibold">
                <span>Total Pembayaran</span>
                <span className="font-mono-tabular text-lg">
                  {formatIDR(total)}
                </span>
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 text-xs font-medium rounded-lg border border-[#D4CEC2] dark:border-[#343830] cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 text-xs font-semibold rounded-lg bg-[#B45309] text-[#F8F7F4] dark:bg-[#E59A3C] dark:text-[#111210] cursor-pointer"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Post-Order Confirmation Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-5 rounded-xl bg-[#EFECE6]/70 dark:bg-[#191B18] border border-[#E2DDD3] dark:border-[#2A2D27] space-y-2">
              <div className="flex items-center gap-2 text-[#15803D] dark:text-[#86EFAC]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-semibold">
                  Pesanan {confirmedOrder.orderNumber} Dikonfirmasi
                </span>
              </div>
              <p className="font-display text-xl">
                Terima kasih, {confirmedOrder.customerName}.
              </p>
              <p className="text-xs text-[#57564F] dark:text-[#B5B0A6]">
                Batch lilin Anda sedang disiapkan untuk pengiriman ke{' '}
                {confirmedOrder.address} ({confirmedOrder.postalCode}).
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <p className="font-semibold">Ringkasan Transaksi</p>
              {confirmedOrder.items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex justify-between gap-2 py-1.5 border-b border-[#E2DDD3] dark:border-[#2A2D27]"
                >
                  <span>
                    {item.title} ({item.variantLabel}) × {item.quantity}
                  </span>
                  <span className="font-mono-tabular">
                    {formatIDR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-semibold text-sm">
                <span>
                  Total ({confirmedOrder.paymentMethod === 'cod' ? 'COD' : 'Transfer'})
                </span>
                <span className="font-mono-tabular">
                  {formatIDR(confirmedOrder.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('cart');
                onClose();
              }}
              className="w-full py-3 text-xs font-semibold rounded-lg bg-[#1A1B18] text-[#F8F7F4] dark:bg-[#E59A3C] dark:text-[#111210] cursor-pointer"
            >
              Selesai & Kembali ke Toko
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
