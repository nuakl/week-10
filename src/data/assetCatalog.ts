import heroFajarImg from '../assets/images/hero_circadian_daylight_1794535989397.jpg';
import heroSiangImg from '../assets/images/hero_circadian_siang_1794536687513.jpg';
import heroSenjaImg from '../assets/images/hero_circadian_senja_1794536689619.jpg';
import heroMalamImg from '../assets/images/hero_circadian_nocturnal_1794535988814.jpg';

import embunFajarImg from '../assets/images/candle_embun_fajar_1794535989824.jpg';
import kabutPinusImg from '../assets/images/candle_kabut_pinus_1794536689735.jpg';
import hujanTropisImg from '../assets/images/candle_hujan_tropis_1794535990969.jpg';
import kertasCedarImg from '../assets/images/candle_kertas_cedar_1794535990833.jpg';
import tehSubuhImg from '../assets/images/candle_teh_subuh_1794536689766.jpg';
import batuSunyiImg from '../assets/images/candle_batu_sunyi_1794536689701.jpg';
import baraSenjaImg from '../assets/images/candle_bara_senja_1794535991578.jpg';
import kayuTerasImg from '../assets/images/candle_kayu_teras_1794536689941.jpg';
import jerukPetangImg from '../assets/images/candle_jeruk_petang_1794536690666.jpg';
import heningMalamImg from '../assets/images/candle_hening_malam_1794535991273.jpg';
import rempahPustakaImg from '../assets/images/candle_rempah_pustaka_1794535991952.jpg';
import garamMalamImg from '../assets/images/candle_garam_malam_1794536691326.jpg';

import vesselKeramikImg from '../assets/images/vessel_keramik_alabaster_1794536691751.jpg';
import vesselObsidianImg from '../assets/images/vessel_kaca_obsidian_1794536691838.jpg';
import vesselTravertineImg from '../assets/images/vessel_batu_travertine_1794536692027.jpg';

import oilBergamotImg from '../assets/images/oil_bergamot_hijau_1794536692592.jpg';
import oilSeraiImg from '../assets/images/oil_serai_jawa_1794536692414.jpg';
import oilKapulagaImg from '../assets/images/oil_kapulaga_hijau_1794536693699.jpg';
import oilTehImg from '../assets/images/oil_teh_putih_1794536693759.jpg';
import oilMelatiImg from '../assets/images/oil_melati_gambir_1794536693737.jpg';
import oilHinokiImg from '../assets/images/oil_kayu_hinoki_1794536694711.jpg';
import oilCendanaImg from '../assets/images/oil_cendana_timor_1794536694679.jpg';
import oilVetiverImg from '../assets/images/oil_vetiver_garut_1794536695117.jpg';
import oilKemenyanImg from '../assets/images/oil_resin_kemenyan_1794536695670.jpg';

import ritualPangkasImg from '../assets/images/ritual_pangkas_sumbu_1794536696006.jpg';
import ritualKolamImg from '../assets/images/ritual_kolam_lilin_1794536696505.jpg';
import ritualSnufferImg from '../assets/images/ritual_snuffer_padam_1794536696739.jpg';
import ritualAtelierImg from '../assets/images/ritual_atelier_tuang_1794536697882.jpg';

import { BotanicalOilOption, CircadianPhase, ProductImageKey, VesselOption } from '../types/kala';

export interface AssetPromptEntry {
  key: string;
  category: 'Hero Sirkadian' | 'Koleksi Produk' | 'Wadah Kustom' | 'Bahan Minyak Botani' | 'Jurnal Bakar & Atelier';
  title: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
  src: string;
  filenameHint: string;
  chatgptPrompt: string;
}

export const HERO_IMAGES: Record<CircadianPhase, string> = {
  fajar: heroFajarImg,
  siang: heroSiangImg,
  senja: heroSenjaImg,
  malam: heroMalamImg,
};

