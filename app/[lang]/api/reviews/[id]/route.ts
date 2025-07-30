import { reviewSchema } from "@/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = reviewSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const review = await prisma.review.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!review)
        return NextResponse.json({ error: 'Invalid review'}, { status: 404 })

    const updatedReview = await prisma.review.update({
        where: {
            id: review.id
        },
        data: {
            rating: body.rating,
            message: body.message,
            title: body.title,
            isRead: body.isRead,
            productId: body.productId,
            userId: body.userId
        }
    })

    return NextResponse.json(updatedReview)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const review = await prisma.review.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!review)
        return NextResponse.json({ error: 'Invalid review'}, { status: 404 })

    await prisma.review.delete({
        where:{
            id: review.id
        }
    })
    return NextResponse.json({})
}