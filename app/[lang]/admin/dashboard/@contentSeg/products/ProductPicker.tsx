'use client'
import { usePopup } from '@/app/hooks/usePopup'
import React, { ReactNode, useState } from 'react'
import Popup from '@/app/[lang]/_components/PopupRaw'
import useDataStore from '@/stores/dataStore'
import { z } from 'zod'
import { productSchema } from '@/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import Loading from '@/app/[lang]/_components/Loading'

type productData = z.infer<typeof productSchema>

export const ProductPicker = ({purpose, productId, className, buttonContent}: { purpose: string, productId?: number, className: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const { lang } = useParams()
  const { isRTL, fetchProducts, loading, dict } = useDataStore()
  const { userId } = useAuthStore()
  const router = useRouter()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }} = useForm<productData>({
      resolver: zodResolver(productSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      let dataWithUserId
      if(userId){
        dataWithUserId = {...data, userId}
      }

      purpose === 'post' 
        ? await axios.post(`/${lang}/api/products`, dataWithUserId) 
        : purpose === "patch" 
        ? await axios.patch(`/${lang}/api/products/${productId}`, dataWithUserId) 
        : null

      await fetchProducts(lang as string)
      popup.closePopup()
    } catch (error) {
      console.log(error)
    } finally {
    }
  })



  return (
    <>
      <button
      disabled={loading}
      className={`${className}`}
      onClick={() => popup.openPopup({ title: 'Add new product', variant: 'default' })}
      >
        
        { loading
          ? <Loading className={`text-white`} />
          : buttonContent
        }
      </button>
      <Popup popup={popup} className={`top-0 left-0 z-103 text-neutral-800`}>
        <form onSubmit={onSubmit}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-25`}>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Lable</p>
              <div>
                <input {...register('label')} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.label?.message}</p>
              </div>
            </div>
            <div className={`flex justify-stretch items-center gap-5`}>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Original Price</p>
                <div>
                  <input {...register('originalPriceFa')} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.originalPriceFa?.message}</p>
                </div>
              </span>
              <span className={`flex flex-col items-stretch flex-1 space-y-3`}>
                <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Price After Discount</p>
                <div>
                  <input {...register('priceFa')} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                  <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.priceFa?.message}</p>
                </div>
              </span>
            </div>
            <div className='flex flex-col items-stretch flex-1 space-y-3'>
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>Description</p>
              <div>
                <input {...register('description')} className={`w-full md:border-1 max-md:focus:border-b-3 max-md:focus:border-[var(--theme)] outline-0 border-neutral-300 focus:border-[var(--theme)] rounded-[7px] max-md:bg-neutral-200 h-12 p-3`} type="search" />
                <p className='text-red-600 px-1 text-[12px] mt-2'>{errors.description?.message}</p>
              </div>
            </div>
          </div>
          <div className={`absolute bg-white bottom-0 left-0 w-full border-t-1 p-4 border-neutral-300 z-103`}>
            <button disabled={isSubmitted} className={`bg-[var(--theme)] p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              Confirm and continue
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}