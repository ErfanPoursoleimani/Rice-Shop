'use client'
import { useAuthStore } from '@/stores/authStore';
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PiShoppingBagFill } from "react-icons/pi";
import { SignInButton } from '../_components';
import Footer from './components/Footer';
import LanguageDropdown from './components/LanguageDropdown';
import SearchBar from './components/SearchBar';
import UserDropdown from './components/UserDropdown';




const DesktopNavBar = ({ className }: { className: string }) => {

  const currentPath = usePathname()

  const { lang } = useParams()
  const { user } = useAuthStore()
  const { dict, isRTL } = useDataStore()

  const { logo, selectYourRegion } = dict

  let role = undefined
  if(user){
    role = user.role!
  }
  
  const navLinks: {id: number, label: string, href: string}[] = [
    {id: 1, label: "home", href: `/${lang}#home`},
    {id: 2, label: "products", href: `/${lang}#products`},
    {id: 3, label: "contact", href: `/${lang}#contact`},
    {id: 4, label: "about", href: `/${lang}#about`},
  ]
  
  const adminNavLinks: {id: number, label: string, href: string}[] =  [
    {id: 1, label: "home", href: `/${lang}#home`},
    {id: 3, label: "products", href:  `/${lang}#products`},
    {id: 2, label: "orders", href: `/${lang}#orders`},
  ]
  
  useEffect(() => {
    adminNavLinks.map((elem) => (
      elem.label = dict.links[elem.label as keyof typeof dict.links]
    ))
    navLinks.map((elem) => (
      elem.label = dict.links[elem.label as keyof typeof dict.links]
    ))
  }, [lang])
  
  adminNavLinks.map((elem) => (
    elem.label = dict.links[elem.label as keyof typeof dict.links]
  ))
  navLinks.map((elem) => (
    elem.label = dict.links[elem.label as keyof typeof dict.links]
  ))
  
  
  !(isRTL) ? null : (navLinks.sort((a, b) => navLinks.indexOf(b) - navLinks.indexOf(a)), adminNavLinks.sort((a, b) => adminNavLinks.indexOf(b) - adminNavLinks.indexOf(a)))


  return (
    <nav className={`
      ${className}
      flex flex-col justify-center items-between fixed w-[100%] border-b-1 border-[#7979793f] text-[var(--dark-text)] bg-[var(--background)] top-0 z-102 lg:px-[10%] px-3 pt-3
      `}
    >
      <div 
        className='flex justify-between gap-4 items-center'
        style={{
          flexDirection: isRTL ? 'row' : 'row-reverse'
        }}
        >
        <div 
          className='flex gap-6 items-center justify-center h-full'
          style={{
            flexDirection: isRTL ? 'row' : 'row-reverse'
          }}
        >
          <Link className='top-to-down-animation text-[27px] cursor-pointer hidden md:inline-block' href={`/${lang}/checkout/cart`}>
            <PiShoppingBagFill color='var(--icons)' />
          </Link>
          <span className='hidden md:inline-block text-[13px] text-[#8f8f8f]'>|</span>
          {user === null
            ? <SignInButton className={'hidden md:block'} />
            : <UserDropdown />
          }
          <LanguageDropdown />
        </div>
        <div 
          className='flex justify-center items-center flex-1 md:flex-initial gap-5'
          style={{
            flexDirection: !isRTL ? 'row' : 'row-reverse'
          }}
        >
          <Link href={`/${lang}`} className='font-bold text-[var(--theme)] text-2xl hidden md:inline-block'>{logo}</Link>
          <SearchBar />
        </div>
      </div>
      <Footer />
    </nav>
  )
}

export default DesktopNavBar