'use client'
import React from 'react'
import useDataStore from '@/stores/dataStore';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const SignInButton = ({ className }: { className?: string}) => {
  const { dict } = useDataStore()
  const { lang } = useParams()
  const currentPath = usePathname()

  return (
    <Link 
    className={`${className} cursor-pointer p-3 border-1 rounded-[5px] text-[14px] flex justify-center items-center gap-2`}
    href={`/${lang}/users/login?returnUrl=${encodeURIComponent(currentPath)}`}
    >
      <div className='flex gap-[6px]'>
        <h2>{dict.account.login}</h2>
        <span className='font-bold'>|</span>
        <h2>{dict.account.register}</h2>
      </div>
    </Link>
  )
}

export default SignInButton
