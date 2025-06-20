import { cartProductSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cartId = parseInt((searchParams).get("cartId")!)

    const cartProducts = await prisma.cartProduct.findMany({
        where:{
            cartId
        },
        include: {
            product: true,
        }
    })
    return NextResponse.json(cartProducts)
}