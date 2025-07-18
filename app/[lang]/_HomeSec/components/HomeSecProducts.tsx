"use client"
import useDataStore from '@/stores/dataStore'
import classNames from 'classnames'
import React from 'react'
import { default as ListNavButtons, default as NavArrows } from '../../_components/NavArrows'
import ProductCard from '../../_ProductCard/ProductCard'
import SeeAllProducts from './components/SeeAllProducts'

const HomeSecProducts = () => {

    const { dict, tags, isRTL } = useDataStore()

    if (!dict || !tags || tags.length === 0) {
        return <div>Loading...</div>
    }

  return (
    <div className="w-full 1484:max-w-[900px] max-w-[1050px] 2xl:max-w-[1100px] space-y-5 py-5 bg-[var(--theme)] md:rounded-[15px]">

        <div className="flex flex-col justify-center w-full relative overflow-x-auto z-2 border-b-3 border-[#fff] pb-5 ">
            <h2 className='md:hidden font-bold mb-3 mx-5 text-[23px]'>{dict.product.categories[tags[0].label as keyof typeof dict.product.categories]}</h2>
            <div
            className={classNames({
                "flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide px-5": true,
                "flex-row-reverse": isRTL,
                "flex-row": !(isRTL),
            })}>
                <h2 className='hidden md:flex flex-col justify-center items-center self-stretch px-2 text-center mx-13 text-[40px] font-bold'>{dict.product.categories[tags[0].label as keyof typeof dict.product.categories]}</h2>
                {tags[0].products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
                <SeeAllProducts arrowDirection={`${isRTL ? "toLeft" : "toRight"}`} />
            </div>
            <ListNavButtons />
        </div>

        <div className="flex flex-col justify-center w-full relative overflow-x-auto z-2">
            <h2 
                className='md:hidden font-bold mb-3 mx-5 text-[23px]'
                style={
                    isRTL ? {textAlign: "left"} : {textAlign: "right"}
                }
            >
                {dict.otherProducts}
            </h2>
            <div 
            className={classNames({
                "flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide px-5": true,
                "flex-row": isRTL,
                "flex-row-reverse": !(isRTL),
            })}>
                <h2 className='hidden md:flex flex-col justify-center items-center self-stretch px-2 text-center mx-6 text-[40px] font-bold'>{dict.otherProducts}</h2>
                {tags.filter((category, i) => i != 0).map((category) => (
                    <React.Fragment key={category.id}>
                        {category.products.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </React.Fragment>
                ))}
                <SeeAllProducts arrowDirection={`${isRTL ? "toRight" : "toLeft"}`} />
            </div>
            <NavArrows />
        </div>
    </div>
  )
}

export default HomeSecProducts
