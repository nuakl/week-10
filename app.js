(function () {
  'use strict';

  var STORAGE_KEYS = {
    cart: 'kala_cart_v1',
    phase: 'kala_circadian_phase_v1',
    burnLogs: 'kala_burn_logs_v1',
    orders: 'kala_orders_v1',
  };

  var FREE_SHIPPING_THRESHOLD = 500000;
  var BASE_SHIPPING_FEE = 25000;
  var CUSTOM_BASE_PRICE = 295000;

  var CIRCADIAN_PHASES = [
    {
      id: 'fajar',
      label: 'Fajar',
      timeRange: '05:30 – 09:30',
      isDark: false,
      headline: 'Menyambut pagi dengan kejernihan botani.',
      lead: 'Cahaya awal yang lembut berpadu dengan ekstrak kulit bergamot, jarum pinus, dan embun tanah basah untuk membangun fokus tanpa kegelisahan.',
      featuredSlug: 'embun-fajar',
      ritualFocus: 'Kejernihan Napas & Awal Hari',
      heroImage: './images/hero-fajar.jpg',
    },
    {
      id: 'siang',
      label: 'Tengah Hari',
      timeRange: '10:00 – 15:30',
      isDark: false,
      headline: 'Struktur tenang di tengah ruang kerja.',
      lead: 'Formulasi kayu kering, batu mineral, dan teh putih menjaga ketenangan konsentrasi selama jam kerja padat tanpa aroma manis yang membebani.',
      featuredSlug: 'kertas-cedar',
      ritualFocus: 'Fokus Kerja & Struktur Ruang',
      heroImage: './images/hero-siang.jpg',
    },
    {
      id: 'senja',
      label: 'Senja',
      timeRange: '16:30 – 19:30',
      isDark: true,
      headline: 'Peralihan hangat saat langit mulai meredup.',
      lead: 'Memperlambat ritme setelah hari yang panjang melalui kapulaga hijau panggang, jeruk darah kering, dan kehangatan kayu teras.',
      featuredSlug: 'bara-senja',
      ritualFocus: 'Transisi Tenang & Pelepas Lelah',
      heroImage: './images/hero-senja.jpg',
    },
    {
      id: 'malam',
      label: 'Malam',
      timeRange: '20:00 – 23:30',
      isDark: true,
      headline: 'Keheningan dalam batu basal dan cahaya api.',
      lead: 'Sumbu kayu cendana berderak pelan melepaskan resin labdanum, garam laut gelap, dan hinoki, menyiapkan suhu emosi menuju istirahat mendalam.',
      featuredSlug: 'hening-malam',
      ritualFocus: 'Pemulihan & Tidur Berkualitas',
      heroImage: './images/hero-malam.jpg',
    },
  ];

  var CANDLE_CATALOG = [
    {
      id: 'kl-01',
      slug: 'embun-fajar',
      name: 'Embun Fajar',
      subtitle: 'Bergamot Hijau · Eucalyptus · Teh Putih',
      circadianPhase: 'fajar',
      phaseLabel: 'Fajar',
      recommendedHours: '05:30 – 09:00',
      scentFamily: 'botani',
      familyLabel: 'Botani',
      price180g: 285000,
      price320g: 445000,
      burnHours180g: 45,
      burnHours320g: 72,
      waxFormula: '70% Kedelai Organik · 30% Lilin Lebah Lokal',
      vesselMaterial: 'Keramik Stoneware Glasir Celadon',
      wickType: 'Kapas Kepang Bebas Timbal',
      editorialTag: 'Edisi Pagi',
      image: './images/candle-embun-fajar.jpg',
      notes: {
        top: 'Bergamot Hijau & Serai Segar',
        heart: 'Daun Teh Putih & Eucalyptus Radiata',
        base: 'Kayu Cedar Putih & Akar Iris',
      },
    },
    {
      id: 'kl-02',
      slug: 'kabut-pinus',
      name: 'Kabut Pinus',
      subtitle: 'Jarum Pinus · Buah Juniper · Lumut Pagi',
      circadianPhase: 'fajar',
      phaseLabel: 'Fajar',
      recommendedHours: '06:00 – 09:30',
      scentFamily: 'kayu',
      familyLabel: 'Kayu',
      price180g: 305000,
      price320g: 470000,
      burnHours180g: 46,
      burnHours320g: 74,
      waxFormula: '75% Kedelai · 25% Lilin Lebah Alami',
      vesselMaterial: 'Keramik Matte Hijau Sage',
      wickType: 'Sumbu Kayu Cendana Tipis',
      image: './images/candle-kabut-pinus.jpg',
      notes: {
        top: 'Buah Juniper & Kulit Jeruk Purut',
        heart: 'Jarum Pinus Pegunungan & Sage Liar',
        base: 'Lumut Ek & Kayu Cemara Kering',
      },
    },
    {
      id: 'kl-03',
      slug: 'hujan-tropis',
      name: 'Hujan Tropis',
      subtitle: 'Vetiver Garut · Pandan Basah · Batu Kali',
      circadianPhase: 'fajar',
      phaseLabel: 'Fajar',
      recommendedHours: '07:00 – 10:30',
      scentFamily: 'mineral',
      familyLabel: 'Mineral',
      price180g: 295000,
      price320g: 460000,
      burnHours180g: 45,
      burnHours320g: 70,
      waxFormula: '75% Lilin Nabati · 25% Beeswax Murni',
      vesselMaterial: 'Kaca Frosted Mineral Abu-abu',
      wickType: 'Kapas Organik Tanpa Inti Logam',
      image: './images/candle-hujan-tropis.jpg',
      notes: {
        top: 'Embun Pandan & Jeruk Nipis Hijau',
        heart: 'Petrichor Mineral & Lumut Hutan',
        base: 'Akar Vetiver Garut & Nilam Aceh',
      },
    },
    {
      id: 'kl-04',
      slug: 'kertas-cedar',
      name: 'Kertas & Cedar',
      subtitle: 'Cedar Atlas · Teh Oolong · Kapas Kering',
      circadianPhase: 'siang',
      phaseLabel: 'Tengah Hari',
      recommendedHours: '10:00 – 15:30',
      scentFamily: 'kayu',
      familyLabel: 'Kayu',
      price180g: 310000,
      price320g: 475000,
      burnHours180g: 48,
      burnHours320g: 75,
      waxFormula: '80% Kedelai Alami · 20% Minyak Kelapa Murni',
      vesselMaterial: 'Keramik Bertekstur Fluted Alabaster',
      wickType: 'Kapas Kepang Halus',
      editorialTag: 'Favorit Studio',
      image: './images/candle-kertas-cedar.jpg',
      notes: {
        top: 'Lada Merah Muda & Daun Violet',
        heart: 'Serutan Cedar Atlas & Kertas Arsip',
        base: 'Cendana Jawa & Amber Kering',
      },
    },
    {
      id: 'kl-05',
      slug: 'teh-putih-bambu',
      name: 'Teh Putih & Bambu',
      subtitle: 'Daun Teh Silver Tip · Bambu Muda · Linen',
      circadianPhase: 'siang',
      phaseLabel: 'Tengah Hari',
      recommendedHours: '11:00 – 15:00',
      scentFamily: 'botani',
      familyLabel: 'Botani',
      price180g: 290000,
      price320g: 450000,
      burnHours180g: 46,
      burnHours320g: 72,
      waxFormula: '75% Kedelai · 25% Beeswax Putih',
      vesselMaterial: 'Porselen Alabaster Tanpa Glasir',
      wickType: 'Kapas Kepang Organik',
      image: './images/candle-teh-subuh.jpg',
      notes: {
        top: 'Tunas Bambu & Kulit Lemon Kering',
        heart: 'Teh Putih Ciwidey & Linen Jemur',
        base: 'Akar Anggrek Putih & Kayu Hinoki Ringan',
      },
    },
    {
      id: 'kl-06',
      slug: 'batu-sunyi',
      name: 'Batu Sunyi',
      subtitle: 'Kapur Mineral · Daun Eucalyptus · Kerikil Kali',
      circadianPhase: 'siang',
      phaseLabel: 'Tengah Hari',
      recommendedHours: '12:00 – 16:00',
      scentFamily: 'mineral',
      familyLabel: 'Mineral',
      price180g: 315000,
      price320g: 485000,
      burnHours180g: 48,
      burnHours320g: 76,
      waxFormula: '70% Kedelai Organik · 30% Rapeseed',
      vesselMaterial: 'Keramik Semen Mineral Abu Muda',
      wickType: 'Kapas Kepang Inti Padat',
      image: './images/candle-batu-sunyi.jpg',
      notes: {
        top: 'Eucalyptus Biru & Udara Pegunungan',
        heart: 'Batu Kapur Basah & Daun Rosemary',
        base: 'Kasturi Mineral & Kayu Driftwood',
      },
    },
    {
      id: 'kl-07',
      slug: 'bara-senja',
      name: 'Bara Senja',
      subtitle: 'Kapulaga Hijau · Amber Asap · Kulit Kayu',
      circadianPhase: 'senja',
      phaseLabel: 'Senja',
      recommendedHours: '16:30 – 19:30',
      scentFamily: 'rempah',
      familyLabel: 'Rempah',
      price180g: 325000,
      price320g: 495000,
      burnHours180g: 50,
      burnHours320g: 78,
      waxFormula: '70% Lilin Lebah · 30% Rapeseed Organik',
      vesselMaterial: 'Kaca Tebal Amber Asap',
      wickType: 'Kapas Anyam Ganda',
      editorialTag: 'Daya Sebar Tinggi',
      image: './images/candle-bara-senja.jpg',
      notes: {
        top: 'Kapulaga Hijau & Kulit Jeruk Darah',
        heart: 'Teh Hitam Panggang & Kayu Manis Ceylon',
        base: 'Amber Asap & Labdanum Emas',
      },
    },
    {
      id: 'kl-08',
      slug: 'kayu-teras',
      name: 'Kayu Teras',
      subtitle: 'Cendana Timor · Amber Hangat · Kopi Panggang Ringan',
      circadianPhase: 'senja',
      phaseLabel: 'Senja',
      recommendedHours: '17:00 – 20:00',
      scentFamily: 'kayu',
      familyLabel: 'Kayu',
      price180g: 335000,
      price320g: 510000,
      burnHours180g: 50,
      burnHours320g: 78,
      waxFormula: '75% Beeswax · 25% Kedelai Organik',
      vesselMaterial: 'Keramik Glasir Umber Asap',
      wickType: 'Kapas Kepang Organik',
      image: './images/candle-kayu-teras.jpg',
      notes: {
        top: 'Biji Ketumbar & Kayu Manis Halus',
        heart: 'Teras Cendana Timor & Daun Tembakau Muda',
        base: 'Resin Benzoin & Kayu Guaiac',
      },
    },
    {
      id: 'kl-09',
      slug: 'jeruk-petang',
      name: 'Jeruk Petang',
      subtitle: 'Jeruk Darah Kering · Cengkeh Maluku · Cendana',
      circadianPhase: 'senja',
      phaseLabel: 'Senja',
      recommendedHours: '16:30 – 19:30',
      scentFamily: 'botani',
      familyLabel: 'Botani',
      price180g: 300000,
      price320g: 465000,
      burnHours180g: 46,
      burnHours320g: 74,
      waxFormula: '75% Kedelai · 25% Minyak Kelapa',
      vesselMaterial: 'Kaca Bergalur Amber',
      wickType: 'Kapas Kepang Halus',
      image: './images/candle-jeruk-petang.jpg',
      notes: {
        top: 'Jeruk Darah Kering & Mandarin Hijau',
        heart: 'Cengkeh Maluku & Bunga Neroli',
        base: 'Cendana Halus & Amber Madu',
      },
    },
    {
      id: 'kl-10',
      slug: 'hening-malam',
      name: 'Hening Malam',
      subtitle: 'Kayu Hinoki · Asap Kemenyan · Arang Hitam',
      circadianPhase: 'malam',
      phaseLabel: 'Malam',
      recommendedHours: '20:30 – 23:30',
      scentFamily: 'mineral',
      familyLabel: 'Mineral',
      price180g: 365000,
      price320g: 545000,
      burnHours180g: 52,
      burnHours320g: 82,
      waxFormula: '65% Kedelai · 35% Lilin Kelapa & Cendana',
      vesselMaterial: 'Batu Basal Pahat Tangan',
      wickType: 'Sumbu Kayu Cendana Berderak',
      editorialTag: 'Sumbu Kayu',
      image: './images/candle-hening-malam.jpg',
      notes: {
        top: 'Daun Cemara & Lada Hitam',
        heart: 'Kayu Hinoki Jepang & Gaharu Muda',
        base: 'Kemenyan Sumatra & Batu Basal Hangat',
      },
    },
    {
      id: 'kl-11',
      slug: 'rempah-pustaka',
      name: 'Rempah Pustaka',
      subtitle: 'Bunga Lawang · Labdanum · Kulit Kayu Tua',
      circadianPhase: 'malam',
      phaseLabel: 'Malam',
      recommendedHours: '19:30 – 23:00',
      scentFamily: 'rempah',
      familyLabel: 'Rempah',
      price180g: 340000,
      price320g: 520000,
      burnHours180g: 50,
      burnHours320g: 80,
      waxFormula: '75% Beeswax Gelap · 25% Minyak Nabati',
      vesselMaterial: 'Keramik Glasir Perunggu Tua',
      wickType: 'Kapas Kepang Inti Padat',
      image: './images/candle-rempah-pustaka.jpg',
      notes: {
        top: 'Bunga Lawang & Pala Banda',
        heart: 'Kulit Kayu Walnut & Tembakau Kering',
        base: 'Resin Labdanum & Benzoin Emas',
      },
    },
    {
      id: 'kl-12',
      slug: 'garam-malam',
      name: 'Garam Malam',
      subtitle: 'Garam Laut Kasar · Kayu Apung · Kemenyan Putih',
      circadianPhase: 'malam',
      phaseLabel: 'Malam',
      recommendedHours: '21:00 – 23:30',
      scentFamily: 'mineral',
      familyLabel: 'Mineral',
      price180g: 330000,
      price320g: 505000,
      burnHours180g: 49,
      burnHours320g: 78,
      waxFormula: '70% Kedelai · 30% Beeswax Alami',
      vesselMaterial: 'Keramik Arang Hitam Matte',
      wickType: 'Kapas Kepang Organik',
      image: './images/candle-garam-malam.jpg',
      notes: {
        top: 'Kristal Garam Laut & Bergamot Gelap',
        heart: 'Kayu Apung & Daun Sage Hitam',
        base: 'Kemenyan Putih & Cendana Gelap',
      },
    },
  ];

  var VESSEL_OPTIONS = [
    {
      id: 'keramik',
      name: 'Keramik Tanah Liat',
      finish: 'Matte Pasir Alabaster',
      extraPrice: 0,
      image: './images/vessel-keramik.jpg',
    },
    {
      id: 'obsidian',
      name: 'Kaca Obsidian Tebal',
      finish: 'Semi-Transparan Gelap',
      extraPrice: 45000,
      image: './images/vessel-obsidian.jpg',
    },
    {
      id: 'travertine',
      name: 'Batu Travertine Pahat',
      finish: 'Batu Alam Berpori',
      extraPrice: 85000,
      image: './images/vessel-travertine.jpg',
    },
  ];

  var WICK_OPTIONS = [
    {
      id: 'kapas',
      name: 'Kapas Kepang Organik',
      detail: 'Nyala tenang tanpa suara, kolam lilin merata.',
      extraPrice: 0,
      burnCharacter: 'Pembakaran Hening · 48 Jam (220g)',
    },
    {
      id: 'kayu',
      name: 'Kayu Cendana Retak Halus',
      detail: 'Menghasilkan suara derak api kayu lembut.',
      extraPrice: 25000,
      burnCharacter: 'Derak Akustik · 45 Jam (220g)',
    },
  ];

  var BOTANICAL_OILS = [
    { id: 'top-bergamot', name: 'Bergamot Hijau', origin: 'Italia Selatan', layer: 'top', image: './images/oil-bergamot.jpg' },
    { id: 'top-serai', name: 'Serai Wangi Jawa', origin: 'Jawa Barat', layer: 'top', image: './images/oil-serai.jpg' },
    { id: 'top-kapulaga', name: 'Kapulaga Hijau', origin: 'Temanggung', layer: 'top', image: './images/oil-kapulaga.jpg' },
    { id: 'heart-teh', name: 'Daun Teh Putih', origin: 'Ciwidey', layer: 'heart', image: './images/oil-teh-putih.jpg' },
    { id: 'heart-melati', name: 'Melati Gambir', origin: 'Pekalongan', layer: 'heart', image: './images/oil-melati.jpg' },
    { id: 'heart-hinoki', name: 'Kayu Hinoki', origin: 'Kiso, Jepang', layer: 'heart', image: './images/oil-hinoki.jpg' },
    { id: 'base-cendana', name: 'Cendana Timor', origin: 'Nusa Tenggara Timur', layer: 'base', image: './images/oil-cendana.jpg' },
    { id: 'base-vetiver', name: 'Vetiver Akar Wangi', origin: 'Garut', layer: 'base', image: './images/oil-vetiver.jpg' },
    { id: 'base-kemenyan', name: 'Resin Kemenyan Emas', origin: 'Sumatra Utara', layer: 'base', image: './images/oil-kemenyan.jpg' },
  ];

  var RITUAL_STEPS = [
    {
      title: '01. Pangkas Sumbu Sebelum Setiap Nyala (5 mm)',
      desc: 'Sumbu yang terlalu panjang membakar minyak esensial lebih cepat dari titik didihnya. Pertahankan panjang 5 mm agar nyala stabil dan bebas jelaga.',
      image: './images/ritual-pangkas.jpg',
    },
    {
      title: '02. Pembakaran Perdana Minimal 2 Jam',
      desc: 'Lilin lebah dan kedelai memiliki memori lelehan. Biarkan kolam cair menyentuh bibir wadah sebelum dipadamkan agar tidak terbentuk terowongan di tengah.',
      image: './images/ritual-kolam.jpg',
    },
    {
      title: '03. Batas Maksimal 4 Jam & Padamkan Tanpa Tiupan',
      desc: 'Setelah jam ke-4, padamkan menggunakan penutup api (snuffer) agar base note kayu dan resin tetap murni tanpa bau asap.',
      image: './images/ritual-snuffer.jpg',
    },
  ];

  var ASSET_CATALOG = [
    { key: 'hero-fajar', category: 'Hero Sirkadian', title: 'Hero Fase Fajar', ratio: '16:9', file: 'images/hero-fajar.jpg', prompt: 'Architectural luxury still life photography of an unglazed pale stoneware aromatherapy candle on a raw travertine stone plinth bathed in crisp morning sunlight, soft botanical eucalyptus shadow on neutral alabaster wall, Leica 50mm, 8k.' },
    { key: 'hero-siang', category: 'Hero Sirkadian', title: 'Hero Fase Tengah Hari', ratio: '16:9', file: 'images/hero-siang.jpg', prompt: 'Architectural luxury still life photography of a fluted white stoneware aromatherapy candle on a sunlit travertine work desk beside linen drapery and architectural glass shadows, crisp bright midday light, Leica 50mm, 8k.' },
    { key: 'hero-senja', category: 'Hero Sirkadian', title: 'Hero Fase Senja', ratio: '16:9', file: 'images/hero-senja.jpg', prompt: 'Atmospheric luxury dusk still life photography of a smoked amber glass aromatherapy candle glowing softly on a warm stone console table, long golden sunset shadows across textured plaster wall, Leica 50mm, 8k.' },
    { key: 'hero-malam', category: 'Hero Sirkadian', title: 'Hero Fase Malam', ratio: '16:9', file: 'images/hero-malam.jpg', prompt: 'Atmospheric luxury nocturnal still life photography of a matte obsidian glass aromatherapy candle lit with a steady golden amber flame on a dark honed basalt stone slab, warm rim light, deep quiet shadows, Leica 50mm, 8k.' },
    { key: 'embun-fajar', category: 'Koleksi Produk', title: 'Embun Fajar', ratio: '4:3', file: 'images/candle-embun-fajar.jpg', prompt: 'Studio product photography of a minimalist pale celadon stoneware aromatherapy candle with cream beeswax on a clean neutral travertine surface, soft diffused morning side lighting, small dried bergamot peel beside the jar, 8k.' },
    { key: 'kabut-pinus', category: 'Koleksi Produk', title: 'Kabut Pinus', ratio: '4:3', file: 'images/candle-kabut-pinus.jpg', prompt: 'Studio product photography of a matte sage-grey stoneware aromatherapy candle on cool travertine stone, soft early morning diffused window light, fresh pine needles and crushed juniper berries beside the jar, 8k.' },
    { key: 'hujan-tropis', category: 'Koleksi Produk', title: 'Hujan Tropis', ratio: '4:3', file: 'images/candle-hujan-tropis.jpg', prompt: 'Studio product photography of a frosted mineral glass aromatherapy candle with ivory wax on a clean neutral grey stone slab, soft cool morning window light, fresh green vetiver blade and water droplets on stone, 8k.' },
    { key: 'kertas-cedar', category: 'Koleksi Produk', title: 'Kertas & Cedar', ratio: '4:3', file: 'images/candle-kertas-cedar.jpg', prompt: 'Studio product photography of an architectural fluted off-white ceramic aromatherapy candle on a smooth limestone surface, crisp daylight studio lighting, subtle cedarwood shaving beside the vessel, 8k.' },
    { key: 'teh-subuh', category: 'Koleksi Produk', title: 'Teh Putih & Bambu', ratio: '4:3', file: 'images/candle-teh-subuh.jpg', prompt: 'Studio product photography of a warm alabaster porcelain aromatherapy candle on woven natural linen and pale limestone, crisp bright midday light, dried white tea leaves beside the vessel, 8k.' },
    { key: 'batu-sunyi', category: 'Koleksi Produk', title: 'Batu Sunyi', ratio: '4:3', file: 'images/candle-batu-sunyi.jpg', prompt: 'Studio product photography of a smooth pale grey concrete-ceramic aromatherapy candle on brushed limestone slab, clean natural studio light, smooth river pebbles and eucalyptus leaf beside it, 8k.' },
    { key: 'bara-senja', category: 'Koleksi Produk', title: 'Bara Senja', ratio: '4:3', file: 'images/candle-bara-senja.jpg', prompt: 'Studio product photography of a smoked amber glass aromatherapy candle gently lit on a warm neutral limestone pedestal, golden late-afternoon side lighting, dried green cardamom pods beside the base, 8k.' },
    { key: 'kayu-teras', category: 'Koleksi Produk', title: 'Kayu Teras', ratio: '4:3', file: 'images/candle-kayu-teras.jpg', prompt: 'Studio product photography of a warm smoked umber ceramic aromatherapy candle lit softly on honed travertine stone, warm late afternoon sunlight, raw sandalwood wood chips beside the jar, 8k.' },
    { key: 'jeruk-petang', category: 'Koleksi Produk', title: 'Jeruk Petang', ratio: '4:3', file: 'images/candle-jeruk-petang.jpg', prompt: 'Studio product photography of a ribbed amber glass aromatherapy candle glowing warmly on warm sandstone surface, golden hour side light, dried blood orange slice and whole cloves beside the base, 8k.' },
    { key: 'hening-malam', category: 'Koleksi Produk', title: 'Hening Malam', ratio: '4:3', file: 'images/candle-hening-malam.jpg', prompt: 'Studio product photography of a matte black basalt stone aromatherapy candle with a wide wooden wick burning softly on dark charcoal slate, moody warm studio rim lighting, small block of hinoki wood beside it, 8k.' },
    { key: 'rempah-pustaka', category: 'Koleksi Produk', title: 'Rempah Pustaka', ratio: '4:3', file: 'images/candle-rempah-pustaka.jpg', prompt: 'Studio product photography of a dark bronze-glazed ceramic aromatherapy candle on dark walnut and slate surface, warm directional candlelight, whole star anise and amber resin crystal beside the vessel, 8k.' },
    { key: 'garam-malam', category: 'Koleksi Produk', title: 'Garam Malam', ratio: '4:3', file: 'images/candle-garam-malam.jpg', prompt: 'Studio product photography of a deep matte charcoal ceramic aromatherapy candle with glowing flame on dark honed slate, quiet nocturnal rim lighting, coarse sea salt crystals and black volcanic pebble beside it, 8k.' },
    { key: 'vessel-keramik', category: 'Wadah Kustom', title: 'Wadah Keramik Tanah Liat', ratio: '4:3', file: 'images/vessel-keramik.jpg', prompt: 'Clean minimalist studio product photo of an empty handcrafted matte alabaster clay candle vessel on travertine stone, soft natural side lighting, architectural ceramic texture detail, 8k.' },
    { key: 'vessel-obsidian', category: 'Wadah Kustom', title: 'Wadah Kaca Obsidian Tebal', ratio: '4:3', file: 'images/vessel-obsidian.jpg', prompt: 'Clean minimalist studio product photo of a heavy smoked matte obsidian black glass candle tumbler on dark basalt stone, subtle studio rim reflection, architectural luxury vessel photography, 8k.' },
    { key: 'vessel-travertine', category: 'Wadah Kustom', title: 'Wadah Batu Travertine Pahat', ratio: '4:3', file: 'images/vessel-travertine.jpg', prompt: 'Clean minimalist studio product photo of a carved natural porous travertine stone candle vessel on neutral limestone plinth, soft morning studio lighting, sculptural stone craft, 8k.' },
    { key: 'oil-bergamot', category: 'Bahan Minyak Botani', title: 'Bergamot Hijau', ratio: '1:1', file: 'images/oil-bergamot.jpg', prompt: 'Macro botanical studio still life of fresh green bergamot citrus peel and small apothecary amber glass oil vial on pale travertine stone, crisp diffused daylight, 8k.' },
    { key: 'oil-serai', category: 'Bahan Minyak Botani', title: 'Serai Wangi Jawa', ratio: '1:1', file: 'images/oil-serai.jpg', prompt: 'Macro botanical studio still life of tied fresh green lemongrass stalks and clear essential oil droplets on smooth grey stone, bright clean morning lighting, 8k.' },
    { key: 'oil-kapulaga', category: 'Bahan Minyak Botani', title: 'Kapulaga Hijau', ratio: '1:1', file: 'images/oil-kapulaga.jpg', prompt: 'Macro botanical studio still life of whole green cardamom pods and crushed aromatic seeds on warm honed limestone, soft golden side lighting, 8k.' },
    { key: 'oil-teh-putih', category: 'Bahan Minyak Botani', title: 'Daun Teh Putih', ratio: '1:1', file: 'images/oil-teh-putih.jpg', prompt: 'Macro botanical studio still life of silver-tipped dried white tea leaves on pale alabaster ceramic dish, soft diffused daylight, 8k.' },
    { key: 'oil-melati', category: 'Bahan Minyak Botani', title: 'Melati Gambir', ratio: '1:1', file: 'images/oil-melati.jpg', prompt: 'Macro botanical studio still life of fresh white night-blooming jasmine blossoms resting on dark basalt slate stone, soft directional studio light, 8k.' },
    { key: 'oil-hinoki', category: 'Bahan Minyak Botani', title: 'Kayu Hinoki', ratio: '1:1', file: 'images/oil-hinoki.jpg', prompt: 'Macro botanical studio still life of smooth planed Japanese hinoki cypress wood blocks and delicate wood curls on pale stone surface, crisp architectural studio light, 8k.' },
    { key: 'oil-cendana', category: 'Bahan Minyak Botani', title: 'Cendana Timor', ratio: '1:1', file: 'images/oil-cendana.jpg', prompt: 'Macro botanical studio still life of aged sandalwood heartwood pieces and fine sandalwood powder on warm travertine stone, warm soft studio light, 8k.' },
    { key: 'oil-vetiver', category: 'Bahan Minyak Botani', title: 'Vetiver Akar Wangi', ratio: '1:1', file: 'images/oil-vetiver.jpg', prompt: 'Macro botanical studio still life of washed earthy vetiver roots tied with natural twine on grey river slate stone, moody diffused studio lighting, 8k.' },
    { key: 'oil-kemenyan', category: 'Bahan Minyak Botani', title: 'Resin Kemenyan Emas', ratio: '1:1', file: 'images/oil-kemenyan.jpg', prompt: 'Macro botanical studio still life of raw golden amber benzoin and frankincense resin tears on dark walnut wood and slate, warm directional light, 8k.' },
    { key: 'ritual-pangkas', category: 'Jurnal Bakar & Atelier', title: 'Pemangkasan Sumbu 5 mm', ratio: '4:3', file: 'images/ritual-pangkas.jpg', prompt: 'Editorial close-up photography of matte brass candle wick trimmer trimming a cotton candle wick to 5mm inside a ceramic vessel on travertine table, soft natural daylight, 8k.' },
    { key: 'ritual-kolam', category: 'Jurnal Bakar & Atelier', title: 'Kolam Lilin Merata 2 Jam', ratio: '4:3', file: 'images/ritual-kolam.jpg', prompt: 'Overhead architectural close-up photography of an even golden liquid soy-beeswax melt pool reaching the edge of a ceramic aromatherapy candle vessel with a steady flame, warm intimate lighting, 8k.' },
    { key: 'ritual-snuffer', category: 'Jurnal Bakar & Atelier', title: 'Pemadaman Tanpa Asap', ratio: '4:3', file: 'images/ritual-snuffer.jpg', prompt: 'Editorial close-up photography of a minimalist brushed bronze bell candle snuffer hovering above an obsidian glass candle flame in warm evening light, 8k.' },
    { key: 'ritual-atelier', category: 'Jurnal Bakar & Atelier', title: 'Proses Tuang Manual Atelier', ratio: '4:3', file: 'images/ritual-atelier.jpg', prompt: 'Documentary editorial photo inside an artisanal fragrance studio showing molten natural beeswax being poured from a brushed steel pitcher into minimalist stoneware candle jars on a stone workbench, natural window light, 8k.' },
  ];

  // Application State
  var state = {
    activePhase: loadStorage(STORAGE_KEYS.phase, 'fajar'),
    filterPhase: 'all',
    filterFamily: 'all',
    searchQuery: '',
    cart: loadStorage(STORAGE_KEYS.cart, []),
    burnLogs: loadStorage(STORAGE_KEYS.burnLogs, [
      {
        id: 'log-seed-1',
        candleName: 'Embun Fajar',
        durationMinutes: 120,
        note: 'Menit ke-90 aroma daun teh putih terasa paling jernih saat ruang kerja terkena cahaya pagi.',
        loggedAt: '08 Nov 2026',
      },
    ]),
    pdpCandleId: null,
    pdpWeight: '180g',
    pdpMinute: 60,
    custom: {
      vesselId: 'keramik',
      wickId: 'kapas',
      topOilId: 'top-bergamot',
      heartOilId: 'heart-teh',
      baseOilId: 'base-cendana',
      concentration: 'seimbang',
      engravingText: 'RUANG TENANG',
    },
    cartStep: 'cart', // 'cart' | 'checkout' | 'confirmed'
    confirmedOrder: null,
    checkoutError: '',
    assetCategory: 'Semua',
    toastTimer: null,
  };

  if (!CIRCADIAN_PHASES.some(function (p) { return p.id === state.activePhase; })) {
    state.activePhase = 'fajar';
  }

  function loadStorage(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore storage errors
    }
  }

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function attachFallbackImages(root) {
    var imgs = (root || document).querySelectorAll('img');
    imgs.forEach(function (img) {
      if (img.dataset.boundFallback) return;
      img.dataset.boundFallback = '1';
      img.addEventListener('error', function () {
        img.style.background = 'linear-gradient(135deg, var(--surface), var(--border))';
        img.alt = img.alt || 'KALA Lilin Aromaterapi';
      });
    });
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    var toastText = document.getElementById('toast-text');
    toastText.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () {
      toast.classList.add('hidden');
    }, 3000);
  }

  // 1. CIRCADIAN HERO
  function renderHero() {
    var phase = CIRCADIAN_PHASES.find(function (p) { return p.id === state.activePhase; }) || CIRCADIAN_PHASES[0];
    var featured = CANDLE_CATALOG.find(function (c) { return c.slug === phase.featuredSlug; }) || CANDLE_CATALOG[0];

    document.documentElement.classList.toggle('dark', Boolean(phase.isDark));
    saveStorage(STORAGE_KEYS.phase, state.activePhase);

    document.getElementById('phase-icon').textContent = phase.isDark ? '☾' : '☀';
    document.getElementById('phase-time-range').textContent = phase.timeRange;
    document.getElementById('hero-kicker').textContent = phase.ritualFocus + ' · Atelier Jakarta';
    document.getElementById('hero-headline').textContent = phase.headline;
    document.getElementById('hero-lead').textContent = phase.lead;

    var spotlightImg = document.getElementById('spotlight-img');
    spotlightImg.src = featured.image;
    spotlightImg.alt = featured.name;
    document.getElementById('spotlight-meta').textContent = 'Rekomendasi Jam Ini · ' + featured.familyLabel;
    document.getElementById('spotlight-name').textContent = featured.name;
    document.getElementById('spotlight-sub').textContent = featured.subtitle;
    document.getElementById('spotlight-price').textContent = formatIDR(featured.price180g);

    var heroImg = document.getElementById('hero-img');
    heroImg.src = phase.heroImage;
    heroImg.alt = 'Suasana lilin aromaterapi KALA pada fase ' + phase.label;
    document.getElementById('hero-media-phase').textContent =
      'Fase ' + phase.label + ' · Pencahayaan ' + (phase.isDark ? 'Nokturnal' : 'Alami');
    document.getElementById('hero-media-vessel').textContent = featured.vesselMaterial;
    document.getElementById('hero-media-hours').textContent =
      featured.burnHours180g + '–' + featured.burnHours320g + ' Jam Bakar';

    var tablist = document.getElementById('phase-tablist');
    tablist.innerHTML = CIRCADIAN_PHASES.map(function (p) {
      var active = p.id === state.activePhase;
      return (
        '<button type="button" role="tab" aria-selected="' + active + '" class="tab-btn ' + (active ? 'active' : '') + '" data-phase="' + p.id + '">' +
        escapeHtml(p.label) +
        '</button>'
      );
    }).join('');

    tablist.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activePhase = btn.dataset.phase;
        renderHero();
      });
    });

    document.getElementById('spotlight-add-btn').onclick = function () {
      addCatalogToCart(featured.id, '180g');
    };
    document.getElementById('spotlight-detail-btn').onclick = function () {
      openPdpModal(featured.id);
    };
  }

  // 2. COLLECTION GRID & FILTERS
  function renderCollectionFilters() {
    var phaseFilters = [
      { id: 'all', label: 'Semua Waktu' },
      { id: 'fajar', label: 'Fajar' },
      { id: 'siang', label: 'Tengah Hari' },
      { id: 'senja', label: 'Senja' },
      { id: 'malam', label: 'Malam' },
    ];
    var phaseBox = document.getElementById('collection-phase-filters');
    phaseBox.innerHTML = phaseFilters.map(function (f) {
      var active = state.filterPhase === f.id;
      return (
        '<button type="button" role="tab" aria-selected="' + active + '" class="tab-btn ' + (active ? 'active' : '') + '" data-filter-phase="' + f.id + '">' +
        f.label +
        '</button>'
      );
    }).join('');
    phaseBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.filterPhase = btn.dataset.filterPhase;
        renderCollectionFilters();
        renderCollectionGrid();
      });
    });

    var familyFilters = [
      { id: 'all', label: 'Semua Aroma' },
      { id: 'botani', label: 'Botani' },
      { id: 'kayu', label: 'Kayu' },
      { id: 'rempah', label: 'Rempah' },
      { id: 'mineral', label: 'Mineral' },
    ];
    var famBox = document.getElementById('collection-family-filters');
    famBox.innerHTML =
      '<span class="meta-text">Keluarga:</span>' +
      familyFilters.map(function (f) {
        var active = state.filterFamily === f.id;
        return (
          '<button type="button" class="chip-btn ' + (active ? 'active' : '') + '" data-filter-family="' + f.id + '">' +
          f.label +
          '</button>'
        );
      }).join('');
    famBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.filterFamily = btn.dataset.filterFamily;
        renderCollectionFilters();
        renderCollectionGrid();
      });
    });
  }

  function renderCollectionGrid() {
    var q = state.searchQuery.trim().toLowerCase();
    var filtered = CANDLE_CATALOG.filter(function (item) {
      var mPhase = state.filterPhase === 'all' || item.circadianPhase === state.filterPhase;
      var mFam = state.filterFamily === 'all' || item.scentFamily === state.filterFamily;
      var mQuery =
        !q ||
        item.name.toLowerCase().indexOf(q) !== -1 ||
        item.subtitle.toLowerCase().indexOf(q) !== -1 ||
        item.notes.top.toLowerCase().indexOf(q) !== -1 ||
        item.notes.heart.toLowerCase().indexOf(q) !== -1 ||
        item.notes.base.toLowerCase().indexOf(q) !== -1;
      return mPhase && mFam && mQuery;
    });

    var grid = document.getElementById('collection-grid');
    var empty = document.getElementById('collection-empty');

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');
    grid.innerHTML = filtered.map(function (c) {
      return (
        '<article class="product-card">' +
          '<button type="button" class="product-img-btn" data-open-pdp="' + c.id + '">' +
            '<img src="' + c.image + '" alt="' + escapeHtml(c.name) + '" loading="lazy" referrerpolicy="no-referrer" />' +
          '</button>' +
          '<div class="product-card-body">' +
            '<div class="card-meta-row">' +
              '<span>' + escapeHtml(c.phaseLabel) + ' · ' + escapeHtml(c.familyLabel) + ' · <span class="mono-tabular">' + c.burnHours180g + 'j</span></span>' +
              (c.editorialTag ? '<span class="card-tag-text">' + escapeHtml(c.editorialTag) + '</span>' : '') +
            '</div>' +
            '<div class="card-title-row">' +
              '<button type="button" class="card-title-btn" data-open-pdp="' + c.id + '">' + escapeHtml(c.name) + '</button>' +
              '<span class="mono-tabular price-label">' + formatIDR(c.price180g) + '</span>' +
            '</div>' +
            '<p class="card-sub">' + escapeHtml(c.subtitle) + '</p>' +
            '<div class="card-actions">' +
              '<button type="button" class="btn-outline" data-open-pdp="' + c.id + '">Detail & Jurnal Bakar</button>' +
              '<button type="button" class="btn-primary" data-quick-add="' + c.id + '">+ Tambah</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll('[data-open-pdp]').forEach(function (el) {
      el.addEventListener('click', function () {
        openPdpModal(el.dataset.openPdp);
      });
    });

    grid.querySelectorAll('[data-quick-add]').forEach(function (el) {
      el.addEventListener('click', function () {
        addCatalogToCart(el.dataset.quickAdd, '180g');
      });
    });

    attachFallbackImages(grid);
  }

  // 3. PRODUCT DETAIL MODAL & 4-HOUR BURN SCRUBBER
  function openPdpModal(candleId) {
    state.pdpCandleId = candleId;
    state.pdpWeight = '180g';
    state.pdpMinute = 60;
    renderPdpModal();
    document.getElementById('pdp-modal').classList.remove('hidden');
  }

  function closePdpModal() {
    document.getElementById('pdp-modal').classList.add('hidden');
    state.pdpCandleId = null;
  }

  function renderPdpModal() {
    var c = CANDLE_CATALOG.find(function (item) { return item.id === state.pdpCandleId; });
    if (!c) return;

    var img = document.getElementById('pdp-img');
    img.src = c.image;
    img.alt = c.name;

    document.getElementById('pdp-specs').innerHTML =
      '<div class="spec-row"><span class="meta-text">Formula Lilin</span><span>' + escapeHtml(c.waxFormula) + '</span></div>' +
      '<div class="spec-row"><span class="meta-text">Material Wadah</span><span>' + escapeHtml(c.vesselMaterial) + '</span></div>' +
      '<div class="spec-row"><span class="meta-text">Jenis Sumbu</span><span>' + escapeHtml(c.wickType) + '</span></div>' +
      '<div class="spec-row"><span class="meta-text">Jam Ritual Ideal</span><span class="mono-tabular">' + escapeHtml(c.phaseLabel) + ' (' + escapeHtml(c.recommendedHours) + ')</span></div>';

    var activePrice = state.pdpWeight === '180g' ? c.price180g : c.price320g;
    var activeHours = state.pdpWeight === '180g' ? c.burnHours180g : c.burnHours320g;

    document.getElementById('pdp-phase-meta').textContent = c.phaseLabel + ' (' + c.recommendedHours + ') · ' + c.familyLabel;
    document.getElementById('pdp-title').textContent = c.name;
    document.getElementById('pdp-price').textContent = formatIDR(activePrice);
    document.getElementById('pdp-subtitle').textContent = c.subtitle;
    document.getElementById('pdp-stock-label').textContent = '● Tersedia · Siap Kirim (' + activeHours + ' Jam Bakar)';

    var variantsBox = document.getElementById('pdp-variants');
    variantsBox.innerHTML = ['180g', '320g'].map(function (w) {
      var active = state.pdpWeight === w;
      var p = w === '180g' ? c.price180g : c.price320g;
      var h = w === '180g' ? c.burnHours180g : c.burnHours320g;
      return (
        '<button type="button" class="variant-btn ' + (active ? 'active' : '') + '" data-weight="' + w + '">' +
          '<div class="wick-top"><span class="mono-tabular">' + w + '</span><span class="meta-text mono-tabular">' + h + ' Jam</span></div>' +
          '<div class="meta-text mono-tabular mt-1">' + formatIDR(p) + '</div>' +
        '</button>'
      );
    }).join('');

    variantsBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.pdpWeight = btn.dataset.weight;
        renderPdpModal();
      });
    });

    document.getElementById('pdp-add-btn').textContent = 'Tambah ' + state.pdpWeight + ' ke Tas Belanja';
    document.getElementById('pdp-add-btn').onclick = function () {
      addCatalogToCart(c.id, state.pdpWeight);
      closePdpModal();
    };

    var scrubberInput = document.getElementById('burn-scrubber-range');
    scrubberInput.value = String(state.pdpMinute);
    scrubberInput.oninput = function () {
      state.pdpMinute = Number(scrubberInput.value);
      renderBurnScrubber(c);
    };

    renderBurnScrubber(c);
  }

  function renderBurnScrubber(c) {
    var t = state.pdpMinute;
    var topPct = Math.max(12, Math.round(92 * Math.exp(-Math.pow((t - 22) / 52, 2))));
    var heartPct = Math.max(18, Math.round(95 * Math.exp(-Math.pow((t - 115) / 72, 2))));
    var basePct = Math.min(96, Math.max(10, Math.round(14 + (t / 240) * 82)));

    var meltMm = Math.min(78, Math.round(10 + (t / 150) * 68));
    var tempC = Math.min(62, Math.round(28 + (t / 140) * 34));

    var guidance = 'Awal penyalaan: Top note menguap cepat membuka karakter udara ruangan.';
    if (t >= 45 && t < 135) {
      guidance = 'Inti pembakaran: Heart note mendominasi ruang; kolam lilin melebar merata.';
    } else if (t >= 135 && t < 210) {
      guidance = 'Kedalaman penuh: Resin dan kayu dasar menempel hangat pada suhu optimal.';
    } else if (t >= 210) {
      guidance = 'Batas anjuran (3.5–4 jam): Padamkan sumbu dengan snuffer agar aroma tetap bersih.';
    }

    var hrs = String(Math.floor(t / 60)).padStart(2, '0');
    var mins = String(t % 60).padStart(2, '0');
    document.getElementById('scrubber-clock').textContent = 'Jam ke-' + hrs + ':' + mins;

    var rows = [
      { label: 'Lapisan Atas (Top)', ing: c.notes.top, val: topPct },
      { label: 'Lapisan Inti (Heart)', ing: c.notes.heart, val: heartPct },
      { label: 'Lapisan Dasar (Base)', ing: c.notes.base, val: basePct },
    ];

    document.getElementById('scrubber-bars').innerHTML = rows.map(function (r) {
      return (
        '<div>' +
          '<div class="bar-label-row"><span><strong>' + r.label + ':</strong> ' + escapeHtml(r.ing) + '</span><span class="mono-tabular meta-text">' + r.val + '%</span></div>' +
          '<div class="bar-track"><div class="bar-fill" style="width:' + r.val + '%"></div></div>' +
        '</div>'
      );
    }).join('');

    document.getElementById('scrubber-telemetry').innerHTML =
      '<div class="telemetry-box"><span class="meta-text">Diameter Kolam Lilin</span><div class="mono-tabular mt-1"><strong>' + meltMm + ' mm</strong></div></div>' +
      '<div class="telemetry-box"><span class="meta-text">Suhu Permukaan Lilin</span><div class="mono-tabular mt-1"><strong>' + tempC + ' °C</strong></div></div>' +
      '<div class="telemetry-box"><span class="meta-text">Catatan Fase</span><div class="mt-1">' + escapeHtml(guidance) + '</div></div>';
  }

  // 4. CUSTOM CANDLE COMPOSER (3 VESSELS + 9 OILS)
  function renderComposer() {
    var vesselBox = document.getElementById('vessel-options');
    vesselBox.innerHTML = VESSEL_OPTIONS.map(function (v) {
      var active = state.custom.vesselId === v.id;
      return (
        '<button type="button" class="option-card ' + (active ? 'active' : '') + '" data-vessel="' + v.id + '">' +
          '<div class="vessel-img-box"><img src="' + v.image + '" alt="' + escapeHtml(v.name) + '" loading="lazy" referrerpolicy="no-referrer" /></div>' +
          '<div class="vessel-card-body">' +
            '<span style="font-size:12px;font-weight:600">' + escapeHtml(v.name) + '</span>' +
            '<span class="meta-text">' + escapeHtml(v.finish) + '</span>' +
            '<span class="mono-tabular eyebrow mt-1">' + (v.extraPrice === 0 ? 'Termasuk' : '+' + formatIDR(v.extraPrice)) + '</span>' +
          '</div>' +
        '</button>'
      );
    }).join('');
    vesselBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.custom.vesselId = btn.dataset.vessel;
        renderComposer();
      });
    });

    var wickBox = document.getElementById('wick-options');
    wickBox.innerHTML = WICK_OPTIONS.map(function (w) {
      var active = state.custom.wickId === w.id;
      return (
        '<button type="button" class="option-card wick-card ' + (active ? 'active' : '') + '" data-wick="' + w.id + '">' +
          '<div class="wick-top"><span>' + escapeHtml(w.name) + '</span><span class="mono-tabular">' + (w.extraPrice === 0 ? 'Termasuk' : '+' + formatIDR(w.extraPrice)) + '</span></div>' +
          '<p class="meta-text mt-1">' + escapeHtml(w.detail) + '</p>' +
        '</button>'
      );
    }).join('');
    wickBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.custom.wickId = btn.dataset.wick;
        renderComposer();
      });
    });

    var oilGroups = [
      { layer: 'top', title: 'Lapisan Atas (00:00 – 00:45)', key: 'topOilId' },
      { layer: 'heart', title: 'Lapisan Inti (00:45 – 02:30)', key: 'heartOilId' },
      { layer: 'base', title: 'Lapisan Dasar (02:30 – 04:00)', key: 'baseOilId' },
    ];
    var oilContainer = document.getElementById('oil-layers-container');
    oilContainer.innerHTML = oilGroups.map(function (g) {
      var cards = BOTANICAL_OILS.filter(function (o) { return o.layer === g.layer; }).map(function (o) {
        var active = state.custom[g.key] === o.id;
        return (
          '<button type="button" class="option-card oil-card ' + (active ? 'active' : '') + '" data-layer-key="' + g.key + '" data-oil-id="' + o.id + '">' +
            '<div class="oil-thumb"><img src="' + o.image + '" alt="' + escapeHtml(o.name) + '" loading="lazy" referrerpolicy="no-referrer" /></div>' +
            '<div style="min-width:0">' +
              '<div style="font-size:12px;font-weight:600">' + escapeHtml(o.name) + '</div>' +
              '<div class="meta-text">' + escapeHtml(o.origin) + '</div>' +
            '</div>' +
          '</button>'
        );
      }).join('');
      return '<div><span class="control-sublabel">' + g.title + '</span><div class="oil-grid">' + cards + '</div></div>';
    }).join('');

    oilContainer.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.custom[btn.dataset.layerKey] = btn.dataset.oilId;
        renderComposer();
      });
    });

    var concs = [
      { id: 'halus', label: 'Halus (8%)' },
      { id: 'seimbang', label: 'Seimbang (10%)' },
      { id: 'pekat', label: 'Pekat (12%)' },
    ];
    var concBox = document.getElementById('concentration-options');
    concBox.innerHTML = concs.map(function (c) {
      var active = state.custom.concentration === c.id;
      return '<button type="button" class="conc-btn ' + (active ? 'active' : '') + '" data-conc="' + c.id + '">' + c.label + '</button>';
    }).join('');
    concBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.custom.concentration = btn.dataset.conc;
        renderComposer();
      });
    });

    // Update Preview Card
    var vessel = VESSEL_OPTIONS.find(function (v) { return v.id === state.custom.vesselId; }) || VESSEL_OPTIONS[0];
    var wick = WICK_OPTIONS.find(function (w) { return w.id === state.custom.wickId; }) || WICK_OPTIONS[0];
    var topOil = BOTANICAL_OILS.find(function (o) { return o.id === state.custom.topOilId; }) || BOTANICAL_OILS[0];
    var heartOil = BOTANICAL_OILS.find(function (o) { return o.id === state.custom.heartOilId; }) || BOTANICAL_OILS[3];
    var baseOil = BOTANICAL_OILS.find(function (o) { return o.id === state.custom.baseOilId; }) || BOTANICAL_OILS[6];

    var concExtra = state.custom.concentration === 'pekat' ? 35000 : state.custom.concentration === 'seimbang' ? 15000 : 0;
    var totalPrice = CUSTOM_BASE_PRICE + vessel.extraPrice + wick.extraPrice + concExtra;

    document.getElementById('custom-vessel-img').src = vessel.image;
    document.getElementById('custom-vessel-label').textContent = 'Pratinjau Wadah · ' + vessel.name;
    document.getElementById('custom-engraving-preview').textContent = state.custom.engravingText.trim() || 'TANPA UKIRAN';
    document.getElementById('custom-wick-summary').textContent = wick.name;
    document.getElementById('custom-burn-summary').textContent = wick.burnCharacter;
    document.getElementById('custom-total-price').textContent = formatIDR(totalPrice);

    document.getElementById('custom-selected-oils').innerHTML = [
      { label: 'Atas', oil: topOil },
      { label: 'Inti', oil: heartOil },
      { label: 'Dasar', oil: baseOil },
    ].map(function (s) {
      return (
        '<div class="selected-oil-mini">' +
          '<img src="' + s.oil.image + '" alt="' + escapeHtml(s.oil.name) + '" referrerpolicy="no-referrer" />' +
          '<div class="meta-text">' + s.label + '</div>' +
          '<div style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + escapeHtml(s.oil.name) + '</div>' +
        '</div>'
      );
    }).join('');

    document.getElementById('add-custom-candle-btn').onclick = function () {
      var engraving = state.custom.engravingText.trim() || 'TANPA UKIRAN';
      var concLabel = state.custom.concentration === 'pekat' ? 'Pekat 12%' : state.custom.concentration === 'seimbang' ? 'Seimbang 10%' : 'Halus 8%';
      var notesLabel = topOil.name + ' · ' + heartOil.name + ' · ' + baseOil.name;
      var cartId = 'custom-' + vessel.id + '-' + wick.id + '-' + topOil.id + '-' + heartOil.id + '-' + baseOil.id + '-' + state.custom.concentration + '-' + engraving;

      var existing = state.cart.find(function (i) { return i.cartId === cartId; });
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          cartId: cartId,
          type: 'custom',
          title: 'Racikan Kustom — ' + engraving,
          variantLabel: '220g · ' + concLabel,
          unitPrice: totalPrice,
          quantity: 1,
          image: vessel.image,
          customSummary: vessel.name + ' · ' + wick.name + ' | ' + notesLabel,
        });
      }
      saveStorage(STORAGE_KEYS.cart, state.cart);
      updateCartBadge();
      state.cartStep = 'cart';
      openCartDrawer();
      showToast('Racikan "' + engraving + '" ditambahkan ke Tas Belanja.');
    };

    attachFallbackImages(document.getElementById('atelier-studio'));
  }

  // 5. RITUAL STEPS & PERSONAL BURN LOG
  function renderJournal() {
    var ritualList = document.getElementById('ritual-steps');
    ritualList.innerHTML = RITUAL_STEPS.map(function (step) {
      return (
        '<div class="ritual-item">' +
          '<div class="ritual-thumb"><img src="' + step.image + '" alt="' + escapeHtml(step.title) + '" loading="lazy" referrerpolicy="no-referrer" /></div>' +
          '<div>' +
            '<h3 class="ritual-title">' + escapeHtml(step.title) + '</h3>' +
            '<p class="meta-text leading-relaxed">' + escapeHtml(step.desc) + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    var select = document.getElementById('log-candle-select');
    if (select.options.length === 0) {
      CANDLE_CATALOG.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        select.appendChild(opt);
      });
      var customOpt = document.createElement('option');
      customOpt.value = 'Racikan Kustom KALA';
      customOpt.textContent = 'Racikan Kustom KALA';
      select.appendChild(customOpt);
    }

    renderBurnLogs();
    attachFallbackImages(ritualList);
  }

  function renderBurnLogs() {
    var list = document.getElementById('burn-log-list');
    if (state.burnLogs.length === 0) {
      list.innerHTML = '<p class="meta-text" style="text-align:center;padding:16px;border:1px dashed var(--border);border-radius:8px;">Belum ada catatan pembakaran tersimpan.</p>';
      return;
    }

    list.innerHTML = state.burnLogs.map(function (entry) {
      return (
        '<div class="burn-log-entry">' +
          '<div>' +
            '<div style="font-size:12px;font-weight:600">' + escapeHtml(entry.candleName) + ' <span class="meta-text mono-tabular" style="font-weight:400">· ' + entry.durationMinutes + ' mnt · ' + escapeHtml(entry.loggedAt) + '</span></div>' +
            '<p class="meta-text mt-1">' + escapeHtml(entry.note) + '</p>' +
          '</div>' +
          '<button type="button" class="icon-trash-btn" data-delete-log="' + escapeHtml(entry.id) + '" aria-label="Hapus catatan">✕</button>' +
        '</div>'
      );
    }).join('');

    list.querySelectorAll('[data-delete-log]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.dataset.deleteLog;
        state.burnLogs = state.burnLogs.filter(function (l) { return l.id !== id; });
        saveStorage(STORAGE_KEYS.burnLogs, state.burnLogs);
        renderBurnLogs();
      });
    });
  }

  // 6. CART & CHECKOUT DRAWER
  function addCatalogToCart(candleId, weight) {
    var c = CANDLE_CATALOG.find(function (item) { return item.id === candleId; });
    if (!c) return;
    var unitPrice = weight === '320g' ? c.price320g : c.price180g;
    var cartId = c.id + '-' + weight;

    var existing = state.cart.find(function (i) { return i.cartId === cartId; });
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        cartId: cartId,
        type: 'catalog',
        title: c.name,
        variantLabel: weight + ' · ' + c.phaseLabel,
        unitPrice: unitPrice,
        quantity: 1,
        image: c.image,
      });
    }
    saveStorage(STORAGE_KEYS.cart, state.cart);
    updateCartBadge();
    showToast(c.name + ' (' + weight + ') ditambahkan ke Tas Belanja.');
  }

  function updateCartBadge() {
    var total = state.cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.getElementById('header-cart-count').textContent = '(' + total + ')';
  }

  function openCartDrawer() {
    if (state.cart.length > 0 && state.cartStep === 'confirmed') {
      state.cartStep = 'cart';
    }
    renderCartDrawer();
    document.getElementById('cart-backdrop').classList.remove('hidden');
  }

  function closeCartDrawer() {
    document.getElementById('cart-backdrop').classList.add('hidden');
  }

  function renderCartDrawer() {
    var titleEl = document.getElementById('cart-drawer-title');
    var viewEl = document.getElementById('cart-step-view');

    var subtotal = state.cart.reduce(function (s, i) { return s + i.unitPrice * i.quantity; }, 0);
    var qualifiesFree = subtotal >= FREE_SHIPPING_THRESHOLD;
    var shippingFee = state.cart.length === 0 || qualifiesFree ? 0 : BASE_SHIPPING_FEE;
    var total = subtotal + shippingFee;

    if (state.cartStep === 'cart') {
      titleEl.textContent = 'Tas Belanja';
      if (state.cart.length === 0) {
        viewEl.innerHTML =
          '<div class="cart-items-scroll" style="justify-content:center;align-items:center;text-align:center;">' +
            '<p style="font-family:var(--font-display);font-size:20px;">Tas belanja Anda masih kosong.</p>' +
            '<p class="meta-text" style="max-width:28ch;">Pilih lilin dari koleksi sirkadian atau racik komposisi khusus Anda di Studio Atelier.</p>' +
          '</div>';
        return;
      }

      var remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      var pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

      var itemsHtml = state.cart.map(function (item) {
        return (
          '<div class="cart-item-row">' +
            '<div class="cart-thumb">' +
              (item.image ? '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" referrerpolicy="no-referrer" />' : '<span>KUSTOM</span>') +
            '</div>' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start;">' +
                '<div><div style="font-size:13px;font-weight:600">' + escapeHtml(item.title) + '</div><div class="meta-text">' + escapeHtml(item.variantLabel) + '</div></div>' +
                '<button type="button" class="icon-trash-btn" data-remove-cart="' + escapeHtml(item.cartId) + '" aria-label="Hapus">✕</button>' +
              '</div>' +
              (item.customSummary ? '<p class="meta-text mt-1">' + escapeHtml(item.customSummary) + '</p>' : '') +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">' +
                '<div class="qty-stepper">' +
                  '<button type="button" data-qty-delta="-1" data-qty-id="' + escapeHtml(item.cartId) + '">−</button>' +
                  '<span class="mono-tabular">' + item.quantity + '</span>' +
                  '<button type="button" data-qty-delta="1" data-qty-id="' + escapeHtml(item.cartId) + '">+</button>' +
                '</div>' +
                '<span class="mono-tabular" style="font-size:13px;font-weight:600">' + formatIDR(item.unitPrice * item.quantity) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      viewEl.innerHTML =
        '<div class="free-ship-banner">' +
          '<div>' + (qualifiesFree ? 'Anda berhak mendapatkan Gratis Ongkos Kirim.' : 'Tambah <strong class="mono-tabular">' + formatIDR(remaining) + '</strong> lagi untuk Gratis Ongkir.') + '</div>' +
          '<div class="bar-track" style="margin-top:8px;"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
        '</div>' +
        '<div class="cart-items-scroll">' + itemsHtml + '</div>' +
        '<div class="drawer-footer">' +
          '<div class="summary-line"><span class="meta-text">Subtotal</span><span class="mono-tabular">' + formatIDR(subtotal) + '</span></div>' +
          '<div class="summary-line"><span class="meta-text">Pengiriman Terlindungi</span><span class="mono-tabular">' + (shippingFee === 0 ? 'Gratis' : formatIDR(shippingFee)) + '</span></div>' +
          '<div class="summary-total"><span>Total</span><span class="mono-tabular">' + formatIDR(total) + '</span></div>' +
          '<button type="button" id="go-checkout-btn" class="btn-accent btn-full">Lanjutkan ke Pengiriman</button>' +
        '</div>';

      viewEl.querySelectorAll('[data-remove-cart]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.dataset.removeCart;
          state.cart = state.cart.filter(function (i) { return i.cartId !== id; });
          saveStorage(STORAGE_KEYS.cart, state.cart);
          updateCartBadge();
          renderCartDrawer();
        });
      });

      viewEl.querySelectorAll('[data-qty-delta]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.dataset.qtyId;
          var delta = Number(btn.dataset.qtyDelta);
          state.cart = state.cart
            .map(function (i) {
              if (i.cartId === id) {
                return Object.assign({}, i, { quantity: i.quantity + delta });
              }
              return i;
            })
            .filter(function (i) { return i.quantity > 0; });
          saveStorage(STORAGE_KEYS.cart, state.cart);
          updateCartBadge();
          renderCartDrawer();
        });
      });

      document.getElementById('go-checkout-btn').onclick = function () {
        state.cartStep = 'checkout';
        state.checkoutError = '';
        renderCartDrawer();
      };
      attachFallbackImages(viewEl);
      return;
    }

    if (state.cartStep === 'checkout') {
      titleEl.textContent = 'Rincian Pengiriman';
      viewEl.innerHTML =
        '<form id="checkout-form" class="checkout-form">' +
          (state.checkoutError ? '<div style="padding:10px;border-radius:8px;background:#FEE2E2;color:#991B1B;font-size:12px;">' + escapeHtml(state.checkoutError) + '</div>' : '') +
          '<div><label class="control-sublabel">Nama Lengkap Penerima</label><input required id="co-name" class="text-input" placeholder="Contoh: Nadira Pratiwi" /></div>' +
          '<div><label class="control-sublabel">Nomor Telepon / WhatsApp</label><input required id="co-phone" class="text-input mono-tabular" placeholder="0812-xxxx-xxxx" /></div>' +
          '<div><label class="control-sublabel">Alamat Pengiriman Lengkap</label><textarea required id="co-addr" rows="3" class="text-input" placeholder="Nama jalan, nomor rumah, kecamatan, kota"></textarea></div>' +
          '<div><label class="control-sublabel">Kode Pos</label><input required id="co-zip" maxlength="5" class="text-input mono-tabular" placeholder="12190" /></div>' +
          '<div><span class="control-sublabel">Metode Pembayaran</span><div class="payment-grid">' +
            '<label class="option-card wick-card"><input type="radio" name="paymethod" value="transfer" checked /> Transfer / QRIS</label>' +
            '<label class="option-card wick-card"><input type="radio" name="paymethod" value="cod" /> Bayar di Tempat (COD)</label>' +
          '</div></div>' +
          '<div class="drawer-footer" style="margin-top:auto;padding:14px 0 0;background:transparent;">' +
            '<div class="summary-total"><span>Total Pembayaran</span><span class="mono-tabular">' + formatIDR(total) + '</span></div>' +
            '<div style="display:flex;gap:10px;">' +
              '<button type="button" id="back-cart-btn" class="btn-outline">Kembali</button>' +
              '<button type="submit" class="btn-accent" style="flex:1">Konfirmasi Pesanan</button>' +
            '</div>' +
          '</div>' +
        '</form>';

      document.getElementById('back-cart-btn').onclick = function () {
        state.cartStep = 'cart';
        renderCartDrawer();
      };

      document.getElementById('checkout-form').onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('co-name').value.trim();
        var phone = document.getElementById('co-phone').value.trim();
        var addr = document.getElementById('co-addr').value.trim();
        var zip = document.getElementById('co-zip').value.replace(/\D/g, '');
        var pay = document.querySelector('input[name="paymethod"]:checked').value;

        if (!name || !phone || !addr || zip.length < 5) {
          state.checkoutError = 'Mohon lengkapi nama, WhatsApp, alamat lengkap, dan kode pos 5 digit.';
          renderCartDrawer();
          return;
        }

        var orderNum = '#KL-' + Math.floor(1000 + Math.random() * 9000);
        var order = {
          orderNumber: orderNum,
          customerName: name,
          address: addr,
          postalCode: zip,
          paymentMethod: pay,
          items: state.cart.slice(),
          total: total,
        };

        var existingOrders = loadStorage(STORAGE_KEYS.orders, []);
        saveStorage(STORAGE_KEYS.orders, [order].concat(existingOrders).slice(0, 10));

        state.confirmedOrder = order;
        state.cart = [];
        saveStorage(STORAGE_KEYS.cart, []);
        updateCartBadge();
        state.cartStep = 'confirmed';
        renderCartDrawer();
      };
      return;
    }

    if (state.cartStep === 'confirmed' && state.confirmedOrder) {
      var o = state.confirmedOrder;
      titleEl.textContent = 'Pesanan Dikonfirmasi';
      viewEl.innerHTML =
        '<div class="cart-items-scroll">' +
          '<div class="card-surface" style="background:var(--surface)">' +
            '<div class="stock-status">● Pesanan ' + escapeHtml(o.orderNumber) + ' Dikonfirmasi</div>' +
            '<h3 style="font-family:var(--font-display);font-size:22px;margin-top:6px;">Terima kasih, ' + escapeHtml(o.customerName) + '.</h3>' +
            '<p class="meta-text mt-1">Batch lilin Anda sedang disiapkan untuk pengiriman ke ' + escapeHtml(o.address) + ' (' + escapeHtml(o.postalCode) + ').</p>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">' +
            '<strong>Ringkasan Transaksi</strong>' +
            o.items.map(function (item) {
              return '<div class="spec-row"><span>' + escapeHtml(item.title) + ' × ' + item.quantity + '</span><span class="mono-tabular">' + formatIDR(item.unitPrice * item.quantity) + '</span></div>';
            }).join('') +
            '<div class="summary-total"><span>Total (' + (o.paymentMethod === 'cod' ? 'COD' : 'Transfer') + ')</span><span class="mono-tabular">' + formatIDR(o.total) + '</span></div>' +
          '</div>' +
          '<button type="button" id="finish-order-btn" class="btn-primary btn-full">Selesai & Kembali ke Toko</button>' +
        '</div>';

      document.getElementById('finish-order-btn').onclick = function () {
        state.cartStep = 'cart';
        closeCartDrawer();
      };
    }
  }

  // 7. ASSET CATALOG MODAL (32 AI IMAGES)
  function openAssetModal() {
    renderAssetModal();
    document.getElementById('asset-modal').classList.remove('hidden');
  }

  function closeAssetModal() {
    document.getElementById('asset-modal').classList.add('hidden');
  }

  function renderAssetModal() {
    var categories = [
      'Semua',
      'Hero Sirkadian',
      'Koleksi Produk',
      'Wadah Kustom',
      'Bahan Minyak Botani',
      'Jurnal Bakar & Atelier',
    ];
    var tabsBox = document.getElementById('asset-filter-tabs');
    tabsBox.innerHTML = categories.map(function (cat) {
      var active = state.assetCategory === cat;
      return '<button type="button" class="chip-btn ' + (active ? 'active' : '') + '" data-asset-cat="' + cat + '">' + cat + '</button>';
    }).join('');
    tabsBox.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.assetCategory = btn.dataset.assetCat;
        renderAssetModal();
      });
    });

    var filtered = state.assetCategory === 'Semua'
      ? ASSET_CATALOG
      : ASSET_CATALOG.filter(function (a) { return a.category === state.assetCategory; });

    var listEl = document.getElementById('asset-list');
    listEl.innerHTML = filtered.map(function (a) {
      return (
        '<div class="asset-row">' +
          '<div class="asset-row-thumb"><img src="./' + a.file + '" alt="' + escapeHtml(a.title) + '" loading="lazy" referrerpolicy="no-referrer" /></div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span style="font-size:12px;font-weight:600">' + escapeHtml(a.title) + ' <span class="meta-text mono-tabular" style="font-weight:400">· ' + a.ratio + ' · ' + a.file + '</span></span>' +
              '<button type="button" class="btn-outline" style="padding:4px 10px;font-size:11px;" data-copy-prompt="' + a.key + '">Salin Prompt</button>' +
            '</div>' +
            '<p class="meta-text mt-1 leading-relaxed">' + escapeHtml(a.prompt) + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    listEl.querySelectorAll('[data-copy-prompt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var entry = ASSET_CATALOG.find(function (a) { return a.key === btn.dataset.copyPrompt; });
        if (!entry || !navigator.clipboard) return;
        navigator.clipboard.writeText(entry.prompt).then(function () {
          btn.textContent = 'Disalin ✓';
          setTimeout(function () { btn.textContent = 'Salin Prompt'; }, 1600);
        });
      });
    });

    attachFallbackImages(listEl);
  }

  // INITIALIZE EVENT LISTENERS & FIRST RENDER
  function init() {
    renderHero();
    renderCollectionFilters();
    renderCollectionGrid();
    renderComposer();
    renderJournal();
    updateCartBadge();
    attachFallbackImages(document);

    // Search
    var searchEl = document.getElementById('collection-search');
    searchEl.addEventListener('input', function () {
      state.searchQuery = searchEl.value;
      renderCollectionGrid();
    });

    document.getElementById('reset-filters-btn').addEventListener('click', function () {
      state.filterPhase = 'all';
      state.filterFamily = 'all';
      state.searchQuery = '';
      searchEl.value = '';
      renderCollectionFilters();
      renderCollectionGrid();
    });

    // Engraving input
    var engravingEl = document.getElementById('engraving-input');
    engravingEl.addEventListener('input', function () {
      var cleaned = engravingEl.value.replace(/[^a-zA-Z0-9 .&'-]/g, '').slice(0, 24);
      if (engravingEl.value !== cleaned) engravingEl.value = cleaned;
      state.custom.engravingText = cleaned;
      document.getElementById('custom-engraving-preview').textContent = cleaned.trim() || 'TANPA UKIRAN';
    });

    // Burn Log Form
    document.getElementById('burn-log-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var noteEl = document.getElementById('log-note-input');
      var noteVal = noteEl.value.trim();
      if (!noteVal) return;

      var candleVal = document.getElementById('log-candle-select').value;
      var durationVal = Number(document.getElementById('log-duration-input').value) || 120;
      var dateLabel = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      state.burnLogs.unshift({
        id: 'log-' + Date.now(),
        candleName: candleVal,
        durationMinutes: durationVal,
        note: noteVal,
        loggedAt: dateLabel,
      });
      saveStorage(STORAGE_KEYS.burnLogs, state.burnLogs);
      noteEl.value = '';
      renderBurnLogs();
      showToast('Catatan sesi pembakaran disimpan.');
    });

    // Mobile Nav Toggle
    var mobileBtn = document.getElementById('mobile-menu-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    mobileBtn.addEventListener('click', function () {
      var hidden = mobileNav.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', String(!hidden));
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Cart Drawer Triggers
    document.getElementById('open-cart-btn').addEventListener('click', openCartDrawer);
    document.getElementById('close-cart-btn').addEventListener('click', closeCartDrawer);
    document.getElementById('toast-open-cart').addEventListener('click', function () {
      document.getElementById('toast').classList.add('hidden');
      openCartDrawer();
    });
    document.getElementById('cart-backdrop').addEventListener('click', function (e) {
      if (e.target.id === 'cart-backdrop') closeCartDrawer();
    });

    // PDP Modal Triggers
    document.getElementById('pdp-close-btn').addEventListener('click', closePdpModal);
    document.getElementById('pdp-modal').addEventListener('click', function (e) {
      if (e.target.id === 'pdp-modal') closePdpModal();
    });

    // Asset Catalog Modal Triggers
    document.getElementById('open-asset-catalog-btn').addEventListener('click', openAssetModal);
    document.getElementById('asset-close-btn').addEventListener('click', closeAssetModal);
    document.getElementById('asset-modal').addEventListener('click', function (e) {
      if (e.target.id === 'asset-modal') closeAssetModal();
    });

    // Escape closes modals/drawers
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePdpModal();
        closeAssetModal();
        closeCartDrawer();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
