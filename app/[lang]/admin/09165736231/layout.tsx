import { prisma } from "@/prisma/client";
import { NavBar } from "@/app/[lang]/components";
import { getDictionary } from "../../dictionaries";

export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{lang: string}>}) {
  const addedToCartProducts = await prisma.addedToCartProduct.findMany()
  const users = await prisma.user.findMany()

  const { lang } = await params

  const dict = (await getDictionary(lang as "en" | "de" | "fa" | "ar"))

  return (
      <>
        <NavBar addedToCartProducts={addedToCartProducts} users={users} phoneNumber={'09165736231'} dict={dict}/>
        <main>
          {children}
        </main>
      </>
  );
}