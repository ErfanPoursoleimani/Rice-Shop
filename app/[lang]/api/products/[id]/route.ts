import { productSchema } from "@/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = productSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!product)
        return NextResponse.json({ error: 'Invalid product'}, { status: 404 })

    const updatedProduct = await prisma.product.update({
        where: {
            id: product.id
        },
        data: {
            id: body.id,
            label: body.label,
            priceFa: body.priceFa,
            originalPriceFa: body.originalPriceFa,
            description: body.description,
            stock: body.stock,
            carts: body.carts,
            images: body.images
        }
    })

    return NextResponse.json(updatedProduct)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!product)
        return NextResponse.json({ error: 'Invalid product'}, { status: 404 })

    await prisma.product.delete({
        where:{
            id: product.id
        }
    })
    return NextResponse.json({})
}