import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import React from 'react'

const HamburgerNavBar = ({phoneNumber}: {phoneNumber: string}) => {
    const currentPath = usePathname()
    
    const links = [
        {id: 1, label: "خانه", href: phoneNumber + '/#'},
        {id: 2, label: "محصولات", href: phoneNumber + '/#products'},
        {id: 3, label: "ارتباط با ما", href: phoneNumber + '/#'},
        {id: 4, label: "درباره ما", href: phoneNumber + '/#'},
    ]
    return (
    <ul className='hamburger-nav-animation md:hidden border-t-2 border-black fixed top-[80px] flex flex-col justify-evenly items-center z-100 w-[100vw] h-[300px] backdrop-blur-lg bg-[#00000081] text-end space-x-6'>
        {links.map(link =>
            <li className='nav-animation' key={link.id}>
                <Link
                    className={classnames({
                        'text-[#00624a]': currentPath === link.href,
                        'text-[var(--dark-text)]': currentPath !== link.href,
                        'hover:text-[#00624a] transition-colors': true
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
