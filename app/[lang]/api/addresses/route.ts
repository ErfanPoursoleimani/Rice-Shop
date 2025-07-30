import { NextRequest, NextResponse } from "next/server";
import { addressSchema } from '@/validation/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    let addresses 
    if(userId){
        addresses = await prisma.address.findMany({
            where: userId
            ? { userId: parseInt(userId) }
            : {},
            include: {
                user: true
            }
        })
    }
    return NextResponse.json(addresses)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = addressSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newAddress = await prisma.address.create({
        data: {
            province: body.province,
            address: body.address,
            city: body.city, 
            plaque: body.plaque,
            unit: body.unit,
            postalCode: body.postalCode,
            userId: body.userId
        }
    })
    return NextResponse.json(newAddress, {status: 201})
}