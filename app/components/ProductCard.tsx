'use client'
import React, { ReactElement, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Button } from '@radix-ui/themes';

interface Props {
  id: number,
  img: ReactElement,
  label: string,
  description: string,
  price: string,
  addedToCartProduct: { id: number; label: string; price: string; count: number }
}



const ProductCard =  ({id, img, label, description, price, addedToCartProduct}: Props) => {
  const router = useRouter()
  const [productCount, setProductCount] = useState(1)
  const handleAddToCart = async() => {
    if(addedToCartProduct === null) {
      await axios.post('/api/addedToCartProducts', {id: id, label: label, price: price, count: productCount})
    } else {
      await axios.patch('/api/addedToCartProducts/' + id, {id: id, label: label, price: price, count: productCount + addedToCartProduct.count})
    }
    setProductCount(1)
    router.refresh()
  }
  const handleIncreaseCount = async() => {
    setProductCount(productCount + 1)
  }
  const handleDecreaseCount = async() => {
    productCount !== 1 ? setProductCount(productCount - 1) : null
  }
  return (
    <div className="space-y-3 py-10 px-7 relative overflow-clip flex justify-center items-center gap-2 rounded-[10px]">
        <div className='absolute w-full h-[350px] bg-[var(--foreground)] z-2'></div>
        {img}
        <div className='z-3'>
          <h2 className="text-2xl">{label}</h2>
          <p className="mt-6">قیمت هر کیلو {price} تومان</p>
          <p className="text-[#ffffffb7] text-[14px]">{description}</p>
          <div className='flex flex-col items-end'>
            <div className='bg-[#105200da] mt-7 p-3 rounded-xl inline-flex items-center gap-4'>
              <div className='flex gap-3'>
                <p>کیلوگرم</p>
                {productCount}
              </div>
              <p>|</p>
              <div className='flex gap-4'>
                <FaMinus className='cursor-pointer' onClick={handleDecreaseCount}/>
                <FaPlus className='cursor-pointer' onClick={handleIncreaseCount}/>
              </div>
            </div>
            <Button className='mt-3 bg-[#105200da] p-3 rounded-xl' onClick={handleAddToCart}>اضافه به سبد خرید</Button>
          </div>
        </div>
    </div>
  )
}

export default ProductCard
