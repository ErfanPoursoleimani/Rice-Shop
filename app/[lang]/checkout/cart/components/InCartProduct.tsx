import PricingAndButton from '@/app/[lang]/_ProductCard/components/PricingAndButton'
import { CartProduct } from '@/types/types'
import { useParams } from 'next/dist/client/components/navigation'
import classnames from 'classnames'
import Image from 'next/image'
import React from 'react'
import useDataStore from '@/stores/dataStore'
import { TypeOf } from 'zod'

const InCartProduct = ({ cartProduct }: {cartProduct: CartProduct}) => {
    const { lang } = useParams()
    const { isRTL, dict } = useDataStore()

  return (
    <div className={`flex gap-5 ${isRTL ? 'justify-end flex-row-reverse' : null} items-stretch`}>
        <Image className='rounded-xl' src={cartProduct.product.images[0].url} alt={cartProduct.product.label} width={160} height={100} />
        <div className={`flex flex-1 gap-4 flex-col justify-between ${isRTL ? "items-end" : null}`}>
          <h1 className='text-xl'>{dict.product.products[cartProduct.product.label as keyof typeof dict.product.products]}</h1>
          <div
            className={`flex flex-col w-60 gap-3
              ${ isRTL ? "items-end" : "items-start" }
            `}
          >
            <PricingAndButton product={cartProduct.product} buttonBg={'--theme'}/>
          </div>
        </div>
    </div>
  )
}

export default InCartProduct
