'use client'
import classNames from 'classnames'
import React from 'react'
import useDataStore from '@/stores/dataStore'

const LargeLogo = () => {

    const { dict: { logoPt1, logoPt2 }, isRTL } = useDataStore()

  return (
    <>
      <div className='hidden 1484:flex font-extrabold 1484:flex-col 1484:items-center 1484:gap-10 '>
        <span className={classNames({
            "1484:text-[120px]": isRTL,
            "1484:text-[60px]": !(isRTL),
        })}>{ logoPt1 }</span>
        <span className={classNames({
            "1484:text-[40px]": isRTL,
            "1484:text-[130px]": !(isRTL),
        })}>{ logoPt2 }</span>
    </div>
    </>
  )
}

export default LargeLogo
