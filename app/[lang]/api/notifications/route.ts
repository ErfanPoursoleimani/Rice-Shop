import { NextRequest, NextResponse } from "next/server";
import { notificationSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    let notifications 
    if(userId){
        notifications = await prisma.notification.findMany({
            where: userId
            ? { userId: parseInt(userId) }
            : {},
            include: {
                user: true,
            }
        })
    }
    return NextResponse.json(notifications)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = notificationSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newnotification = await prisma.notification.create({
        data: {
            userId: body.userId,
            text: body.text
        }
    })
    return NextResponse.json(newnotification, {status: 201})
}