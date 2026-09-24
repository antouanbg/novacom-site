import type { L } from "@/lib/i18n";

// Unsplash photos (free for commercial use, see CREDITS.md).
export const photo = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

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
    bg: "Безплатна първоначална консултация, енергиен и финансов анализ на вашия обект.",
    en: "Free initial consultation plus an energy and financial analysis of your site.",
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
    img: PH.heroRoof,
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
    img: PH.cityRoof,
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
    img: PH.fieldAerial,
    points: [
      { bg: "Автономни (off-grid) и хибридни системи", en: "Off-grid and hybrid systems" },
      { bg: "Соларни помпи за напояване", en: "Solar-powered irrigation pumps" },
      { bg: "Наземни конструкции и тракери", en: "Ground-mount structures and trackers" },
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
      bg: "Енергийните общности позволяват на няколко потребители да споделят производството на обща централа. Съдействаме от модела и документите до изграждането.",
      en: "Energy communities let several consumers share the output of a common plant. We support you from the model and paperwork through to construction.",
    },
    img: PH.panelsForest,
    points: [
      { bg: "Консултация за модела на общността", en: "Advice on the community model" },
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
    img: PH.roofInstall,
    points: [
      { bg: "Мрежови и хибридни системи", en: "Grid-tied and hybrid systems" },
      { bg: "Домашни батерии", en: "Home batteries" },
      { bg: "Мониторинг от телефона", en: "Monitoring from your phone" },
    ],
  },
];

export type Product = {
  slug: string;
  title: L;
  short: L;
  intro: L;
  img: string;
  features: L[];
};

export const products: Product[] = [
  {
    slug: "pv-modules",
    title: { bg: "Фотоволтаични панели", en: "PV modules" },
    short: {
      bg: "Високоефективни модули с дългосрочна гаранция.",
      en: "High-efficiency modules with long-term warranties.",
    },
    intro: {
      bg: "Доставяме монокристални модули от утвърдени производители за покривни и наземни централи.",
      en: "We supply monocrystalline modules from established manufacturers for rooftop and ground-mounted plants.",
    },
    img: PH.panelsClose,
    features: [
      { bg: "Монокристални и бифациални модули", en: "Monocrystalline and bifacial modules" },
      { bg: "Продуктова и производствена гаранция", en: "Product and performance warranties" },
    ],
  },
  {
    slug: "inverters",
    title: { bg: "Инвертори", en: "Inverters" },
    short: {
      bg: "Мрежови, хибридни и автономни (off-grid) инвертори.",
      en: "Grid-tied, hybrid and off-grid inverters.",
    },
    intro: {
      bg: "Подбираме инвертора спрямо мощността, мрежата и нуждата от съхранение: от жилищни до стрингови инвертори за C&I.",
      en: "We select the inverter by power, grid and storage needs, from residential to C&I string inverters.",
    },
    img: PH.engineerLab,
    features: [
      { bg: "Мрежови (on-grid)", en: "Grid-tied (on-grid)" },
      { bg: "Хибридни, с батерия", en: "Hybrid, battery-ready" },
      { bg: "Автономни (off-grid)", en: "Off-grid" },
    ],
  },
  {
    slug: "storage",
    title: { bg: "Системи за съхранение (BESS)", en: "Battery storage (BESS)" },
    short: {
      bg: "От домашни батерии до индустриални шкафове и контейнери.",
      en: "From home batteries to industrial cabinets and containers.",
    },
    intro: {
      bg: "Доставяме и монтираме системи за съхранение за домакинства, търговски и индустриални обекти, включително шкафови системи от 261 kWh и по-големи конфигурации.",
      en: "We supply and install storage for homes, commercial and industrial sites, including 261 kWh cabinet systems and larger configurations.",
    },
    img: PH.grid,
    features: [
      { bg: "Домашни батерии", en: "Home batteries" },
      { bg: "Търговски и индустриални шкафове (C&I), напр. 261 kWh", en: "Commercial & industrial (C&I) cabinets, e.g. 261 kWh" },
      { bg: "Мащабируеми и контейнерни решения", en: "Scalable and containerised solutions" },
    ],
  },
  {
    slug: "mounting",
    title: { bg: "Монтажни конструкции", en: "Mounting systems" },
    short: {
      bg: "Конструкции за всички видове покриви и терени.",
      en: "Structures for every roof type and terrain.",
    },
    intro: {
      bg: "Използваме системи за скатни и плоски покриви, наземни конструкции, карпорти и тракери.",
      en: "Systems for pitched and flat roofs, ground mounts, carports and trackers.",
    },
    img: PH.fieldSky,
    features: [
      { bg: "Скатни и плоски покриви", en: "Pitched and flat roofs" },
      { bg: "Наземни конструкции и тракери", en: "Ground mounts and trackers" },
      { bg: "Соларни карпорти", en: "Solar carports" },
    ],
  },
  {
    slug: "monitoring",
    title: { bg: "Мониторинг и EMS", en: "Monitoring & EMS" },
    short: {
      bg: "Наблюдение и интелигентно управление на енергията.",
      en: "Monitoring and intelligent energy management.",
    },
    intro: {
      bg: "С 30 години опит в ИТ и комуникациите интегрираме централата с дистанционно наблюдение, аларми и системи за управление на енергията (EMS).",
      en: "With 30 years in IT and communications, we integrate your plant with remote monitoring, alerts and energy management systems (EMS).",
    },
    img: PH.engineerCode,
    features: [
      { bg: "Дистанционен мониторинг 24/7", en: "24/7 remote monitoring" },
      { bg: "Управление на товари и батерии (EMS)", en: "Load and battery management (EMS)" },
      { bg: "Интеграция с ERP/SCADA", en: "ERP/SCADA integration" },
    ],
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
      bg: "Проект, разрешителни и присъединяване към мрежата.",
      en: "Design, permits and grid connection.",
    },
    intro: {
      bg: "Поемаме целия административен път: проект, съгласувания и документи за присъединяване.",
      en: "We handle the full administrative path: design, approvals and grid-connection paperwork.",
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
    img: PH.handsInstall,
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
    img: PH.fieldClouds,
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
