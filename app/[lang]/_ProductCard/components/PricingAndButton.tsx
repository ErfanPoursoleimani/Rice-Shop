
import useDataStore from '@/stores/dataStore'
import { Product } from '@/types/types'
import { useParams } from 'next/navigation'
import CartButton from './CartButton'

const PricingAndButton = ({ product, buttonBg }: { product: Product, buttonBg: string }) => {

    const { lang } = useParams()
    const { dict, cartProducts, isRTL } = useDataStore()
    const { id, priceFa, originalPriceFa, description, label, stock } = product

  const { deleteFromCart, addToCart, price, currency, massUnit, perkg, products } = dict.product

  return (
    <>
      <div 
        className={`
          flex flex-col gap-1 justify-center
          ${isRTL ? "items-end" : "items-start"}
        `}
      >
        <p className={`md:text-[19px] text-[13px]`}>{priceFa}</p>
        <div className={`flex items-center gap-[2px] ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className={`md:text-[12px] text-[10px] line-through text-neutral-100 decoration-red-500`}>
            {`${originalPriceFa}`}
            {/* {`${originalPriceFa} (${Math.floor(priceFa/(originalPriceFa-priceFa))}%)`} */}
          </span>
          <div className={`
            ${isRTL ? 'items-start' : 'items-end'} 
            flex justify-center md:text-[9px] text-[6px]`}
          >
            <span>{currency} </span>
            {/* <span>/</span>
            <span>{massUnit}</span> */}
          </div>
        </div>
      </div>
      {!product.stock
      ? <p 
          className={`
            w-[50%] md:w-[50%] min-md:h-12 h-10  py-1 md:py-3 select-none flex justify-center items-center rounded-[7px] md:text-[12px] text-[8px]
            bg-[var(${buttonBg})] text-[var(--theme)] px-1 border-b-2
          `}
        > 
          Out of stock
        </p>
      : <CartButton product={product} buttonBg={buttonBg}/>
      }
    </>
  )
}

export default PricingAndButton
