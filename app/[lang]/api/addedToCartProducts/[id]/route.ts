import { addedToCartProductSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = addedToCartProductSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const addedToCartProduct = await prisma.addedToCartProduct.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!addedToCartProduct)
        return NextResponse.json({ error: 'Invalid addedToCartProduct'}, { status: 404 })

    const updatedTask = await prisma.addedToCartProduct.update({
        where: {
            id: addedToCartProduct.id
        },
        data: {
            id: body.id,
            label: body.label,
            price: body.price,
            count: body.count,
        }
    })

    return NextResponse.json(updatedTask)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const addedToCartProduct = await prisma.addedToCartProduct.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!addedToCartProduct)
        return NextResponse.json({ error: 'Invalid added-to-cart product'}, { status: 404 })

    await prisma.addedToCartProduct.delete({
        where:{
            id: addedToCartProduct.id
        }
    })
    return NextResponse.json({})
}