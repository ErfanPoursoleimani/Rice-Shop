
import { FaArrowRight  } from "react-icons/fa6";
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from "next/navigation";
import { orderSchema } from "../validationSchemas";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';


type orderData = z.infer<typeof orderSchema>

const OrderPage = ({addedToCartProducts, setOrderPageDisplay, phoneNumber}: {addedToCartProducts: {id: number, label: string, price: string, count: number}[], setOrderPageDisplay: Function, phoneNumber: string}) => {

  const router = useRouter()
  const handleDisplay = () => {
      setOrderPageDisplay('none')
  }
  let finalSum = 0
  for (let i = 0; i < addedToCartProducts.length; i++) {
    finalSum += parseInt(addedToCartProducts[i].price ) * addedToCartProducts[i].count
    
  }

  const {register, handleSubmit, formState: { errors, isSubmitted }} = useForm<orderData>({
    resolver: zodResolver(orderSchema)
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = handleSubmit( async(data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/orders' , data)
      router.push('/')
      setIsSubmitting(false)
      router.refresh()
    } catch (error) {
      setError('An unexpected error occurred.')
    }
  })

  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-[80px] p-12 z-101 w-[100vw] h-[calc(100vh-80px)] backdrop-blur-3xl bg-[#0000003b] flex flex-col items-center'>
      <div className="sticky top-0 mb-15 cursor-pointer text-xl bg-[var(--foreground)] p-2 rounded-full self-end">
        <FaArrowRight color="white" onClick={handleDisplay}/>
      </div>
      <div className='flex flex-col gap-10 items-center'>
          <h1 className='text-[1.25rem]'>محصولات سفارش داده شده</h1>
          <div className="flex gap-10 flex-wrap justify-end">
            {addedToCartProducts.map((item) => (
            <div key={item.id} className="flex flex-col items-end gap-4">
              <ul className="flex flex-col items-end gap-2">
                <li className="flex gap-1">
                  <h1>{item.label}</h1>
                  <p className="text-[#ffffff71]">: نام محصول</p>
                </li>
                <li className="flex gap-1">
                  <h1>{parseInt(item.price) * item.count} تومان</h1>
                  <p className="text-[#ffffff71]">: قیمت</p>
                </li>
                <li className="flex gap-1">
                  <h1>{item.count}</h1>
                  <p className="text-[#ffffff71]">: کیلوگرم</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <h1>{finalSum} تومان</h1>
          <p>: هزینه کل</p>
        </div>
        <h1 className='text-[1.25rem]'>وارد کردن اطلاعات سفارش</h1>
        <Box className="bg-white rounded-2xl flex flex-col items-cente justify-centerr gap-6" p={3}
          component="form"
          sx={{ '& .MuiTextField-root': { width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
            <div>
              <TextField
                id="outlined-required"
                label="نام"
                {...register("firstName")}
              />
              <p className="text-red-600 text-[12px] mt-2">{errors.firstName?.message}</p>
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="نام خانوادگی"
                {...register("lastName")}
              />
              <p className="text-red-600 text-[12px] mt-2">{errors.lastName?.message}</p>
            </div>
            <div>
              <TextField
                id="outlined-disabled"
                label="کد پستی"
                type="number"
                {...register("postalCode")}
              />
              <p className="text-red-600 text-[12px] mt-2">{errors.postalCode?.message}</p>
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="آدرس"
                multiline
                rows={4}
                {...register("address")}
              />
              <p className="text-red-600 text-[12px] mt-2">{errors.address?.message}</p>
            </div>
          <button disabled={isSubmitting} className="bg-black p-3 rounded-[10px]">
            {isSubmitting && <span className="loading loading-spinner loading-sm mr-3"></span>}
            ادامه
          </button>
        </Box>
      </div>
    </div>
  )
}

export default OrderPage

