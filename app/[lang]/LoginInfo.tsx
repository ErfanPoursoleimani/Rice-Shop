'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import classnames from 'classnames'
import React from 'react'
import { useData } from '../contexts/DataContext'

const LoginInfo = () => {

  const currentPath = usePathname()
  const { lang } = useParams()
  const { dict } = useData()
  

  return (
    <div className='loginInfo-animation flex justify-center items-center fixed top-[80px] z-100 w-[180px] h-[250px] rounded-br-[calc(100%-30px)] rounded bg-[#ffffffb3] backdrop-blur-lg'>
      <ul className='flex flex-col gap-10 -mt-5 -ml-5'>
        <li className='nav-animation' >
          <Link
            className={classnames({
              'text-[#00624a]': currentPath === "/logOut",
              'text-[var(--dark-text)]': currentPath !== "/logOut",
              'hover:text-[#00624a] transition-colors': true
            })}
            href={"/logOut"}>
              اطلاعات حساب
          </Link>
        </li>
        <li className={classnames({'hidden': (/admin/).test(currentPath) ,'nav-animation': true})} >
          <Link
            className='hover:text-[#00624a] text-[var(--dark-text)] transition-colors'
            href={"/logOut"}>
              تاریخچه خرید ها
          </Link>
        </li>
        <li className='nav-animation' >
          <Link
            className='hover:text-[#00624a] transition-colors'
            href={`/${lang}`}>
              خروج
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LoginInfo
