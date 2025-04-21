import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Noto_Sans_Arabic, Rubik } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const addedToCartProducts = await prisma.addedToCartProduct.findMany()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${rubik.variable} ${geistMono.variable} ${roboto.variable} ${noto_sans_arabic.variable} antialiased`}
        style={{fontFamily: "Rubik", color: "var(--text)"}}
      >
        <AuthProvider>
          <Theme>
              <NavBar addedToCartProducts={addedToCartProducts} />
            <main>
              {children}
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
