'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { FaRegTrashCan } from 'react-icons/fa6'
import classnames from 'classnames'

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

  
  const [manageProductButtonDisplay, setManageProductButtonDisplay] = useState(addedToCartProduct === null ? "none" : "block")
  const [addToCartButtonDisplay, setAddToCartButtonDisplay] = useState(addedToCartProduct !== null ? "none" : "block")
  const [productCount, setProductCount] = useState(addedToCartProduct !== null ? addedToCartProduct.count : 1)
  
  
  const [isAdding, setIsAdding] = useState(false)
  const handleAddToCart = async() => {
    setIsAdding(true)
    await axios.post('/api/addedToCartProducts', {id: id, label: label, price: price, count: productCount})
    setAddToCartButtonDisplay('none')
    setManageProductButtonDisplay('block')
    router.refresh()
    setIsAdding(false)
  }
  
  const handleIncreaseCount = async() => {
    setProductCount(productCount + 1)
    if(addedToCartProduct !== null) {
      await axios.patch('/api/addedToCartProducts/' + id, {id: id, label: label, price: price, count: productCount + 1})
      router.refresh()
    }
  }
  
  const handleDecreaseCount = async() => {
    productCount !== 1 ? setProductCount(productCount - 1) : null
    if(addedToCartProduct !== null) {
      await axios.patch('/api/addedToCartProducts/' + id, {id: id, label: label, price: price, count: productCount - 1})
      router.refresh()
    }
  }
  
  
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async() => {
    setIsDeleting(true)
    await axios.delete('/api/addedToCartProducts/' + id)
    setAddToCartButtonDisplay("block")
    setManageProductButtonDisplay('none')
    router.refresh()
    setProductCount(1)
    setIsDeleting(false)
  }

  
  return (
    <div className="space-y-3 py-10 px-7 relative overflow-clip flex justify-center items-center gap-2 rounded-[10px]">
      <div className='absolute w-full h-[350px] bg-[var(--foreground)] z-2'></div>
      {img}
      <div className='z-3'>
        <h2 className="text-2xl">{label}</h2>
        <p className="mt-6">قیمت هر کیلو {price} تومان</p>
        <p className="text-[var(--sub-text)] text-[14px] mt-4">{description}</p>
        <div className='flex flex-col items-end'>
          <div className={classnames({'bg-[#ffffff86]' : addedToCartProduct !== null, 'bg-[#105200da]' : addedToCartProduct === null, 'mt-7 p-3 rounded-xl inline-flex items-center gap-4': true})}>
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
          <button style={{display: addToCartButtonDisplay}} className='mt-3 bg-[#105200da] p-3 rounded-xl' onClick={handleAddToCart}>
            {isDeleting ? <span className="loading loading-spinner loading-sm"></span> :
            <p className='text-b'>افزودن به سبد خرید</p>}
          </button>
          <button style={{display: manageProductButtonDisplay}} disabled={isDeleting} className='mt-3 p-3 bg-[#ffffff86] rounded-xl' onClick={handleDelete}>
            {isDeleting ? <span className="loading loading-spinner loading-sm"></span> : 
            <div className='flex justify-center items-center space-x-3'>
              <p className='text-b'>در سبد خرید</p>
              <FaRegTrashCan className='cursor-pointer text-red-600'/>
            </div>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
