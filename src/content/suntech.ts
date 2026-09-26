// Suntech product detail pages. Every figure comes from the official datasheets the client supplied
// (files in public/downloads/): STP-NT11/48QGSF & 48QGDF (D0319), STE-5ML-DC (V.2605), STE-2ML-1MP (V.2603).
import type { L } from "@/lib/i18n";

export type SpecRow = [L | string, L | string];
export type SuntechProduct = {
  slug: string;
  family: string; // e.g. "Ultra T · Black Pro"
  model: string;
  title: L;
  tagline: L;
  summary: L;
  image: string;
  imageContain?: boolean;
  badges?: { src: string; alt: string }[];
  highlights: { n: string; t: L }[];
  groups: { title: L; rows: SpecRow[] }[];
  table?: { title: L; note?: L; head: (L | string)[]; rows: (string | number)[][] };
  datasheet: { file: string; label: string };
  parent: { slug: "pv-modules" | "storage"; label: L };
};

const IMG = "/images/suntech/";
const DL = "/downloads/";

// Shared module data (both Black Pro versions share cells, mechanics and certificates).
const moduleGroups = (bifacial: boolean): SuntechProduct["groups"] => [
  {
    title: { bg: "Механични характеристики", en: "Mechanical characteristics" },
    rows: [
      [{ bg: "Клетки", en: "Solar cell" }, { bg: "N-type монокристален силиций, TOPCon 3.0, quarter-cut", en: "N-type monocrystalline silicon, TOPCon 3.0, quarter-cut" }],
      [{ bg: "Брой клетки", en: "No. of cells" }, "192 (6 × 32)"],
      [{ bg: "Размери", en: "Dimensions" }, "1762 × 1134 × 30 mm"],
      [{ bg: "Тегло", en: "Weight" }, "21,0 kg"],
      [{ bg: "Предно стъкло", en: "Front glass" }, { bg: "1,6 mm с антирефлексно покритие", en: "1.6 mm, anti-reflective coating" }],
      [{ bg: "Задно стъкло", en: "Back glass" }, { bg: "1,6 mm термично закалено", en: "1.6 mm heat-strengthened glass" }],
      [{ bg: "Рамка", en: "Frame" }, { bg: "Анодизирана алуминиева сплав, черна", en: "Anodised aluminium alloy, black" }],
      [{ bg: "Съединителна кутия", en: "Junction box" }, { bg: "IP68, 3 байпас диода", en: "IP68 rated, 3 bypass diodes" }],
      [{ bg: "Кабели / конектори", en: "Cables / connectors" }, { bg: "4,0 mm², 2 × 1300 mm; STP-XC4 (MC4-EVO2A по избор)", en: "4.0 mm², 2 × 1300 mm; STP-XC4 (MC4-EVO2A optional)" }],
      ...(bifacial ? [[{ bg: "Коефициент на двулицевост", en: "Bifaciality factor" }, "(85 ± 5) %"] as SpecRow] : []),
    ],
  },
  {
    title: { bg: "Работни условия и гаранции", en: "Operating conditions and warranties" },
    rows: [
      [{ bg: "Работна температура", en: "Operating temperature" }, "−40 °C … +70 °C"],
      [{ bg: "Макс. напрежение на системата", en: "Maximum system voltage" }, "1500 V DC (IEC)"],
      [{ bg: "Макс. предпазител", en: "Maximum series fuse" }, "35 A"],
      [{ bg: "Толеранс на мощността", en: "Power tolerance" }, "0 … +3 %"],
      [{ bg: "Статично натоварване", en: "Static load" }, { bg: "5400 Pa отпред / 2400 Pa отзад", en: "5400 Pa front / 2400 Pa rear" }],
      [{ bg: "Температурен коефициент Pmax / Voc / Isc", en: "Temperature coefficient Pmax / Voc / Isc" }, "−0,26 % / −0,22 % / +0,043 % на °C"],
      [{ bg: "Гаранция", en: "Warranty" }, { bg: "25 години продуктова, 30 години линейна за мощността (1 % първа година, 0,35 % годишно → 88,85 % след 30 г.)", en: "25-year product, 30-year linear power (1 % first year, 0.35 % per year → 88.85 % after 30 years)" }],
      [{ bg: "Опаковка", en: "Packing" }, { bg: "36 бр./палет, 936 бр./40′ HC контейнер", en: "36 per pallet, 936 per 40′ HC container" }],
    ],
  },
  {
    title: { bg: "Сертификати", en: "Certificates" },
    rows: [
      [{ bg: "Устойчивост", en: "Durability" }, "IEC 61701 (salt mist) · IEC 62716 (ammonia) · IEC 60068-2-68 (dust & sand) · IEC 61730-2 / UL 790 Fire Class C"],
      [{ bg: "Системи за управление", en: "Management systems" }, "ISO 9001 · ISO 14001 · ISO 45001 · SA 8000 · IEC TS 62941"],
      [{ bg: "Признания", en: "Recognition" }, { bg: "Bloomberg NEF Tier 1 · Kiwa PVEL Top Performer 2024", en: "Bloomberg NEF Tier 1 · Kiwa PVEL Top Performer 2024" }],
    ],
  },
];

