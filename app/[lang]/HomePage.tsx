'use client'
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import { ProductCard } from "./components";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { useData } from "../contexts/DataContext";


/* const products = [
  {id: 3,
   href: '/products',
   imgId: 1,
   label: "برنج_کشت_دوم",
   description: "تجربه بهترین کشت برنج",
   price: 170000,
  quantity: 2},
  {id: 1,
   href: '/products',
   imgId: 2,
   label: "برنج_طارم_فجر",
   description: "بهترین کیفیت از مزارع شمال",
   price: 140000,
  quantity: 2},
  {id: 2,
   href: '/products',
   imgId: 3,
   label: "برنج_طارم_عطری",
   description: "عطری عالی را تجربه کنید",
   price: 120000,
  quantity: 2},
  {id: 4,
   href: '/products',
   imgId: 4,
   label: "برنج_قهوه_ای",
   description: "عطری عالی را تجربه کنید",
   price: 120000,
  quantity: 2},
] */

const HomePage = () => {

  const { lang } = useParams()

  const { dict, products } = useData()

  let { 
    seeOurProducts,
    logo,
    description: {
      first: {
        title: title1,
        body: body1
      }, 
      second: {
        title: title2,
        body: body2
      },
      third: {
        title: title3,
        body: body3
      }
    }
  } = dict.content.homepage
  
  if(lang === 'fa' || lang === 'ar'){
    title1 = ":" + title1, title2 = ":" + title2, title3 = ":" + title3
  }else {title1 += ":", title2 += ":", title3 += ":"}
    
  return (
    <>
      <div className={classNames({"text-end": lang === 'fa' || lang === 'ar'})}>
        <div className="relative min-h-[30vh] bg-[url(@/public/images/ricefield1.jpg)] bg-cover">
          <div className={classNames({"bg-linear-to-r": !(lang === 'fa' || lang === 'ar'), "bg-linear-to-l": (lang === 'fa' || lang === 'ar'), "absolute top-0 h-full w-full from-[#ffffff] from-30%": true})}></div>
          <div className={classNames({"left-[5%] right-auto": !(lang === 'fa' || lang === "ar"), "p-10 absolute top-[40%] right-[5%]" : true})}>
            <h1 className="text-3xl mb-9 font-bold text-green-900">{logo}</h1>
            {/* <ul className="space-y-3 text-[var(--sub-dark-text)] text-[12px] sm:text-[15px] md:text-[17px] md:max-w-[50vw] lg:max-w-[40vw]">
              <li className="space-y-1">
                <h2 className="font-bold">{title1}</h2>
                <p>{body1}</p>
              </li>
              <li className="space-y-1">
                <h2 className="font-bold">{title2}</h2>
                <p className="">{body2}</p>
              </li>
              <li className="space-y-1">
                <h2 className="font-bold">{title3}</h2>
                <p>{body3}</p>
              </li>
            </ul> */}
          </div>
{/*           <Link href="#products" className="absolute bottom-0 w-full flex justify-center items-center p-5 space-x-2">
              <FaArrowDown />
              <p>{seeOurProducts}</p>
          </Link> */}
        </div>
        <div id="products" className="flex items-center justify-center p-10 bg-[var(--background)]">
          <div className="flex gap-9 overflow-x-auto">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage