'use server'
import { prisma } from "@/prisma/client"
import { HomePage, NavBar } from "../components"
import { getDictionary } from "../dictionaries"
import Link from "next/link"

interface Dict {
  product: {
    deleteFromCart: string,
    addToCart: string,
    price: string,
    perkg: string,
    currency: string,
    label: string,
    massUnit: string,
    products: {
      برنج_کشت_دوم: string,
      برنج_قهوه_ای: string,
      برنج_طارم_عطری: string,
      برنج_طارم_فجر: string
      }
    },
    content: {
      homepage: {
        logo: string,
        seeOurProducts: string,
        description: {
          first: {
              title: string,
              body: string
          },
          second: {
              title: string,
              body: string
          },
          third: {
              title: string,
              body: string
          }  
        }
      }
    }
}

const Home = async({params} : {params: Promise<{phoneNumber: string, lang: string}>}) => {

  const { lang, phoneNumber } = await params

  const users = await prisma.user.findMany()
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber
    }
  })

  const cartId = user?.cartId

  let cartProducts = await prisma.cartProduct.findMany({
      where:{
          cartId: cartId!
      },
      include: {
          product: true
      }
  })

  /*   const products = await prisma.product.findMany() */

  const dict = await getDictionary(lang as 'ar' | 'fa' | "en" | "de")

if(user === null){
    return (
      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
        <div className="space-y-5">
          <h1 className="text-4xl text-black">کاربر پیدا نشد</h1>
          <Link href={'/'}>
            <div className="bg-black text-[var(--light-text)] inline-block p-2 rounded-xl">بازگشت به خانه</div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <NavBar cartProducts={cartProducts} users={users} phoneNumber={phoneNumber} user={user} dict={dict}/>
        <HomePage lang={lang} dict={dict as Dict} cartProducts={cartProducts} /* products={products} *//>
      </>
    ) 
  }
}

export default Home