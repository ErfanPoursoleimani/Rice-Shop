'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import React from 'react'

const LoginInfo = ({phoneNumber} : {phoneNumber: string}) => {

  const currentPath = usePathname()

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
        <li className='nav-animation' >
          <Link
            className={classnames({
              'text-[#00624a]': currentPath === "/logOut",
              'text-[var(--dark-text)]': currentPath !== "/logOut",
              'hover:text-[#00624a] transition-colors': true
            })}
            href={"/logOut"}>
              تاریخچه خرید ها
          </Link>
        </li>
        <li className='nav-animation' >
          <Link
            className={classnames({
              'text-[#00624a]': currentPath === "/logOut",
              'text-[var(--dark-text)]': currentPath !== "/logOut",
              'hover:text-[#00624a] transition-colors': true
            })}
            href={"/logOut"}>
              خروج
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LoginInfo
