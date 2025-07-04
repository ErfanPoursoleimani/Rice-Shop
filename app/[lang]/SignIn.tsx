'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { userSchema } from './validationSchemas'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FaArrowRight } from 'react-icons/fa6'
import axios, { AxiosStatic } from 'axios'
import classNames from 'classnames'


/* import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" */


type userData = z.infer<typeof userSchema>

interface Props {
  setSignInDisplay: Function,
}

const SignInPage = ({setSignInDisplay}: Props) => {

  const router = useRouter()
  const { lang } = useParams()
  const [error, setError] = useState('')
    
  const handleDisplay = () => {
    setSignInDisplay('none')
  }

  const {register, handleSubmit, formState: { errors, isSubmitted }} = useForm<userData>({
    resolver: zodResolver(userSchema)
  })
  const onSubmit = handleSubmit( async(data) => {
    try {
      await axios.post('/api/auth/login', data)


      setSignInDisplay('none')
      router.refresh()
    } catch (error) {
      setError('An unexpected error occurred.')
    }
  })


  return (
    <div className={classNames({'right-to-left-animation': !(lang === 'fa' || lang === 'ar'), 'left-to-right-animation': (lang === 'fa' || lang === 'ar') ,'overflow-scroll fixed top-[80px] p-12 z-100 w-[100vw] h-[calc(100vh-80px)] bg-[var(--background)] flex flex-col items-center justify-center': true})}>
      <div className="mb-15 cursor-pointer text-xl bg-[var(--foreground)] text-[var(--light-text)] p-2 rounded-full self-end" onClick={handleDisplay}>
        <FaArrowRight />
      </div>
      <Box className="flex flex-col items-center gap-5" p={3}
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
        <button className='w-full h-15 bg-black text-[var(--light-text)] rounded-[10px] hover:scale-101 transition-all' disabled={isSubmitted}>ارسال کد تایید</button>
      </Box>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}

    </div>
  )
}

export default SignInPage