export const PRODUCT_IMAGES: Record<ProductImageKey, string> = {
  embun_fajar: embunFajarImg,
  kabut_pinus: kabutPinusImg,
  hujan_tropis: hujanTropisImg,
  kertas_cedar: kertasCedarImg,
  teh_subuh: tehSubuhImg,
  batu_sunyi: batuSunyiImg,
  bara_senja: baraSenjaImg,
  kayu_teras: kayuTerasImg,
  jeruk_petang: jerukPetangImg,
  hening_malam: heningMalamImg,
  rempah_pustaka: rempahPustakaImg,
  garam_malam: garamMalamImg,
};

export const VESSEL_IMAGES: Record<VesselOption['id'], string> = {
  keramik: vesselKeramikImg,
  obsidian: vesselObsidianImg,
  travertine: vesselTravertineImg,
};

export const OIL_IMAGES: Record<BotanicalOilOption['id'], string> = {
  'top-bergamot': oilBergamotImg,
  'top-serai': oilSeraiImg,
  'top-kapulaga': oilKapulagaImg,
  'heart-teh': oilTehImg,
  'heart-melati': oilMelatiImg,
  'heart-hinoki': oilHinokiImg,
  'base-cendana': oilCendanaImg,
  'base-vetiver': oilVetiverImg,
  'base-kemenyan': oilKemenyanImg,
};

export const RITUAL_IMAGES = {
  pangkas_sumbu: ritualPangkasImg,
  kolam_lilin: ritualKolamImg,
  snuffer_padam: ritualSnufferImg,
  atelier_tuang: ritualAtelierImg,
} as const;

/**
 * 32 Aset Gambar AI terpusat untuk memudahkan penggantian gambar lokal
 * buatan ChatGPT sebelum proyek diunggah ke GitHub.
 */
