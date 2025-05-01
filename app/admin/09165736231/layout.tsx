import { prisma } from "@/prisma/client";
import { NavBar } from "@/app/components";

export default async function RootLayout({children, params: {phoneNumber}}: {children: React.ReactNode, params: {phoneNumber: string}}) {
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