import { useCartAction } from '@/app/hooks/useCartAction'
import { Product } from '@/types/types'
import React from 'react'
import { TbShoppingCartUp } from 'react-icons/tb'
import Loading from '@/app/[lang]/_components/Loading'
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6'


const CartButton = ({ product }: { product: Product }) => {

   // Functions for cart related processes ( add to cart, delete from cart ...) and indicators
   const {
    handleAddToCart,
    handleDeleteFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setQuantity,
    // isAddedToCart,
    isDeletingFromCart,
    isLoading,
    // currentQuantity,
    error,
    canIncrease,
    canDecrease
  } = useCartAction(product);

  const isAddedToCart = false
  const currentQuantity = 1

  return (
    <button 
      className={`
        ${ isAddedToCart ? "bg-[#ffffff]" : 'bg-[var(--theme)]' }
        w-[50%] px-2 py-3 flex justify-center items-center rounded-[7px] md:text-[22px] text-[20px]
      `}
      disabled={isLoading}
    > 
        { isAddedToCart
          ? <div className={`text-[16px] text-[var(--theme2)] relative w-full flex justify-between items-center gap-2`}>
              { currentQuantity === 1 
                ? <FaTrashCan className='hover:cursor-pointer text-red-400' onClick={handleDeleteFromCart} /> 
                : <FaMinus className='hover:cursor-pointer' onClick={handleDecreaseQuantity} /> }
              { isLoading 
                ? <Loading className={`text-white`}/> 
                : <span>
                    {currentQuantity}
                  </span>}
              <FaPlus className='hover:cursor-pointer' onClick={handleIncreaseQuantity}/>
            </div>
          : isLoading 
          ? <Loading className={`text-white px-6 py-[14px]`}/> 
          : <TbShoppingCartUp onClick={handleAddToCart} className='text-white px-6 py-[13px]'/>}

    </button>
  )
}

export default CartButton
