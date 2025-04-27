'use client'
import Link from 'next/link'
import classnames from 'classnames'
import { usePathname } from 'next/navigation';
import { PiShoppingBagFill } from "react-icons/pi";
import { useState } from 'react';
import { HamburgerNavBar, Shoppingcart } from '.';
import SignInPage from '../SignIn';
import { Status } from '@prisma/client';


const NavBar = ({addedToCartProducts, users, phoneNumber, user} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[], users: {phoneNumber: string, status: Status}[], phoneNumber?: string, user?: {phoneNumber: string, status: Status}}) => {

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

  const [signInDisplay, setSignInDisplay] = useState('none')
  const handleSignInDisplay = () => {
    signInDisplay === 'none' ? 
    setSignInDisplay('block') :
    setSignInDisplay('none') 
  }

  const [loginInfoDisplay, setLoginInfoDisplay] = useState('none')
  const handleLoginInfoDisplay = () => {
    loginInfoDisplay === 'none' ? 
    setLoginInfoDisplay('block') :
    setLoginInfoDisplay('none')
  }
  return (
    <>
    <nav className='fixed bg-[#00000081] w-[100%] top-0 h-20 z-102 backdrop-blur-3xl flex justify-between p-5 items-center'>
      {phoneNumber === undefined ?
        <h1 className='cursor-pointer' onClick={handleSignInDisplay}>وارد شوید</h1> :
      <div className='flex flex-col self-start gap-8 pt-2'>
        <h1 onClick={handleLoginInfoDisplay} className='cursor-pointer'>خوش آمدید</h1>
        <div style={{display: loginInfoDisplay}} className='bg-[var(--foreground)] p-4 rounded-xl space-y-4 text-center '>
          <p>{phoneNumber}</p>
          <Link href={'/'} className='p-2 bg-[var(--red-button)] rounded-xl'>خروج از حساب</Link>
        </div>
      </div> }
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
      <Shoppingcart addedToCartProducts={addedToCartProducts} setShoppingcartDisplay={setShoppingcartDisplay} phoneNumber={phoneNumber!} setSignInDisplay={setSignInDisplay}/>
    </div>
    <div style={{display: hamburgerNavBarDisplay}}>
      <HamburgerNavBar />
    </div>
    <div style={{display: signInDisplay}}>
      <SignInPage users={users} setSignInDisplay={setSignInDisplay}/>
    </div>
    </>
  )
}

export default NavBar