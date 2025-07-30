import { notificationSchema } from "@/validation/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const body = await request.json()
    const validation = notificationSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})

    const notification = await prisma.notification.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!notification)
        return NextResponse.json({ error: 'Invalid notification'}, { status: 404 })

    const updatednotification = await prisma.notification.update({
        where: {
            id: notification.id
        },
        data: {
            text: body.text
        }
    })

    return NextResponse.json(updatednotification)
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const notification = await prisma.notification.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!notification)
        return NextResponse.json({ error: 'Invalid notification'}, { status: 404 })

    await prisma.notification.delete({
        where:{
            id: notification.id
        }
    })
    return NextResponse.json({})
}