import { useRouter } from 'next/navigation'
import { FaArrowRight } from "react-icons/fa6";
import React from 'react'



const OrderPage = ({setOrderPageDisplay}: {setOrderPageDisplay: Function}) => {

    const handleDisplay = () => {
        setOrderPageDisplay('none')
    }
  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-0 p-12 z-101 w-[100vw] h-[100vh] backdrop-blur-sm bg-[#00000081] flex flex-col items-end'>
      <div className="mb-15 cursor-pointer text-xl">
        <FaArrowRight onClick={handleDisplay}/>
      </div>
      <h1>وارد کردن اطلاعات سفارش</h1>
    </div>
  )
}

export default OrderPage