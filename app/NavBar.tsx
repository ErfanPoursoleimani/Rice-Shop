'use client'
import Link from 'next/link'
import classnames from 'classnames'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { PiShoppingBagFill } from "react-icons/pi";



const NavBar = () => {
  const { status, data: session } = useSession()
  const currentPath = usePathname()

  const links = [
    {id: 4, label: "درباره ما", href: '/#'},
    {id: 3, label: "ارتباط با ما", href: '/#'},
    {id: 2, label: "محصولات", href: '/#products'},
    {id: 1, label: "خانه", href: '/#'},
  ]
  



  return (
    <nav className='fixed bg-[#00000081] w-[100%] top-0 h-20 z-1000 backdrop-blur-sm flex justify-between p-5 items-center'>
      <div className='flex space-x-10'>
        {status === 'authenticated' &&
          <div className='space-x-3 nav-animation flex items-center text-white'>
            <Link href='/user'><img className='rounded-full' width={40} height={40} src={session.user?.image!} alt="user's avatar"></img></Link>
            <Link href={'/api/auth/signout'}>خروج</Link>
          </div>}
        {status === 'unauthenticated' && <Link className='nav-animation text-white' href={'/api/auth/signin'}>وارد شوید</Link>}
        {status === 'loading' && <span className="nav-animation loading loading-spinner loading-sm"></span>}
      </div>
      <ul className='hidden md:flex space-x-6'>
          {links.map(link =>
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
      <div className='flex space-x-6 items-center h-full'>
        <Link className='nav-animation' href='/ecommerce/shoppingcart'><PiShoppingBagFill size='25px' color='white' /></Link>
        <div className='nav-animation md:hidden space-y-1'>
          <span className="block h-0.75 w-7 bg-white"></span>
          <span className="block h-0.75 w-7 bg-white"></span>
          <span className="block h-0.75 w-7 bg-white"></span>
        </div>
      </div>
    </nav>
  )
}

export default NavBar