'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import classnames from 'classnames'
import React from 'react'

const HamburgerNavBar = ({navLinks, adminNavLinks}: {navLinks: {id: number, label: string, href: string}[], adminNavLinks: {id: number, label: string, href: string}[]}) => {
    const currentPath = usePathname()
    const { lang } = useParams()

    const hamburgerAdminNavLinks = lang === 'fa' || lang === 'ar' ? adminNavLinks.toSorted((a, b) => adminNavLinks.indexOf(b) - adminNavLinks.indexOf(a)) : adminNavLinks
    const hamburgerNavLinks = lang === 'fa' || lang === 'ar' ? navLinks.toSorted((a, b) => navLinks.indexOf(b) - navLinks.indexOf(a)) : navLinks
    
    return (
    <div className={classnames({'left-0 left-to-right-animation': !(lang === 'fa' || lang === 'ar') ,'right-to-left-animation md:hidden fixed top-[80px] right-0 z-100 w-[45vw] h-[100vh] bg-[var(--background)]': true})}>
      <ul className={classnames({'items-start mr-0 ml-[20%]' : !(lang === 'fa' || lang === 'ar') ,'flex flex-col items-end mr-[20%] gap-10 mt-15': true})}>
          {((/admin/).test(currentPath) ? hamburgerAdminNavLinks : hamburgerNavLinks).map(link =>
            <li className={classnames({'left-to-right-animation': !(lang === 'fa' || lang === 'ar') ,'right-to-left-animation': true})} key={link.id}>
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
    </div>
  )
}

export default HamburgerNavBar
