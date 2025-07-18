import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const NavArrows = () => {
  return (
    <div className='hidden md:inline-block'>
        <button className="absolute p-3 bg-white border-1 border-[#b1b1b1] text-[15px] text-[#b1b1b1] rounded-full top-[50%] right-4 -translate-y-[50%]"><MdArrowForwardIos /></button>
        <button className="absolute p-3 bg-white border-1 border-[#b1b1b1] text-[15px] text-[#b1b1b1] rounded-full top-[50%] left-4 -translate-y-[50%]"><MdArrowBackIos /></button>
    </div>
  )
}

export default NavArrows
