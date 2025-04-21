'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";




const Shoppingcart = ({addedToCartProducts} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[]}) => {
  const router = useRouter()
  const [display, setDisplay] = useState('flex')
    const handleDisplay = () => {
      display === 'flex' ? 
      setDisplay('none') :
      setDisplay('flex')
    }
  const handleDelete = async(id: number) => {
    await axios.delete('/api/addedToCartProducts/' + id)
    router.refresh()
  }
  return (
    <div style={{display: display}} className='hamburger-nav-animation fixed top-[80px] p-12 z-100 w-[100vw] h-[calc(100vh-80px)] border-t-2 border-[#2f863b9a] backdrop-blur-sm bg-[#00000081] flex flex-col items-end'>
      <div className="mb-15 cursor-pointer text-xl">
        <FaArrowRight onClick={handleDisplay}/>
      </div>
      <div className="flex gap-10 flex-wrap w-full justify-center">
        {addedToCartProducts.length === 0 ? <p>No item found</p> :
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
                <button className="bg-red-900 mt-3 p-2 rounded-[3px] cursor-pointer" onClick={() => handleDelete(item.id)}>حذف از سبد</button>
                <div className='mt-3 flex gap-4 p-3 bg-green-600 rounded-[3px]'>
                  <FaMinus className='cursor-pointer' />
                  <FaPlus className='cursor-pointer' />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Shoppingcart