export const ASSET_PROMPT_CATALOG: AssetPromptEntry[] = [
  // 4 Hero Circadian
  {
    key: 'hero_fajar',
    category: 'Hero Sirkadian',
    title: 'Hero Fase Fajar',
    aspectRatio: '16:9',
    src: heroFajarImg,
    filenameHint: 'hero_circadian_daylight.jpg',
    chatgptPrompt:
      'Architectural luxury still life photography of an unglazed pale stoneware aromatherapy candle on a raw travertine stone plinth bathed in crisp morning sunlight, soft botanical eucalyptus shadow on neutral alabaster wall, Leica 50mm, 8k.',
  },
  {
    key: 'hero_siang',
    category: 'Hero Sirkadian',
    title: 'Hero Fase Tengah Hari',
    aspectRatio: '16:9',
    src: heroSiangImg,
    filenameHint: 'hero_circadian_siang.jpg',
    chatgptPrompt:
      'Architectural luxury still life photography of a fluted white stoneware aromatherapy candle on a sunlit travertine work desk beside linen drapery and architectural glass shadows, crisp bright midday light, Leica 50mm, 8k.',
  },
  {
    key: 'hero_senja',
    category: 'Hero Sirkadian',
    title: 'Hero Fase Senja',
    aspectRatio: '16:9',
    src: heroSenjaImg,
    filenameHint: 'hero_circadian_senja.jpg',
    chatgptPrompt:
      'Atmospheric luxury dusk still life photography of a smoked amber glass aromatherapy candle glowing softly on a warm stone console table, long golden sunset shadows across textured plaster wall, Leica 50mm, 8k.',
  },
  {
    key: 'hero_malam',
    category: 'Hero Sirkadian',
    title: 'Hero Fase Malam',
    aspectRatio: '16:9',
    src: heroMalamImg,
    filenameHint: 'hero_circadian_nocturnal.jpg',
    chatgptPrompt:
      'Atmospheric luxury nocturnal still life photography of a matte obsidian glass aromatherapy candle lit with a steady golden amber flame on a dark honed basalt stone slab, warm rim light, deep quiet shadows, Leica 50mm, 8k.',
  },

  // 12 Products
  {
    key: 'embun_fajar',
    category: 'Koleksi Produk',
    title: 'Embun Fajar',
    aspectRatio: '4:3',
    src: embunFajarImg,
    filenameHint: 'candle_embun_fajar.jpg',
    chatgptPrompt:
      'Studio product photography of a minimalist pale celadon stoneware aromatherapy candle with cream beeswax on a clean neutral travertine surface, soft diffused morning side lighting, small dried bergamot peel beside the jar, 8k.',
  },
  {
    key: 'kabut_pinus',
    category: 'Koleksi Produk',
    title: 'Kabut Pinus',
    aspectRatio: '4:3',
    src: kabutPinusImg,
    filenameHint: 'candle_kabut_pinus.jpg',
    chatgptPrompt:
      'Studio product photography of a matte sage-grey stoneware aromatherapy candle on cool travertine stone, soft early morning diffused window light, fresh pine needles and crushed juniper berries beside the jar, 8k.',
  },
  {
    key: 'hujan_tropis',
    category: 'Koleksi Produk',
    title: 'Hujan Tropis',
    aspectRatio: '4:3',
    src: hujanTropisImg,
    filenameHint: 'candle_hujan_tropis.jpg',
    chatgptPrompt:
      'Studio product photography of a frosted mineral glass aromatherapy candle with ivory wax on a clean neutral grey stone slab, soft cool morning window light, fresh green vetiver blade and water droplets on stone, 8k.',
  },
  {
    key: 'kertas_cedar',
    category: 'Koleksi Produk',
    title: 'Kertas & Cedar',
    aspectRatio: '4:3',
    src: kertasCedarImg,
    filenameHint: 'candle_kertas_cedar.jpg',
    chatgptPrompt:
      'Studio product photography of an architectural fluted off-white ceramic aromatherapy candle on a smooth limestone surface, crisp daylight studio lighting, subtle cedarwood shaving beside the vessel, 8k.',
  },
  {
    key: 'teh_subuh',
    category: 'Koleksi Produk',
    title: 'Teh Putih & Bambu',
    aspectRatio: '4:3',
    src: tehSubuhImg,
    filenameHint: 'candle_teh_subuh.jpg',
    chatgptPrompt:
      'Studio product photography of a warm alabaster porcelain aromatherapy candle on woven natural linen and pale limestone, crisp bright midday light, dried white tea leaves beside the vessel, 8k.',
  },
  {
    key: 'batu_sunyi',
    category: 'Koleksi Produk',
    title: 'Batu Sunyi',
    aspectRatio: '4:3',
    src: batuSunyiImg,
    filenameHint: 'candle_batu_sunyi.jpg',
    chatgptPrompt:
      'Studio product photography of a smooth pale grey concrete-ceramic aromatherapy candle on brushed limestone slab, clean natural studio light, smooth river pebbles and eucalyptus leaf beside it, 8k.',
  },
  {
    key: 'bara_senja',
    category: 'Koleksi Produk',
    title: 'Bara Senja',
    aspectRatio: '4:3',
    src: baraSenjaImg,
    filenameHint: 'candle_bara_senja.jpg',
    chatgptPrompt:
      'Studio product photography of a smoked amber glass aromatherapy candle gently lit on a warm neutral limestone pedestal, golden late-afternoon side lighting, dried green cardamom pods beside the base, 8k.',
  },
  {
    key: 'kayu_teras',
    category: 'Koleksi Produk',
    title: 'Kayu Teras',
    aspectRatio: '4:3',
    src: kayuTerasImg,
    filenameHint: 'candle_kayu_teras.jpg',
    chatgptPrompt:
      'Studio product photography of a warm smoked umber ceramic aromatherapy candle lit softly on honed travertine stone, warm late afternoon sunlight, raw sandalwood wood chips beside the jar, 8k.',
  },
  {
    key: 'jeruk_petang',
    category: 'Koleksi Produk',
    title: 'Jeruk Petang',
    aspectRatio: '4:3',
    src: jerukPetangImg,
    filenameHint: 'candle_jeruk_petang.jpg',
    chatgptPrompt:
      'Studio product photography of a ribbed amber glass aromatherapy candle glowing warmly on warm sandstone surface, golden hour side light, dried blood orange slice and whole cloves beside the base, 8k.',
  },
  {
    key: 'hening_malam',
    category: 'Koleksi Produk',
    title: 'Hening Malam',
    aspectRatio: '4:3',
    src: heningMalamImg,
    filenameHint: 'candle_hening_malam.jpg',
    chatgptPrompt:
      'Studio product photography of a matte black basalt stone aromatherapy candle with a wide wooden wick burning softly on dark charcoal slate, moody warm studio rim lighting, small block of hinoki wood beside it, 8k.',
  },
  {
    key: 'rempah_pustaka',
    category: 'Koleksi Produk',
    title: 'Rempah Pustaka',
    aspectRatio: '4:3',
    src: rempahPustakaImg,
    filenameHint: 'candle_rempah_pustaka.jpg',
    chatgptPrompt:
      'Studio product photography of a dark bronze-glazed ceramic aromatherapy candle on dark walnut and slate surface, warm directional candlelight, whole star anise and amber resin crystal beside the vessel, 8k.',
  },
  {
    key: 'garam_malam',
    category: 'Koleksi Produk',
    title: 'Garam Malam',
    aspectRatio: '4:3',
    src: garamMalamImg,
    filenameHint: 'candle_garam_malam.jpg',
    chatgptPrompt:
      'Studio product photography of a deep matte charcoal ceramic aromatherapy candle with glowing flame on dark honed slate, quiet nocturnal rim lighting, coarse sea salt crystals and black volcanic pebble beside it, 8k.',
  },

  // 3 Vessels
  {
    key: 'vessel_keramik',
    category: 'Wadah Kustom',
    title: 'Wadah Keramik Tanah Liat',
    aspectRatio: '4:3',
    src: vesselKeramikImg,
    filenameHint: 'vessel_keramik_alabaster.jpg',
    chatgptPrompt:
      'Clean minimalist studio product photo of an empty handcrafted matte alabaster clay candle vessel on travertine stone, soft natural side lighting, architectural ceramic texture detail, 8k.',
  },
  {
    key: 'vessel_obsidian',
    category: 'Wadah Kustom',
    title: 'Wadah Kaca Obsidian Tebal',
    aspectRatio: '4:3',
    src: vesselObsidianImg,
    filenameHint: 'vessel_kaca_obsidian.jpg',
    chatgptPrompt:
      'Clean minimalist studio product photo of a heavy smoked matte obsidian black glass candle tumbler on dark basalt stone, subtle studio rim reflection, architectural luxury vessel photography, 8k.',
  },
  {
    key: 'vessel_travertine',
    category: 'Wadah Kustom',
    title: 'Wadah Batu Travertine Pahat',
    aspectRatio: '4:3',
    src: vesselTravertineImg,
    filenameHint: 'vessel_batu_travertine.jpg',
    chatgptPrompt:
      'Clean minimalist studio product photo of a carved natural porous travertine stone candle vessel on neutral limestone plinth, soft morning studio lighting, sculptural stone craft, 8k.',
  },

  // 9 Botanical Oils
  {
    key: 'oil_bergamot',
    category: 'Bahan Minyak Botani',
    title: 'Bergamot Hijau',
    aspectRatio: '1:1',
    src: oilBergamotImg,
    filenameHint: 'oil_bergamot_hijau.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of fresh green bergamot citrus peel and small apothecary amber glass oil vial on pale travertine stone, crisp diffused daylight, 8k.',
  },
  {
    key: 'oil_serai',
    category: 'Bahan Minyak Botani',
    title: 'Serai Wangi Jawa',
    aspectRatio: '1:1',
    src: oilSeraiImg,
    filenameHint: 'oil_serai_jawa.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of tied fresh green lemongrass stalks and clear essential oil droplets on smooth grey stone, bright clean morning lighting, 8k.',
  },
  {
    key: 'oil_kapulaga',
    category: 'Bahan Minyak Botani',
    title: 'Kapulaga Hijau',
    aspectRatio: '1:1',
    src: oilKapulagaImg,
    filenameHint: 'oil_kapulaga_hijau.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of whole green cardamom pods and crushed aromatic seeds on warm honed limestone, soft golden side lighting, 8k.',
  },
  {
    key: 'oil_teh',
    category: 'Bahan Minyak Botani',
    title: 'Daun Teh Putih',
    aspectRatio: '1:1',
    src: oilTehImg,
    filenameHint: 'oil_teh_putih.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of silver-tipped dried white tea leaves on pale alabaster ceramic dish, soft diffused daylight, 8k.',
  },
  {
    key: 'oil_melati',
    category: 'Bahan Minyak Botani',
    title: 'Melati Gambir',
    aspectRatio: '1:1',
    src: oilMelatiImg,
    filenameHint: 'oil_melati_gambir.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of fresh white night-blooming jasmine blossoms resting on dark basalt slate stone, soft directional studio light, 8k.',
  },
  {
    key: 'oil_hinoki',
    category: 'Bahan Minyak Botani',
    title: 'Kayu Hinoki',
    aspectRatio: '1:1',
    src: oilHinokiImg,
    filenameHint: 'oil_kayu_hinoki.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of smooth planed Japanese hinoki cypress wood blocks and delicate wood curls on pale stone surface, crisp architectural studio light, 8k.',
  },
  {
    key: 'oil_cendana',
    category: 'Bahan Minyak Botani',
    title: 'Cendana Timor',
    aspectRatio: '1:1',
    src: oilCendanaImg,
    filenameHint: 'oil_cendana_timor.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of aged sandalwood heartwood pieces and fine sandalwood powder on warm travertine stone, warm soft studio light, 8k.',
  },
  {
    key: 'oil_vetiver',
    category: 'Bahan Minyak Botani',
    title: 'Vetiver Akar Wangi',
    aspectRatio: '1:1',
    src: oilVetiverImg,
    filenameHint: 'oil_vetiver_garut.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of washed earthy vetiver roots tied with natural twine on grey river slate stone, moody diffused studio lighting, 8k.',
  },
  {
    key: 'oil_kemenyan',
    category: 'Bahan Minyak Botani',
    title: 'Resin Kemenyan Emas',
    aspectRatio: '1:1',
    src: oilKemenyanImg,
    filenameHint: 'oil_resin_kemenyan.jpg',
    chatgptPrompt:
      'Macro botanical studio still life of raw golden amber benzoin and frankincense resin tears on dark walnut wood and slate, warm directional light, 8k.',
  },

  // 4 Burn Ritual & Craftsmanship
  {
    key: 'ritual_pangkas',
    category: 'Jurnal Bakar & Atelier',
    title: 'Pemangkasan Sumbu 5 mm',
    aspectRatio: '4:3',
    src: ritualPangkasImg,
    filenameHint: 'ritual_pangkas_sumbu.jpg',
    chatgptPrompt:
      'Editorial close-up photography of matte brass candle wick trimmer trimming a cotton candle wick to 5mm inside a ceramic vessel on travertine table, soft natural daylight, 8k.',
  },
  {
    key: 'ritual_kolam',
    category: 'Jurnal Bakar & Atelier',
    title: 'Kolam Lilin Merata 2 Jam',
    aspectRatio: '4:3',
    src: ritualKolamImg,
    filenameHint: 'ritual_kolam_lilin.jpg',
    chatgptPrompt:
      'Overhead architectural close-up photography of an even golden liquid soy-beeswax melt pool reaching the edge of a ceramic aromatherapy candle vessel with a steady flame, warm intimate lighting, 8k.',
  },
  {
    key: 'ritual_snuffer',
    category: 'Jurnal Bakar & Atelier',
    title: 'Pemadaman Tanpa Asap',
    aspectRatio: '4:3',
    src: ritualSnufferImg,
    filenameHint: 'ritual_snuffer_padam.jpg',
    chatgptPrompt:
      'Editorial close-up photography of a minimalist brushed bronze bell candle snuffer hovering above an obsidian glass candle flame in warm evening light, 8k.',
  },
  {
    key: 'ritual_atelier',
    category: 'Jurnal Bakar & Atelier',
    title: 'Proses Tuang Manual Atelier',
    aspectRatio: '4:3',
    src: ritualAtelierImg,
    filenameHint: 'ritual_atelier_tuang.jpg',
    chatgptPrompt:
      'Documentary editorial photo inside an artisanal fragrance studio showing molten natural beeswax being poured from a brushed steel pitcher into minimalist stoneware candle jars on a stone workbench, natural window light, 8k.',
  },
];
