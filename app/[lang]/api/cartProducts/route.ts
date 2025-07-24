import { cartProductSchema } from "@/validation/validationSchemas";
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
            product: {
                include: {
                    images: true
                }
            }
        }
    })
    return NextResponse.json({ cartProducts })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { searchParams } = new URL(req.url)
    if(!searchParams.get('cartId') || !searchParams.get('productId')) {
        return NextResponse.json({error: "SearchParams must contain cartId and ProductId"}, {status: 400})
    }

    const cartId = parseInt(searchParams.get('cartId')!)
    const productId = parseInt(searchParams.get('productId')!)
    
    const validation = cartProductSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const cartProduct = await prisma.cartProduct.findUnique({
        where: { 
            cartId_productId: {
                cartId,
                productId
            }
        }
    })

    if(cartProduct){
        const updatedCartProduct = await prisma.cartProduct.update({
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
            cartId,
            productId,
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
            cartId_productId: {
                cartId,
                productId
            }
        }
    })

    if(!cartProduct)
        return NextResponse.json({ error: 'Invalid cartProduct'}, { status: 404 })

    await prisma.cartProduct.delete({
        where:{ 
            cartId_productId: {
                cartId,
                productId
            }
        }
    })
    return NextResponse.json({})
}