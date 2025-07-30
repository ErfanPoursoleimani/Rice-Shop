"use client"
import useDataStore from '@/stores/dataStore'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useAuthStore } from '@/stores/authStore'
import { Order } from '@prisma/client'
import { FiPackage } from "react-icons/fi";

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { dict, isRTL } = useDataStore()
  const { user } = useAuthStore()
  const searchParams = useSearchParams()

  const [orderStatusFilter, setOrderStatusFilter] = useState("IN_PROGRESS")

  useEffect(() => {
    setOrderStatusFilter(searchParams.get('activeTab')?.toUpperCase() || "IN_PROGRESS")
  }, [searchParams.get('activeTab')])

  const navLinks = useMemo(() => {
  
  const baseNavLinks = [
    {id: 1, label: "inProgress", href: `/${lang}/profile/orders?activeTab=in_progress`, searchParamsValue: "in_progress", },
    {id: 2, label: "sent", href: `/${lang}/profile/orders?activeTab=sent`, searchParamsValue: "sent", },
    {id: 3, label: "canceled", href: `/${lang}/profile/orders?activeTab=cancelled`, searchParamsValue: "cancelled", },
  ]

      // Create new array with translated labels
      const translatedLinks = baseNavLinks.map(link => ({
          ...link,
          label: (dict[link.label as keyof typeof dict] as string) || link.label
      }))

      // Reverse order for RTL languages
      if (isRTL) {
          return [...translatedLinks].reverse()
      }

      return translatedLinks
  }, [dict, lang])

  

  const handleBackAction = () => {
    router.push(`/${lang}/profile`)
  }

  return (
    <div className={`bottom-to-top-animation min-h-100 max-md:fixed max-md:min-h-full max-md:w-full max-md:bg-white max-md:p-5 flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
      <div className={`md:mx-5 md:my-5 flex justify-between items-end h-10 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
            <p className='font-medium md:border-b-3 border-yellow-400 md:pb-4'>Orders History</p>
            {isRTL 
              ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} /> 
              : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
      </div>
      <div className={`flex text-[13px] justify-stretch border-b-1 border-neutral-200 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
        {navLinks.map((link) => (
          <Link key={link.id} className={`flex-1 flex justify-center items-center min-h-10 ${ searchParams.get('activeTab') === link.searchParamsValue ? "text-[var(--theme)] border-b-2 border-[var(--theme)]" : null }`} href={link.href}>{link.label}</Link>
        ))}
      </div> 
      <div className={`text-[13px] flex-1 flex justify-center gap-5 items-stretch ${isRTL ? "text-end" : "text-start"}`}>
        {
         !(user?.orders)
        ? <div className={`space-y-5 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
            <FiPackage className='text-[150px]'/>
            <p>هنوز هیچ سفارشی ندادید</p>
          </div>
        : user?.orders && !(user?.orders.filter((order: Order) => order.status === orderStatusFilter))
        ?  <div className='text-[15px] min-h-60 flex-1 flex justify-center items-center '>
            <div className='flex flex-col justify-center items-center'>
              <Image width={100} height={100} src={'@/public/images/order-empty.svg'} alt={''} />
              <p>No {dict[orderStatusFilter.toLocaleLowerCase().replace("_p", "P") as keyof typeof dict] as string} order exists</p>
            </div>
          </div>
        : user?.orders.filter((order: Order) => order.status === orderStatusFilter).map((order: Order) => (
            <div key={order.id} className='p-4 flex-1 border-1 border-neutral-200 rounded-[10px] '>
              <div className={`flex items-center justify-between ${ isRTL ? "flex-row-reverse" : null }`}>
                <p className='text-[15px]'>{order.status}</p>
                <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
              </div>
              <div className={`flex ${ isRTL ? "justify-end" : null }`}>
                <span className={`flex gap-5 ${ isRTL ? "flex-row-reverse" : null }`}>
                  {order.id}
                  <p>کد سفارش</p>
                </span>
                <span>
                  {/* {order.} */}
                  <p>مبلغ</p>
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default page
