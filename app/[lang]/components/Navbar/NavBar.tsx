'use client'
import Link from 'next/link'
import classnames from 'classnames'
import { useParams, usePathname } from 'next/navigation';
import { PiShoppingBagFill } from "react-icons/pi";
import { useContext, useEffect, useState } from 'react';
import { HamburgerNavBar, Shoppingcart, LoginInfo } from '..';
import SignInPage from '../../SignIn';
import { Status } from '@prisma/client';
import Avatar from '@mui/material/Avatar';
import HamburgerIcon from './HamburgerIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavBar = ({addedToCartProducts, users, phoneNumber, user, dict} : {addedToCartProducts: {id: number, label: string, price: string, count: number}[], users: {phoneNumber: string, status: Status}[], phoneNumber?: string, user?: {phoneNumber: string, status: Status}, dict?: {account: {login: string} ,links: {about: string,contact: string,products: string,home: string,orders: string, users: string}}}) => {
  
  const currentPath = usePathname()
  const { lang } = useParams()

  let locales = ['en', 'de', 'fa', 'ar'].filter((elem) => {
    return elem !== lang
  })

  const router = useRouter()
  const handleChangeLanguage = (event: {target: {value: string}}) => {
    router.push(currentPath.replace(lang?.toString()!, event.target.value)!)
  } 
  
const navLinks: {id: number, label: string, href: string}[] = [
  {id: 1, label: "home", href: '/' + lang + '#home'},
  {id: 2, label: "products", href: '/' + lang + '#products'},
  {id: 3, label: "contact", href: '/' + lang + '#contact'},
  {id: 4, label: "about", href: '/' + lang + '#about'},
]
const adminNavLinks: {id: number, label: string, href: string}[] =  [
  {id: 1, label: "home", href: '/' + lang + '/admin/09165736231#home'},
  {id: 3, label: "products", href:  '/' + lang + '/admin/09165736231#products'},
  {id: 2, label: "orders", href: '/' + lang + '/admin/09165736231#orders'},
]

/* const [dictionary, setDictionary] = useState({about: "",contact: "",products: "",home: "",orders: "", users: ""})

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`/api/dictionary/${lang}`);
    const data = await res.json();
    setDictionary(data.links);
  };

  fetchData();
}, [])

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`/api/dictionary/${lang}`);
    const data = await res.json();
    setDictionary(data.links);
  };

  fetchData();
}, [lang]) */

    
useEffect(() => {
  adminNavLinks.map((elem) => (
    elem.label = dict!.links[elem.label as keyof typeof dict]
  ))
  navLinks.map((elem) => (
    elem.label = dict!.links[elem.label as keyof typeof dict]
  ))
}, [lang])

adminNavLinks.map((elem) => (
  elem.label = dict!.links[elem.label as keyof typeof dict]
))
navLinks.map((elem) => (
  elem.label = dict!.links[elem.label as keyof typeof dict]
))

  
  !(lang === 'fa' || lang === 'ar') ? null : (navLinks.sort((a, b) => navLinks.indexOf(b) - navLinks.indexOf(a)), adminNavLinks.sort((a, b) => adminNavLinks.indexOf(b) - adminNavLinks.indexOf(a)))
  
  
  const [shoppingcartDisplay, setShoppingcartDisplay] = useState('none')
  const handleShoppingcartDisplay = () => {
    shoppingcartDisplay === 'none' ? 
    setShoppingcartDisplay('block') :
    setShoppingcartDisplay('none')
    setSignInDisplay('none')
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
    setShoppingcartDisplay('none')
  }

  const [loginInfoDisplay, setLoginInfoDisplay] = useState('none')
  const handleLoginInfoDisplay = () => {
    loginInfoDisplay === 'none' ? 
    setLoginInfoDisplay('block') :
    setLoginInfoDisplay('none')
  }

  const subElements = [
    <select className='top-to-down-animation border-0' id="languages" name="languages" onChange={handleChangeLanguage}>
      <option value={lang}>{lang?.toString().toUpperCase()}</option>
      {locales.map((locale) => (
        <option key={locale} value={locale} >{locale.toUpperCase()}</option>
      ))}
    </select>,
    <div className='top-to-down-animation cursor-pointer' onClick={handleShoppingcartDisplay} style={{display: currentPath === '/admin/09165736231' ? 'none' : 'block'}}>
      <PiShoppingBagFill size='25px' color='var(--icons)' />
    </div>,
    <div  onClick={handleHamburgerNavBarDisplay}>
      <HamburgerIcon />
    </div>
  ]
  lang === 'fa' || lang === 'ar' ? null : subElements.sort((a, b) => subElements.indexOf(b) - subElements.indexOf(a))
  const elements = [
    phoneNumber === undefined ? <h1 className='cursor-pointer' onClick={handleSignInDisplay}>{dict!.account.login}</h1> : <div className='flex items-center gap-4'><Avatar onClick={handleLoginInfoDisplay} alt="Travis Howard" src="/static/images/avatar/2.jpg" /></div>,
    <ul className='hidden md:flex space-x-6'>
      {((/admin/).test(currentPath) ? adminNavLinks : navLinks).map(link =>
        <li className='top-to-down-animation' key={link.id}>
          <Link
            className={classnames({
              'text-[#004b3b]': currentPath === link.href,
              'text-[var(--icons)]': currentPath !== link.href,
              'hover:text-gray-200 transition-colors': true
            })}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      )}
    </ul>,
    <div className='flex space-x-6 items-center h-full'>
      {subElements.map((elem, i) => (
        <React.Fragment key={i}>
          {elem}
        </React.Fragment>
      ))}
    </div>
  ]
  lang === 'fa' || lang === 'ar' ? null : elements.sort((a, b) => elements.indexOf(b) - elements.indexOf(a))

  return (
    <>
    <nav className='fixed w-[100%] text-[var(--dark-text)] bg-[var(--background)] top-0 h-20 z-102 flex justify-between p-5 items-center'>
      {elements.map((elem, i) => (
        <React.Fragment key={i}>{elem}</React.Fragment>
      ))}
    </nav>
    <div style={{display: shoppingcartDisplay}}>
      <Shoppingcart addedToCartProducts={addedToCartProducts} setShoppingcartDisplay={setShoppingcartDisplay} phoneNumber={phoneNumber!} setSignInDisplay={setSignInDisplay}/>
    </div>
    <div style={{display: hamburgerNavBarDisplay}}>
      <HamburgerNavBar navLinks={navLinks} adminNavLinks={adminNavLinks}/>
    </div>
    <div style={{display: loginInfoDisplay}}>
      <LoginInfo phoneNumber={phoneNumber!}/>
    </div>
    <div style={{display: signInDisplay}}>
      <SignInPage users={users} setSignInDisplay={setSignInDisplay}/>
    </div>
    </>
  )
}

export default NavBar