import { z } from 'zod'

export const TaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255)
})

export const NavLinksSchema = z.object({
    label: z.string().min(1, 'Label is required.'),
    href: z.string().min(1, 'Href is required.')
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, 'Password must contain at least five characters.')
})
