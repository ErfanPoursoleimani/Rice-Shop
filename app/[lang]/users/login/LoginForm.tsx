'use client'
import { useReturnUrl } from '@/app/hooks/useReturnUrl'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa6'
import { z } from 'zod'
import { userLoginSchema } from '../../../../validation/validationSchemas'
import { useParams } from 'next/navigation'
import useDataStore from '@/stores/dataStore'

type userData = z.infer<typeof userLoginSchema>

const LoginForm = () => {

  const { lang } = useParams()

  const { isLoading, login, clearError, error, refreshSession } = useAuthStore()

  const { isRTL, dict } = useDataStore()

  const { redirectToReturnUrl } = useReturnUrl()

  const {register, handleSubmit, control, formState: { errors, isSubmitted }} = useForm<userData>({
      resolver: zodResolver(userLoginSchema)
  })

  const onSubmit = handleSubmit( async (data) => {
    try {
      await login(data, lang as string)
      await refreshSession(lang as string)
    } catch (error) {
      
    } finally {
      redirectToReturnUrl()
    }
  })


  return (
    <div className={'h-[100vh] w-full flex justify-center items-center p-4'}>
      <div className='relative flex flex-col justify-center md:max-w-[400px] w-full md:h-auto h-full md:px-7 md:py-8 md:border-1 rounded-[7px] border-[#d3d3d3]'>
        <div 
          className='absolute top-[5vh] right-0 md:static cursor-pointer text-xl text-[var(--dark-text)] flex justify-end'
          onClick={redirectToReturnUrl}
        >
          <FaArrowRight  />
        </div>
        <form 
          className="space-y-6" 
          onSubmit={onSubmit}
          style={{
            textAlign: isRTL ? 'end' : 'start'
          }}
        >
          <Link href={`/${lang}`}>
            <h1 className='text-center text-[var(--theme)] text-3xl font-medium mb-20'>{dict.logo}</h1>
          </Link>
          <div className='inline-flex gap-[6px]'>
            <h2>{dict.account.login}</h2>
            <span className='font-bold'>|</span>
            <h2>{dict.account.register}</h2>
          </div>
          <p className='text-[12px]'>{dict.enterEmailOrPhone}</p>
          <div>
            <input
              type="text"
              className='bg-[#ececec] md:bg-white border-b-2 md:border-0 border-[#00adcc] outline-0 md:outline-1 md:focus:outline-[#00adcc] p-[14px] rounded-[7px] w-full text-[13px] text-[#00adcc]' 
              {...register('emailOrPhone')}
              />
            <p className='text-red-600 text-[12px] mt-2'>{errors.emailOrPhone?.message}</p>
          </div>
          {error && <p className='text-red-600'>{error}</p>}
          <button type='submit' className='w-full h-13 bg-[var(--theme)] text-[var(--light-text)] rounded-[7px] hover:scale-101 transition-all text-[14px]' disabled={isSubmitted}>ارسال کد تایید</button>
          <h3 className='text-[11px]'>ورود شما به معنای پذیرش شرایط فروشگاه و قوانین حریم‌خصوصی است</h3>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
