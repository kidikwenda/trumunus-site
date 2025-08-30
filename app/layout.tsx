import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trumunus App",
  description: "Portal Trumunus",
  keywords: 'portal, trumunus, web, a2q, a2q entretenimento',
  authors: {
    name: 'A2Q Entretenimento',
    url: 'https://trumunus'
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