'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { userSchema } from './validationSchemas'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Status } from '@prisma/client'
import { FaArrowRight } from 'react-icons/fa6'
import axios from 'axios'

type userData = z.infer<typeof userSchema>

interface Props {
  users: {phoneNumber: string, status: Status}[],
  setSignInDisplay: Function,
}

const SignInPage = ({users, setSignInDisplay}: Props) => {

    const router = useRouter()
      
    const {register, handleSubmit, formState: { errors, isSubmitted }} = useForm<userData>({
      resolver: zodResolver(userSchema)
    })
  
    const [error, setError] = useState('')

    const onSubmit = handleSubmit( async(data) => {
      try {

        let t = 0
        for (let i = 0; i < users.length; i++) {
          users[i].phoneNumber === data.phoneNumber ? t++ : null
        }
        t === 0 ? await axios.post('/api/users', data) : null
        data.phoneNumber === '09165736231' ? router.push('/' + data.phoneNumber + '/admin') : router.push('/' + data.phoneNumber)
        setSignInDisplay('none')
        router.refresh()
      } catch (error) {
        setError('An unexpected error occurred.')
      }
    })

    const handleDisplay = () => {
      setSignInDisplay('none')
    }
  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-[80px] p-12 z-100 w-[100vw] h-[calc(100vh-80px)] border-t-1 border-[#000] backdrop-blur-3xl bg-[#00000081] flex flex-col items-center justify-center'>
      <div className="mb-15 cursor-pointer text-xl bg-[var(--foreground)] p-2 rounded-full self-end" onClick={handleDisplay}>
        <FaArrowRight />
      </div>
      <Box className="bg-white rounded-2xl flex flex-col items-center gap-5" p={3}
      component="form"
      sx={{ '& .MuiTextField-root': {width: '25ch'}}}
      noValidate
      autoComplete="off"
      id='form'
      onSubmit={onSubmit}
      >
        <div>
          <TextField
            id="outlined-disabled"
            label="شماره تلفن همراه"
            type='number'
            {...register("phoneNumber")}
          />
          <p className='text-red-600 text-[12px] mt-2'>{errors.phoneNumber?.message}</p>
        </div>
        {error && <p className='text-red-600'>{error}</p>}
        <button className='w-full h-15 bg-black rounded-[10px] hover:scale-101 transition-all' disabled={isSubmitted}>ارسال کد تایید</button>
      </Box>
    </div>
  )
}

export default SignInPage
