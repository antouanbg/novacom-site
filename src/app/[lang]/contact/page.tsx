import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { contact } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import QuoteForm from "@/components/QuoteForm";
import { Eyebrow, H2, Reveal, Section } from "@/components/ui";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return seo(lang, "contact", bg ? "Контакт" : "Contact", bg ? "Поискайте оферта за ФЕЦ или батерийна система. Безплатна консултация и оглед." : "Request a quote for a PV plant or battery system. Free consultation and site survey.");
}

export default async function ContactPage({ params }: P) {
  const lang = (await params).lang as Lang;
  const bg = lang === "bg";
  return (
    <Section className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{bg ? "Контакт" : "Contact"}</Eyebrow>
          <H2>{bg ? "Свържете се с нас" : "Get in touch"}</H2>
          <p className="mt-5 text-lg text-muted">
            {bg
              ? "Разкажете ни за обекта си и ще подготвим индивидуална оферта. Първата консултация е безплатна."
              : "Tell us about your site and we will prepare a tailored quote. The first consultation is free."}
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-line p-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted">{bg ? "Контакт" : "Contact"}</h3>
              <a href={contact.phoneHref} className="mt-2 block text-xl font-extrabold hover:text-brand">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="mt-1 block text-lg font-semibold text-brand">{contact.email}</a>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted">{bg ? "Мониторинг и поддръжка" : "Monitoring & support"}</h3>
              <p className="mt-2 text-lg font-extrabold">24/365</p>
              <p className="mt-1 text-muted">
                {bg ? "Безплатно за всички наши системи, с SMS известия в " : "Free for all our systems, with SMS alerts via "}
                <a href="https://gridex.tech/" target="_blank" rel="noopener" className="font-bold text-brand hover:underline">gridex.tech ↗</a>
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <QuoteForm lang={lang} />
        </Reveal>
      </div>
    </Section>
  );
}
