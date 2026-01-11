import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanital Srls | Detergenza Industriale e Professionale",
  description: "Sanital Srls: Leader nella fornitura di prodotti per la detergenza industriale, sanificazione e forniture professionali per aziende a San Potito Sannitico (CE).",
  keywords: ["detergenza industriale", "sanificazione", "prodotti pulizia", "forniture professionali", "Sanital Srls", "Campania", "Caserta", "detersivi ingrosso"],
  authors: [{ name: "Sanital Srls" }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Sanital Srls | Detergenza Industriale",
    description: "Prodotti professionali per la pulizia e sanificazione aziendale.",
    url: 'https://www.sanitalsrls.it',
    siteName: 'Sanital Srls',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Sanital Srls Logo',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Providers>
          <Navbar />
          <main className="grow bg-gray-50 dark:bg-black/50">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
