import { NextRequest, NextResponse } from "next/server";
import { imageSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const images = await prisma.image.findMany()
    return NextResponse.json(images)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = imageSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const image = await prisma.image.findUnique({
        where: {
            id: body.id
        }
    })
    if(image)
        return NextResponse.json({error: "Image already exists"}, {status: 400})
    const newImage = await prisma.image.create({
        data: {
            id: body.id,
            label: body.label,
            url: body.url,
            product: body.product, 
            productId: body.productId
        }
    })
    return NextResponse.json(newImage, {status: 201})
}