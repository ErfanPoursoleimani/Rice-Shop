
import useDataStore from '@/stores/dataStore'
import { Product } from '@/types/types'
import { useParams } from 'next/navigation'
import CartButton from './CartButton'

const PricingAndButton = ({ product }: { product: Product }) => {

    const { lang } = useParams()
    const { dict, cartProducts, isRTL } = useDataStore()
    const { id, priceAr, priceFa, description, label, stock } = product

    // Setting wich price to show based on users locale
    let productPrice = priceFa
/*     switch (lang) {
      case "fa":
        productPrice = priceFa
      break;
      
      case "ar":
        productPrice = priceAr
      break;
    } */
   const { deleteFromCart, addToCart, price, currency, massUnit, perkg, products } = dict.product


  return (
    <>
      <div 
      className={`
          flex flex-col-reverse flex-wrap-reverse gap-1 justify-center items-center
          ${isRTL ? "justify-end" : "justify-start"}
        `}
      >
        <div className={`
          ${isRTL ? 'text-[10px] items-start' : 'text-[13px] items-end'} 
          'flex justify-center gap-[2px]'
        `}
        >
          <span>{currency} </span>
          <span className=' text-[var(--sub-light-text)]'>|</span>
          <span className=' text-[var(--sub-light-text)]'>{massUnit}</span>
        </div>
        <span className={`text-[23px]`}>
          {productPrice} 
        </span>
      </div>
      <CartButton product={product}/>
    </>
  )
}

export default PricingAndButton
