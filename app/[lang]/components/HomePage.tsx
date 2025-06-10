import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import type1 from '@/public/type1.jpg'
import type2 from '@/public/type2.jpg'
import type3 from '@/public/type3.jpg'
import { ProductCard } from ".";
import { prisma } from "@/prisma/client";
import classNames from "classnames";



const products = [
  {id: 3,
   href: '/products',
   imgId: 1,
   label: "برنج_کشت_دوم",
   description: "تجربه بهترین کشت برنج",
   price: "170000"},
  {id: 1,
   href: '/products',
   imgId: 2,
   label: "برنج_طارم_فجر",
   description: "بهترین کیفیت از مزارع شمال",
   price: "140000"},
  {id: 2,
   href: '/products',
   imgId: 3,
   label: "برنج_طارم_عطری",
   description: "عطری عالی را تجربه کنید",
   price: "120000"},
  {id: 4,
   href: '/products',
   imgId: 4,
   label: "برنج_قهوه_ای",
   description: "عطری عالی را تجربه کنید",
   price: "120000"},
]


const HomePage = async ({lang, dict}: {lang: string, dict: {product: {deleteFromCart: string, addToCart: string, price: string, perkg: string, currency: string, label: string, massUnit: string, products: {برنج_کشت_دوم: string,برنج_قهوه_ای: string,برنج_طارم_عطری: string,برنج_طارم_فجر: string}}, content: {logo: string, seeOurProducts: string}}}) => {

  const { seeOurProducts, logo } = dict.content

  return (
    <>
      <div className="text-center">
        <div className="relative min-h-[calc(94vh)] bg-[url(@/public/rice-spoons.jpg)] bg-cover">
          <div className="absolute top-0 h-full w-full bg-[var(--light-foreground)]"></div>
          <div className={classNames({"left-[5%] right-auto": !(lang === 'fa' || lang === "ar") , "p-10 absolute top-[20%] right-[5%]" : true})}>
            <h1 className="text-3xl mb-9">{logo}</h1>
            {/* <ul className="space-y-6 text-[var(--sub-text)] text-[2.5vw] md:text-[20px]">
              <li>عطر بی‌نظیر: با هر پخت، بوی خوش شالیزارهای شمال را در خانه‌تان احساس کنید</li>
              <li>طعم استثنایی: هر دانه طارمی، لطیف و خوشمزه است، لذت هر لقمه با این برنج کامل می‌شود</li>
              <li>کیفیت عالی: از بهترین مزارع ما، مستقیم به سفره‌ی شما. تازه و سالم، همانطور که باید باشد</li>
            </ul> */}
          </div>
          <Link href="#products" className="absolute bottom-0 w-full flex justify-center items-center p-5 space-x-2">
              <FaArrowDown />
              <p>{seeOurProducts}</p>
          </Link>
        </div>
        <div id="products" className="flex items-center justify-center p-10 bg-[var(--background)]">
          <div className="flex gap-9 overflow-x-auto">
            {products.map(async(product) => (
              <div key={product.id}>
                <ProductCard id={product.id} img={product.imgId} label={product.label} description={product.description} productPrice={product.price} addedToCartProduct={(await prisma.addedToCartProduct.findUnique({where : {id: product.id}}))!} dict={dict} lang={lang}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage