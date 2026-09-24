import type { Metadata } from "next";
import { PH } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { Check, CTA, Eyebrow, Fill, H2, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "bg" ? "Кои сме ние" : "Who we are" };
}

export default async function AboutPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";

  const gallery = [
    { id: PH.roofInstall, alt: bg ? "Монтаж на соларни панели на покрив" : "Installing solar panels on a roof", cls: "sm:col-span-2 sm:row-span-2" },
    { id: PH.engineerLab, alt: bg ? "Млада инженерка тества оборудване" : "Young engineer testing equipment", cls: "" },
    { id: PH.teamLaptops, alt: bg ? "Млад екип работи по проект" : "Young team working on a project", cls: "" },
    { id: PH.engineerDraw, alt: bg ? "Инженер работи по технически чертеж" : "Engineer working on a technical drawing", cls: "" },
    { id: PH.handsInstall, alt: bg ? "Свързване на соларен панел" : "Wiring a solar panel", cls: "" },
  ];

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "За нас" : "About us"}
        title={bg ? "Енергетика, изградена върху 30 години опит в технологиите" : "Energy built on 30 years of technology experience"}
        img={PH.teamLaptops}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{bg ? "Кои сме ние" : "Who we are"}</Eyebrow>
            <H2>{bg ? "Novacom Corp." : "Novacom Corp."}</H2>
            <p className="mt-5 text-lg text-muted">
              {bg
                ? "Novacom съчетава над 30 години опит в информационните и комуникационните технологии с проектиране и изграждане на фотоволтаични централи и системи за съхранение на енергия. Работим с бизнеса, земеделието, общностите и домакинствата."
                : "Novacom combines 30+ years in information and communications technology with the design and construction of solar PV plants and energy storage systems. We work with businesses, agriculture, communities and homes."}
            </p>
            <ul className="mt-7 space-y-3 text-lg">
              <Check>{bg ? "Над 50 завършени интеграционни проекта" : "50+ completed integration projects"}</Check>
              <Check>{bg ? "Безплатна консултация и оглед" : "Free consultation and site survey"}</Check>
              <Check>{bg ? "Решения „до ключ“ с мониторинг" : "Turnkey solutions with monitoring"}</Check>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-3">
              {gallery.map((g) => (
                <div key={g.id} className={`overflow-hidden rounded-2xl ${g.cls}`}>
                  <Photo id={g.id} alt={g.alt} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-8">
              <Eyebrow>{bg ? "Партньорства и членства" : "Partnerships & memberships"}</Eyebrow>
              <h3 className="text-2xl font-extrabold">{bg ? "С кого работим" : "Who we work with"}</h3>
              <p className="mt-4 text-muted">
                <Fill lang={lang}>{bg ? "производители, дистрибутори, браншови организации" : "manufacturers, distributors, industry bodies"}</Fill>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl bg-white p-8">
              <Eyebrow>{bg ? "Нашата отговорност" : "Our responsibility"}</Eyebrow>
              <h3 className="text-2xl font-extrabold">{bg ? "Качество и безопасност" : "Quality and safety"}</h3>
              <p className="mt-4 text-muted">
                {bg
                  ? "Работим с проверено оборудване, спазваме нормите за безопасност и носим отговорност за всяка централа след пускането ѝ."
                  : "We use proven equipment, follow safety standards and stay accountable for every plant after commissioning."}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTA lang={lang} />
    </>
  );
}
