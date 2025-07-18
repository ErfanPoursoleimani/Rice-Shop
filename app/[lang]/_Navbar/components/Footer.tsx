import React from 'react'
import CategoryDropdown from './CategoryDropdown'
import RegionDropdown from './RegionDropdown'
import useDataStore from '@/stores/dataStore'

const Footer = () => {

    const { isRTL } = useDataStore()

  return (
    <footer 
        className='flex items-stretch gap-2 h-12'
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
