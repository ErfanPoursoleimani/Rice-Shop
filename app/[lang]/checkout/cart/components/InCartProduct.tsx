import PricingAndButton from '@/app/[lang]/_ProductCard/components/PricingAndButton'
import { CartProduct } from '@/types/types'
import { useParams } from 'next/dist/client/components/navigation'
import classnames from 'classnames'
import Image from 'next/image'
import React from 'react'
import useDataStore from '@/stores/dataStore'

const InCartProduct = ({ cartProduct }: {cartProduct: CartProduct}) => {
    const { lang } = useParams()
    const { isRTL } = useDataStore()

  return (
    <div className='flex-row-reverse'>
        <Image src={cartProduct.product.images[0].url} alt={cartProduct.product.label} width={100} height={100} />
        <div>
            <h1>{cartProduct.product.label}</h1>
            <h2>{cartProduct.product.description}</h2>
            <div
          className={classnames({
          'text-left': !(isRTL),
          'text-right': isRTL,
          'w-full': true})}
          >
            <PricingAndButton product={cartProduct.product}/>
          </div>
        </div>
    </div>
  )
}

export default InCartProduct
