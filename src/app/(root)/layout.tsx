export const metadata = { title: "Novacom" };

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>{children}</body>
    </html>
  );
}
