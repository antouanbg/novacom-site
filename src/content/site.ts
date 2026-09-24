import type { L } from "@/lib/i18n";

// Unsplash photos (free for commercial use, see CREDITS.md).
export const photo = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// Real Novacom photos (client-supplied 2026-09-24, EXIF stripped, plates blurred). Paths under /public.
export const REAL = {
  heroSofia: "/images/hero-sofia.webp",
  roofVitosha: "/images/projects/roof-sofia-vitosha.webp",
  roofCommercial: "/images/projects/roof-commercial-ballast.webp",
  roofDense: "/images/projects/roof-building-dense.webp",
  carport: "/images/projects/carport-home.webp",
  ground1: "/images/projects/ground-mount-1.webp",
  ground2: "/images/projects/ground-mount-2.webp",
  pergola: "/images/projects/pergola-bifacial.webp",
  pergolaUnder: "/images/projects/pergola-underside.webp",
  evOpen: "/images/ev/evpoint-open.webp",
  evDcAc: "/images/ev/evpoint-dc-ac.webp",
  smaMeter: "/images/monitoring/sma-energy-meter.webp",
  switchboard: "/images/install/switchboard-full.webp",
  breakers: "/images/install/switchboard-breakers.webp",
  trackerField: "/images/projects/tracker-field.webp",
  trackerDetail: "/images/mounting/tracker-detail.webp",
  trackerUnder: "/images/projects/tracker-underside.webp",
  trackerTrailers: "/images/projects/tracker-trailers.webp",
  trackerCabinet: "/images/projects/tracker-trailer-cabinet.webp",
  bessOpen: "/images/storage/bess-cabinet-open.webp",
  bessRender: "/images/storage/bess-cabinet-render.webp",
  bessFactory: "/images/storage/bess-cabinet-factory.webp",
  mihaylovoSun: "/images/projects/mihaylovo-rows-sun.webp",
  mihaylovoFrost: "/images/projects/mihaylovo-rows-frost.webp",
  groundSnow: "/images/projects/ground-rows-snow.webp",
  inverterRoom: "/images/install/inverter-room.webp",
  inverterRoomWide: "/images/install/inverter-room-wide.webp",
  ballastDetail: "/images/mounting/ballast-detail.webp",
  ballastRows: "/images/mounting/ballast-rows.webp",
  pernikSky: "/images/projects/pernik-rows-sky.webp",
  pernikUnder: "/images/projects/pernik-structure-under.webp",
  pernikWide: "/images/projects/pernik-rows-wide.webp",
  pernikRidge: "/images/projects/pernik-ridge.webp",
  pernikRidgeWide: "/images/projects/pernik-ridge-wide.webp",
  pernikPylon: "/images/projects/pernik-rows-pylon.webp",
  pernikBessOpen: "/images/storage/pernik-bess-open.webp",
  pernikPcs: "/images/storage/pernik-pcs-rack.webp",
  pernikDelivery: "/images/projects/pernik-hysolar-delivery.webp",
  pernikContainer: "/images/storage/pernik-bess-container.webp",
};

export const PH = {
  heroRoof: "1613665813446-82a78c468a1d",
  cityRoof: "1611365892117-00ac5ef43c90",
  fieldAerial: "1497440001374-f26997328c1b",
  fieldSky: "1508514177221-188b1cf16e9d",
  fieldClouds: "1509391366360-2e959784a276",
  panelsClose: "1545209463-e2825498edbf",
  panelsForest: "1592833159155-c62df1b65634",
  roofInstall: "1624397640148-949b1732bb0a",
  handsInstall: "1559302504-64aae6ca6b6d",
  grid: "1473341304170-971dccb5ac1e",
  wind: "1548337138-e87d889cc369",
  teamLaptops: "1522071820081-009f0129c71c",
  engineerLab: "1581091226825-a6a2a5aee158",
  engineerDraw: "1581092160562-40aa08e78837",
  engineerCode: "1581094794329-c8112a89af12",
  evCharging: "1593941707882-a5bba14938c7",
};

export const contact = {
  phone: "+359 88 760 2323",
  phoneHref: "tel:+359887602323",
  email: "support@novacom.bg",
};

export const ui = {
  quote: { bg: "Поискай оферта", en: "Request a quote" },
  learnMore: { bg: "Научете повече", en: "Learn more" },
  allProjects: { bg: "Всички проекти", en: "All projects" },
  allProducts: { bg: "Всички продукти", en: "All products" },
  menu: { bg: "Меню", en: "Menu" },
  close: { bg: "Затвори", en: "Close" },
  rights: { bg: "Всички права запазени.", en: "All rights reserved." },
  ctaTitle: { bg: "Готови ли сте за собствена енергия?", en: "Ready to generate your own energy?" },
  ctaText: {
    bg: "Супер ниски цени за проектиране на ФЕЦ и батерийни системи. Безплатна консултация, енергиен и финансов анализ.",
    en: "Very low prices for designing PV plants and battery systems. Free consultation plus an energy and financial analysis.",
  },
} satisfies Record<string, L>;

export type NavItem = { label: L; path: string; children?: { label: L; path: string }[] };

