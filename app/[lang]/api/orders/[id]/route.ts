import { orderSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = orderSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const order = await prisma.order.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!order)
        return NextResponse.json({ error: 'Invalid order'}, { status: 404 })

    const updatedorder = await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            userId: body.userId
        }
    })

    return NextResponse.json(updatedorder)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const order = await prisma.order.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!order)
        return NextResponse.json({ error: 'Invalid order'}, { status: 404 })

    await prisma.order.delete({
        where:{
            id: order.id
        }
    })
    return NextResponse.json({})
}