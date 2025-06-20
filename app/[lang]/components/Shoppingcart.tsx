'use client'
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import OrderPage from "../[phoneNumber]/OrderPage";
import classNames from "classnames";
import { useCookies } from "next-client-cookies";
import { CartProduct, Product } from "@prisma/client";


interface Props {
  cartProducts?: ({product: Product} & CartProduct)[],
  setShoppingcartDisplay: Function, 
  setSignInDisplay: Function, 
  phoneNumber: string
}

const Shoppingcart = ({cartProducts, setShoppingcartDisplay, setSignInDisplay, phoneNumber} : Props) => {

  const router = useRouter()

  const { lang } = useParams()

  const cookies = useCookies()
  useEffect(() => {
    if(cookies.get("cartProduct")){
      cartProducts = JSON.parse(cookies.get("cartProducts")!)
    }
  }, [ , cookies.get('cartProducts')])

  const handleDisplay = () => {
    setShoppingcartDisplay('none')
  }

  const handleIncreaseQuantity = async(cartProduct: {product: Product} & CartProduct) => {
    await axios.patch('/api/cart/add', {cartId: cartProduct.cartId, productId: cartProduct.productId, quantity: cartProduct.product.quantity + 1})
    router.refresh()
  }
  
  const handleDecreaseQuantity = async(cartProduct: {product: Product} & CartProduct) => {
    if(cartProduct.product.quantity === 1){
      handleDelete(cartProduct)
    }else {
      await axios.patch('/api/cart/add', {cartId: cartProduct.cartId, productId: cartProduct.productId, quantity: cartProduct.product.quantity - 1})
      router.refresh()
    }
  }
  
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async(cartProduct: {product: Product} & CartProduct) => {
    setIsDeleting(true)
    await axios.delete(`/api/cart/delete?cartId=${cartProduct.cartId}&productId=${cartProduct.productId}`)
    router.refresh()
    setIsDeleting(false)
  }


  const [orderPageDisplay, setOrderPageDisplay] = useState('none')
  const handleOrderPageDisplay = () => {
    setOrderPageDisplay('block')
  }

  const handleSignInDisplay = () => {
    setShoppingcartDisplay('none')
    setSignInDisplay('block')
  }

  return (
    <div>
      <div className={classNames({'left-to-right-animation': !(lang === 'fa' || lang === 'ar'), "right-to-left-animation": (lang === 'fa' || lang === 'ar') ,'overflow-scroll fixed top-[80px] p-12 z-101 w-[100vw] h-[calc(100vh-80px)] backdrop-blur-3xl bg-[var(--light-foreground)] flex flex-col items-end': true})}>
        <div className="mb-15 cursor-pointer text-xl bg-[var(--foreground)] text-[var(--light-text)] p-2 rounded-full" onClick={handleDisplay}>
          <FaArrowRight />
        </div>
        <div className="flex gap-10 flex-wrap w-full justify-center">
          {cartProducts!.length === 0 ? <p>سبد خرید خالی است</p> :
            cartProducts!.map((cartProduct) => (
              <div key={cartProduct.product.id} className="flex flex-col items-end gap-4 p-5 rounded-2xl bg-[#1d58172c]">
                <ul className="flex flex-col items-end gap-3">
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
                <div className="flex justify-center items-center gap-2 text-[var(--light-text)]">
                  <button className="bg-[#7c0000] mt-3 p-2 rounded-[3px] cursor-pointer" onClick={() => handleDelete(cartProduct)}>حذف از سبد</button>
                  <div className='mt-3 flex gap-4 p-3 bg-[#105200da] rounded-[3px]'>
                    <FaMinus className='cursor-pointer' onClick={() => handleDecreaseQuantity(cartProduct)}/>
                    <FaPlus className='cursor-pointer' onClick={() => handleIncreaseQuantity(cartProduct)}/>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button style={cartProducts!.length === 0 ? {display: 'none'} : {}} className="mt-20 p-2 bg-[#105200da] rounded-[5px] cursor-pointer text-[var(--light-text)]" onClick={phoneNumber === undefined ? handleSignInDisplay : handleOrderPageDisplay}>
          {phoneNumber === undefined ? "وارد شوید" : "ادامه"}
        </button>
      </div>
      <div style={{display: orderPageDisplay}}>
        <OrderPage cartProducts={cartProducts!} setOrderPageDisplay={setOrderPageDisplay} phoneNumber={phoneNumber}/>
      </div>
    </div>
  )
}

export default Shoppingcart
