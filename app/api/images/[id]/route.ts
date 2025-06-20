import { imageSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = imageSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const image = await prisma.image.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!image)
        return NextResponse.json({ error: 'Invalid image'}, { status: 404 })

    const updatedImage = await prisma.image.update({
        where: {
            id: image.id
        },
        data: {
            id: body.id,
            label: body.label,
            url: body.url,
            product: body.product, 
            productId: body.productId
        }
    })

    return NextResponse.json(updatedImage)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const image = await prisma.image.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!image)
        return NextResponse.json({ error: 'Invalid image'}, { status: 404 })

    await prisma.image.delete({
        where:{
            id: image.id
        }
    })
    return NextResponse.json({})
}