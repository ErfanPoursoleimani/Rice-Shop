import Loading from '@/app/[lang]/_components/Loading'
import { useCartAction } from '@/app/hooks/useCartAction'
import { Product } from '@/types/types'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6'


const CartButton = ({ product, buttonBg, className }: { product: Product, buttonBg: string, className?: string }) => {

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
      <div
        className={`
          ${className}
          w-[50%] md:w-[55%] min-md:h-12 h-10 px-2 py-1 md:py-2 select-none flex justify-stretch items-center rounded-[7px] md:text-[22px] text-[20px]
        `}
        style={{
          backgroundColor: isAddedToCart ? "#ffffff" : `var(${buttonBg})`,
        }}
        
      >
          {
            isDeletingFromCart
            ? <Loading className={`text-black self-center`} />
            : isAddedToCart
            ? <div className={`text-[16px] text-black relative w-full flex justify-between items-center gap-2`}>
                { currentQuantity === 1
                  ? <button className={`${isLoading || isDeletingFromCart ? "cursor-not-allowed" : ""}`} disabled={isLoading || isDeletingFromCart}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFromCart()
                      }}
                    ><FaTrashCan className='flex-1 hover:cursor-pointer text-red-400'/></button>
                  : <button className={`${isLoading ? "cursor-not-allowed" : ""}`} disabled={isLoading || isDeletingFromCart}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecreaseQuantity()
                      }}
                    ><FaMinus className='flex-1 cursor-pointer'/></button>
                }
                { isLoading
                  ? <Loading className={`text-black text-[10px] flex-1`}/>
                  : <span className='flex-1 flex items-center justify-center max-md:text-[13px] text-neutral-900'>{currentQuantity}</span>
                  // : <input className='cursor-pointer md:w-10 w-5 flex-1 max-md:text-[13px] outline-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]' type="number" onChange={(e) => handleQuantityInput(e)} defaultValue={currentQuantity}/>
                }
                <button className={`${isLoading ? "cursor-not-allowed" : ""}`} disabled={isLoading || isDeletingFromCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncreaseQuantity()
                  }}
                ><FaPlus className='flex-1 cursor-pointer'/></button>
              </div>
            : <button 
                disabled={isLoading}
                onClick={(e) => handleClickButton(e)} 
                className={`w-full flex-1 flex justify-center ${ !isAddedToCart ? "cursor-pointer" : null}`}
                style={{
                  color: buttonBg === '--theme' ? `var(--theme2)` : 'var(--theme)',
                }}
              >
                <ShoppingCart className='max-md:w-5 max-md:h-5'/>
              </button>
          }
      </div>
    </>
  )
}

export default CartButton
