'use client'
import React from 'react'
import ProductCard from '../_ProductCard/ProductCard'
import useDataStore from '@/stores/dataStore'

const page = () => {

    const { tags, dict } = useDataStore()
    
    if (!dict || !tags || tags.length === 0) {
        return <span>Loading</span>
    }

    tags.sort((a, b) => {
        return b.products.length - a.products.length;
    });

  return (
    <div className='relative top-[80px] flex justify-center items-center py-5'>
      <div className='max-w-[1400px] flex flex-col'>
        <div className='w-full flex flex-col justify-center items-center gap-5 bg-[var(--theme] p-3 md:rounded-[15px]'>
          <h2 className='font-bold text-[20px]'>{dict.product.categories[tags[0].label as keyof typeof dict.product.categories]}</h2>
          <div className='flex flex-wrap justify-center items-center gap-1'>
              {tags[0].products.map((product) => (
                  <ProductCard key={product.id} product={product}/>
              ))}
          </div>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
          {tags.filter((elem, i) => i != 0).map((category) => (
            <div className='flex flex-col justify-center items-center gap-5 bg-[var(--theme] p-3 md:rounded-[15px]' key={category.id}>
                <h2 className='font-bold text-[20px]'>{dict.product.categories[category.label as keyof typeof dict.product.categories]}</h2>
                <div className='flex justify-center items-center gap-1'>
                    {category.products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
