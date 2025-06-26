import { cartProductSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cartId = parseInt((searchParams).get("cartId")!)

    const cartProducts = await prisma.cartProduct.findMany({
        where:{
            cartId: cartId
        },
        include: {
            product: true,
        }
    })
    return NextResponse.json(cartProducts)
}

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

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cartId = parseInt(searchParams.get("cartId")!)
    const productId = parseInt(searchParams.get("productId")!)
    const cartProduct = await prisma.cartProduct.findUnique({
        where: {
            cartId,
            productId
        }
    })

    if(!cartProduct)
        return NextResponse.json({ error: 'Invalid cartProduct'}, { status: 404 })

    await prisma.cartProduct.delete({
        where:{ 
            cartId,
            productId
        }
    })
    return NextResponse.json({})
}