import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { PH, products, ui } from "@/content/site";
import { href, type Lang } from "@/lib/i18n";
import { CTA, PageHero, Photo, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "products", bg ? "Продукти" : "Products", bg ? "Фотоволтаични панели и батерийни системи Suntech, хибридни инвертори, конструкции и мониторинг за бизнеса и дома." : "Suntech PV modules and battery storage, hybrid inverters, mounting and monitoring for business and home.");
}

export default async function ProductsPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={bg ? "Продукти" : "Products"}
        title={bg ? "Оборудване за соларна енергия и съхранение" : "Solar and storage equipment"}
        text={
          bg
            ? "Панели и батерии Suntech, хибридни инвертори, зарядни станции за електромобили, конструкции и мониторинг. Доставяме самостоятелно или като част от цялостен проект."
            : "Suntech panels and batteries, hybrid inverters, EV charging stations, mounting systems and monitoring, supplied on their own or as part of a turnkey project."
        }
        img={PH.panelsClose}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={href(lang, `products/${p.slug}`)} className="group block h-full overflow-hidden rounded-2xl border border-line transition hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <Photo id={p.img} alt={p.title[lang]} className="transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-extrabold">{p.title[lang]}</h2>
                  <p className="mt-2 text-muted">{p.short[lang]}</p>
                  <span className="mt-4 inline-block font-bold text-brand">{ui.learnMore[lang]} →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
