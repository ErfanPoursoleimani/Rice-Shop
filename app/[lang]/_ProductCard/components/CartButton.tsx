import Loading from '@/app/[lang]/_components/Loading'
import { useCartAction } from '@/app/hooks/useCartAction'
import { Product } from '@/types/types'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6'


const CartButton = ({ product, buttonBg }: { product: Product, buttonBg: string }) => {

   // Functions for cart related processes ( add to cart, delete from cart ...) and indicators
   const {
    handleAddToCart,
    handleDeleteFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setQuantity,
    isAddedToCart,
    isDeletingFromCart,
    isLoading,
    currentQuantity,
    error: hookError,
    canIncrease,
    canDecrease
  } = useCartAction(product);

  const [error, setError] = useState(hookError)

  useEffect(() => {
    setError(hookError)
  }, [hookError])

  const handleQuantityInput = (event: any) => {
    
    if(event.target.value > product.stock){
      event.target.value = product.stock
      setError(`Only ${product.stock} in stock`)
      setQuantity(event.target.value)
      
    } else if(event.target.value <= 0) {
      event.target.value = 1
      setError(`Quantity must not be negetive`)
      setQuantity(event.target.value)
    } else {
      setQuantity(event.target.value)
    }
  }

  const handleClickButton =(event: any) => {
    event.stopPropagation()
    handleAddToCart()
  }

  return (
    <>
      <button
        className={`
          w-[50%] md:w-[55%] px-2 py-1 md:py-2 select-none flex justify-stretch items-center rounded-[7px] md:text-[22px] text-[20px] border-1 border-neutral-300 border-b-3
          ${ !isAddedToCart ? "cursor-pointer" : null}
        `}
        style={{
          backgroundColor: isAddedToCart ? "#ffffff" : `var(${buttonBg})`
        }}
        disabled={isLoading}
      >
          {
            isLoading || isDeletingFromCart
            ? <Loading className={`text-white px-6 py-[14px]`}/>
            : isAddedToCart
            ? <div className={`text-[16px] text-black relative w-full flex justify-between items-center gap-2`}>
                { currentQuantity === 1
                  ? <FaTrashCan className='flex-1 hover:cursor-pointer text-red-400'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFromCart()
                  }}
                   />
                  : <FaMinus className='flex-1 cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecreaseQuantity()
                  }}
                   />
                }
                { isLoading
                  ? <Loading className={`text-white`}/>
                  : <span className='flex-1 max-md:text-[13px]'>{currentQuantity}</span>
                  // : <input className='cursor-pointer md:w-10 w-5 flex-1 max-md:text-[13px] outline-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]' type="number" onChange={(e) => handleQuantityInput(e)} defaultValue={currentQuantity}/>
                }
                <FaPlus className='flex-1 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncreaseQuantity()
                }}
                />
              </div>
            : <div onClick={(e) => handleClickButton(e)} className='flex-1 flex justify-center'><ShoppingCart className='max-md:w-5 max-md:h-5'/></div>
          }
      </button>
    </>
  )
}

export default CartButton