export type Solution = {
  slug: string;
  title: L;
  short: L;
  intro: L;
  img: string;
  points: L[];
};

export const solutions: Solution[] = [
  {
    slug: "industry",
    title: { bg: "Индустрия и производство", en: "Industry & manufacturing" },
    short: {
      bg: "ФЕЦ и батерии за собствено потребление на производства с високо натоварване.",
      en: "PV plants and storage for self-consumption at energy-intensive production sites.",
    },
    intro: {
      bg: "Производствата плащат най-скъпата енергия в пиковите часове. С покривна или наземна ФЕЦ и система за съхранение намалявате разходите, изглаждате пиковете и защитавате критичните процеси.",
      en: "Manufacturers pay the most for energy during peak hours. A rooftop or ground-mounted PV plant with battery storage lowers costs, shaves peaks and protects critical processes.",
    },
    img: REAL.pernikRidgeWide,
    points: [
      { bg: "Изрязване на пикове и управление на товара", en: "Peak shaving and load management" },
      { bg: "Резервно захранване за критични консуматори", en: "Backup power for critical loads" },
      { bg: "Оразмеряване по реалния профил на потребление", en: "Sized to your real load profile" },
    ],
  },
  {
    slug: "commercial",
    title: { bg: "Търговски обекти и логистика", en: "Commercial & logistics" },
    short: {
      bg: "Решения за складове, магазини, хотели и офис сгради.",
      en: "Solutions for warehouses, retail, hotels and office buildings.",
    },
    intro: {
      bg: "Големите покриви на складове и търговски сгради са идеални за соларна енергия. Консумацията през деня съвпада с производството, а възвръщаемостта е бърза.",
      en: "Large warehouse and retail roofs are ideal for solar. Daytime consumption matches generation, so payback is fast.",
    },
    img: REAL.roofCommercial,
    points: [
      { bg: "Максимално собствено потребление", en: "Maximum self-consumption" },
      { bg: "Хладилни и климатични системи на соларна енергия", en: "Cooling and HVAC powered by solar" },
      { bg: "Зарядни станции за служители и клиенти", en: "EV charging for staff and customers" },
    ],
  },
  {
    slug: "agriculture",
    title: { bg: "Земеделие", en: "Agriculture" },
    short: {
      bg: "Енергия за ферми, напояване, хладилни бази и оранжерии.",
      en: "Energy for farms, irrigation, cold storage and greenhouses.",
    },
    intro: {
      bg: "Напояването, охлаждането и обработката на продукция изискват сигурна и евтина енергия, често на отдалечени места. Хибридните и автономните системи дават независимост от мрежата.",
      en: "Irrigation, cooling and processing need reliable, affordable energy, often at remote sites. Hybrid and off-grid systems provide independence from the grid.",
    },
    img: REAL.trackerTrailers,
    points: [
      { bg: "Автономни (off-grid) и хибридни системи", en: "Off-grid and hybrid systems" },
      { bg: "Соларни помпи за напояване", en: "Solar-powered irrigation pumps" },
      { bg: "Наземни конструкции и мобилни тракери на ремарке", en: "Ground mounts and mobile trailer-mounted trackers" },
    ],
  },
  {
    slug: "communities",
    title: { bg: "Енергийни общности", en: "Energy communities" },
    short: {
      bg: "Споделена соларна енергия за общини, квартали и групи от фирми.",
      en: "Shared solar energy for municipalities, neighbourhoods and business groups.",
    },
    intro: {
      bg: "Енергийните общности позволяват на няколко потребители да споделят производството на обща централа. Още през 2020 г. нашият основател разработи концепцията „Обединен енергиен клъстер“ (ОЕК): модел за частна инвестиция в децентрализирана енергийна структура, при който потребителите придобиват дял в своя доставчик на енергия и стават просуматори. Съдействаме от модела и документите до изграждането.",
      en: "Energy communities let several consumers share the output of a common plant. Back in 2020 our founder developed the United Energy Cluster (OEK) concept: a model for private investment in decentralised energy where consumers take a share in their energy supplier and become prosumers. We support you from the model and paperwork through to construction.",
    },
    img: REAL.roofDense,
    points: [
      { bg: "Готов модел „Обединен енергиен клъстер“ (ОЕК) с дялово участие", en: "Ready-made United Energy Cluster (OEK) model with member shares" },
      { bg: "Консултация за правната форма и модела на общността", en: "Advice on the legal form and the community model" },
      { bg: "Обща ФЕЦ и съхранение", en: "Shared PV plant and storage" },
      { bg: "Мониторинг и разпределение на енергията", en: "Monitoring and energy allocation" },
    ],
  },
  {
    slug: "homes",
    title: { bg: "Домакинства", en: "Homes" },
    short: {
      bg: "Хибридни системи с батерия за къщи и вили.",
      en: "Hybrid systems with batteries for houses and villas.",
    },
    intro: {
      bg: "Соларна система с батерия намалява сметката за ток и осигурява резерв при прекъсване на захранването.",
      en: "A solar system with a battery lowers your bill and keeps the lights on during outages.",
    },
    img: REAL.pergola,
    points: [
      { bg: "Мрежови и хибридни системи", en: "Grid-tied and hybrid systems" },
      { bg: "Домашни батерии", en: "Home batteries" },
      { bg: "Мониторинг от телефона", en: "Monitoring from your phone" },
    ],
  },
];

