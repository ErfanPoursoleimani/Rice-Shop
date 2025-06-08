import { NextRequest, NextResponse } from "next/server";
import { addedToCartProductSchema } from '@/app/[lang]/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const addedToCartProducts = await prisma.addedToCartProduct.findMany()
    return NextResponse.json(addedToCartProducts)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = addedToCartProductSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const addedToCartProduct = await prisma.addedToCartProduct.findUnique({
        where: {
            id: body.id,
            label: body.label,
            price: body.price,
            count: body.count,
        }
    })
    if(addedToCartProduct)
        return NextResponse.json({error: "Product already exists"}, {status: 400})
    const newAddedToCartProduct = await prisma.addedToCartProduct.create({
        data: {
            id: body.id,
            label: body.label,
            price: body.price,
            count: body.count,
        }
    })
    return NextResponse.json(newAddedToCartProduct, {status: 201})
}