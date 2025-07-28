
import useDataStore from '@/stores/dataStore'
import { Product } from '@/types/types'
import { useParams } from 'next/navigation'
import CartButton from './CartButton'

const PricingAndButton = ({ product, buttonBg }: { product: Product, buttonBg: string }) => {

    const { lang } = useParams()
    const { dict, cartProducts, isRTL } = useDataStore()
    const { id, priceFa, description, label, stock } = product

    let productPrice = priceFa

  const { deleteFromCart, addToCart, price, currency, massUnit, perkg, products } = dict.product

    if(!product.stock) {
    return (
      <>
      <div 
        className={`
          inline-flex flex-col-reverse gap-1 justify-center items-center
          ${isRTL ? "justify-end" : "justify-start"}
        `}
      >
        <div className={`
          ${isRTL ? 'items-start' : 'items-end'} 
          'flex justify-center md:text-[11px] text-[9px] gap-[2px]'
        `}
        >
          <span>{currency} </span>
          <span>/</span>
          <span>{massUnit}</span>
        </div>
        <span className={`md:text-[18px] text-[14px]`}>
          {productPrice} 
        </span>
      </div>
      <p 
        className={`
          w-[50%] md:w-[55%] min-md:h-12 h-10  py-1 md:py-3 select-none text-center flex items-center rounded-[7px] md:text-[10px] text-[8px]
          bg-[var(--theme2)] text-[var(--theme)] px-1 f border-b-2
        `}
      > 
        Out of stock
      </p>
    </>
    );
  }

  return (
    <>
      <div 
        className={`
          inline-flex flex-col-reverse gap-1 justify-center items-center
          ${isRTL ? "justify-end" : "justify-start"}
        `}
      >
        <div className={`
          ${isRTL ? 'items-start' : 'items-end'} 
          'flex justify-center md:text-[11px] text-[9px] gap-[2px]'
        `}
        >
          <span>{currency} </span>
          <span>/</span>
          <span>{massUnit}</span>
        </div>
        <span className={`md:text-[18px] text-[14px]`}>
          {productPrice} 
        </span>
      </div>
      <CartButton product={product} buttonBg={buttonBg}/>
    </>
  )
}

export default PricingAndButton
