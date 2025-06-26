import { useData } from '@/app/contexts/DataContext'
import { CgEnter } from "react-icons/cg";
import React from 'react'

const SignInButton = () => {
  const { dict } = useData()

  return (
    <div className='cursor-pointer p-3 border-1 rounded-[5px] text-[14px] flex justify-center items-center gap-2'>
      <div className='flex gap-[6px]'>
        <h2>{dict.account.login}</h2>
        <span className='font-bold'>|</span>
        <h2>{dict.account.register}</h2>
      </div>
{/*       <div className='text-[20px]'>
        <CgEnter />
      </div> */}
    </div>
  )
}

export default SignInButton
