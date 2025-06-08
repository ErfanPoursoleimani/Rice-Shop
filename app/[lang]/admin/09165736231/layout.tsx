import { prisma } from "@/prisma/client";
import { NavBar } from "@/app/[lang]/components";

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const addedToCartProducts = await prisma.addedToCartProduct.findMany()
  const users = await prisma.user.findMany()

  return (
      <>
        <NavBar addedToCartProducts={addedToCartProducts} users={users} phoneNumber={'09165736231'}/>
        <main>
          {children}
        </main>
      </>
  );
}