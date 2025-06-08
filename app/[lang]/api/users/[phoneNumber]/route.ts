import { userSchema } from "@/app/[lang]/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ phoneNumber: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = userSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const user = await prisma.user.findUnique({
        where: {
            phoneNumber: params.phoneNumber
        }
    })

    if(!user)
        return NextResponse.json({ error: 'Invalid user'}, { status: 404 })

    const updatedUser = await prisma.user.update({
        where: {
            phoneNumber: user.phoneNumber
        },
        data: {
            phoneNumber: body.phoneNumber,
        }
    })

    return NextResponse.json(updatedUser)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ phoneNumber: string }>}) {
    const params = await props.params;
    const user = await prisma.user.findUnique({
        where: {
            phoneNumber: params.phoneNumber
        }
    })

    if(!user)
        return NextResponse.json({ error: 'Invalid added-to-cart product'}, { status: 404 })

    await prisma.user.delete({
        where:{
            phoneNumber: user.phoneNumber
        }
    })
    return NextResponse.json({})
}