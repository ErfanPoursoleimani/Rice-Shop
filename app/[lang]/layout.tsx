import { AuthInitializer } from '@/components/auth-initializer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Roboto, Rubik } from "next/font/google";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import "./globals.css";
import { DataInitializer } from '@/components/data-initializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const noto_sans_arabic = Noto_Sans_Arabic({
  variable: "--font-roboto",
  subsets: ["arabic"],
});

const rubik = Rubik({
  variable: "--font-roboto",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Berenj Poursoleimani",
  description: "rice shop",
};


export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{ lang: string }>}) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body
        className={`overflow-x-hidden select-none ${geistSans.variable} ${rubik.variable} ${geistMono.variable} ${roboto.variable} ${noto_sans_arabic.variable} antialiased`}
        style={{fontFamily: "Rubik", color: "var(--text)"}}
      >
        <CookiesProvider>
          <AuthInitializer lang={lang}>
            <DataInitializer lang={lang}>
              <ClientLayoutWrapper lang={lang}>
                {children}
              </ClientLayoutWrapper>
            </DataInitializer>
          </AuthInitializer>
        </CookiesProvider>
      </body>
    </html>
  );
}
