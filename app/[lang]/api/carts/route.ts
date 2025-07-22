import { NextRequest, NextResponse } from "next/server";
import { cartSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";
import { CartProduct } from "@/types/types";

export async function GET(){
    const carts = await prisma.cart.findMany({
        include: {
            products: true
        }
    })
    return NextResponse.json(carts)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    
    const validation = cartSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    
    const userId = body.userId

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })

    if(cart)
        return NextResponse.json({ cart }, {status: 200})
    
    const newCart = await prisma.cart.create({
        data: {
            userId
        }
    })

    return NextResponse.json({cart: newCart}, {status: 201})
}