import React from 'react'
import CategoryDropdown from './CategoryDropdown'
import RegionDropdown from './RegionDropdown'
import useDataStore from '@/stores/dataStore'
import { useScrollDirection } from '@/app/hooks/useScrollDirection'

const Footer = () => {

    const { isRTL } = useDataStore()
    const isVisible = useScrollDirection(100)

  return (
    <footer 
        className={`lg:px-[10%] px-3 flex items-stretch gap-2 h-12`}
        style={{
          justifyContent: 
            isRTL ? 'justify-end' : 'justify-start',
          flexDirection:
            isRTL ? 'row-reverse' : 'row',

        }}
      >
        <CategoryDropdown />
        <RegionDropdown />
      </footer>
  )
}

export default Footer
