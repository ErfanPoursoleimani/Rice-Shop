"use client"
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { useParams, useRouter } from 'next/navigation'
import { MdArrowBackIos, MdArrowForwardIos, MdNotifications } from 'react-icons/md'

const page = () => {

  const { lang } = useParams()
  const router = useRouter()
  const { dict, isRTL } = useDataStore()
  const { user } = useAuthStore()

  const handleBackAction = () => {
    router.push(`/${lang}/admin/dashboard`)
  }

  return (
    <div className={`bottom-to-top-animation min-h-100 max-md:fixed max-md:min-h-full max-md:w-full max-md:bg-white p-5 flex flex-col flex-1 justify-stretch md:border-1 border-neutral-300 rounded-[10px]`}>
      <div className={`pb-5 mb-5 border-b-1 border-neutral-200 flex justify-between items-center ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
        <p className='font-medium'>My Notifications</p>
        {isRTL 
          ? <MdArrowBackIos className='self-start md:hidden' onClick={handleBackAction} /> 
          : <MdArrowForwardIos className='self-start md:hidden' onClick={handleBackAction} /> }
      </div>
      <div className={`text-[13px] flex-1 flex justify-center gap-5 items-stretch ${isRTL ? "text-end" : "text-start"}`}>
        { !(user?.notifications)
        ? <div className={`space-y-5 flex max-md:justify-start max-md:mt-[10vh] flex-col items-center justify-center`}>
            <MdNotifications className='text-[150px]'/>
            <p>You have no notifications </p>
          </div>
        : user?.notifications && user?.notifications.map((notification) => (
          <div className={`border-1 border-[#a2fff3] text-[#79ddd0] w-full rounded-xl p-5 h-max`} key={notification.id}>
            {notification.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
