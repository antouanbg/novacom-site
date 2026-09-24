"use client";

import Link from "next/link";
import { useEffect } from "react";
import { detectLang } from "@/lib/i18n";

// "/" has no content of its own: send visitors to /bg/ or /en/
// (saved manual choice first, then browser language).
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${detectLang()}/`);
  }, []);
  return (
    <p style={{ padding: 24 }}>
      <Link href="/bg/">Български</Link> · <Link href="/en/">English</Link>
    </p>
  );
}
