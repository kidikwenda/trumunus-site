import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Padel",
  description: "Portal para o fomento do desporto de Padel em Angola",
  keywords: 'portal, padel, web, tistech',
  authors: {
    name: 'TIS',
    url: 'https://tistech.co.ao'
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  );
}