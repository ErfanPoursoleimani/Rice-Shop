
import { FaArrowRight  } from "react-icons/fa6";
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const OrderPage = ({addedToCartProducts, setOrderPageDisplay}: {addedToCartProducts: {id: number, label: string, price: string, count: number}[], setOrderPageDisplay: Function}) => {

    const handleDisplay = () => {
        setOrderPageDisplay('none')
    }
  return (
    <div className='hamburger-nav-animation overflow-scroll fixed top-0 p-12 z-101 w-[100vw] h-[100vh] backdrop-blur-3xl bg-[#0000003b] flex flex-col items-end'>
      <div className="sticky top-0 mb-15 cursor-pointer text-xl bg-[var(--foreground)] p-2 rounded-full">
        <FaArrowRight color="white" onClick={handleDisplay}/>
      </div>
      <div className='flex flex-col gap-10 items-center'>
          <h1 className='text-[1.25rem]'>محصولات سفارش داده شده</h1>
          <div className="flex gap-10 flex-wrap justify-end">
            {addedToCartProducts.map((item) => (
            <div key={item.id} className="flex flex-col items-end gap-4">
              <ul className="flex flex-col items-end gap-2">
                <li className="flex gap-1">
                  <h1>{item.label}</h1>
                  <p className="text-[#ffffff71]">: نام محصول</p>
                </li>
                <li className="flex gap-1">
                  <h1>{parseInt(item.price) * item.count} تومان</h1>
                  <p className="text-[#ffffff71]">: قیمت</p>
                </li>
                <li className="flex gap-1">
                  <h1>{item.count}</h1>
                  <p className="text-[#ffffff71]">: کیلوگرم</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <h1 className='text-[1.25rem]'>وارد کردن اطلاعات شخصی</h1>
        <Box className="bg-white rounded-2xl" p={3}
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-required"
              label="نام و نام خانوادگی"
            />
            <TextField
              id="outlined-disabled"
              label="شماره تلفن همراه"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField id="outlined-search" label="Search field" type="search" />
            <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
            />
            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
            />
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </div>
        </Box>
        <h1 className='text-[1.25rem]'>وارد کردن اطلاعات  سفارش</h1>
      </div>
    </div>
  )
}

export default OrderPage