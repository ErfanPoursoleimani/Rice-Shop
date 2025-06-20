'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { FaRegTrashCan } from 'react-icons/fa6'
import classnames from 'classnames'
import Image from "next/image";
import type1 from '@/public/type1.jpg'
import { useCookies } from 'next-client-cookies';
import { CartProduct, Product } from '@prisma/client';



interface Props {
  product: {
    id: number, 
    label: string, 
    price: number, 
    description: string, 
    quantity: number
  },
  cartProducts?: ({product: Product} & CartProduct)[], 
  dict: {
    product: {
      deleteFromCart: string,
      perkg: string,
      addToCart: string,
      price: string,
      currency: string,
      label: string,
      massUnit: string,
      products: {
        برنج_کشت_دوم: string,
        برنج_قهوه_ای: string,
        برنج_طارم_عطری: string,
        برنج_طارم_فجر: string
      }
    }
  },
  lang: string
}



const ProductCard =  ({product, cartProducts, dict, lang}: Props) => {

  const router = useRouter()

  const cookies = useCookies()
  useEffect(() => {
    if(cookies.get("cartProduct")){
      cartProducts = JSON.parse(cookies.get("cartProducts")!)
    }
  }, [ , cookies.get('cartProducts')])

  const { id, price: productPrice, description, label, quantity } = product
  const { deleteFromCart, addToCart , price , currency , massUnit, perkg } = dict.product
  const { products } = dict.product

  // Checks if the product is added to cart by the user or not, and stores its index, so we know the quantity added to cart
  const [inCartQuantity, setInCartQuantity] = useState(0)
  const [inCartIndex, setInCartIndex] = useState(-1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  useEffect(() => {
    for (let i = 0; i < cartProducts!.length; i++) {
      if(product.id === cartProducts![i].productId){
        setInCartQuantity(cartProducts![i].quantity)
        setInCartIndex(i)
        break;
      } else {
        setInCartQuantity(0)
        setInCartIndex(-1)
      }
    }
    inCartQuantity !== 0 ? setIsAddedToCart(true) : setIsAddedToCart(false)
  }, [cartProducts!.length, cartProducts![inCartIndex].quantity])
  

  const [productQuantity, setProductQuantity] = useState(isAddedToCart ? inCartQuantity : 1)
  const [buttonContent, setButtonContent] = useState(isAddedToCart ? addToCart : deleteFromCart)

  
  const handleIncreaseQuantity = async() => {
    await axios.patch('/api/cart/add', {cartId: cartProducts![inCartIndex].cartId, productId: cartProducts![inCartIndex].productId, quantity: productQuantity + 1})
    router.refresh()
  }
  
  const handleDecreaseQuantity = async() => {
    productQuantity !== 1 ? setProductQuantity(productQuantity - 1) : null
    if(isAddedToCart && inCartQuantity !== 1) {
      await axios.patch('/api/cart/add', {cartId: cartProducts![inCartIndex].cartId, productId: cartProducts![inCartIndex].productId, quantity: productQuantity - 1})
      router.refresh()
    }
  }
  
  const handleAddToCart = async() => {
    await axios.post(`/api/cart/add`, {cartId: cartProducts![inCartIndex].cartId, productId: cartProducts![inCartIndex].productId, quantity: productQuantity})
    router.refresh()
  }
  
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async() => {
    setIsDeleting(true)
    await axios.delete(`/api/cart/delete?cartId=${cartProducts![inCartIndex].cartId}&productId=${cartProducts![inCartIndex].productId}`)
    router.refresh()
    setProductQuantity(1)
    setIsDeleting(false)
  }
  
  const [scale, setScale] = useState('')
  const handleHoverOverCard = (mode: string) => {
    setScale(mode === "enter" ? 'scale-105' : '')
  }
  return (
    <div className={`w-67 h-85 text-[var(--light-text)] space-y-3 pt-15 pb-7 px-5 relative flex justify-center items-center gap-2 rounded-[30px] overflow-clip`} onMouseEnter={() => handleHoverOverCard('enter')} onMouseLeave={() => handleHoverOverCard("leave")}>
      <div className='absolute w-full h-[500px] bg-[var(--foreground)] z-2'></div>
      <Image className={`rounded-[4px] absolute w-70 h-95 z-1 ${scale} duration-500`} src={type1} width={1000} height={1000} alt="product"></Image>
      <div className='z-3 w-full h-full flex flex-col justify-between items-center'>
        <h2 className="text-[25px]">{products[label as keyof typeof products]}</h2>
        <div className={classnames({'text-left': !(lang === 'fa' || lang === 'ar'), 'text-right': lang === 'fa' || lang === 'ar'  , 'w-full ': true})}>
          <p className={classnames({'ml-2': !(lang === 'fa' || lang === 'ar'), 'mr-3': lang === 'fa' || lang === 'ar'})}>
            {price} <span className='text-[var(--sub-light-text)] text-[13px]'>({perkg})</span> {productPrice} {currency} 
          </p>

          <div className={classnames({'justify-end': lang === 'fa' || lang === 'ar', 'flex items-center': true})}>
            <div
            className={classnames({
            'bg-[#ffffff] text-[var(--dark-text)]' : isAddedToCart,
            'p-[6px] rounded-[7px] bg-[#000000] text-[var(--light-text)]': true})}>
              <FaMinus className='cursor-pointer' onClick={handleDecreaseQuantity}/>
            </div>

            {!(lang === 'fa' || lang === 'ar') ?
            <div className='flex gap-1 p-3 text-[var(--light-text) '>
              {productQuantity * 10}
              <p>{massUnit}</p>
            </div>:
            <div className='flex gap-3 p-3 text-[var(--light-text)]'>
              <p>{massUnit}</p>
                {productQuantity * 10}
            </div>}

            <div
            className={classnames({
            'bg-[#ffffff] text-[var(--dark-text)]' : isAddedToCart,
            'p-[6px] rounded-[7px] bg-[#000000] text-[var(--light-text)]': true})}>
              <FaPlus className='cursor-pointer' onClick={handleIncreaseQuantity}/>
            </div>
          </div>
            <button className={classnames({'bg-white text-[var(--dark-text)]': isAddedToCart,'text-[15px]': lang === 'de', 'mt-2 p-3 bg-black text-[var(--light-text)] rounded-xl w-full': true})} disabled={isDeleting} onClick={isAddedToCart ? handleDelete : handleAddToCart}>
              {isDeleting ? <span className="loading loading-spinner loading-sm"></span> : buttonContent}
            </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
