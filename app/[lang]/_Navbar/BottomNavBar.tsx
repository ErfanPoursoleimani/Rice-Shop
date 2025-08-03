'use client'
import { useAuthStore } from '@/stores/authStore';
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { PiShoppingBagFill, PiShoppingBagLight } from 'react-icons/pi';
import { RiHome9Fill, RiHome9Line } from "react-icons/ri";




const PhoneNavBar = () => {

    const currentPath = usePathname()

    const { lang } = useParams()
    const { user, role } = useAuthStore()
    const { dict, isRTL } = useDataStore()
    
    const navLinks = useMemo(() => {
        const baseNavLinks = [
            {id: 1, label: "home", selectedIcon: <RiHome9Fill className='text-[#555] text-2xl' />, unselectedIcon: <RiHome9Line className='text-2xl' />, href: `/${lang}`},
            {id: 2, label: "products", selectedIcon: <BiSolidCategory className='text-[#555] text-2xl' />, unselectedIcon: <BiCategory className='text-2xl' />, href: `/${lang}/products`},
            {id: 3, label: "cart", selectedIcon: <PiShoppingBagFill className='text-[#555] text-2xl' />, unselectedIcon: <PiShoppingBagLight className='text-2xl' />, href: `/${lang}/checkout/cart`},
            {id: 4, label: "profile", selectedIcon: <FaUser className='text-[#555] text-2xl' />, unselectedIcon: <FaRegUser className='text-2xl' />, href: `/${lang}/profile` },
        ]

        // Create new array with translated labels
        const translatedLinks = baseNavLinks.map(link => ({
            ...link,
            label: dict.links?.[link.label as keyof typeof dict.links] || link.label
        }))

        // Reverse order for RTL languages
        if (isRTL) {
            return [...translatedLinks].reverse()
        }

        return translatedLinks
    }, [dict, lang])

    const adminNavLinks = useMemo(() => {
        const baseAdminLinks = [
            {id: 1, label: "home", selectedIcon: <RiHome9Fill className='text-[#555] text-2xl' />, unselectedIcon: <RiHome9Line className='text-2xl' />, href: `/${lang}/admin/dashboard`},
            {id: 2, label: "products", selectedIcon:  <PiShoppingBagFill className='text-[#555] text-2xl' />, unselectedIcon: <PiShoppingBagLight className='text-2xl' />, href: `/${lang}/admin/dashboard/products`},
            {id: 3, label: "users", selectedIcon:<FaUser className='text-[#555] text-2xl' />, unselectedIcon: <FaRegUser className='text-2xl' /> , href: `/${lang}/admin/dashboard/users`},
            {id: 4, label: "categories", selectedIcon: <BiSolidCategory className='text-[#555] text-2xl' />, unselectedIcon: <BiCategory className='text-2xl' />, href: `/${lang}/admin/dashboard/tags` },
        ]

        // Create new array with translated labels
        const translatedLinks = baseAdminLinks.map(link => ({
            ...link,
            label: dict.links?.[link.label as keyof typeof dict.links] || link.label
        }))

        // Reverse order for RTL languages
        if (isRTL) {
            return [...translatedLinks].reverse()
        }

        return translatedLinks
    }, [dict, lang])

  return (
    
    <nav className='fixed w-[100%] border-t-1 border-[#d4d4d4] text-[var(--dark-text)] bg-[var(--background)] bottom-0 h-14 z-102 flex md:hidden justify-between items-center'>
      {role === 'ADMIN' && currentPath.startsWith(`/${lang}/admin`) ? adminNavLinks.map((elem) => (
        <Link key={elem.id} className='w-[calc(100%/3)] text-[#9e9e9e] flex flex-col items-center justify-center gap-1' href={elem.href}>
            {currentPath === elem.href ? elem.selectedIcon : elem.unselectedIcon}
            <span className='text-[11px]'>{elem.label}</span>
        </Link>
      )) : navLinks.map((elem) => (
        <Link key={elem.id} className='w-[calc(100%/3)] text-[#9e9e9e] flex flex-col items-center justify-center gap-1' href={elem.href}>
            {currentPath === elem.href ? elem.selectedIcon : elem.unselectedIcon}
            <span className='text-[11px]'>{elem.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default PhoneNavBar