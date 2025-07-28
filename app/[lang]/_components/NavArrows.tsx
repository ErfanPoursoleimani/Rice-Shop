import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const NavArrows = () => {
  return (
    <div className='hidden md:'>
        <button className="absolute p-3 bg-[#ffffffda] text-[15px] text-[#000000] rounded-full top-[50%] right-4 -translate-y-[50%]"><MdArrowForwardIos /></button>
        <button className="absolute p-3 bg-[#ffffffda] text-[15px] text-[#000000] rounded-full top-[50%] left-4 -translate-y-[50%]"><MdArrowBackIos /></button>
    </div>
  )
}

export default NavArrows
