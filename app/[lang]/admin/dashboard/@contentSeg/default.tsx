'use client'
import React from 'react'
import OrdersDefault from '../_components/OrdersDefault'
import { useParams, usePathname } from 'next/navigation'

const Default = () => {

  const { lang } = useParams()
  const currentPath = usePathname()
      
  return (
    <OrdersDefault className={`hidden md:flex ${currentPath === `/${lang}/profile/orders` ? "md:hidden" : null}`}/>
  )
}

export default Default
