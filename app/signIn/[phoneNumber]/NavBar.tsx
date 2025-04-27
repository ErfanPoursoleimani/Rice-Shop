'use client'
import Link from 'next/link'
import classnames from 'classnames'
import { usePathname } from 'next/navigation';
import { PiShoppingBagFill } from "react-icons/pi";
import { useState } from 'react';
import Shoppingcart from './Shoppingcart';
import HamburgerNavBar from './HamburgerNavBar';



const NavBar = ({addedToCartProducts, phoneNumber} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[], phoneNumber: string}) => {

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
    <nav className='fixed bg-[#00000081] w-[100%] top-0 h-20 z-100 backdrop-blur-3xl flex justify-between p-5 items-center'>
      <div className='flex space-x-10 flex-col self-start gap-10 pt-2'>
        <h1>خوش آمدید</h1>
        <div className='bg-[var(--foreground)] p-3 rounded-xl space-y-3'>
          <p>{phoneNumber}</p>
          <Link href={'/'} className='p-2 bg-[#333]'>خروج از حساب</Link>
        </div>
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
      <Shoppingcart addedToCartProducts={addedToCartProducts} setShoppingcartDisplay={setShoppingcartDisplay} phoneNumber={phoneNumber}/>
    </div>
    <div style={{display: hamburgerNavBarDisplay}}>
      <HamburgerNavBar phoneNumber={phoneNumber}/>
    </div>
    </>
  )
}

export default NavBar