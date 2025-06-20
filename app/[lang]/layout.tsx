import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Noto_Sans_Arabic, Rubik } from "next/font/google";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

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


export default async function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${rubik.variable} ${geistMono.variable} ${roboto.variable} ${noto_sans_arabic.variable} antialiased`}
        style={{fontFamily: "Rubik", color: "var(--text)"}}
      >
        <main>
          <CookiesProvider>{children}</CookiesProvider>
        </main>
      </body>
    </html>
  );
}