export type ProductItem = { brand: string; model: string; specs: L; featured?: boolean };

export type Product = {
  slug: string;
  title: L;
  short: L;
  intro: L;
  img: string;
  features: L[];
  items: ProductItem[];
};

// Brands and models from Novacom's offers (approved for publication 2026-09-24).
export const products: Product[] = [
  {
    slug: "pv-modules",
    title: { bg: "Фотоволтаични панели", en: "PV modules" },
    short: {
      bg: "N-type двулицеви панели Suntech 455 Wp.",
      en: "Suntech n-type bifacial 455 Wp modules.",
    },
    intro: {
      bg: "Основно използваме панели Suntech: монокристални n-type двулицеви модули с висока ефективност и дългосрочна гаранция, за покривни и наземни централи.",
      en: "Our main modules are Suntech: high-efficiency monocrystalline n-type bifacial modules with long-term warranties, for rooftop and ground-mounted plants.",
    },
    img: PH.panelsClose,
    features: [
      { bg: "Ефективност на модула ≥ 22,5%", en: "Module efficiency ≥ 22.5%" },
      { bg: "Продуктова гаранция 15 години", en: "15-year product warranty" },
      { bg: "Линейна гаранция за мощност 30 години", en: "30-year linear power warranty" },
      { bg: "Деградация първа година ≤ 1%", en: "First-year degradation ≤ 1%" },
    ],
    items: [
      { brand: "Suntech", model: "STP455S-I54-Nsh+ 455 Wp", specs: { bg: "n-type, двулицев, черна рамка, 1952×1134×30 mm", en: "n-type, bifacial, black frame, 1952×1134×30 mm" }, featured: true },
      { brand: "HY Solar", model: "455 W Full Frame", specs: { bg: "TOPCon, 16BB half-cut, двулицев, стъкло/стъкло", en: "TOPCon, 16BB half-cut, bifacial, dual-glass" } },
    ],
  },
  {
    slug: "inverters",
    title: { bg: "Инвертори", en: "Inverters" },
    short: {
      bg: "Хибридни трифазни инвертори LV и HV с Zero Export.",
      en: "Three-phase LV and HV hybrid inverters with zero export.",
    },
    intro: {
      bg: "Хибридните инвертори управляват едновременно панелите, батерията и мрежата. Смарт метърът ограничава връщането на енергия в мрежата (Zero Export), когато това е необходимо.",
      en: "Hybrid inverters manage the panels, battery and grid together. A smart meter limits export to the grid (zero export) where required.",
    },
    img: REAL.inverterRoom,
    features: [
      { bg: "Европейска претеглена ефективност ≥ 97%", en: "European weighted efficiency ≥ 97%" },
      { bg: "Хармоници THD ≤ 3%", en: "Harmonics THD ≤ 3%" },
      { bg: "Продуктова гаранция 10 години", en: "10-year product warranty" },
      { bg: "Смарт метър за Zero Export", en: "Smart meter for zero export" },
    ],
    items: [
      { brand: "Deye", model: "SUN-15K-SG05LP3-EU", specs: { bg: "15 kW хибриден, трифазен, LV, Wi-Fi", en: "15 kW hybrid, three-phase, LV, Wi-Fi" } },
      { brand: "HV", model: "20 kW", specs: { bg: "Промишлен хибриден инвертор, трифазен, високоволтов", en: "Industrial hybrid inverter, three-phase, high-voltage" } },
    ],
  },
  {
    slug: "storage",
    title: { bg: "Системи за съхранение (BESS)", en: "Battery storage (BESS)" },
    short: {
      bg: "Suntech SunStorage Pro 261 kWh за бизнеса, до MWh мащаб, и батерии за дома.",
      en: "Suntech SunStorage Pro 261 kWh for business, up to MWh scale, plus home batteries.",
    },
    intro: {
      bg: "За бизнеса доставяме Suntech SunStorage Pro: интегрирана система „всичко в едно“ с 261 kWh капацитет и 125 kW мощност, течно охлаждане и вградени PCS, BMS и EMS. Шкафовете се свързват паралелно до MWh мащаб. За домовете предлагаме LV и HV батерийни модули с 6000 цикъла.",
      en: "For business we supply Suntech SunStorage Pro, an all-in-one system with 261 kWh capacity and 125 kW power, liquid cooling and built-in PCS, BMS and EMS. Cabinets connect in parallel up to MWh scale. For homes we offer LV and HV battery modules rated for 6,000 cycles.",
    },
    img: REAL.pernikContainer,
    features: [
      { bg: "261 kWh / 125 kW в един шкаф, IP65", en: "261 kWh / 125 kW in one cabinet, IP65" },
      { bg: "Течно охлаждане, вградени PCS, BMS, EMS и защити", en: "Liquid cooling, built-in PCS, BMS, EMS and safety systems" },
      { bg: "Мащабиране: напр. 8 шкафа = 1 MW / 2,09 MWh", en: "Scalable: e.g. 8 cabinets = 1 MW / 2.09 MWh" },
      { bg: "Зареждане при ниски цени и изрязване на пикове", en: "Charging at low prices and peak shaving" },
    ],
    items: [
      { brand: "Suntech", model: "SunStorage Pro STE-261L-125P", specs: { bg: "C&I, 261 kWh / 125 kW, течно охлаждане, 400 V AC, IP65", en: "C&I, 261 kWh / 125 kW, liquid-cooled, 400 V AC, IP65" }, featured: true },
      { brand: "Deye", model: "SE-F16-C", specs: { bg: "16 kWh, LV, 10 години гаранция", en: "16 kWh, LV, 10-year warranty" } },
      { brand: "V-TAC", model: "VT-10240", specs: { bg: "10,24 kWh, LV, 6000 цикъла", en: "10.24 kWh, LV, 6,000 cycles" } },
      { brand: "HV", model: "25 kWh", specs: { bg: "Високоволтов промишлен модул, 6000 цикъла", en: "High-voltage industrial module, 6,000 cycles" } },
    ],
  },
  {
    slug: "mounting",
    title: { bg: "Монтажни конструкции", en: "Mounting systems" },
    short: {
      bg: "Алуминиеви и метални конструкции за покриви и терени.",
      en: "Aluminium and steel structures for roofs and ground.",
    },
    intro: {
      bg: "Използваме нискокорозионни материали и крепежи, които не ускоряват корозията на основната конструкция.",
      en: "We use low-corrosion materials and fasteners that do not accelerate corrosion of the supporting structure.",
    },
    img: REAL.trackerDetail,
    features: [
      { bg: "Скатни и плоски покриви", en: "Pitched and flat roofs" },
      { bg: "Наземни конструкции, навеси и мобилни тракери", en: "Ground mounts, canopies and mobile trackers" },
      { bg: "Продуктова гаранция 10 години", en: "10-year product warranty" },
    ],
    items: [],
  },
  {
    slug: "monitoring",
    title: { bg: "Мониторинг и EMS", en: "Monitoring & EMS" },
    short: {
      bg: "Безплатен мониторинг 24/365, управление на енергията и SMS известия.",
      en: "Free 24/365 monitoring, energy management and SMS alerts.",
    },
    intro: {
      bg: "Софтуерът управлява зареждането на батерията, външни консуматори (зарядна станция, бойлер) и графици, показва прогнози и спестената енергия. Локалният EMS се интегрира и със съществуващи централи, например с инвертори Huawei и SmartLogger.",
      en: "Our software manages battery charging, external loads (EV charger, water heater) and schedules, and shows forecasts and energy saved. The local EMS also integrates with existing plants, e.g. Huawei inverters with SmartLogger.",
    },
    img: REAL.smaMeter,
    features: [
      { bg: "Зареждане при ниски цени на електроенергията", en: "Charging when power prices are low" },
      { bg: "Управление на зарядни станции и консуматори", en: "Control of EV chargers and other loads" },
      { bg: "Локален EMS за C&I и интеграция със съществуваща ФЕЦ", en: "Local EMS for C&I and integration with existing PV" },
    ],
    items: [],
  },
  {
    slug: "ev-charging",
    title: { bg: "Зарядни станции", en: "EV charging" },
    short: {
      bg: "AC и DC зарядни за електромобили за дома, офиса и бизнеса, с управление от ФЕЦ и батерия.",
      en: "AC and DC EV chargers for homes, offices and businesses, managed together with PV and storage.",
    },
    intro: {
      bg: "Доставяме и монтираме зарядни станции за електромобили: от домашни AC зарядни (wallbox) до DC станции за фирмени паркинги и обществени обекти. Свързваме зареждането с фотоволтаичната централа и батерията, така че колата да се зарежда със собствена слънчева енергия или при ниски цени на тока.",
      en: "We supply and install EV charging stations, from home AC wallboxes to DC stations for company car parks and public sites. Charging is linked to your PV plant and battery, so cars charge on your own solar energy or when power prices are low.",
    },
    img: REAL.evDcAc,
    features: [
      { bg: "AC зарядни 7,4 / 11 / 22 kW за дома и офиса", en: "7.4 / 11 / 22 kW AC chargers for home and office" },
      { bg: "DC бързи зарядни за фирмени и обществени паркинги", en: "DC fast chargers for company and public car parks" },
      { bg: "Динамично управление на товара: без надвишаване на партидата", en: "Dynamic load management: never exceeds your grid connection" },
      { bg: "Зареждане от ФЕЦ и батерия, приоритет на слънчевата енергия", en: "Charging from PV and battery, solar first" },
      { bg: "Достъп с RFID/приложение и отчитане на консумацията по потребител", en: "RFID/app access and per-user consumption reporting" },
      { bg: "Включен безплатен мониторинг 24/365", en: "Free 24/365 monitoring included" },
    ],
    items: [],
  },
];

