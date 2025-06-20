
import { FaArrowRight  } from "react-icons/fa6";
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import { Product, CartProduct } from "@prisma/client";

interface Props {
  cartProducts: ({product: Product} & CartProduct)[],
  setOrderPageDisplay: Function,
  phoneNumber: string
}

const OrderPage = ({cartProducts, setOrderPageDisplay, phoneNumber}: Props) => {

  const router = useRouter()

  const handleDisplay = () => {
      setOrderPageDisplay('none')
  }

  let finalSum = 0
  for (let i = 0; i < cartProducts.length; i++) {
    finalSum += cartProducts[i].product.price * cartProducts[i].product.quantity
  }

  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-[80px] p-12 z-101 w-[100vw] h-[calc(100vh-80px)] backdrop-blur-3xl bg-[var(--light-foreground)] flex flex-col items-center'>
      <div className="sticky top-0 mb-15 cursor-pointer text-xl bg-[var(--foreground)] p-2 rounded-full self-end">
        <FaArrowRight color="white" onClick={handleDisplay}/>
      </div>
      <div className='flex flex-col gap-10 items-center'>
          <h1 className='text-[1.25rem]'>محصولات سفارش داده شده</h1>
          <div className="flex gap-10 flex-wrap justify-center">
            {cartProducts.map((cartProduct) => (
            <div key={cartProduct.product.id} className="flex flex-col items-end gap-4 p-5 rounded-2xl bg-[var(--light-foreground)]">
              <ul className="flex flex-col items-end gap-2">
                <li className="flex gap-1">
                  <h1>{cartProduct.product.label}</h1>
                  <p className="text-[var(--sub-dark-text)]">: نام محصول</p>
                </li>
                <li className="flex gap-1">
                  <h1>{cartProduct.product.price * cartProduct.product.quantity} تومان</h1>
                  <p className="text-[var(--sub-dark-text)]">: قیمت</p>
                </li>
                <li className="flex gap-1">
                  <h1>{cartProduct.product.quantity}</h1>
                  <p className="text-[var(--sub-dark-text)]">: کیلوگرم</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <h1>{finalSum} تومان</h1>
          <p>: هزینه کل</p>
        </div>
        <h1 className='text-[1.25rem]'>تایید اطلاعات سفارش</h1>
        
          <button className="bg-black p-3 rounded-[10px]">
            ادامه
          </button>
      </div>
    </div>
  )
}

export default OrderPage

