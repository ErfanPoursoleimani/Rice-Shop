'use client'
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import OrderPage from "../[phoneNumber]/OrderPage";
import classNames from "classnames";
import { IsLTR } from "./index";



const Shoppingcart = ({addedToCartProducts, setShoppingcartDisplay, setSignInDisplay, phoneNumber} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[], setShoppingcartDisplay: Function, setSignInDisplay: Function, phoneNumber: string}) => {
  const router = useRouter()

  const { lang } = useParams()

  const handleDisplay = () => {
    setShoppingcartDisplay('none')
  }
  const handleDelete = async(id: number) => {
    await axios.delete('/api/addedToCartProducts/' + id)
    router.refresh()
  }

  const handleIncreaseCount = async(item: {id: number, label: string, price: string, count: number}) => {
    await axios.patch('/api/addedToCartProducts/' + item.id, {id: item.id, label: item.label, price: item.price, count: item.count + 1})
    router.refresh()
  }
  const handleDecreaseCount = async(item: {id: number, label: string, price: string, count: number}) => {
    if(item.count === 1) {
      handleDelete(item.id)
    } else {  
      await axios.patch('/api/addedToCartProducts/' + item.id, {id: item.id, label: item.label, price: item.price, count: item.count - 1})
    }
    router.refresh()
  }
  const [redirected, setRedirected] = useState(false)
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
          {addedToCartProducts.length === 0 ? <p>سبد خرید خالی است</p> :
            addedToCartProducts.map((item) => (
              <div key={item.id} className="flex flex-col items-end gap-4 p-5 rounded-2xl bg-[#1d58172c]">
                <ul className="flex flex-col items-end gap-3">
                  <li className="flex gap-1">
                    <h1>{item.label}</h1>
                    <p className="text-[var(--sub-dark-text)]">: نام محصول</p>
                  </li>
                  <li className="flex gap-1">
                    <h1>{parseInt(item.price) * item.count} تومان</h1>
                    <p className="text-[var(--sub-dark-text)]">: قیمت</p>
                  </li>
                  <li className="flex gap-1">
                    <h1>{item.count}</h1>
                    <p className="text-[var(--sub-dark-text)]">: کیلوگرم</p>
                  </li>
                </ul>
                <div className="flex justify-center items-center gap-2 text-[var(--light-text)]">
                  <button className="bg-[#7c0000] mt-3 p-2 rounded-[3px] cursor-pointer" onClick={() => handleDelete(item.id)}>حذف از سبد</button>
                  <div className='mt-3 flex gap-4 p-3 bg-[#105200da] rounded-[3px]'>
                    <FaMinus className='cursor-pointer' onClick={() => handleDecreaseCount(item)}/>
                    <FaPlus className='cursor-pointer' onClick={() => handleIncreaseCount(item)}/>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button disabled={redirected} style={addedToCartProducts.length === 0 ? {display: 'none'} : {}} className="mt-20 p-2 bg-[#105200da] rounded-[5px] cursor-pointer text-[var(--light-text)]" onClick={phoneNumber === undefined ? handleSignInDisplay : handleOrderPageDisplay}>
          {redirected && <span className="loading loading-spinner loading-sm"></span>}
          {phoneNumber === undefined ? "وارد شوید" : "ادامه"}
        </button>
      </div>
      <div style={{display: orderPageDisplay}}>
        <OrderPage addedToCartProducts={addedToCartProducts} setOrderPageDisplay={setOrderPageDisplay} phoneNumber={phoneNumber}/>
      </div>
    </div>
  )
}

export default Shoppingcart
