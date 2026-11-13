export type CircadianPhase = 'fajar' | 'siang' | 'senja' | 'malam';

export type ScentFamily = 'botani' | 'kayu' | 'rempah' | 'mineral';

export type CandleWeight = '180g' | '320g';

export type ProductImageKey =
  | 'embun_fajar'
  | 'kabut_pinus'
  | 'hujan_tropis'
  | 'kertas_cedar'
  | 'teh_subuh'
  | 'batu_sunyi'
  | 'bara_senja'
  | 'kayu_teras'
  | 'jeruk_petang'
  | 'hening_malam'
  | 'rempah_pustaka'
  | 'garam_malam';

export interface ScentNoteLayer {
  ingredients: string;
  peakWindow: string;
  description: string;
}

export interface CandleProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  circadianPhase: CircadianPhase;
  phaseLabel: string;
  recommendedHours: string;
  scentFamily: ScentFamily;
  familyLabel: string;
  price180g: number;
  price320g: number;
  burnHours180g: number;
  burnHours320g: number;
  waxFormula: string;
  vesselMaterial: string;
  wickType: string;
  inStock: boolean;
  editorialTag?: string;
  imageKey: ProductImageKey;
  notes: {
    top: ScentNoteLayer;
    heart: ScentNoteLayer;
    base: ScentNoteLayer;
  };
}

export interface VesselOption {
  id: 'keramik' | 'obsidian' | 'travertine';
  name: string;
  finish: string;
  extraPrice: number;
  bgPreviewLight: string;
  bgPreviewDark: string;
  rimColor: string;
}

export interface WickOption {
  id: 'kapas' | 'kayu';
  name: string;
  detail: string;
  extraPrice: number;
  burnCharacter: string;
}

export interface BotanicalOilOption {
  id:
    | 'top-bergamot'
    | 'top-serai'
    | 'top-kapulaga'
    | 'heart-teh'
    | 'heart-melati'
    | 'heart-hinoki'
    | 'base-cendana'
    | 'base-vetiver'
    | 'base-kemenyan';
  name: string;
  origin: string;
  layer: 'top' | 'heart' | 'base';
  character: string;
}

export interface CustomCandleDraft {
  vesselId: VesselOption['id'];
  wickId: WickOption['id'];
  topOilId: BotanicalOilOption['id'];
  heartOilId: BotanicalOilOption['id'];
  baseOilId: BotanicalOilOption['id'];
  concentration: 'halus' | 'seimbang' | 'pekat';
  engravingText: string;
}

export interface CartItem {
  cartId: string;
  type: 'catalog' | 'custom';
  productId?: string;
  title: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  imageSrc?: string;
  customSummary?: {
    vesselName: string;
    wickName: string;
    notesLabel: string;
    concentrationLabel: string;
    engravingText: string;
  };
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'transfer' | 'cod';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}