const stcHead = ["Pmax (W)", "Vmp (V)", "Imp (A)", "Voc (V)", "Isc (A)", { bg: "КПД (%)", en: "Efficiency (%)" }];
const stcRows = [
  [465, "30,08", "15,47", "36,43", "16,29", "23,3"],
  [470, "30,26", "15,55", "36,48", "16,36", "23,5"],
  [475, "30,43", "15,62", "36,53", "16,43", "23,8"],
  [480, "30,60", "15,69", "36,58", "16,50", "24,0"],
  [485, "30,78", "15,76", "36,63", "16,57", "24,3"],
];

const moduleBadges = [
  { src: IMG + "badge-tier1-bloomberg.webp", alt: "Bloomberg NEF Tier 1" },
  { src: IMG + "badge-kiwa-pvel-2024.webp", alt: "Kiwa PVEL Top Performer 2024" },
];

export const suntechProducts: SuntechProduct[] = [
  {
    slug: "black-pro-bifacial",
    family: "Ultra T 3.0 · Black Pro",
    model: "STP-NT11/48QGDF · 465–485 W",
    title: { bg: "Suntech Black Pro Bifacial 465–485 W", en: "Suntech Black Pro Bifacial 465–485 W" },
    tagline: { bg: "Двулицев стъкло-стъкло модул, n-type TOPCon 3.0, до 24,3 % КПД", en: "Bifacial double-glass module, n-type TOPCon 3.0, up to 24.3 % efficiency" },
    summary: {
      bg: "Изцяло черен двулицев модул с четвъртинно нарязани n-type TOPCon клетки: до 485 W отпред и до 539 W с добива от гърба (BNPI). Стъкло-стъкло конструкция 1,6 + 1,6 mm, 1500 V, 25 години продуктова и 30 години линейна гаранция. Изборът ни за покриви, навеси и наземни централи, където гърбът на модула вижда светлина.",
      en: "All-black bifacial module with quarter-cut n-type TOPCon cells: up to 485 W front side and up to 539 W with rear-side gain (BNPI). 1.6 + 1.6 mm glass-glass construction, 1500 V, 25-year product and 30-year linear warranty. Our pick for roofs, carports and ground mounts where the rear side sees light.",
    },
    image: IMG + "black-pro-bifacial.webp",
    imageContain: true,
    badges: moduleBadges,
    highlights: [
      { n: "485 W", t: { bg: "макс. мощност (STC)", en: "max power (STC)" } },
      { n: "539 W", t: { bg: "с добив от гърба (BNPI, 135 W/m²)", en: "with rear gain (BNPI, 135 W/m²)" } },
      { n: "24,3 %", t: { bg: "КПД на модула", en: "module efficiency" } },
      { n: "30 г.", t: { bg: "линейна гаранция за мощността", en: "linear power warranty" } },
    ],
    groups: moduleGroups(true),
    table: {
      title: { bg: "Електрически характеристики (STC)", en: "Electrical characteristics (STC)" },
      note: { bg: "STC: 1000 W/m², 25 °C, AM 1,5. BNPI (преден 1000 + заден 135 W/m²): 517 / 523 / 528 / 533 / 539 W за класовете 465–485 W.", en: "STC: 1000 W/m², 25 °C, AM 1.5. BNPI (front 1000 + rear 135 W/m²): 517 / 523 / 528 / 533 / 539 W for the 465–485 W classes." },
      head: stcHead,
      rows: stcRows,
    },
    datasheet: { file: DL + "Suntech-STP-NT11-48QGDF-Black-Pro-Bifacial-465-485W.pdf", label: "STP-NT11/48QGDF_EN_D0319.pdf" },
    parent: { slug: "pv-modules", label: { bg: "Фотоволтаични панели", en: "PV modules" } },
  },
  {
    slug: "black-pro-monofacial",
    family: "Ultra T 3.0 · Black Pro",
    model: "STP-NT11/48QGSF · 465–485 W",
    title: { bg: "Suntech Black Pro Monofacial 465–485 W", en: "Suntech Black Pro Monofacial 465–485 W" },
    tagline: { bg: "Едностранен стъкло-стъкло модул, n-type TOPCon 3.0, до 24,3 % КПД", en: "Monofacial double-glass module, n-type TOPCon 3.0, up to 24.3 % efficiency" },
    summary: {
      bg: "Естетичният избор за жилищни и търговски покриви: изцяло черен n-type TOPCon 3.0 модул с четвъртинно нарязани клетки, стъкло-стъкло 1,6 + 1,6 mm и 21 kg тегло. До 485 W и 24,3 % КПД, устойчив на сол, амоняк, прах и пясък; 25 години продуктова и 30 години линейна гаранция.",
      en: "The aesthetic choice for residential and commercial roofs: all-black n-type TOPCon 3.0 module with quarter-cut cells, 1.6 + 1.6 mm glass-glass and 21 kg. Up to 485 W and 24.3 % efficiency, resistant to salt, ammonia, dust and sand; 25-year product and 30-year linear warranty.",
    },
    image: IMG + "black-pro-monofacial.webp",
    imageContain: true,
    badges: moduleBadges,
    highlights: [
      { n: "485 W", t: { bg: "макс. мощност (STC)", en: "max power (STC)" } },
      { n: "24,3 %", t: { bg: "КПД на модула", en: "module efficiency" } },
      { n: "21 kg", t: { bg: "стъкло-стъкло 1,6 + 1,6 mm", en: "glass-glass 1.6 + 1.6 mm" } },
      { n: "30 г.", t: { bg: "линейна гаранция за мощността", en: "linear power warranty" } },
    ],
    groups: moduleGroups(false),
    table: {
      title: { bg: "Електрически характеристики (STC)", en: "Electrical characteristics (STC)" },
      note: { bg: "STC: 1000 W/m², 25 °C, AM 1,5; измервателен толеранс ±3 %.", en: "STC: 1000 W/m², 25 °C, AM 1.5; measuring tolerance ±3 %." },
      head: stcHead,
      rows: stcRows,
    },
    datasheet: { file: DL + "Suntech-STP-NT11-48QGSF-Black-Pro-Monofacial-465-485W.pdf", label: "STP-NT11/48QGSF_EN_D0319.pdf" },
    parent: { slug: "pv-modules", label: { bg: "Фотоволтаични панели", en: "PV modules" } },
  },
  {
    slug: "ste-261l-125p",
    family: "SunStorage PRO",
    model: "STE-261L-125P · 261 kWh / 125 kW",
    title: { bg: "Suntech SunStorage PRO STE-261L-125P", en: "Suntech SunStorage PRO STE-261L-125P" },
    tagline: { bg: "Шкафова система „всичко в едно“: 261 kWh LFP батерия + 125 kW инвертор на 1,4 m²", en: "All-in-one cabinet: 261 kWh LFP battery + 125 kW inverter on 1.4 m²" },
    summary: {
      bg: "Най-търсената ни батерия за индустриални и търговски обекти: батерия, инвертор (PCS), течно охлаждане и пожарна защита в един шкаф с площ само 1,4 m². Модулна – шкафовете се свързват в паралел за по-голям капацитет, монтажът е бърз, а системата се управлява от нашата EMS GrideX (Ethernet/RS485). Над 8 000 цикъла, КПД ≥ 89 %, аерозолна защита на ниво пакет. С тази батерия EMS GrideX се внедрява 100 % безплатно.",
      en: "Our most requested battery for industrial and commercial sites: battery, inverter (PCS), liquid cooling and fire protection in one cabinet with a footprint of only 1.4 m². Modular – cabinets connect in parallel for more capacity, installation is fast, and the system is managed by our GrideX EMS (Ethernet/RS485). Over 8,000 cycles, ≥ 89 % efficiency, aerosol protection at pack level. With this battery the GrideX EMS is deployed 100 % free.",
    },
    image: IMG + "ste-261l-125p.webp",
    imageContain: true,
    highlights: [
      { n: "261 kWh", t: { bg: "капацитет (1P260S, LFP 314 Ah)", en: "capacity (1P260S, LFP 314 Ah)" } },
      { n: "125 kW", t: { bg: "номинална мощност (макс. 137 kW)", en: "rated power (max 137 kW)" } },
      { n: "≥ 8 000", t: { bg: "цикъла, DOD 95 %", en: "cycles, 95 % DOD" } },
      { n: "1,4 m²", t: { bg: "площ: 1050 × 1350 × 2400 mm, ~2 620 kg", en: "footprint: 1050 × 1350 × 2400 mm, ~2,620 kg" } },
    ],
    groups: [
      {
        title: { bg: "DC страна (батерия)", en: "DC side (battery)" },
        rows: [
          [{ bg: "Клетки", en: "Cell type" }, "LFP / 314 Ah"],
          [{ bg: "Пакет", en: "Pack" }, "1P52S · 52,248 kWh · IP65"],
          [{ bg: "Батерийна система", en: "Battery system" }, "1P260S · 261,24 kWh"],
          [{ bg: "Номинално напрежение", en: "Rated voltage" }, "832 V (728 – 936 V)"],
          [{ bg: "Работна температура заряд / разряд", en: "Charge / discharge temperature" }, "0 … 55 °C / −25 … 55 °C"],
          [{ bg: "Заряд / охлаждане", en: "Charge rate / cooling" }, { bg: "0,5P / интелигентно течно охлаждане", en: "0.5P / smart liquid cooling" }],
        ],
      },
      {
        title: { bg: "AC страна (инвертор / PCS)", en: "AC side (inverter / PCS)" },
        rows: [
          [{ bg: "Номинална / максимална мощност", en: "Rated / max power" }, "125 kW / 137 kW"],
          [{ bg: "DC входно напрежение / ток", en: "DC input voltage / current" }, "680 – 950 V / 203 A"],
          [{ bg: "Мрежа", en: "Grid" }, "400 V AC, 3P+N+PE, 50/60 Hz"],
          [{ bg: "Фактор на мощността", en: "Power factor" }, "0,98 lagging … 0,98 leading (0,99)"],
          [{ bg: "THDi", en: "THDi" }, "≤ 3 %"],
        ],
      },
      {
        title: { bg: "Система", en: "System" },
        rows: [
          [{ bg: "КПД / C-rate / DOD", en: "Efficiency / C-rate / DOD" }, "≥ 89 % / 0,5P / 95 % (25 ± 2 °C)"],
          [{ bg: "Точност на SOC", en: "SOC accuracy" }, "< 3 %"],
          [{ bg: "Цикли", en: "Cycle life" }, "≥ 8 000"],
          [{ bg: "Комуникация", en: "Connectivity" }, "Ethernet / RS485 (интеграция с GrideX EMS)"],
          [{ bg: "Защита / охлаждане", en: "Ingress / cooling" }, { bg: "IP55; активно течно охлаждане", en: "IP55; active liquid cooling" }],
          [{ bg: "Работна температура / влажност", en: "Operating temperature / humidity" }, "−25 … 55 °C / 5 – 95 % RH"],
          [{ bg: "Шум / надморска височина", en: "Noise / altitude" }, "≤ 75 dB / ≤ 2000 m"],
          [{ bg: "Пожарна защита", en: "Fire safety" }, { bg: "Аерозол в пакета с ранно предупреждение", en: "In-pack aerosol with early fire warning" }],
          [{ bg: "Размери / тегло", en: "Dimensions / weight" }, "1050 × 1350 × 2400 mm / ~2 620 kg"],
          [{ bg: "Съответствие", en: "Compliance" }, "UN38.3 · IEC 62477 · IEC 61000 · IEC 62619 · IEC 63056 · UL 9540A · EN 50549"],
        ],
      },
    ],
    datasheet: { file: DL + "Suntech-STE-261L-125P-SunStorage-Pro.pdf", label: "STE-261L-125P_EN_V.2603.pdf" },
    parent: { slug: "storage", label: { bg: "Системи за съхранение", en: "Energy storage" } },
  },
  {
    slug: "ste-2ml-1mp",
    family: "SunStorage PRO",
    model: "STE-2ML-1MP · 2,17 MWh / 1,125 MW",
    title: { bg: "Suntech SunStorage PRO STE-2ML-1MP", en: "Suntech SunStorage PRO STE-2ML-1MP" },
    tagline: { bg: "20-футов контейнер „всичко в едно“: 2,17 MWh батерия + 1,125 MW инвертор", en: "20-ft all-in-one container: 2.17 MWh battery + 1.125 MW inverter" },
    summary: {
      bg: "Готова за монтаж C&I система за съхранение в стандартен 20-футов контейнер: батерия, PCS, охлаждане и пожарогасене са интегрирани, предварително тествани и окомплектовани в завода. Стрингова архитектура (всеки батериен клъстер се управлява отделно), течно охлаждане за батерията и въздушно за инвертора. Тази система стои зад проекта ни в Перник и е основата на офертите ни за индустриални обекти над 1 MWh.",
      en: "Install-ready C&I storage in a standard 20-ft container: battery, PCS, cooling and fire suppression are integrated, pre-tested and pre-installed at the factory. String architecture (each battery cluster is managed independently), liquid cooling for the battery and air cooling for the inverter. This is the system behind our Pernik project and the basis of our offers for industrial sites above 1 MWh.",
    },
    image: IMG + "ste-2ml-1mp.webp",
    imageContain: true,
    highlights: [
      { n: "2 170 kWh", t: { bg: "капацитет (9P240S, LFP 314 Ah)", en: "capacity (9P240S, LFP 314 Ah)" } },
      { n: "1 125 kW", t: { bg: "номинална мощност на PCS (9 × 125 kW)", en: "rated PCS power (9 × 125 kW)" } },
      { n: "8 000", t: { bg: "цикъла при 25 °C, 95 % DOD, 0,5P", en: "cycles at 25 °C, 95 % DOD, 0.5P" } },
      { n: "≥ 88 %", t: { bg: "КПД на системата", en: "system efficiency" } },
    ],
    groups: [
      {
        title: { bg: "DC страна (батерия)", en: "DC side (battery)" },
        rows: [
          [{ bg: "Клетки", en: "Cell type" }, "LFP / 314 Ah"],
          [{ bg: "Пакет", en: "Pack" }, "1P48S · 48,23 kWh · IP65"],
          [{ bg: "Батерийна система", en: "Battery system" }, "9P240S · 2 170,3 kWh"],
          [{ bg: "Номинално напрежение", en: "Rated voltage" }, "768 V (672 – 864 V)"],
          [{ bg: "Работна температура заряд / разряд", en: "Charge / discharge temperature" }, "5 … 55 °C / −10 … 50 °C"],
          [{ bg: "Охлаждане", en: "Cooling" }, { bg: "Интелигентно течно охлаждане", en: "Smart liquid cooling" }],
        ],
      },
      {
        title: { bg: "AC страна (инвертор / PCS)", en: "AC side (inverter / PCS)" },
        rows: [
          [{ bg: "Номинална / максимална мощност", en: "Rated / max power" }, "1 125 kW (9 × 125 kW) / 1 237 kW"],
          [{ bg: "DC входно напрежение / ток", en: "DC input voltage / current" }, "680 – 950 V / 203 A"],
          [{ bg: "Мрежа", en: "Grid" }, "400 V AC, 3P+N+PE, 50/60 Hz"],
          [{ bg: "Фактор на мощността", en: "Power factor" }, "−1 lagging … 1 leading (0,99)"],
          [{ bg: "THDi", en: "THDi" }, "≤ 3 %"],
          [{ bg: "Охлаждане", en: "Cooling" }, { bg: "Въздушно", en: "Air cooling" }],
        ],
      },
      {
        title: { bg: "Система", en: "System" },
        rows: [
          [{ bg: "КПД / C-rate / DOD", en: "Efficiency / C-rate / DOD" }, "≥ 88 % / 0,5P / 95 %"],
          [{ bg: "Цикли", en: "Cycle life" }, "8 000 @ 25 ± 2 °C, 95 % DOD, 0,5P"],
          [{ bg: "Комуникация", en: "Communication" }, "Ethernet / RS485 (интеграция с GrideX EMS)"],
          [{ bg: "Защита / охлаждане", en: "Ingress / cooling" }, { bg: "IP55; течно + принудително въздушно", en: "IP55; liquid + forced air" }],
          [{ bg: "Работна температура", en: "Operating temperature" }, { bg: "−25 … 55 °C (дерейтинг над 45 °C)", en: "−25 … 55 °C (derating above 45 °C)" }],
          [{ bg: "Шум / надморска височина", en: "Noise / altitude" }, "≤ 80 dB / ≤ 2000 m"],
          [{ bg: "Пожарогасене", en: "Fire suppression" }, { bg: "Аерозол (на ниво пакет и контейнер) + водна пулверизация", en: "Aerosol (pack and container level) + water spray" }],
          [{ bg: "Размери / тегло", en: "Dimensions / weight" }, "6058 × 2438 × 2591 mm / 25 000 kg"],
          [{ bg: "Съответствие", en: "Compliance" }, "UN38.3 · IEC 62477-1 · CE/EMC · IEC 62619 · IEC 63056 · UL 9540A · IEC 62933 · EN 50549"],
        ],
      },
    ],
    datasheet: { file: DL + "Suntech-STE-2ML-1MP-All-in-One-ESS.pdf", label: "STE-2ML-1MP_EN_V.2603.pdf" },
    parent: { slug: "storage", label: { bg: "Системи за съхранение", en: "Energy storage" } },
  },
  {
    slug: "ste-5ml-dc",
    family: "SunStorage MAX",
    model: "STE-5ML-DC · 5,015 MWh",
    title: { bg: "Suntech SunStorage MAX STE-5ML-DC", en: "Suntech SunStorage MAX STE-5ML-DC" },
    tagline: { bg: "20-футов течно охлаждан батериен контейнер, 5,015 MWh DC", en: "20-ft liquid-cooled battery container, 5.015 MWh DC" },
    summary: {
      bg: "Батериен DC контейнер с най-висока енергийна плътност в гамата: 5,015 MWh в стандартен 20-футов корпус с интегрирани пакети, BMS, EMS, климатизация и пожарогасене. Течното охлаждане държи разликата в температурата на клетките минимална, което удължава живота и повишава безопасността. За мрежови, генераторни и големи индустриални проекти, комбинира се с външен PCS по избор.",
      en: "The DC battery container with the highest energy density in the range: 5.015 MWh in a standard 20-ft enclosure with integrated packs, BMS, EMS, HVAC and fire suppression. Liquid cooling keeps cell temperature differences minimal, extending life and improving safety. For grid, generation and large industrial projects, paired with the PCS of your choice.",
    },
    image: IMG + "ste-5ml-dc.webp",
    imageContain: true,
    highlights: [
      { n: "5 015 kWh", t: { bg: "в един 20-футов контейнер", en: "in one 20-ft container" } },
      { n: "1 331 V", t: { bg: "номинално DC напрежение (1165–1498 V)", en: "rated DC voltage (1165–1498 V)" } },
      { n: "≥ 8 000", t: { bg: "цикъла", en: "cycles" } },
      { n: "IP55", t: { bg: "контейнер (пакети IP65), C4/C5 антикорозия", en: "container (packs IP65), C4/C5 anti-corrosion" } },
    ],
    groups: [
      {
        title: { bg: "Батерия", en: "Battery" },
        rows: [
          [{ bg: "Клетки", en: "Cell type" }, "LFP / 314 Ah"],
          [{ bg: "Пакет", en: "Pack configuration" }, "104,5 kWh · 1P104S"],
          [{ bg: "Система", en: "System configuration" }, "5,015 MWh · 12P416S"],
          [{ bg: "Номинално DC напрежение", en: "Rated DC voltage" }, "1331,2 V (1165 – 1498 V)"],
          [{ bg: "Макс. заряд / разряд", en: "Max charge / discharge rate" }, "0,5P"],
          [{ bg: "Цикли", en: "Cycle life" }, "≥ 8 000"],
        ],
      },
      {
        title: { bg: "Контейнер", en: "Container" },
        rows: [
          [{ bg: "Охлаждане", en: "Cooling" }, { bg: "Течно + принудително въздушно; компресор с променлива честота", en: "Liquid + forced air; variable-frequency compressor" }],
          [{ bg: "Пожарогасене", en: "Fire suppression" }, { bg: "Аерозол (на ниво пакет и контейнер) + водна пулверизация", en: "Aerosol (pack and container level) + water spray" }],
          [{ bg: "Защита / антикорозия", en: "Ingress / anti-corrosion" }, { bg: "IP55 (пакети IP65) / C4, C5 по избор", en: "IP55 (packs IP65) / C4, C5 optional" }],
          [{ bg: "Влажност / надморска височина", en: "Humidity / altitude" }, "0 – 95 % RH / 4000 m"],
          [{ bg: "Размери / тегло", en: "Dimensions / weight" }, "6058 × 2438 × 2896 mm / 45 t"],
          [{ bg: "Сертификати", en: "Certification" }, "IEC 62477 · IEC 61000 · IEC 62619 · IEC 63056 · UL 9540A · UN 3536"],
        ],
      },
    ],
    datasheet: { file: DL + "Suntech-STE-5ML-DC-Liquid-cooled-Battery-Container.pdf", label: "STE-5ML-DC_EN_V.2605.pdf" },
    parent: { slug: "storage", label: { bg: "Системи за съхранение", en: "Energy storage" } },
  },
];
