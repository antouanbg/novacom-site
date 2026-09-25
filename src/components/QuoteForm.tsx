"use client";

import { contact } from "@/content/site";
import { GOOGLE_FORM, QUOTE_ENDPOINT } from "@/content/forms";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; emailedClient: boolean }
  | { kind: "fallback" } // stored via Google Form only; no confirmation email could be verified
  | { kind: "error"; detail?: string };

type Values = { name: string; company: string; phone: string; email: string; siteType: string; battery: string; kwp: string; location: string; message: string };

// Sends the request to the Apps Script endpoint, which emails the client and answers ok/false.
async function sendToEndpoint(values: Values, lang: Lang): Promise<{ ok: boolean; emailedClient?: boolean; error?: string }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    // text/plain keeps the request "simple" (no CORS preflight); Apps Script answers with Access-Control-Allow-Origin: *.
    const res = await fetch(QUOTE_ENDPOINT, { method: "POST", body: JSON.stringify({ ...values, lang }), headers: { "Content-Type": "text/plain;charset=utf-8" }, redirect: "follow", signal: ctrl.signal });
    const data = (await res.json()) as { ok: boolean; emailedClient?: boolean; error?: string };
    return data;
  } finally {
    clearTimeout(t);
  }
}

export default function QuoteForm({ lang }: { lang: Lang }) {
  const bg = lang === "bg";
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const types = bg
    ? ["Индустрия / производство", "Търговски обект / склад", "Земеделие", "Енергийна общност", "Домакинство"]
    : ["Industry / manufacturing", "Commercial / warehouse", "Agriculture", "Energy community", "Home"];
  const storage = bg
    ? ["Не знам, посъветвайте ме", "Без батерия", "До 50 kWh", "50–261 kWh", "Над 261 kWh"]
    : ["Not sure, please advise", "No battery", "Up to 50 kWh", "50–261 kWh", "Over 261 kWh"];

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";
  const label = "grid gap-2 text-sm font-bold";
  const sending = status.kind === "sending";

  const mailtoHref = (values: Values) => {
    const labels: Record<string, string> = bg
      ? { name: "Име", company: "Фирма", phone: "Телефон", email: "Имейл", siteType: "Тип обект", battery: "Батерия", kwp: "kWp", location: "Населено място", message: "Съобщение" }
      : { name: "Name", company: "Company", phone: "Phone", email: "Email", siteType: "Site type", battery: "Battery", kwp: "kWp", location: "Location", message: "Message" };
    const text = Object.entries(values).map(([k, v]) => `${labels[k]}: ${v}`).join("\n");
    const subject = bg ? "Запитване за оферта (novacom.bg)" : "Quote request (novacom.bg)";
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  };
  const [lastValues, setLastValues] = useState<Values | null>(null);

  return (
    <form
      id="quote"
      className="grid scroll-mt-28 gap-5 rounded-3xl bg-mist p-6 sm:grid-cols-2 sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        const form = e.currentTarget;
        const fd = new FormData(form);
        const get = (n: string) => String(fd.get(n) ?? "").trim();
        const values: Values = {
          name: get("name"), company: get("company"), phone: get("phone"), email: get("email"),
          siteType: get("siteType"), battery: get("battery"), kwp: get("kwp"), location: get("location"), message: get("message"),
        };
        setLastValues(values);
        setStatus({ kind: "sending" });

        // 1) Endpoint: the only path that can confirm the email really went out.
        try {
          const r = await sendToEndpoint(values, lang);
          if (r.ok) {
            setStatus({ kind: "ok", emailedClient: r.emailedClient !== false });
            form.reset();
            return;
          }
          setStatus({ kind: "error", detail: r.error });
          return;
        } catch {
          /* endpoint unreachable: try the archive form so the request is not lost */
        }

        // 2) Fallback: post into the Google Form (opaque response, so we cannot promise an email).
        if (GOOGLE_FORM.action) {
          try {
            const body = new URLSearchParams();
            (Object.keys(values) as (keyof Values)[]).forEach((k) => body.append(GOOGLE_FORM.fields[k], values[k]));
            await fetch(GOOGLE_FORM.action, { method: "POST", mode: "no-cors", body });
            setStatus({ kind: "fallback" });
            return;
          } catch {
            /* fall through */
          }
        }
        setStatus({ kind: "error" });
      }}
    >
      {status.kind === "ok" && (
        <div className="rounded-2xl bg-leaf-light p-5 font-semibold text-ink sm:col-span-2" role="status" aria-live="polite">
          <p className="flex items-start gap-2">
            <span aria-hidden>✅</span>
            <span>
              {bg ? "Запитването е изпратено успешно." : "Your request was sent successfully."}{" "}
              {status.emailedClient
                ? bg ? "Изпратихме ви потвърждение по имейл с копие на данните. Ще се свържем с вас до един работен ден." : "We emailed you a confirmation with a copy of your details. We will get back to you within one business day."
                : bg ? "Имейл адресът изглежда невалиден, затова потвърждение не е изпратено, но запитването е при нас. Ще се свържем по телефона." : "The email address looks invalid, so no confirmation was sent, but we have your request and will call you."}
            </span>
          </p>
        </div>
      )}
      {status.kind === "fallback" && (
        <div className="rounded-2xl bg-[#fff4d6] p-5 font-semibold text-ink sm:col-span-2" role="status" aria-live="polite">
          <span aria-hidden>⚠️ </span>
          {bg
            ? "Запитването е записано, но не успяхме да потвърдим изпращането на имейл. Ако не получите отговор до един работен ден, обадете се на "
            : "Your request was recorded, but we could not confirm the email was sent. If you do not hear from us within one business day, please call "}
          <a href={contact.phoneHref} className="underline">{contact.phone}</a>.
        </div>
      )}
      {status.kind === "error" && (
        <div className="rounded-2xl bg-[#fde2e2] p-5 font-semibold text-ink sm:col-span-2" role="alert" aria-live="assertive">
          <p>
            <span aria-hidden>❌ </span>
            {bg ? "Изпращането е неуспешно" : "Sending failed"}
            {status.detail === "missing_required" ? (bg ? ": липсват задължителни полета (име, телефон, имейл)." : ": required fields are missing (name, phone, email).") : "."}{" "}
            {bg ? "Опитайте отново или ни пишете директно:" : "Please try again or contact us directly:"}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={contact.phoneHref} className="underline">{contact.phone}</a>
            <a href={lastValues ? mailtoHref(lastValues) : `mailto:${contact.email}`} className="underline">{bg ? "Изпрати по имейл" : "Send by email"} ({contact.email})</a>
          </p>
        </div>
      )}
      <h2 className="text-2xl font-extrabold sm:col-span-2">{bg ? "Вашето запитване" : "Your request"}</h2>
      <label className={label}>
        {bg ? "Име и фамилия" : "Full name"} *
        <input name="name" required className={field} autoComplete="name" />
      </label>
      <label className={label}>
        {bg ? "Фирма" : "Company"}
        <input name="company" className={field} autoComplete="organization" />
      </label>
      <label className={label}>
        {bg ? "Телефон" : "Phone"} *
        <input name="phone" type="tel" required className={field} autoComplete="tel" />
      </label>
      <label className={label}>
        {bg ? "Имейл" : "Email"} *
        <input name="email" type="email" required className={field} autoComplete="email" />
      </label>
      <label className={label}>
        {bg ? "Тип обект" : "Site type"}
        <select name="siteType" className={field}>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {bg ? "Съхранение (батерия)" : "Storage (battery)"}
        <select name="battery" className={field}>
          {storage.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {bg ? "Желана мощност на ФЕЦ (kWp)" : "Desired PV power (kWp)"}
        <input name="kwp" inputMode="decimal" placeholder={bg ? "напр. 150" : "e.g. 150"} className={field} />
      </label>
      <label className={label}>
        {bg ? "Населено място" : "Location"}
        <input name="location" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        {bg ? "Съобщение" : "Message"}
        <textarea
          name="message"
          rows={4}
          placeholder={bg ? "Месечна консумация, вид покрив или терен, съществуваща централа…" : "Monthly consumption, roof or land type, existing plant…"}
          className={field}
        />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {bg ? "Запитването отива директно при нашия екип; ще получите потвърждение по имейл." : "Your request goes straight to our team; you will receive an email confirmation."}
        </p>
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="rounded-xl bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? (bg ? "Изпращане…" : "Sending…") : <>{bg ? "Изпрати запитване" : "Send request"} →</>}
        </button>
      </div>
    </form>
  );
}
