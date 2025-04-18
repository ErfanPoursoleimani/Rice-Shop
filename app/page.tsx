import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import type1 from '@/public/type1.jpg'
import type2 from '@/public/type2.jpg'
import type3 from '@/public/type3.jpg'
import { ProductCard } from "./components";

const products = [
  {id: 1,
   href: '/products',
   img: <Image className="rounded-[4px]" src={type1} width={200} height={200} alt="product"></Image>,
   label: "برنج طارم فجر",
   description: "بهترین کیفیت از مزارع شمال",
   price: "140000"},
  {id: 2,
   href: '/products',
   img: <Image className="rounded-[4px]" src={type2} width={200} height={200} alt="product"></Image>,
   label: "برنج طارم عطری",
   description: "عطری عالی را تجربه کنید",
   price: "120000"},
  {id: 3,
   href: '/products',
   img: <Image className="rounded-[4px]" src={type3} width={200} height={200} alt="product"></Image>,
   label: "برنج کشت دوم",
   description: "تجربه بهترین کشت برنج",
   price: "170000"},
]

const HomePage = () => {
  return (
    <div className="text-end">
      <div className="relative min-h-[calc(100vh-100px)] bg-[url(@/public/ricefield1.jpg)] bg-cover">
        <div className="absolute top-0 h-full w-full bg-[var(--foreground)]"></div>
        <div className="p-10 absolute top-[20%] md:right-[10%]">
          <h1 className="text-3xl mb-9">فروشگاه پورسلیمانی</h1>
          <ul className="space-y-6 text-[#ffffffb4]">
            <li>عطر بی‌نظیر: با هر پخت، بوی خوش شالیزارهای شمال را در خانه‌تان احساس کنید</li>
            <li>طعم استثنایی: هر دانه طارمی، لطیف و خوشمزه است، لذت هر لقمه با این برنج کامل می‌شود</li>
            <li>کیفیت عالی: از بهترین مزارع ما، مستقیم به سفره‌ی شما. تازه و سالم، همانطور که باید باشد</li>
          </ul>
        </div>
        <Link href="#products" className="absolute bottom-0 w-full flex justify-center items-center p-5 space-x-2">
            <FaArrowDown />
            <p>دیدن محصولات</p>
        </Link>
      </div>
      <div id="products" className="p-15 min-h-150 flex justify-center items-center bg-[var(--background)]">
        <div className="flex justify-center gap-9 flex-wrap">
          {products.map(product => (
            <Link key={product.id} href={"/"}>
              <ProductCard img={product.img} label={product.label} description={product.description} price={product.price}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage