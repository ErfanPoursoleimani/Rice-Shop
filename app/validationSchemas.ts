import { z } from 'zod'

export const addedToCartProductSchema = z.object({
    label: z.string().min(1, 'Label is required.').max(255),
    price: z.string().min(1, 'Price is required.').max(255)
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, 'Password must contain at least five characters.')
})
