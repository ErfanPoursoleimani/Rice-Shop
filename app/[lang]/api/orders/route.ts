import { NextRequest, NextResponse } from "next/server";
import { orderSchema } from '@/app/[lang]/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const orders = await prisma.order.findMany()
    return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = orderSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const order = await prisma.order.findUnique({
        where: {
            id: body.id
        }
    })
    if(order)
        return NextResponse.json({error: "Order already exists"}, {status: 400})
    const neworder = await prisma.order.create({
        data: {
            userId: body.userId
        }
    })
    return NextResponse.json(neworder, {status: 201})
}