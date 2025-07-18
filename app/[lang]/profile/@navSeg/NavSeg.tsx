'use client'
// import { useAuthSelectors, useAuthActions } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore';
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiDirections } from "react-icons/bi";
import { FaRegEdit, FaRegUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { IoBagOutline, IoExitOutline } from "react-icons/io5";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import OrdersDefault from '../_components/OrdersDefault';

export default function NavSeg() {
  
    const { lang } = useParams()
    const currentPath = usePathname()
    const { user, logout } = useAuthStore()
    const { dict, isRTL } = useDataStore()

    const handleLogout = async () => {
        await logout(lang as string)
    }

    let role = undefined
    if(user){
    role = user.role!
    }
  
  const navLinks = useMemo(() => {

      const baseNavLinks = [
          {id: 1, label: "orders", icon: <IoBagOutline className='text-[20px]' />, href: `/${lang}/profile/orders`},
          {id: 2, label: "addresses", icon: <BiDirections className='text-[20px]' />, href: `/${lang}/profile/addresses`},
          {id: 3, label: "notifications", icon: <IoMdNotifications className='text-[20px]' />, href: `/${lang}/profile/notifications`},
          {id: 4, label: "accountDetails", icon: <FaRegUser className='text-[20px]' />, href: `/${lang}/profile/personal-info` },
      ]

      // Create new array with translated labels
      const translatedLinks = baseNavLinks.map(link => ({
          ...link,
          label: dict[link.label as keyof typeof dict] || link.label
      }))

      return translatedLinks
  }, [dict, lang])

  return (
    <div className={`min-w-full min-h-full md:min-w-[30%] md:min-h-max md:border-1 border-neutral-300 rounded-[10px]`}>
      <div className='border-b-9 md:border-b-1 border-neutral-200 px-4'>
        <div className={`flex justify-between items-center py-5 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <span className={`flex flex-col justify-between gap-1 ${isRTL ? "items-end" : "items-start"}`}>
            <p className='font-medium'>{ user?.lastName && user?.firstName ? user?.firstName + " " + user?.lastName : user?.phoneNumber }</p>
            <p className={`text-[14px] text-neutral-400 ${!(user?.lastName && user?.firstName) ? "hidden" : null}`}>{user?.phoneNumber}</p>
          </span>
          <Link href={`/${lang}/profile/personal-info`}>
            <FaRegEdit className='text-[#00c4aa] text-[17px]'/>
          </Link>
        </div>
        <OrdersDefault className={`block md:hidden pt-3`}/>
      </div>
      <ul className={`px-4 text-[14px] flex flex-col`}>
        <Link href={`/${lang}/profile`} 
          className={`
            hidden py-4 border-b-1 border-neutral-100 md:flex justify-between items-center
            ${isRTL ? "flex-row-reverse" : "flex-row"}
            ${currentPath === `/${lang}/profile` ? "font-bold" : null }
          `}
        >
          <li
            className={`
              flex gap-2 items-center
              ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
          >
            <GoHomeFill className='text-[20px]'/>
            <p>{dict.activitySummary}</p>
          </li>
          <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
        </Link>
        {navLinks.map((link) => (
          <Link key={link.id} href={link.href} 
            className={`
              py-4 border-b-1 border-neutral-100 flex justify-between items-center
              ${isRTL ? "flex-row-reverse" : "flex-row"}
              ${currentPath === link.href ? "font-bold" : null }
            `}
          >
            <li
              className={`
                flex gap-2 items-center
                ${isRTL ? "flex-row-reverse" : "flex-row"}
              `}
            >
              {link.icon}
              <p>{link.label as string}</p>
            </li>
            <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
          </Link>
        ))}
        <div
            onClick={handleLogout}
            className={`
                py-4 border-y-1 border-neutral-100 flex justify-between items-center
                ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
        >
            <span
                className={`
                    flex gap-2 items-center
                    ${isRTL ? "flex-row-reverse" : null}
                `}
            >
                <IoExitOutline className='text-[20px]' />
                <p>{dict.account.logout}</p>
            </span>
            <span className={`text-[11px]`}>{ isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/> }</span>
        </div>
      </ul>
    </div>
  )
}