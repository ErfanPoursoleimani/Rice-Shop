"use client"
import { useAuthStore } from '@/stores/authStore'
import useDataStore from '@/stores/dataStore'
import { userLoginSchema } from '@/validation/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'
import { z } from 'zod'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type userData = z.infer<typeof userLoginSchema>

const page = () => {

  const router = useRouter()
  const { dict, isRTL } = useDataStore()
  const { user } = useAuthStore()
  const {register, handleSubmit, control, formState: { errors, isSubmitted }} = useForm<userData>({
      resolver: zodResolver(userLoginSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
    } catch (error) {
      
    } finally {
    }
  })

  const handleBack = () => {
    router.back()
  }

  const handelOpenEditInfo = () => {

  }
  const handelOpenEditEmail = () => {

  }

  return (
    <div className={`bottom-to-top-animation flex-1 min-h-40 max-md:fixed max-md:min-h-[100%] max-md:w-full max-md:bg-white md:border-1 border-neutral-300 rounded-[10px] ${isRTL ? "text-end" : null}`}>
      <div className={`md:hidden h-15 px-5 border-b-7 border-neutral-200 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        <span onClick={handleBack}>{!isRTL ? <MdArrowBackIos/> : <MdArrowForwardIos/>}</span>
        <p>Account details</p>
      </div>
      <div className={`p-5 pt-0 flex flex-col max-md:min-h-100`}>

        <div className={`flex max-md:flex-col `}>
          <div className={`h-20 flex justify-between items-center max-md:border-b-1 border-neutral-200 md:flex-1 px-4 ${ isRTL ? "flex-row-reverse" : null }`}>
            <div className={`flex flex-col gap-1 ${isRTL ? "items-end" : ""}`}>
              <span className={`md:text-[15px] text-[13px] text-neutral-400`}>Full name</span>
              <span className={`${user?.firstName ? "hidden" : ''}`}>{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
            <span onClick={() => handelOpenEditInfo()}>
              <FaRegEdit className='text-[14px] md:text-[15px]'/>
              </span>
          </div>
          <div className={`h-20 flex justify-between items-center max-md:border-b-1 md:flex-1 px-4 md:border-l-1 border-neutral-200 ${isRTL ? "flex-row-reverse" : null }`}>
            <div className={`flex flex-col gap-1 ${isRTL ? "items-end" : ""}`}>
              <span className={`md:text-[15px] text-[13px] text-neutral-400`}>National code</span>
              <span className={`${user?.nationalCode || "hidden"}`}>{user?.nationalCode}</span>
            </div>
            <span onClick={() => handelOpenEditInfo()}>
              <FaRegEdit className='text-[14px] md:text-[15px]'/>
            </span>
          </div>
        </div>
        <div className={`flex max-md:flex-col md:border-t-1 border-neutral-200`}>
          <div className={`h-20 flex justify-between items-center max-md:border-b-1 border-neutral-200 md:flex-1 px-4 ${isRTL ? "flex-row-reverse" : null }`}>
            <div className={`flex flex-col gap-1 ${isRTL ? "items-end" : ""}`}>
              <span className={`md:text-[15px] text-[13px] text-neutral-400`}>PhoneNumber</span>
              <span className={`${user?.phoneNumber || "hidden"}`}>{user?.phoneNumber}</span>
            </div>
            <span onClick={() => handelOpenEditInfo()}>
              <FaRegEdit className='text-[14px] md:text-[15px]'/>
            </span>
          </div>
          <div className={`h-20 flex justify-between items-center max-md:border-b-1  md:flex-1 px-4 md:border-l-1 border-neutral-200 ${isRTL ? "flex-row-reverse" : null }`}>
            <div className={`flex flex-col gap-1 ${isRTL ? "items-end" : ""}`}>
              <span className={`md:text-[15px] text-[13px] text-neutral-400`}>Email</span>
              <span className={`${user?.email || "hidden"}`}>{user?.email}</span>
            </div>
            <span onClick={() => handelOpenEditEmail()}>
              <FaRegEdit className='text-[14px] md:text-[15px]'/>
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default page
