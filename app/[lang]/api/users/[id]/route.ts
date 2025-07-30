import { userSchema } from "@/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, props: { params: Promise<{ id: string }>}){
    const params = await props.params
    const userId = parseInt(params.id)
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })
    if(!user)
        return NextResponse.json({ error: 'Invalid user'}, { status: 404 })

    return NextResponse.json(user)
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = userSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!user)
        return NextResponse.json({ error: 'Invalid user'}, { status: 404 })

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            role: body.role
        }
    })

    return NextResponse.json(updatedUser, {status: 200})
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!user)
        return NextResponse.json({ error: 'Invalid user'}, { status: 404 })

    await prisma.cart.delete({
        where: {
            id: user.cartId!
        }
    })

    await prisma.user.delete({
        where:{
            id: user.id
        }
    })
    return NextResponse.json({})
}