export const partners = [
  { name: "Suntech", what: { bg: "Панели и C&I батерийни системи", en: "PV modules and C&I battery systems" } },
  { name: "HY Solar", what: { bg: "Фотоволтаични панели", en: "PV modules" } },
  { name: "Deye", what: { bg: "Хибридни инвертори и батерии", en: "Hybrid inverters and batteries" } },
  { name: "V-TAC", what: { bg: "Батерийни модули", en: "Battery modules" } },
];

export type ProjectStatus = "done" | "progress" | "design";
export type Project = {
  title: L;
  region: L;
  pv?: string;
  bess?: string;
  segment: "ci" | "home";
  equipment: L;
  year: string;
  status: ProjectStatus;
  img: string; // Unsplash id (illustrative) or "/images/..." path (real photo)
  photoReal?: boolean;
  featured?: boolean;
};

export const projectStatus: Record<ProjectStatus, L> = {
  done: { bg: "Изпълнен", en: "Completed" },
  progress: { bg: "В изпълнение", en: "In progress" },
  design: { bg: "Проектиран", en: "Designed" },
};

// From Novacom's signed offers, contracts and design documents (approved 2026-09-24).
// No client names; region only. Photos are illustrative until the client's own arrive.
export const projects: Project[] = [
  {
    title: { bg: "Фотоволтаичен парк 2 MW с батерия 2,5 MW", en: "2 MW solar park with 2.5 MW battery storage" },
    region: { bg: "Перник", en: "Pernik" },
    pv: "2 MW",
    bess: "2,5 MW",
    segment: "ci",
    equipment: { bg: "Наземна ФЕЦ с панели HY Solar и контейнерни батерийни системи с LFP модули и модулен PCS", en: "Ground-mounted PV with HY Solar modules and containerised battery systems with LFP modules and modular PCS" },
    year: "2026",
    status: "progress",
    img: REAL.pernikSky,
    photoReal: true,
    featured: true,
  },
  {
    title: { bg: "Наземна ФЕЦ с батерийна система Suntech", en: "Ground-mounted PV plant with Suntech battery storage" },
    region: { bg: "обл. Стара Загора", en: "Stara Zagora region" },
    pv: "98,56 kWp",
    bess: "261 kWh / 100 kW",
    segment: "ci",
    equipment: {
      bg: "176 панела × 560 Wp, инвертор 100 kW, присъединена 2023. През 2026: Suntech SunStorage Pro STE-261L-125P за съхранение и пикове.",
      en: "176 × 560 Wp modules, 100 kW inverter, grid-connected 2023. In 2026: Suntech SunStorage Pro STE-261L-125P for storage and peak shaving.",
    },
    year: "2023 · 2026",
    status: "progress",
    img: REAL.mihaylovoSun,
    photoReal: true,
  },
  {
    title: { bg: "Доставка на две батерийни системи Suntech за индустриален обект", en: "Two Suntech battery systems supplied to an industrial site" },
    region: { bg: "обл. Стара Загора", en: "Stara Zagora region" },
    bess: "2 × 261 kWh / 2 × 125 kW",
    segment: "ci",
    equipment: { bg: "Suntech SunStorage Pro STE-261L-125P × 2, течно охлаждане, вградени PCS/BMS/EMS", en: "Suntech SunStorage Pro STE-261L-125P × 2, liquid-cooled, built-in PCS/BMS/EMS" },
    year: "2026",
    status: "done",
    img: PH.heroRoof,
  },
  {
    title: { bg: "Батериен парк 2 MWh към съществуваща ФЕЦ", en: "2 MWh battery park for an existing PV plant" },
    region: { bg: "Европа", en: "Europe" },
    bess: "8 × 261 kWh = 2,09 MWh / 1 MW",
    segment: "ci",
    equipment: { bg: "Suntech STE-261L-125P × 8, локален EMS, интеграция с Huawei SmartLogger", en: "Suntech STE-261L-125P × 8, local EMS, Huawei SmartLogger integration" },
    year: "2026",
    status: "progress",
    img: PH.fieldClouds,
  },
  {
    title: { bg: "Покривна ФЕЦ с батерия за месопреработвателен обект", en: "Rooftop PV with battery for a meat-processing site" },
    region: { bg: "обл. Перник", en: "Pernik region" },
    pv: "15,3 kWp",
    bess: "14,33 kWh",
    segment: "ci",
    equipment: { bg: "HY Solar 450 W × 34, Deye 12 kW, V-TAC 14,33 kWh", en: "HY Solar 450 W × 34, Deye 12 kW, V-TAC 14.33 kWh" },
    year: "2025",
    status: "design",
    img: REAL.roofCommercial,
    photoReal: true,
  },
  {
    title: { bg: "ФЕЦ с батерия за сграда с трифазна партида", en: "PV with battery for a three-phase building" },
    region: { bg: "София", en: "Sofia" },
    pv: "23 kWp",
    bess: "50 kWh",
    segment: "home",
    equipment: { bg: "Suntech 455 Wp × 50, хибриден инвертор 20 kW HV, 2 × 25 kWh HV", en: "Suntech 455 Wp × 50, 20 kW HV hybrid inverter, 2 × 25 kWh HV" },
    year: "2026",
    status: "progress",
    img: REAL.roofVitosha,
    photoReal: true,
  },
  {
    title: { bg: "Хибридна ФЕЦ за жилищна сграда", en: "Hybrid PV for a residential building" },
    region: { bg: "обл. София", en: "Sofia region" },
    pv: "5,5 kWp",
    bess: "16 kWh",
    segment: "home",
    equipment: { bg: "Suntech 455 Wp × 12, Deye 15 kW, Deye SE-F16-C", en: "Suntech 455 Wp × 12, Deye 15 kW, Deye SE-F16-C" },
    year: "2026",
    status: "progress",
    img: REAL.pergola,
    photoReal: true,
  },
  {
    title: { bg: "Покривна ФЕЦ с батерия за жилищна сграда", en: "Rooftop PV with battery for a house" },
    region: { bg: "обл. София", en: "Sofia region" },
    pv: "9,1 kWp",
    bess: "20,48 kWh",
    segment: "home",
    equipment: { bg: "HY Solar 455 W × 20, Deye 15 kW, V-TAC VT-10240 × 2", en: "HY Solar 455 W × 20, Deye 15 kW, V-TAC VT-10240 × 2" },
    year: "2026",
    status: "design",
    img: REAL.carport,
    photoReal: true,
  },
];

