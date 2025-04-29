import { prisma } from "@/prisma/client";
import { NavBar } from "@/app/components";
import Link from "next/link";

export default async function RootLayout({children, params: {phoneNumber}}: {children: React.ReactNode, params: {phoneNumber: string}}) {
  const addedToCartProducts = await prisma.addedToCartProduct.findMany()
  const users = await prisma.user.findMany()
  const user = await prisma.user.findUnique({
    where: {
        phoneNumber: phoneNumber
    }
  })

  return (
      <>
        <NavBar addedToCartProducts={addedToCartProducts} users={users} phoneNumber={phoneNumber} user={user!}/>
        <main>
          {children}
        </main>
      </>
  );
}