'use client'
import React, { ReactElement, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { FaRegTrashCan } from 'react-icons/fa6'
import classnames from 'classnames'
import Image from "next/image";

interface Props {
  id: number,
  img: number,
  label: string,
  description: string,
  productPrice: string,
  addedToCartProduct: { id: number; label: string; price: string; count: number },
  dict: {product: {deleteFromCart: string,perkg: string, addToCart: string, price: string, currency: string, label: string, massUnit: string, products: {برنج_کشت_دوم: string,برنج_قهوه_ای: string,برنج_طارم_عطری: string,برنج_طارم_فجر: string}}, content: {logo: string, seeOurProducts: string}},
  lang: string
}



const ProductCard =  ({id, img, label, description, productPrice, addedToCartProduct, dict, lang}: Props) => {

  const { deleteFromCart, addToCart , price , currency , massUnit, perkg } = dict.product
  const { products } = dict.product

  const router = useRouter()

  useEffect(() => {
    if(addedToCartProduct === null){
      addedToCartProduct = {id: -1, label: "", price: "", count: 0}
    }
  }, [addedToCartProduct])
  
  useEffect(() => {
    if(addedToCartProduct.id === -1){
      setAddToCartButtonDisplay('block')
      setManageProductButtonDisplay('none')
    } else if(addedToCartProduct.id !== -1){
      setAddToCartButtonDisplay('none')
      setManageProductButtonDisplay('block')
    }
    setProductCount(addedToCartProduct.count === 0 ? 1 : (addedToCartProduct.count))
  }, [addedToCartProduct, addedToCartProduct])
  
  const [manageProductButtonDisplay, setManageProductButtonDisplay] = useState(addedToCartProduct === null ? "none" : "block")
  const [addToCartButtonDisplay, setAddToCartButtonDisplay] = useState(addedToCartProduct !== null ? "none" : "block")
  const [productCount, setProductCount] = useState(addedToCartProduct !== null ? addedToCartProduct.count : 1)
  
  
  const [isAdding, setIsAdding] = useState(false)
  const handleAddToCart = async() => {
    setIsAdding(true)
    await axios.post('/api/addedToCartProducts', {id: id, label: label, price: productPrice, count: productCount})
    setAddToCartButtonDisplay('none')
    setManageProductButtonDisplay('block')
    router.refresh()
    setIsAdding(false)
  }
  
  const handleIncreaseCount = async() => {
    setProductCount(productCount + 1)
    if(addedToCartProduct !== null) {
      await axios.patch('/api/addedToCartProducts/' + id, {id: id, label: label, price: productPrice, count: productCount + 1})
      router.refresh()
    }
  }
  
  const handleDecreaseCount = async() => {
    productCount !== 1 ? setProductCount(productCount - 1) : null
    if(addedToCartProduct !== null && addedToCartProduct.count !== 1) {
      await axios.patch('/api/addedToCartProducts/' + id, {id: id, label: label, price: productPrice, count: productCount - 1})
      router.refresh()
    }
  }
  
  
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async() => {
    setIsDeleting(true)
    await axios.delete('/api/addedToCartProducts/' + id)
    router.refresh()
    setProductCount(1)
    setIsDeleting(false)
  }
  
  return (
    <div className={`w-67 h-80 text-[var(--light-text)] space-y-3 py-20 pb-10 px-5 relative flex justify-center items-center gap-2 rounded-[50px] overflow-clip`}>
      <div className='absolute w-full h-[500px] bg-[var(--foreground)] z-2'></div>
      {img}
      <Image className="rounded-[4px] absolute w-70 h-95 z-1" src={"https://picsum.photos/200/300"} width={1000} height={1000} alt="product"></Image>
      <div className='z-3 w-full h-full flex flex-col justify-between items-center'>
        <h2 className="text-[25px]">{products[label as keyof typeof products]}</h2>
        <div className={classnames({'text-left': !(lang === 'fa' || lang === 'ar'), 'text-right': lang === 'fa' || lang === 'ar'  , 'w-full': true})}>
          <p className={classnames({'ml-2': !(lang === 'fa' || lang === 'ar'), 'mr-3': lang === 'fa' || lang === 'ar'})}>
            {price} {productPrice} {currency} <span className='text-[var(--sub-light-text)] text-[13px]'>({perkg})</span>
          </p>
          <div className={classnames({'text-[15px]': lang === 'de'})}>
            <button style={{display: addToCartButtonDisplay}} className='mt-2 bg-[#000000] text-[var(--light-text)] p-3 rounded-xl w-full' onClick={handleAddToCart}>
              {isDeleting ? <span className="loading loading-spinner loading-sm"></span> :
              <p>{addToCart}</p>}
            </button>
            <button style={{display: manageProductButtonDisplay}} disabled={isDeleting} className=' mt-2 p-3 bg-[#ffffff] text-[var(--dark-text)] rounded-xl w-full' onClick={handleDelete}>
              {isDeleting ? <span className="loading loading-spinner loading-sm"></span> :
              <div className='flex justify-center items-center space-x-3'>
                <p>{deleteFromCart}</p>
                <FaRegTrashCan className='cursor-pointer text-red-600'/>
              </div>}
            </button>
          </div>
        </div>
      </div>

      <div 
      className={classnames({'absolute bottom-0 z-2 left-[50%] -translate-x-[50%] flex justify-between items-center': true})}>

        <div
        className={classnames({
        'bg-[#ffffff] text-[var(--dark-text)]' : addedToCartProduct !== null, 
        'bg-[#000000] text-[var(--light-text)]' : addedToCartProduct === null,
        'p-2 rounded-full': true})}>

          <FaMinus className='cursor-pointer' onClick={handleDecreaseCount}/>
        </div>
        {!(lang === 'fa' || lang === 'ar') ?
        <div className='flex gap-1 p-3 text-[var(--light-text) '>
          {productCount * 10}
          <p>{massUnit}</p>
        </div>:
        <div className='flex gap-3 p-3 text-[var(--light-text)]'>
          <p>{massUnit}</p>
            {productCount * 10}
        </div>}
        <div
        className={classnames({
        'bg-[#ffffff] text-[var(--dark-text)]' : addedToCartProduct !== null, 
        'bg-[#000000] text-[var(--light-text)]' : addedToCartProduct === null,
        'p-2 rounded-full': true})}>
          <FaPlus className='cursor-pointer' onClick={handleIncreaseCount}/>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
