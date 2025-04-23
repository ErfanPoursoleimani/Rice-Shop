import { useRouter } from 'next/navigation'
import { FaArrowRight  } from "react-icons/fa6";
import React from 'react'



const OrderPage = ({addedToCartProducts, setOrderPageDisplay}: {addedToCartProducts: {id: number, label: string, price: string, count: number}[], setOrderPageDisplay: Function}) => {

    const handleDisplay = () => {
        setOrderPageDisplay('none')
    }
  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-0 p-12 z-101 w-[100vw] h-[100vh] backdrop-blur-sm bg-[#00000081] flex flex-col items-end'>
      <div className="mb-15 cursor-pointer text-xl">
        <FaArrowRight onClick={handleDisplay}/>
      </div>
      <div className='flex flex-col gap-10 items-center'>
          <h1 className='text-[1.25rem]'>محصولات سفارش داده شده</h1>
          <div>
            {addedToCartProducts.map((item) => (
              <div key={item.id} className="flex flex-col items-end gap-4">
                <ul className="flex flex-col items-end gap-2">
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
              </div>
            ))}
          </div>
        <h1 className='text-[1.25rem]'>وارد کردن اطلاعات سفارش</h1>
      </div>
    </div>
  )
}

export default OrderPage