
import { prisma } from "@/prisma/client";
import { HomePage, NavBar } from "./components";
import { getDictionary } from "./dictionaries";
import axios from "axios";

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


const Home = async({params} : {params: Promise<{lang: string}>}) => {

  const { lang } = await params

  const dict = await getDictionary(lang as 'ar' | 'fa' | "en" | "de")

  const users = await prisma.user.findMany()


  await axios.post(`/api/cookies`, {key: "cartProducts", value: "[]"})
  const cartProducts = (await axios.get(`/${lang}/api/cookies?key=cartProducts`)).data

/*   const products = await prisma.product.findMany() */


  return (
    <>
      <NavBar users={users} cartProducts={cartProducts} dict={dict}/>
      <HomePage lang={lang} cartProducts={cartProducts} dict={dict as Dict} /* products={products} *//>
    </>
  )
}

export default Home