export type Service = { slug: string; title: L; short: L; intro: L; img: string; steps: L[] };

export const services: Service[] = [
  {
    slug: "consulting",
    title: { bg: "Консултация и анализ", en: "Consulting & analysis" },
    short: {
      bg: "Безплатна консултация, енергиен и финансов анализ.",
      en: "Free consultation plus energy and financial analysis.",
    },
    intro: {
      bg: "Анализираме консумацията и обекта и предлагаме най-подходящата система с ясна сметка за възвръщаемостта.",
      en: "We analyse your consumption and site and propose the best-fit system with a clear payback calculation.",
    },
    img: PH.teamLaptops,
    steps: [
      { bg: "Анализ на сметки и профил на потребление", en: "Bill and load profile analysis" },
      { bg: "Оглед на обекта", en: "Site survey" },
      { bg: "Финансов модел и възвръщаемост", en: "Financial model and payback" },
    ],
  },
  {
    slug: "engineering",
    title: { bg: "Проектиране и присъединяване", en: "Engineering & grid connection" },
    short: {
      bg: "Проект, разрешителни и присъединяване на супер ниски цени.",
      en: "Design, permits and grid connection at very low prices.",
    },
    intro: {
      bg: "Проектираме ФЕЦ, батерийни системи (ССЕЕ) и присъединяване на супер ниски цени, и поемаме целия административен път: проект, съгласувания и документи за присъединяване.",
      en: "We design PV plants, battery storage systems and grid connections at very low prices, and handle the full administrative path: design, approvals and grid-connection paperwork.",
    },
    img: PH.engineerDraw,
    steps: [
      { bg: "Технически проект", en: "Technical design" },
      { bg: "Съгласувания и разрешителни", en: "Approvals and permits" },
      { bg: "Присъединяване към мрежата", en: "Grid connection" },
    ],
  },
  {
    slug: "installation",
    title: { bg: "Доставка и монтаж „до ключ“", en: "Turnkey supply & installation" },
    short: {
      bg: "Логистика, монтаж и въвеждане в експлоатация.",
      en: "Logistics, installation and commissioning.",
    },
    intro: {
      bg: "Доставяме оборудването и монтираме централата. Предаваме пълна документация и обучаваме екипа ви.",
      en: "We deliver the equipment and install the plant, then hand over full documentation and train your team.",
    },
    img: REAL.switchboard,
    steps: [
      { bg: "Доставка на оборудването", en: "Equipment delivery" },
      { bg: "Професионален монтаж", en: "Professional installation" },
      { bg: "Пускане и инструктаж", en: "Commissioning and training" },
    ],
  },
  {
    slug: "maintenance",
    title: { bg: "Поддръжка и мониторинг (O&M)", en: "Operations & maintenance (O&M)" },
    short: {
      bg: "Инспекции, почистване, сервиз и мониторинг.",
      en: "Inspections, cleaning, service and monitoring.",
    },
    intro: {
      bg: "Редовната поддръжка предотвратява повреди и поддържа производството на максимум. При проблем реагираме бързо.",
      en: "Regular maintenance prevents failures and keeps output at its peak. When something goes wrong, we respond fast.",
    },
    img: PH.fieldClouds,
    steps: [
      { bg: "Периодични инспекции", en: "Periodic inspections" },
      { bg: "Почистване на панелите", en: "Panel cleaning" },
      { bg: "Бърза реакция при неизправност", en: "Fast fault response" },
    ],
  },
];

