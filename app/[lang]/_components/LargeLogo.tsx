'use client'
import classNames from 'classnames'
import React from 'react'
import useDataStore from '@/stores/dataStore'

const LargeLogo = () => {

    const { dict: { logoPt1, logoPt2 }, isRTL } = useDataStore()

  return (
    <>
      <div className='hidden xl:flex text-[var(--theme)] font-extrabold xl:flex-col xl:items-center xl:gap-10 '>
        <span className={classNames({
            "xl:text-[120px]": isRTL,
            "xl:text-[60px]": !(isRTL),
        })}>{ logoPt1 }</span>
        <span className={classNames({
            "xl:text-[40px]": isRTL,
            "xl:text-[130px]": !(isRTL),
        })}>{ logoPt2 }</span>
    </div>
    </>
  )
}

export default LargeLogo
