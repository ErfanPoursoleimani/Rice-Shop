'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import OrderPage from './OrderPage'



const Shoppingcart = ({addedToCartProducts, setShoppingcartDisplay} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[], setShoppingcartDisplay: Function}) => {
  const router = useRouter()
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
  const [orderPageDisplay, setOrderPageDisplay] = useState('none')
  const handleOrderPageDisplay = () => {
    setOrderPageDisplay('block')
  }
  return (
    <div>
      <div className='hamburger-nav-animation overflow-scroll fixed top-[80px] p-12 z-100 w-[100vw] h-[calc(100vh-80px)] border-t-2 border-[#2f863b9a] backdrop-blur-sm bg-[#00000081] flex flex-col items-end'>
        <div className="mb-15 cursor-pointer text-xl">
          <FaArrowRight onClick={handleDisplay}/>
        </div>
        <div className="flex gap-10 flex-wrap w-full justify-center">
          {addedToCartProducts.length === 0 ? <p>سبد خرید خالی است</p> :
            addedToCartProducts.map((item) => (
              <div key={item.id} className="flex flex-col items-end gap-4">
                <ul className="flex flex-col items-end gap-3">
                  <li className="flex gap-1">
                    <h1>{item.label}</h1>
                    <p className="text-[#ffffff71]">: نام محصول</p>
                  </li>
                  <li className="flex gap-1">
                    <h1>{parseInt(item.price) * item.count} تومان</h1>
                    <p className="text-[#ffffff71]">: قیمت</p>
                  </li>
                  <li className="flex gap-1">
                    <h1>{item.count}</h1>
                    <p className="text-[#ffffff71]">: کیلوگرم</p>
                  </li>
                </ul>
                <div className="flex justify-center items-center gap-2">
                  <button className="bg-[#ff0c0c5d] mt-3 p-2 rounded-[3px] cursor-pointer" onClick={() => handleDelete(item.id)}>حذف از سبد</button>
                  <div className='mt-3 flex gap-4 p-3 bg-[#105200da] rounded-[3px]'>
                    <FaMinus className='cursor-pointer' onClick={() => handleDecreaseCount(item)}/>
                    <FaPlus className='cursor-pointer' onClick={() => handleIncreaseCount(item)}/>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button style={addedToCartProducts.length === 0 ? {display: 'none'} : {}} className="mt-20 p-2 bg-[#105200da] rounded-[5px] cursor-pointer" onClick={handleOrderPageDisplay}>ادامه خرید</button>
      </div>
      <div style={{display: orderPageDisplay}}>
        <OrderPage addedToCartProducts={addedToCartProducts} setOrderPageDisplay={setOrderPageDisplay}/>
      </div>
    </div>
  )
}

export default Shoppingcart
