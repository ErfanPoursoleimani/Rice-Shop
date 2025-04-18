import React, { ReactElement } from 'react'


interface Props {
    img: ReactElement,
    label: String,
    description: String,
    price: String
}

const ProductPage = ({img, label, description, price}: Props) => {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className="space-y-3 p-5 border-[2px] border-[#ffffff25] rounded-xl">
            {img}
            <h2 className="text-2xl">{label}</h2>
            <p className="mt-6">قیمت هر کیلو {price} تومان</p>
            <p className="text-[#ffffffb7] text-[14px]">{description}</p>
        </div>
    </div>
  )
}

export default ProductPage
