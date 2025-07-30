import { NextRequest, NextResponse } from "next/server";
import { reviewSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    let reviews 
    if(userId){
        reviews = await prisma.review.findMany({
            where: userId
            ? { userId: parseInt(userId) }
            : {},
            include: {
                user: true, 
                product: true
            }
        })
    }

    return NextResponse.json(reviews)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = reviewSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const review = await prisma.review.findUnique({
        where: {
            id: body.id
        }
    })
    if(review)
        return NextResponse.json({error: "review already exists"}, {status: 400})
    const newReview = await prisma.review.create({
        data: {
            rating: body.rating,
            message: body.message,
            title: body.title,
            isRead: body.isRead,
            productId: body.productId,
            userId: body.userId
        }
    })
    return NextResponse.json(newReview, {status: 201})
}