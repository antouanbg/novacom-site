"use client";

import { contact } from "@/content/site";
import type { Lang } from "@/lib/i18n";

// Static hosting has no backend: the form opens the visitor's mail app with a prepared message.
export default function QuoteForm({ lang }: { lang: Lang }) {
  const bg = lang === "bg";
  const types = bg
    ? ["Индустрия / производство", "Търговски обект / склад", "Земеделие", "Енергийна общност", "Домакинство"]
    : ["Industry / manufacturing", "Commercial / warehouse", "Agriculture", "Energy community", "Home"];
  const storage = bg
    ? ["Не знам, посъветвайте ме", "Без батерия", "До 50 kWh", "50–261 kWh", "Над 261 kWh"]
    : ["Not sure, please advise", "No battery", "Up to 50 kWh", "50–261 kWh", "Over 261 kWh"];

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";
  const label = "grid gap-2 text-sm font-bold";

  return (
    <form
      id="quote"
      className="grid scroll-mt-28 gap-5 rounded-3xl bg-mist p-6 sm:grid-cols-2 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const body = [...new FormData(e.currentTarget)].map(([k, v]) => `${k}: ${v}`).join("\n");
        const subject = bg ? "Запитване за оферта (novacom.bg)" : "Quote request (novacom.bg)";
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <h2 className="text-2xl font-extrabold sm:col-span-2">{bg ? "Вашето запитване" : "Your request"}</h2>
      <label className={label}>
        {bg ? "Име и фамилия" : "Full name"} *
        <input name={bg ? "Име" : "Name"} required className={field} autoComplete="name" />
      </label>
      <label className={label}>
        {bg ? "Фирма" : "Company"}
        <input name={bg ? "Фирма" : "Company"} className={field} autoComplete="organization" />
      </label>
      <label className={label}>
        {bg ? "Телефон" : "Phone"} *
        <input name={bg ? "Телефон" : "Phone"} type="tel" required className={field} autoComplete="tel" />
      </label>
      <label className={label}>
        {bg ? "Имейл" : "Email"}
        <input name="Email" type="email" className={field} autoComplete="email" />
      </label>
      <label className={label}>
        {bg ? "Тип обект" : "Site type"}
        <select name={bg ? "Тип обект" : "Site type"} className={field}>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {bg ? "Съхранение (батерия)" : "Storage (battery)"}
        <select name={bg ? "Батерия" : "Battery"} className={field}>
          {storage.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {bg ? "Желана мощност на ФЕЦ (kWp)" : "Desired PV power (kWp)"}
        <input name="kWp" inputMode="decimal" placeholder={bg ? "напр. 150" : "e.g. 150"} className={field} />
      </label>
      <label className={label}>
        {bg ? "Населено място" : "Location"}
        <input name={bg ? "Населено място" : "Location"} className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        {bg ? "Съобщение" : "Message"}
        <textarea
          name={bg ? "Съобщение" : "Message"}
          rows={4}
          placeholder={bg ? "Месечна консумация, вид покрив или терен, съществуваща централа…" : "Monthly consumption, roof or land type, existing plant…"}
          className={field}
        />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {bg ? "Бутонът отваря пощенската ви програма с готово съобщение." : "The button opens your email app with a prepared message."}
        </p>
        <button type="submit" className="rounded-xl bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-ink-2">
          {bg ? "Изпрати запитване" : "Send request"} →
        </button>
      </div>
    </form>
  );
}
