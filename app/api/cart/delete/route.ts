import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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