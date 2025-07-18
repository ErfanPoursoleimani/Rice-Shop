import { tagSchema } from "@/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = tagSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const tag = await prisma.tag.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!tag)
        return NextResponse.json({ error: 'Invalid tag'}, { status: 404 })

    const updatedTag = await prisma.tag.update({
        where: {
            id: tag.id
        },
        data: {
            id: body.id,
            label: body.label,
        }
    })

    return NextResponse.json(updatedTag)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tag = await prisma.tag.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!tag)
        return NextResponse.json({ error: 'Invalid tag'}, { status: 404 })

    await prisma.tag.delete({
        where:{
            id: tag.id
        }
    })
    return NextResponse.json({})
}