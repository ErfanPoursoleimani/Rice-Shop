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
    return (
    <ul className='hamburger-nav-animation md:hidden border-t-2 border-[#2f863b9a] fixed top-[80px] flex flex-col justify-evenly items-center z-100 w-[100vw] h-[300px] backdrop-blur-sm bg-[#00000081] text-end space-x-6'>
        {links.map(link =>
            <li className='nav-animation' key={link.id}>
                <Link
                    className={classnames({
                        'text-gray-900': currentPath === link.href,
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
