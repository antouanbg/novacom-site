import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isLang, locales } from "@/lib/i18n";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const bg = lang === "bg";
  return {
    metadataBase: new URL("https://novacom.bg"),
    title: {
      default: bg ? "Novacom | Фотоволтаични централи и батерии за бизнеса" : "Novacom | Solar PV & battery storage for business",
      template: "%s | Novacom",
    },
    description: bg
      ? "Оферти, доставка и монтаж на фотоволтаични централи и системи за съхранение (BESS) за индустрия, търговия, земеделие и домакинства."
      : "Quotes, supply and installation of solar PV plants and battery storage (BESS) for industry, commerce, agriculture and homes.",
    alternates: { languages: { bg: "/bg/", en: "/en/" } },
    icons: { icon: "/logo.jpg" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={manrope.variable}>
      <body className="font-sans">
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
