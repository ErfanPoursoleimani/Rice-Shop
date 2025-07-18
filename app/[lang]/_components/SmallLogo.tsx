'use client'
import useDataStore from '@/stores/dataStore'
import React from 'react'

const SmallLogo = ({ style }: { style: {}}) => {

  const { dict, dict: { logo, logoPt1, logoPt2 }, tags } = useDataStore()

  return (
    <span 
      className='1484:hidden font-bold text-[var(--theme)]'
      style={ style }
    >
        { logo }
    </span>
  )
}

export default SmallLogo
