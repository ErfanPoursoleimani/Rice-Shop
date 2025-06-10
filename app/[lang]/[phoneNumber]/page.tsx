'use server'
import { HomePage } from "../components"
import { getDictionary } from "../dictionaries"


const Home = async({params} : {params: Promise<{lang: string}>}) => {

  const { lang } = await params

  const dict = await getDictionary(lang as 'ar' | 'fa' | "en" | "de")

  return (
    <>
      <HomePage lang={lang} dict={dict as {product: {deleteFromCart: string, perkg: string, addToCart: string, price: string, currency: string, label: string, massUnit: string, products: {برنج_کشت_دوم: string,برنج_قهوه_ای: string,برنج_طارم_عطری: string,برنج_طارم_فجر: string}}, content: {logo: string, seeOurProducts: string}}}/>
    </>
  )
}

export default Home