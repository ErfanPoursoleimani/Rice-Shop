'use client'
import { useAuthStore } from '@/stores/authStore';
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiDirections } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa6';
import { IoIosCloudDone, IoMdNotifications } from "react-icons/io";
import { IoBagOutline, IoExitOutline } from 'react-icons/io5';
import { MdArrowBackIos, MdArrowForwardIos, MdSmsFailed } from "react-icons/md";
import { SiStagetimer } from "react-icons/si";



const OrdersDefault = ({ className }: { className: string }) => {

    const { dict, isRTL } = useDataStore()

  return (
    <div className={`${className} min-h-60 md:p-5 py-5 flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
      <div className={`mb-5 flex justify-between items-end h-10 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
        <div className='self-stretch border-b-3 border-b-[#0ca6ff]'>
            <p className='font-medium'>{dict.myOrders}</p>
        </div>
        <span className={`text-[13px] text-[#00b4ab] flex items-center ${isRTL ? "flex-row-reverse" : '' }`}>
            <p>{dict.seeAllProducts}</p>
            <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
        </span>
      </div>
      <div className={`text-[13px] flex-1 flex justify-between items-stretch ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
        <Link href={''} className='flex-1 flex flex-col items-center justify-center gap-2'>
            <SiStagetimer className='text-[#2c80ff] text-[55px] '/>
            <span>{dict.inProgress}</span>
        </Link>
        <Link href={''} className='flex-1 flex flex-col items-center justify-center gap-2'>
            <IoIosCloudDone className='text-[#36c000] text-[55px]' />
            <span>{dict.sent}</span>
        </Link>
        <Link href={''} className='flex-1 flex flex-col items-center justify-center gap-2'>
            <MdSmsFailed className='text-[#ff5b5b]  text-[55px]' />
            <span>{dict.canceled}</span>
        </Link>
      </div>
    </div>
  )
}

export default OrdersDefault
