import { NextRequest, NextResponse } from "next/server";
import { userSchema } from '@/app/[lang]/validationSchemas'
import { prisma } from "@/prisma/client";
import { cookies } from "next/headers";
import jwt, { SignOptions } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = userSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    let user = await prisma.user.findUnique({
        where: { 
            phoneNumber: body.phoneNumber
        }
    })

    if(!user){        
        const newUser = await prisma.user.create({
            data: {
                phoneNumber: body.phoneNumber,
                
            }
        })
        const newCart = await prisma.cart.create({
            data: {
                userId: newUser.id
            }
        })
        user = await prisma.user.update({
            where: {
                id: newUser.id
            },
            data: {
                cartId: newCart.id
            }
        })
    } 

    const payload = { userId: user.id }
    const secretKey = process.env.JWT_SECRET!
    const options = { expiresIn: '1h' } as SignOptions

    const token = jwt.sign(payload, secretKey, options);

    const cookieStore = await cookies()
    cookieStore.set("jwt", token)
}