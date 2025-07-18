'use client'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import Popup from './PopUp'
import SmallLogo from '../../_components/SmallLogo'
import useDataStore from '@/stores/dataStore'

const SearchBar = () => {

    const { lang } = useParams()
    const { dict, isRTL } = useDataStore()
    const { search, in: inn, logo } = dict

    const [ isActive, setIsActive ] = useState(false)
    const handleClick = () => {
        setIsActive(!isActive)
    }

    const decorBarElements = [
        <LuSearch className='text-[17px]'/>,
        <div className='space-x-[3px] text-[13px]'>
            <span>{search}</span>
            <span className='md:hidden'>{inn} </span>
            <span className='md:hidden'>
                <SmallLogo style={ { fontSize: "17px" } } />
            </span>
        </div>
    ]
    !(isRTL) ? null : decorBarElements.sort((a, b) => decorBarElements.indexOf(b) - decorBarElements.indexOf(a))

  return (
    <>
        <div
            className='bg-[#e6e6e6] p-2 md:p-3 text-[#555555] flex items-center gap-2 rounded-[7px] flex-1 md:flex-initial md:w-[400px]' 
            onClick={handleClick}
            style={{
                display: 
                    isActive ? "none" : "flex",
                justifyContent: 
                    isRTL ? "flex-end" : "flex-start",
            }}
        >
            {decorBarElements.map((elem, i) => (
                <React.Fragment key={i}>
                    {elem}
                </React.Fragment>
            ))}
        </div>
        <div
            className='fixed top-0 left-0 bg-[var(--foreground)] w-[100%] h-[100vh] z-10000'
            style={{display: isActive ? "block" : "none"}}
            onClick={handleClick}
        >
        </div>
    </>
  )
}

export default SearchBar
