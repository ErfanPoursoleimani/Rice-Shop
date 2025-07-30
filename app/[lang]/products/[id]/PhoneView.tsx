'use client'
import useDataStore from '@/stores/dataStore'
import { notFound, useParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { FaStar } from 'react-icons/fa6'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { IoShareSocialOutline } from "react-icons/io5";
import PricingAndButton from '@/app/[lang]/_ProductCard/components/PricingAndButton';
import ProductCard from '../../_ProductCard/ProductCard'

const PhoneView = () => {

    const { id } = useParams()
    const { products, dict, tags, isRTL } = useDataStore()

    const product = products.filter((product) => product.id === parseInt(id as string))[0]

    if (!product) {
        notFound()
    }

    const { priceFa, description, label, stock } = product!

  return (
    <div className='md:hidden w-full relative top-[103px] -z-2'>
      <div className={`w-full sticky top-[103px] -z-1 flex items-center overflow-x-auto scrollbar-hide scroll-smooth`}>
        {product.images.map((image) => (
          <div key={image.id} className='min-w-full bg-neutral-100 min-h-full flex justify-center'>
            <Image className='' key={image.id} src={image.url} width={200} height={200} alt='product image'/>
          </div>
        ))}
      </div>
      <div 
        className={`
          w-full bg-neutral-100 flex flex-col gap-1
          ${isRTL ? "text-end" : "text-start"}`
      }>
        <div className='bg-white rounded-t-3xl min-h-45 flex flex-col justify-evenly p-5'>
          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : "flex-row"}`}>
            <p className={`text-neutral-400 underline underline-offset-3 text-[13px] flex gap-[2px] items-center`}>
              {/* <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span> */}
              {dict.product.categories[tags.find((tag) => tag.id === product.tagId)?.label as keyof typeof dict.product.categories]}
            </p>
            <span className='text-[20px]'><IoShareSocialOutline /></span>
          </div>
          <h1 className={`font-medium text-2xl`}>{dict.product.products[product.label as keyof typeof dict.product.products]}</h1>
          <div className={`flex items-center gap-3`}>
            <span className={`flex gap-1`}>
              <FaStar className='text-yellow-400'/>
              <p className={`text-[13px]`}>
                {product.reviews.length === 0
                 ? "No Reviews"
                 : product.reviews.reduce((sum, review) => review.rating, 0) / product.reviews.length
                }
                <span>{product.reviews.length === 0 ? null : product.reviews.length}</span>
              </p>
            </span>
            { product.reviews.length === 0 
            ? null 
            : <span className={`py-1 px-2 rounded-full flex items-center gap-1 bg-neutral-100`}>
                <span className={`flex items-end gap-[2px] text-[12px]`}>
                  <p>{product.reviews.length}</p>
                  <p>reviews</p>
                </span>
                <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
              </span>
            }
          </div>
        </div>
        <div className={`bg-white p-5 space-y-4`}>
          <h2 className={`font-medium text-[17]`}>About Product</h2>
          <p className='text-[15px] text-neutral-800'>{product.description}</p>
        </div>
        <div className={`bg-white p-5 space-y-4 flex flex-col`}>
          <h2 className={`font-medium text-[17]`}>Reviews</h2>
          {product.reviews.length === 0
           ?  <p className='self-center mb-4 text-[15px] text-neutral-400'>no reviews yet</p>
           :  <span className={`flex gap-1`}>
                <p className={`text-[15px]`}>
                  {product.reviews.reduce((sum, review) => review.rating, 0) / product.reviews.length}
                  <span>{product.reviews.length === 0 ? null : product.reviews.length}</span>
                </p>
                <FaStar className='text-yellow-400 text-[21px]'/>
              </span>
          }
        </div>
        <div className={`bg-white p-5 space-y-4 flex flex-col`}>
          <h2 className={`font-medium text-[17]`}>Similar Products</h2>
          <div className='flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth'>

              {tags.find((tag) => tag.id === product.tagId)!.products.filter((p) => p.id !== product.id).length === 0
              ?  <p className='self-center mb-4 text-[15px] text-neutral-400'>no similar product exists</p>
              : tags.find((tag) => tag.id === product.tagId)!.products.filter((p) => p.id !== product.id).map((product) => (
                  <ProductCard buttonBg='--theme' key={product.id} product={product}/>
                ))
              }
          </div>
        </div>
        <div className={`bg-white p-5 overflow-x-auto w-full space-y-4 flex flex-col mb-[142px]`}>
          <h2 className={`font-medium text-[17]`}>Recommendation</h2>
          <div className='flex gap-2 w-full overflow-x-auto scrollbar-hide scroll-smooth'>
            {tags.filter((tag) => tag.id !== product.tagId).map((tag) => (
              <React.Fragment key={tag.id}>
                {tag.products.filter((p) => p.id !== product.id).map((product) => (
                  <ProductCard buttonBg='--theme' key={product.id} product={product}/>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className='fixed bottom-14 bg-white px-4 py-3 w-full flex justify-between'>
        <ProductCard buttonBg='--theme' product={product}/>
      </div>
    </div>
  )
}

export default PhoneView
