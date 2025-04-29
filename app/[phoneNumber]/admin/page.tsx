import Link from 'next/link'
import React from 'react'

const AdminPanel = () => {
  const adminLinks = [
    {id: 3, label: "محصولات", href: '/#'},
    {id: 2, label: "سفارشات", href: '/#'},
    {id: 1, label: "کاربران", href: '/#'},
  ]
  return (
    <>
      <div className='h-[80px]'></div>
      <div className='min-h-[calc(100vh-80px)] flex justify-end items-start p-9 bg-[#000000]'>
        <div className='flex flex-col gap-2 w-full md:w-100'>
          {adminLinks.map((link) => (
            <Link key={link.id} href={link.href} className="text-xl font-bold p-9 hover:-translate-x-4 duration-150 cursor-pointer rounded-full bg-linear-to-r from-[#66c4af] to-[#ff0077] overflow-clip space-y-2 text-end">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminPanel
