import { z } from 'zod'
import { ERROR_MESSAGES } from './validationErrors';

const { PHONE_NUMBER, PHONE_NUMBER_AND_EMAIL, POSTAL_CODE, FIRST_NAME, LAST_NAME, EMAIL, URL, REQUIRED } = ERROR_MESSAGES

export const userLoginSchema = z.object({
    emailOrPhone: z.string()
    .min(1, REQUIRED)
    .refine((value) => {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) return true;
      
      // Phone validation (multiple formats)
      const phonePatterns = [
        // Iran (+98)
        /^\+98\d{10}$/, // International format: +98xxxxxxxxxx
        /^0\d{10}$/, // National format: 0xxxxxxxxxx (11 digits total)
        /^09\d{9}$/, // Mobile format: 09xxxxxxxxx
        /^\+98\s?9\d{2}\s?\d{3}\s?\d{4}$/, // +98 9xx xxx xxxx
        /^0\d{2,3}\s?\d{3,4}\s?\d{4}$/, // Landline with spaces
        
        // Turkey (+90)
        /^\+90\d{10}$/, // International: +90xxxxxxxxxx
        /^0\d{10}$/, // National: 0xxxxxxxxxx
        /^\+90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, // Mobile: +90 5xx xxx xx xx
        /^0\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/, // Landline: 0xxx xxx xx xx
        
        // Iraq (+964)
        /^\+964\d{10}$/, // International: +964xxxxxxxxxx
        /^0\d{10}$/, // National: 0xxxxxxxxxx
        /^\+964\s?7\d{2}\s?\d{3}\s?\d{4}$/, // Mobile: +964 7xx xxx xxxx
        /^0\d{2}\s?\d{3}\s?\d{4}$/, // Landline: 0xx xxx xxxx
        
        // Afghanistan (+93)
        /^\+93\d{9}$/, // International: +93xxxxxxxxx
        /^0\d{9}$/, // National: 0xxxxxxxxx
        /^\+93\s?7\d{2}\s?\d{3}\s?\d{3}$/, // Mobile: +93 7xx xxx xxx
        /^0\d{2}\s?\d{3}\s?\d{3}$/, // Landline: 0xx xxx xxx
        
        // Pakistan (+92)
        /^\+92\d{10}$/, // International: +92xxxxxxxxxx
        /^0\d{10}$/, // National: 0xxxxxxxxxx
        /^\+92\s?3\d{2}\s?\d{3}\s?\d{4}$/, // Mobile: +92 3xx xxx xxxx
        /^0\d{2}\s?\d{4}\s?\d{4}$/, // Landline: 0xx xxxx xxxx
        
        // Armenia (+374)
        /^\+374\d{8}$/, // International: +374xxxxxxxx
        /^0\d{8}$/, // National: 0xxxxxxxx
        /^\+374\s?\d{2}\s?\d{3}\s?\d{3}$/, // +374 xx xxx xxx
        
        // Azerbaijan (+994)
        /^\+994\d{9}$/, // International: +994xxxxxxxxx
        /^0\d{9}$/, // National: 0xxxxxxxxx
        /^\+994\s?5\d{2}\s?\d{3}\s?\d{3}$/, // Mobile: +994 5xx xxx xxx
        /^0\d{2}\s?\d{3}\s?\d{3}$/, // Landline: 0xx xxx xxx
        
        // Turkmenistan (+993)
        /^\+993\d{8}$/, // International: +993xxxxxxxx
        /^0\d{8}$/, // National: 0xxxxxxxx
        /^\+993\s?\d{2}\s?\d{3}\s?\d{3}$/, // +993 xx xxx xxx
        
        // Generic international format fallback
        /^\+\d{1,3}\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}$/, // Generic international
        
        // Clean number patterns (digits only)
        /^\d{10,15}$/, // 10-15 digits (covers most international numbers)
      ]
      
      // Test original value
      if (phonePatterns.some(pattern => pattern.test(value))) {
        return true;
      }
      
      // Test cleaned value (digits only)
      const cleanPhone = value.replace(/\D/g, '');
      if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
        return phonePatterns.some(pattern => pattern.test(cleanPhone));
      }
      
      return false;
    }, {
      message: PHONE_NUMBER_AND_EMAIL
    })
})

export const userSchema = z.object({
    phoneNumber: z.string().min(1, REQUIRED).nullish().transform((value) => value || null),
    email: z.string().email(EMAIL).nullish().transform((value) => value || null),
    firstName: z.string().min(3, FIRST_NAME).nullish().transform((value) => value || null),
    lastName: z.string().min(3, LAST_NAME).nullish().transform((value) => value || null),
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

export const productSchema = z.object({
    label: z.string().min(1, REQUIRED).max(255),
    originalPriceFa: z.number().min(1, REQUIRED),
    priceFa: z.number().min(1, REQUIRED),
    stock: z.number().min(1, REQUIRED),
    description: z.string().min(1, REQUIRED)
})


export const reviewSchema = z.object({

})
export const notificationSchema = z.object({

})

export const addressSchema = z.object({
  province: z.string().min(1, REQUIRED),
  city: z.string().min(1, REQUIRED),
  address: z.string().min(1, REQUIRED),
  plaque: z.string().min(1, REQUIRED),
  unit: z.string().min(1, REQUIRED),
  postalCode: z.string().min(10, POSTAL_CODE),
})

export const tagSchema = z.object({

})