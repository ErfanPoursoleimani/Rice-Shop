import { cartProductSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    
    const validation = cartProductSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const cartProduct = await prisma.cartProduct.findUnique({
        where: { 
            cartId: body.cartId,
            productId: body.productId
        }
    })

    if(cartProduct){
        const updatedCartProduct = prisma.cartProduct.update({
            where: {
                id: cartProduct.id
            },
            data: {
                quantity: body.quantity
            }
        })

        return NextResponse.json(updatedCartProduct)
    }
    
    const newCartProduct = await prisma.cartProduct.create({
        data:{
            cartId: body.cartId,
            productId: body.productId,
            quantity: body.quantity
        }
    })
    return NextResponse.json(newCartProduct)
}