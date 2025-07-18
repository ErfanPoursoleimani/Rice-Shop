'use client'
import React from 'react'
import OrdersDefault from '../_components/OrdersDefault'
import { useParams, usePathname } from 'next/navigation'
import Orderspage from './orders/page'

const page = () => {

  const { lang } = useParams()
  const currentPath = usePathname()
      
  return (
    <OrdersDefault className={`hidden md:flex ${currentPath === `/${lang}/profile/orders` ? "md:hidden" : null}`}/>
  )
}

export default page
