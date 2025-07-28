'use client'
import useDataStore from "@/stores/dataStore";
import { useParams, useRouter } from "next/navigation";
import { LiaOpencart } from "react-icons/lia";
import InCartProduct from "./components/InCartProduct";


const Shoppingcart = () => {

  const { lang } = useParams()
  const router = useRouter()

  const { cartProducts, isRTL } = useDataStore()

  if(cartProducts.length === 0){
    return (
      <div className="absolute top-[20%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center text-center">
        <div className="text-[100px] text-[var(--theme)]">
          <LiaOpencart />
        </div>
        <p className="text-[0.9rem] lg:text-[1.1rem] text-neutral-500">سبد خرید خالی است</p>
      </div>
    )
  }

  return (
    <div className={`relative py-10 top-[120px] flex items-center justify-center w-[100vw] min-h-max`}>
      <div className={`max-w-300 w-full flex justify-stretch gap-10
        ${isRTL ? "flex-row-reverse" : null}
        `}
      >
        <div className={`md:border-l- rounded-xl border-neutral-300 flex flex-1 flex-col ${isRTL ? "items-end" : null}`}>
          {/* <div className="w-full h-45 mb-10 border-1 border-neutral-200 rounded-xl"></div> */}
          {cartProducts.map((cartProduct) => (
            <div className={`mx-3 sm:px-6`} key={cartProduct.id}>
              <InCartProduct cartProduct={cartProduct} />
            </div>
          ))}
        </div>
        <div className={`
          w-full md:w-80 md:h-max px-5 py-4
          fixed md:sticky md:top-[105px] md:bottom-auto bottom-[56px] left-0
          flex justify-between md:flex-col md:justify-start gap-5 items-center
          md:border-1 border-neutral-300 rounded-xl bg-white
          text-[14px]
          `}
        >
          <span className={`text-neutral-400 hidden md:flex md:w-full justify-between items-center ${isRTL ? "flex-row-reverse" : null}`}>
            <p>products price {cartProducts.length}</p>
            <p>{cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)}</p>
          </span>
          <span className={`flex flex-col md:flex-row md:w-full ${isRTL ? "items-end md:flex-row-reverse" : "items-start"} md:justify-between md:items-center`}>
            <p>final sum</p>
            <p>{cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)}</p>
          </span>
          <button className={`w-[50%] py-3 text-[17px] rounded-xl md:w-full bg-[var(--theme)] text-white`}>
            complete the order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shoppingcart
