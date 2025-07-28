'use client'
import classNames from 'classnames'
import React from 'react'
import useDataStore from '@/stores/dataStore'

const LargeLogo = () => {

    const { dict: { logoPt1, logoPt2 }, isRTL } = useDataStore()

  return (
      <div className={`max-xl:hidden max-md:min-h-[calc(100vh-250px)] text-[var(--theme2)] font-extrabold flex flex-col items-center justify-center gap-10 max-md:gap-[0.8rem] max-sm:gap-[0.5rem]`}>
        <div className={`flex flex-col items-center ${isRTL ? "-translate-y-[10%]" : ""}`}>
          <span className={` ${isRTL ? "text-[120px] max-md:text-[20vw] max-sm:text-[22vw]" : "text-[60px] max-md:text-[6vw] max-sm:text-[11vw]"}`}>
            { logoPt1 }
          </span>
          <span className={` ${isRTL ? "text-[40px] max-md:text-[7vw] max-sm:text-[8vw]" : "text-[130px] max-md:text-[14vw] max-sm:text-[25vw]"}`}>
            { logoPt2 }
          </span>
        </div>
    </div>
  )
}

export default LargeLogo
