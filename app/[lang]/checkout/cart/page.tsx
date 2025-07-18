'use client'
import { useAuthStore } from "@/stores/authStore";
import useDataStore from "@/stores/dataStore";
import { useParams } from "next/navigation";
import { LiaOpencart } from "react-icons/lia";
import InCartProduct from "./components/InCartProduct";


const Shoppingcart = () => {

  const { lang } = useParams()
  const { userId } = useAuthStore()

  const { cartProducts } = useDataStore()

  return (
      <div className="relative top-[80px] min-h-[calc(100vh-80px)]">
        { cartProducts.length === 0 
          ? (
            <div className="absolute top-[20%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center text-center">
              <div className="text-[100px] text-[var(--theme2)]">
                <LiaOpencart />
              </div>
              <p className="text-[0.9rem]">سبد خرید خالی است</p>
            </div>
          ) : cartProducts.map((cartProduct) => (
            <InCartProduct key={cartProduct.id} cartProduct={cartProduct} />
          ))}
      </div>
  )
}

export default Shoppingcart