export const about = [
  { path: "about", label: { bg: "Кои сме ние", en: "Who we are" } },
  { path: "about/vision", label: { bg: "Нашата визия", en: "Our vision" } },
  { path: "about/partners", label: { bg: "Партньори и производители", en: "Partners & manufacturers" } },
];

export const nav: NavItem[] = [
  {
    label: { bg: "Решения", en: "Solutions" },
    path: "solutions/industry",
    children: solutions.map((s) => ({ label: s.title, path: `solutions/${s.slug}` })),
  },
  {
    label: { bg: "Продукти", en: "Products" },
    path: "products",
    children: products.map((p) => ({ label: p.title, path: `products/${p.slug}` })),
  },
  {
    label: { bg: "Услуги", en: "Services" },
    path: "services/consulting",
    children: services.map((s) => ({ label: s.title, path: `services/${s.slug}` })),
  },
  { label: { bg: "Проекти", en: "Projects" }, path: "projects" },
  { label: { bg: "Ноу-хау", en: "Know-how" }, path: "know-how" },
  { label: { bg: "За нас", en: "About" }, path: "about", children: about },
  { label: { bg: "Контакт", en: "Contact" }, path: "contact" },
];

export const benefits = [
  {
    title: { bg: "Икономичност", en: "Savings" },
    text: {
      bg: "По-ниски разходи за енергия и предвидими цени за години напред.",
      en: "Lower energy costs and predictable prices for years to come.",
    },
  },
  {
    title: { bg: "Независимост", en: "Independence" },
    text: {
      bg: "Собствено производство и съхранение намаляват зависимостта от мрежата.",
      en: "Your own generation and storage reduce dependence on the grid.",
    },
  },
  {
    title: { bg: "Устойчивост", en: "Sustainability" },
    text: {
      bg: "Чиста енергия, по-нисък въглероден отпечатък и по-добър ESG профил.",
      en: "Clean energy, a lower carbon footprint and a stronger ESG profile.",
    },
  },
];

