'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import LargeLogo from '../../_components/LargeLogo'
import SmallLogo from '../../_components/SmallLogo'
import useDataStore from '@/stores/dataStore'

const HomeSecText = () => {

    const { lang } = useParams()
    const { dict, isRTL } = useDataStore()

    let {
    description: {
        first: {
        title: title1,
        body: body1
        }, 
        second: {
        title: title2,
        body: body2
        },
        third: {
        title: title3,
        body: body3
        }
    }
    } = dict.content.homepage
    
    if(isRTL){
    title1 = ":" + title1, title2 = ":" + title2, title3 = ":" + title3
    }else {title1 += ":", title2 += ":", title3 += ":"}

  return (

    <div className={classNames({
        "max-1484:sm:mr-auto max-1484:sm:ml-[10vw]": !(isRTL), 
        "max-1484:sm:ml-auto max-1484:sm:mr-[10vw]": isRTL, 
        "mt-[10vh]" : true})}
    >
        <h1 className={classNames({
            "1484:gap-10": isRTL,
            "text-2xl sm:text-3xl mb-9 text-[var(--theme)]": true,
        })}>
            <LargeLogo />
            <SmallLogo style={{}} />
        </h1>
        <ul className="1484:hidden space-y-2 md:space-y-3 text-[var(--sub-dark-text)] text-[12px] sm:text-[15px] md:text-[17px]">
            <li className="space-y-1">
                <h2 className="font-bold">{title1}</h2>
                <p>{body1}</p>
            </li>
            <li className="space-y-1">
                <h2 className="font-bold">{title2}</h2>
                <p className="">{body2}</p>
            </li>
            <li className="space-y-1">
                <h2 className="font-bold">{title3}</h2>
                <p>{body3}</p>
            </li>
        </ul>
    </div>
  )
}

export default HomeSecText
