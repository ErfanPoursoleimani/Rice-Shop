"use client"
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const page = () => {

  const { dict, isRTL } = useDataStore()
  const { user } = useAuthStore()

  return (
/*     <div className='flex justify-center items-center'>
      <div>
      <LuSearch className='text-[17px]'/>
      </div>
      </div> */
      <div className={`min-h-60 md:p-5 flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
      <div className={`mb-5 flex justify-between items-end h-10 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
        <div className='self-stretch border-b-3 border-b-[#bad617]'>
            <p className='font-medium'>Orders History</p>
        </div>
        <span className={`text-[13px] text-[#00b4ab] flex items-center ${isRTL ? "flex-row-reverse" : '' }`}>
            <p>See all</p>
            <span className={`text-[11px]`}>{isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
        </span>
      </div>
      <div className={`text-[13px] flex-1 flex justify-between items-stretch ${isRTL ? "flex-row-reverse" : "flex-row"}`}>

      </div>
    </div>
  )
}

export default page
