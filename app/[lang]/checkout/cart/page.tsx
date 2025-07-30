'use client'
import useDataStore from "@/stores/dataStore";
import { useParams, useRouter } from "next/navigation";
import { LiaOpencart } from "react-icons/lia";
import InCartProduct from "./components/InCartProduct";
import { useMemo } from "react";


const Shoppingcart = () => {

  const { lang } = useParams()
  const router = useRouter()

  const { cartProducts, isRTL, dict } = useDataStore()
  const currency = dict.product.currency
  const massUnit = dict.product.massUnit

  const handleClickContiniue = () => {
    router.push
  }



  const sum = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)
  }, [cartProducts])
  const finalSum = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)
  }, [cartProducts])
  const discountAmmount = useMemo(() => {
    return cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)
  }, [cartProducts])
  const discountPercentage = useMemo(() => {
    return Math.floor(cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) / (cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0) - cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)))
  }, [cartProducts])

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
    <div className={`relative p-3 xs:p-5 sm:p-10 top-[120px] flex items-center justify-center w-[100vw] min-h-max`}>
      <div className={`max-w-250 w-full flex justify-stretch gap-10
        ${isRTL ? "flex-row-reverse" : null}
        `}
      >
        <div className={`rounded-xl border-neutral-300 flex flex-1 flex-col gap-6 sm:gap-10 ${isRTL ? "items-end" : null}`}>
          {/* <div className="w-full h-45 mb-10 border-1 border-neutral-200 rounded-xl"></div> */}
          {cartProducts.map((cartProduct) => (
            <div className={``} key={cartProduct.id}>
              <InCartProduct cartProduct={cartProduct} />
            </div>
          ))}
        </div>
        <div className={`
          w-full md:w-85 md:h-max px-5 py-4
          fixed md:sticky md:top-[105px] md:bottom-auto bottom-[56px] left-0
          flex justify-between md:flex-col md:justify-start gap-5 items-center
          md:border-1 border-neutral-300 rounded-xl bg-white
          text-[14px]
          `}
        >
          <span className={`text-neutral-400 hidden md:flex md:w-full justify-between items-center ${isRTL ? "flex-row-reverse" : null}`}>
              <span className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>products price</p>
                <p>{`(${cartProducts.length})`}</p>
              </span>
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <p>{cartProducts.reduce((sum, elem) => elem.product.originalPriceFa, 0)}</p>
              <span className="text-[12px]">{currency}</span>
            </div>
          </span>
          <span className={`flex flex-col md:flex-row md:w-full ${isRTL ? "md:flex-row-reverse" : ""} md:justify-between md:items-center`}>
            <p className="max-md:text-neutral-400">final sum</p>
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <p>{cartProducts.reduce((sum, elem) => elem.product.priceFa, 0)}</p>
              <span className="text-[12px]">{currency}</span>
            </div>
          </span>
          <span className={`hidden md:flex md:w-full justify-between items-center ${isRTL ? "flex-row-reverse" : null} text-[var(--theme)]`}>
            <p>Amount of discount</p>
            <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <p>{discountAmmount}</p>
                <span className="text-[12px]">{currency}</span>
              </span>
              <p className="text-[12px]">{` (${discountPercentage}%) `}</p>
            </div>
          </span>
          <button onClick={handleClickContiniue} className={`w-[50%] py-3 text-[17px] rounded-xl md:w-full bg-[var(--theme)] text-white`}>
            complete the order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shoppingcart
