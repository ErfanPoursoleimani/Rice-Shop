'use client'
import useDataStore from '@/stores/dataStore'
import Image from 'next/image'
import React from 'react'

const MainView = () => {

  const { products, tags, dict } = useDataStore()

  return (
    <div className=' xl:hidden bg-white flex flex-col justify-stretch'>
      <div className='min-h-[30vh] bg-[#333] md:min-h-[45vh] flex justify-start items-center overflow-x-auto scrollbar-hide scroll-smooth'>
            {products.map((p) => (
              <React.Fragment key={p.id}>
                {/* {p.images.map((image) => (
                  <div className={`min-w-full min-h-full flex items-center bg-[var(--them2)] justify-center overflow-hidden`}>
                      <img className='w-full' src={'/images/ricefield1.jpg'} alt="" />
                  </div>
                  ))} */}
              </React.Fragment>
            ))}
      </div>
    </div>
  )
}

export default MainView
