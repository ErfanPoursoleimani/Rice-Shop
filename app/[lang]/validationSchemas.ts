import { z } from 'zod'

export const productSchema = z.object({
    label: z.string().min(1, 'نام محصول نمیتواند خالی باشد').max(255),
    price: z.string().min(1, 'مبلغ نمیتواند خالی باشد'),
    count: z.number().min(1, 'تعداد نمیتواند خالی باشد')
})

export const userSchema = z.object({
    phoneNumber: z.string().min(11, 'شماره تلفن باید متشکل از 11 عدد باشد').max(11, 'شماره تلفن باید متشکل از 11 عدد باشد'),
    cartId: z.number().min(1, "کاربر باید سبد خرید داشته باشد")
    // firstName: z.string().min(3, 'نام باید متشکل از حداقل سه حرف باشد'),
    // lastName: z.string().min(3, 'نام خانوادگی باید متشکل از حداقل سه حرف باشد'),
    // postalCode: z.string().min(1, 'کد پستی وارد شود'),
    // address: z.string().min(1, 'آدرس وارد شود')
})

export const cartSchema = z.object({
})

export const imageSchema = z.object({
    label: z.string().min(1, 'نام عکس نمیتواند خالی باشد').max(255),
    url: z.string().min(1, 'آدرس عکس نمیتواند خالی باشد').max(255),
})

export const cartProductSchema = z.object({

})

export const orderSchema = z.object({

})