// Types of installations we build (not specific client projects; stock photos illustrate the type).
export const projectTypes = [
  {
    title: { bg: "Батерийни системи за бизнеса", en: "Battery storage for business" },
    text: {
      bg: "Шкафови системи Suntech от 261 kWh, самостоятелно или към съществуваща ФЕЦ.",
      en: "Suntech 261 kWh cabinet systems, standalone or added to an existing PV plant.",
    },
    img: PH.grid,
    path: "products/storage",
  },
  {
    title: { bg: "Покривни ФЕЦ за индустрията", en: "Rooftop PV for industry" },
    text: {
      bg: "Централи за собствено потребление на производства и складове.",
      en: "Self-consumption plants for factories and warehouses.",
    },
    img: PH.heroRoof,
    path: "solutions/industry",
  },
  {
    title: { bg: "Търговски сгради", en: "Commercial buildings" },
    text: {
      bg: "Магазини, офиси и хотели с дневна консумация и бърза възвръщаемост.",
      en: "Retail, offices and hotels with daytime demand and fast payback.",
    },
    img: PH.cityRoof,
    path: "solutions/commercial",
  },
  {
    title: { bg: "Наземни централи", en: "Ground-mounted plants" },
    text: {
      bg: "ФЕЦ на терен с батерия за съхранение и управление на енергията.",
      en: "Ground-mounted PV with battery storage and energy management.",
    },
    img: REAL.pernikPylon,
    path: "products/mounting",
  },
  {
    title: { bg: "Земеделски обекти", en: "Agricultural sites" },
    text: {
      bg: "Хибридни и автономни системи за ферми, напояване и хладилни бази.",
      en: "Hybrid and off-grid systems for farms, irrigation and cold storage.",
    },
    img: PH.fieldAerial,
    path: "solutions/agriculture",
  },
  {
    title: { bg: "Хибридни системи за дома", en: "Hybrid systems for homes" },
    text: {
      bg: "Панели Suntech, хибриден инвертор и батерия за къщи и вили.",
      en: "Suntech panels, a hybrid inverter and a battery for houses and villas.",
    },
    img: PH.roofInstall,
    path: "solutions/homes",
  },
];

