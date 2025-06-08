import { prisma } from "@/prisma/client";
import { NavBar } from "../components";
import Link from "next/link";

export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{phoneNumber: string}>}) {
  const resolvedParams = await params
  const addedToCartProducts = await prisma.addedToCartProduct.findMany()
  const users = await prisma.user.findMany()
  const user = await prisma.user.findUnique({
    where: {
        phoneNumber: resolvedParams.phoneNumber
    }
  })
  if(user === null){
    return (
      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
        <div className="space-y-5">
          <h1 className="text-4xl text-black">کاربر پیدا نشد</h1>
          <Link href={'/'}>
            <div className="bg-black inline-block p-2 rounded-xl">بازگشت به خانه</div>
          </Link>
        </div>
      </div>
    );
  } else {
  return (
      <>
        <NavBar addedToCartProducts={addedToCartProducts} users={users} phoneNumber={resolvedParams.phoneNumber} user={user}/>
        <main>
          {children}
        </main>
      </>
  );}
}

