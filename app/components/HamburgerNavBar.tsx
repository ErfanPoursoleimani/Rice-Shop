'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import React from 'react'

const HamburgerNavBar = () => {
    const currentPath = usePathname()
    
    const links = [
        {id: 1, label: "خانه", href: '/#'},
        {id: 2, label: "محصولات", href: '/#products'},
        {id: 3, label: "ارتباط با ما", href: '/#'},
        {id: 4, label: "درباره ما", href: '/#'},
    ]
    const adminLinks = [
        {id: 3, label: "اضافه کردن محصول", href: '/#'},
        {id: 2, label: "مشاهده سفارشات", href: '/#'},
        {id: 1, label: "خانه", href: '/#'},
      ]
    return (
    <ul className='hamburger-nav-animation md:hidden border-t-2 border-black fixed top-[80px] flex flex-col justify-evenly items-center z-100 w-[100vw] h-[300px] backdrop-blur-lg bg-[#00000081] text-end space-x-6'>
        {currentPath === '/09165736231/admin' ?
          adminLinks.map(link =>
          <li className='nav-animation' key={link.id}>
            <Link
              className={classnames({
                'text-gray-400': currentPath === link.href,
                'text-white': currentPath !== link.href,
                'hover:text-gray-200 transition-colors': true
              })}
              href={link.href}>
              {link.label}
            </Link>
          </li>) :
          links.map(link =>
          <li className='nav-animation' key={link.id}>
            <Link
              className={classnames({
                'text-gray-400': currentPath === link.href,
                'text-white': currentPath !== link.href,
                'hover:text-gray-200 transition-colors': true
              })}
              href={link.href}>
              {link.label}
            </Link>
          </li>
        )}
    </ul>
  )
}

export default HamburgerNavBar
