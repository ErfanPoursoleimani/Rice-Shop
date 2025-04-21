'use client'
import React, { ReactElement, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import delay from 'delay'
import { Button } from '@radix-ui/themes';

interface Props {
  id: number,
  img: ReactElement,
  label: string,
  description: string,
  price: string
}



const ProductCard =  ({id, img, label, description, price}: Props) => {
  const router = useRouter()
  const [productCount, setProductCount] = useState(1)
  const [addedToCart, setAddedToCart] = useState('inline-block')
  const handleAddToCart = async() => {
    await axios.post('/api/addedToCartProducts', {id: id, label: label, price: price, count: productCount})
    router.refresh()
    setProductCount(1)
  }
  return (
    <div className="space-y-3 p-5 border-[2px] border-[#00ff2a25] rounded-xl">
        {img}
        <h2 className="text-2xl">{label}</h2>
        <p className="mt-6">قیمت هر کیلو {price} تومان</p>
        <p className="text-[#ffffffb7] text-[14px]">{description}</p>
        <div className='flex flex-col items-end'>
          <div className='bg-green-800 mt-3 p-3 rounded-xl inline-flex items-center gap-4'>
            <div className='flex gap-3'>
              <p>کیلوگرم</p>
              {productCount}
            </div>
            <p>|</p>
            <div className='flex gap-4'>
              <FaMinus className='cursor-pointer' onClick={() => setProductCount(productCount - 1)}/>
              <FaPlus className='cursor-pointer' onClick={() => setProductCount(productCount + 1)}/>
            </div>
          </div>
          <Button style={{display: addedToCart}} className='mt-3 bg-green-800 p-3 rounded-xl' onClick={handleAddToCart}>اضافه به سبد خرید</Button>
        </div>
    </div>
  )
}

export default ProductCard