// Real installation photos for the projects gallery (© Novacom).
export const gallery: { src: string; alt: L; tall?: boolean }[] = [
  { src: REAL.pernikContainer, alt: { bg: "Контейнерна батерийна система, Перник", en: "Containerised battery system, Pernik" } },
  { src: REAL.pernikBessOpen, alt: { bg: "LFP батерийни модули в контейнер, Перник", en: "LFP battery modules inside the container, Pernik" } },
  { src: REAL.pernikRidge, alt: { bg: "Фотоволтаичен парк 2 MW, Перник", en: "2 MW solar park, Pernik" }, tall: true },
  { src: REAL.pernikUnder, alt: { bg: "Стоманена конструкция с двулицеви модули, Перник", en: "Steel structure with bifacial modules, Pernik" } },
  { src: REAL.pernikPcs, alt: { bg: "Модулен PCS в батерийния контейнер", en: "Modular PCS inside the battery container" }, tall: true },
  { src: REAL.pernikWide, alt: { bg: "Редове на ФЕЦ Перник", en: "PV rows, Pernik" } },
  { src: REAL.mihaylovoFrost, alt: { bg: "Наземна ФЕЦ 98,56 kWp, обл. Стара Загора", en: "98.56 kWp ground-mounted plant, Stara Zagora region" } },
  { src: REAL.ballastDetail, alt: { bg: "Баластна конструкция на плосък покрив", en: "Ballast mounting on a flat roof" } },
  { src: REAL.inverterRoomWide, alt: { bg: "Инверторно помещение: хибриден инвертор, батерии и табла", en: "Inverter room: hybrid inverter, batteries and switchboards" }, tall: true },
  { src: REAL.groundSnow, alt: { bg: "Наземна ФЕЦ през зимата", en: "Ground-mounted plant in winter" } },
  { src: REAL.heroSofia, alt: { bg: "Покривна ФЕЦ в София с изглед към Витоша", en: "Rooftop PV in Sofia with a view of Vitosha" } },
  { src: REAL.roofCommercial, alt: { bg: "Покривна ФЕЦ на търговски обект с баластна конструкция", en: "Rooftop PV on a commercial building with ballast mounting" } },
  { src: REAL.roofDense, alt: { bg: "Покривна ФЕЦ на жилищна сграда", en: "Rooftop PV on an apartment building" } },
  { src: REAL.ground1, alt: { bg: "Наземна ФЕЦ на стоманена конструкция", en: "Ground-mounted PV on a steel structure" }, tall: true },
  { src: REAL.pergola, alt: { bg: "Соларна пергола с двулицеви панели", en: "Solar pergola with bifacial modules" }, tall: true },
  { src: REAL.carport, alt: { bg: "Соларен навес за автомобили", en: "Solar carport" } },
  { src: REAL.evDcAc, alt: { bg: "DC и AC зарядни станции за електромобили", en: "DC and AC EV charging stations" } },
  { src: REAL.switchboard, alt: { bg: "Табло с енергиен мениджмънт и мониторинг", en: "Switchboard with energy management and monitoring" }, tall: true },
  { src: REAL.roofVitosha, alt: { bg: "Покривна ФЕЦ на сграда в София", en: "Rooftop PV on a building in Sofia" } },
  { src: REAL.ground2, alt: { bg: "Наземна ФЕЦ, монтаж на модулите", en: "Ground-mounted PV, module installation" }, tall: true },
  { src: REAL.evOpen, alt: { bg: "Монтаж на DC зарядна станция", en: "DC charger installation" } },
  { src: REAL.pergolaUnder, alt: { bg: "Двулицеви панели отдолу", en: "Bifacial modules from below" }, tall: true },
  { src: REAL.trackerField, alt: { bg: "Мобилни соларни тракери на ремарке", en: "Mobile trailer-mounted solar trackers" } },
  { src: REAL.bessOpen, alt: { bg: "Батериен шкаф с LFP модули", en: "Battery cabinet with LFP modules" }, tall: true },
  { src: REAL.trackerTrailers, alt: { bg: "Мобилни соларни системи с инвертори на място", en: "Mobile solar units with on-board inverters" } },
  { src: REAL.bessFactory, alt: { bg: "Батериен шкаф с вграден PCS", en: "Battery cabinet with integrated PCS" }, tall: true },
  { src: REAL.trackerUnder, alt: { bg: "Двулицеви панели на тракер", en: "Bifacial modules on a tracker" } },
];

// Utility models and inventions of Dr. Eng. Antouan Anguelov (from the client's Drive folder "Polezen_model", 2026-09-24).
export const utilityModels: { title: L; year: string; ref?: string; note: L }[] = [
  {
    title: { bg: "Модулна система за хибридно двупосочно зареждане, съхранение и отдаване на енергия", en: "Modular system for hybrid bidirectional charging, storage and discharge of energy" },
    year: "2025",
    ref: "BG 5058 U1",
    note: { bg: "Регистриран полезен модел: V2G зарядна станция с батериен стек от нови и рециклирани клетки, EMS с енергиен баланс и мониторинг", en: "Registered utility model: V2G charger with a battery stack of new and recycled cells, EMS with energy balancing and monitoring" },
  },
  {
    title: { bg: "Тестер за фотоволтаични модули", en: "Tester for photovoltaic modules" },
    year: "2024",
    ref: "BG 4975 U1",
    note: { bg: "Регистриран полезен модел, съавтор, съвместно с ВТУ „Тодор Каблешков“", en: "Registered utility model, co-inventor, with the Todor Kableshkov University of Transport" },
  },
  {
    title: { bg: "Система за производство и разпределение на електроенергия", en: "System for generation and distribution of electricity" },
    year: "2024",
    ref: "BG 4825",
    note: { bg: "Регистриран полезен модел: източници, батерии и консуматори като агенти, координирани от концентратор и контролен модул", en: "Registered utility model: sources, batteries and loads as agents, coordinated by a concentrator and a control module" },
  },
  {
    title: { bg: "Система за пренос на данни между два или повече сървъра", en: "System for data transfer between two or more servers" },
    year: "2017",
    ref: "BG 2789 U1",
    note: { bg: "Регистриран полезен модел: централен координиращ сървър с криптирани комуникационни модули", en: "Registered utility model: a central coordinating server with encrypted communication modules" },
  },
];
