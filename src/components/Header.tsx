import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4]/95 dark:bg-[#111210]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#1A1B18] dark:text-[#F2EFE9] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#E59A3C] rounded-sm"
        >
          KALA
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57564F] dark:text-[#B5B0A6]"
        >
          <a
            href="#koleksi"
            className="hover:text-[#1A1B18] dark:hover:text-[#F2EFE9] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Koleksi
          </a>
          <a
            href="#atelier-studio"
            className="hover:text-[#1A1B18] dark:hover:text-[#F2EFE9] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Racik Kustom
          </a>
          <a
            href="#jurnal-bakar"
            className="hover:text-[#1A1B18] dark:hover:text-[#F2EFE9] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Jurnal Bakar
          </a>
          <a
            href="#tentang-tuang"
            className="hover:text-[#1A1B18] dark:hover:text-[#F2EFE9] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Atelier
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1A1B18] text-[#F8F7F4] hover:bg-[#32342E] dark:bg-[#E59A3C] dark:text-[#111210] dark:hover:bg-[#F0AD57] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] dark:focus-visible:ring-[#E59A3C]"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Tas Belanja</span>
            <span className="font-mono-tabular">({cartCount})</span>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2DDD3] dark:border-[#2A2D27] text-[#1A1B18] dark:text-[#F2EFE9] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Nav */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Seluler"
          className="md:hidden border-t border-[#E2DDD3] dark:border-[#2A2D27] bg-[#F8F7F4] dark:bg-[#111210] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[#1A1B18] dark:text-[#F2EFE9]"
        >
          <a
            href="#koleksi"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5"
          >
            Koleksi
          </a>
          <a
            href="#atelier-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5"
          >
            Racik Kustom
          </a>
          <a
            href="#jurnal-bakar"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5"
          >
            Jurnal Bakar
          </a>
          <a
            href="#tentang-tuang"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5"
          >
            Atelier
          </a>
        </nav>
      )}
    </header>
  );
}
