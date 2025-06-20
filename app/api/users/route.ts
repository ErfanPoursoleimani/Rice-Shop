import { NextRequest, NextResponse } from "next/server";
import { userSchema } from '@/app/[lang]/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = userSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const user = await prisma.user.findUnique({
        where: { 
            phoneNumber: body.phoneNumber
        }
    })
    if(user)
        return NextResponse.json({error: "User already exists"}, {status: 400})

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
    const updatedUser = await prisma.user.update({
        where: {
            id: newUser.id
        },
        data: {
            cartId: newCart.id
        }
    })
    return NextResponse.json({updatedUser, newCart}, {status: 201})
}