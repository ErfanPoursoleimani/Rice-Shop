
import useDataStore from '@/stores/dataStore'
import { Product } from '@/types/types'
import { useParams } from 'next/navigation'
import CartButton from './CartButton'

const PricingAndButton = ({ product, buttonBg }: { product: Product, buttonBg: string }) => {

    const { lang } = useParams()
    const { dict, cartProducts, isRTL } = useDataStore()
    const { id, priceAr, priceFa, description, label, stock } = product

    let productPrice = priceFa

  const { deleteFromCart, addToCart, price, currency, massUnit, perkg, products } = dict.product

    if(!product.stock) {
    return (
      <h2 
      className={`
        w-full bg-[#ffffff] text-[var(--theme)] px-1 py-2 flex justify-center items-center rounded-[7px] md:text-[15px] text-[12px] border-b-2
      `}
    > 
      Out of stock
    </h2>
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
