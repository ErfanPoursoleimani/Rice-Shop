'use client'
import Link from 'next/link'
import classnames from 'classnames'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { PiShoppingBagFill } from "react-icons/pi";
import { useState } from 'react';
import Shoppingcart from './Shoppingcart';
import HamburgerNavBar from './HamburgerNavBar';



const NavBar = ({addedToCartProducts} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[]}) => {
  const { status, data: session } = useSession()
  const currentPath = usePathname()

  const links = [
    {id: 4, label: "درباره ما", href: '/#'},
    {id: 3, label: "ارتباط با ما", href: '/#'},
    {id: 2, label: "محصولات", href: '/#products'},
    {id: 1, label: "خانه", href: '/#'},
  ]

  const [shoppingcartDisplay, setShoppingcartDisplay] = useState('none')
  const handleShoppingcartDisplay = () => {
    shoppingcartDisplay === 'none' ? 
    setShoppingcartDisplay('block') :
    setShoppingcartDisplay('none')
  }
  
  const [hamburgerNavBarDisplay, setHamburgerNavBarDisplay] = useState('none')
  const handleHamburgerNavBarDisplay = () => {
    hamburgerNavBarDisplay === 'none' ? 
    setHamburgerNavBarDisplay('block') :
    setHamburgerNavBarDisplay('none')
  }

  return (
    <>
    <nav className='fixed bg-[#00000081] w-[100%] top-0 h-20 z-100 backdrop-blur-sm flex justify-between p-5 items-center'>
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
        <div className='nav-animation cursor-pointer' onClick={handleShoppingcartDisplay}><PiShoppingBagFill size='25px' color='white' /></div>
        <div className='nav-animation md:hidden space-y-1' onClick={handleHamburgerNavBarDisplay}>
          <span className="block h-0.75 w-7 bg-white"></span>
          <span className="block h-0.75 w-7 bg-white"></span>
          <span className="block h-0.75 w-7 bg-white"></span>
        </div>
      </div>
    </nav>
    <div style={{display: shoppingcartDisplay}}>
      <Shoppingcart addedToCartProducts={addedToCartProducts} setShoppingcartDisplay={setShoppingcartDisplay}/>
    </div>
    <div style={{display: hamburgerNavBarDisplay}}>
      <HamburgerNavBar />
    </div>
    </>
  )
}

export default NavBar