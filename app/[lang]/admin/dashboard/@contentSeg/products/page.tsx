"use client"
import { ProductPicker } from './ProductPicker'
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BiSolidDirections } from 'react-icons/bi'
import { SlLocationPin } from "react-icons/sl";
import { HiDotsVertical } from "react-icons/hi";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import ProductCard from '@/app/[lang]/_ProductCard/ProductCard'
import Loading from '@/app/[lang]/_components/Loading'
import ProductInfo from './ProductInfo'
import React from 'react'

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { dict, isRTL, products, loading, tags } = useDataStore()
  
  const handleBackAction = () => {
    router.push(`/${lang}/admin/dashboard`)
  }

  return (
    <>
      <div className={`bottom-to-top-animation min-h-100 max-md:absolute max-md:min-h-full max-md:w-full max-md:bg-white flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
        <div className={`p-4 md:border-b-0 border-b-7 border-neutral-200 flex justify-between items-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <p className='font-medium md:border-b-3 border-red-500 md:pb-4'>Products</p>
          {isRTL
            ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} />
            : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
          <span className={`items-center justify-center gap-3 hidden md:flex text-red-500`}>
            <FaPlus />
            <ProductPicker purpose={'post'} buttonContent={`add new product`} className={`text-sm`}/>
          </span>
        </div>
        <div className={`text-[13px] divide-y-[1px] divide-neutral-300 p-5 flex-1 flex flex-col justify-stretch items-stretch gap-5 ${isRTL ? "text-end" : "text-start"}`}>
          { products.length === 0
          ? <div className={`space-y-2 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
              <BiSolidDirections className='text-[150px] text-[var(--theme)]'/>
              <p>No products added</p>
              <ProductPicker purpose={'post'} buttonContent='add an product' className={`p-4 border-1 border-[var(--theme)] rounded-[7px] md:text-sm text-[0.8rem] md:text-md text-[var(--theme)]`}/>
            </div>
          : tags.map((tag) => (
              <div className={`flex flex-col justify-stretch items-stretch gap-5 pb-3`} key={tag.id}>
                <span className={`text-center text-2xl`}>
                  <p className='inline-block pb-2 border-b-2 border-red-600'>{dict.product.categories[tag.label as keyof typeof dict.product.categories]}</p>
                </span>
                {tag.products.map((product) => (
                  <div key={product.id} className={`gap-3 flex items-stretch justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                    <ProductCard buttonBg='--theme' product={product}/>
                    <ProductInfo product={product}/>
                  </div>
                ))}
              </div>
          ))}
        </div>
      </div>
      <div className={`${products.length === 0 ? 'hidden' : ""}`}>
        <span className={`fixed bottom-20 left-[4vw] items-center justify-center gap-3 md:hidden flex text-white bg-[var(--theme)] rounded-full p-4 z-103`}>
          { loading
            ? <Loading className=''/>
            : (
                <>
                  <FaPlus className='text-white'/>
                  <ProductPicker purpose={'post'} buttonContent={`add new product`} className={``}/>
                </>
              )
          }
        </span>
      </div>
    </>
  )
}

export default page
