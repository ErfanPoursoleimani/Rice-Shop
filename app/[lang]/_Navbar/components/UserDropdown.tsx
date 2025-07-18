'use client'
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import Link from 'next/link'

import { useParams, usePathname } from 'next/navigation'
import { useMemo, useState, useEffect, useRef } from 'react'
import { BiDirections } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa6'
import { IoMdNotifications } from 'react-icons/io'
import { IoBagOutline, IoExitOutline } from 'react-icons/io5'
import { MdArrowBackIos, MdArrowDropDown, MdArrowForwardIos } from 'react-icons/md'

const UserDropdown = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentPath = usePathname()
  const { lang } = useParams()
  const { user, logout } = useAuthStore()
  const { dict, isRTL } = useDataStore()

  let role = undefined
  if(user){
  role = user.role!
  }

  const handleLogout = async () => {
    await logout(lang as string)
    setIsOpen(false)
  }

  // Handle click outside and escape key to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);
  
  const navLinks = useMemo(() => {
  
        const baseNavLinks = [
            {id: 1, label: "orders", icon: <IoBagOutline className='text-[20px]' />, href: `/${lang}/profile/orders`},
            {id: 2, label: "addresses", icon: <BiDirections className='text-[20px]' />, href: `/${lang}/profile/addresses`},
            {id: 3, label: "notifications", icon: <IoMdNotifications className='text-[20px]' />, href: `/${lang}/profile/notifications`},
            {id: 4, label: "accountDetails", icon: <FaRegUser className='text-[20px]' />, href: `/${lang}/profile` },
        ]
  
        // Create new array with translated labels
        const translatedLinks = baseNavLinks.map(link => ({
            ...link,
            label: (dict[link.label as keyof typeof dict] as string) || link.label
        }))
  
        return translatedLinks
    }, [dict, lang])
    
  return (
    <div ref={dropdownRef} className={`relative hidden md:flex flex-col ${isRTL ? "items-start" : "items-end" }`}>
        <div 
            onClick={() => setIsOpen(!isOpen)} 
            className={`hidden md:flex items-center p-2 rounded-[10px] ${ isOpen && "bg-[#5eff0067]" }`}
        >
            <FaRegUser className='text-[23px]'/>
            <MdArrowDropDown className='text-xl'/>
        </div>
        {isOpen &&
            <div className={`hidden md:block z-10 min-w-60 absolute top-12 bg-white border-1 border-neutral-200 rounded-[10px]`}>
                <div className='px-4'>
                    <Link onClick={() => setIsOpen(false)} href={`/${lang}/profile`} className={`flex justify-between items-center py-5 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                        <span className={`flex flex-col justify-between ${isRTL ? "items-end" : "items-start"}`}>
                            <p className='font-medium'>{ user?.lastName && user?.firstName ? user?.firstName + " " + user?.lastName : user?.phoneNumber }</p>
                        </span>
                        <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
                    </Link>
                </div>
                <div className={`px-4 text-[14px] flex flex-col`}>
                    {navLinks.map((link) => (
                    <Link key={link.id} href={link.href}
                        onClick={() => setIsOpen(false)}
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
                            {link.icon}
                            <p>{link.label}</p>
                        </span>
                        <span className={`text-[11px]`}>{ isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/> }</span>
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
                </div>
            </div>
        }
    </div>
  )
}

export default UserDropdown