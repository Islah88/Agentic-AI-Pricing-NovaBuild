import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaBuild AI | Enterprise Command Center",
  description: "Pilotage autonome des appels d'offres et du chiffrage BTP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#0f111a] text-white m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
