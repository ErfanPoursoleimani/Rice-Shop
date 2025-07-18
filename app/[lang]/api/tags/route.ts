import { NextRequest, NextResponse } from "next/server";
import { tagSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const tags = await prisma.tag.findMany({
        include: {
            products: {
                include: {
                    images: true
                }
            }
        }
    })
    return NextResponse.json(tags)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = tagSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const tag = await prisma.tag.findUnique({
        where: {
            id: body.id
        }
    })
    if(tag)
        return NextResponse.json({error: "Tag already exists"}, {status: 400})

    const newTag = await prisma.tag.create({
        data: {
            label: body.label
        },
    })
    return NextResponse.json(newTag, {status: 201})
}