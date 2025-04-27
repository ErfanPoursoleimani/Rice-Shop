import { z } from 'zod'

export const addedToCartProductSchema = z.object({
    label: z.string().min(1, 'Label is required.').max(255),
    price: z.string().min(1, 'Price is required.').max(255)
})

export const userSchema = z.object({
    phoneNumber: z.string().min(11, 'شماره تلفن باید متشکل از 11 عدد باشد').max(11, 'شماره تلفن باید متشکل از 11 عدد باشد'),
})

export const orderSchema = z.object({
    firstName: z.string().min(3, 'نام باید متشکل از حداقل سه حرف باشد'),
    lastName: z.string().min(3, 'نام خانوادگی باید متشکل از حداقل سه حرف باشد'),
    postalCode: z.string().min(1, 'کد پستی وارد شود'),
    address: z.string().min(1, 'آدرس وارد شود')
})