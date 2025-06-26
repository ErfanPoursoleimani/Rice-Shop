import { NextRequest, NextResponse } from "next/server";
import { productSchema } from '@/app/[lang]/validationSchemas'
import { prisma } from "@/prisma/client";

export async function GET(){
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = productSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

/*     const product = await prisma.product.findUnique({
        where: {
            id: body.id
        }
    })
    if(product)
        return NextResponse.json({error: "Product already exists"}, {status: 400}) */
    
    const newProduct = await prisma.product.create({
        data: {
            label: body.label,
            price: body.price,
            description: body.description,
            quantity: body.quantity,
        }
    })
    return NextResponse.json(newProduct, {status: 201})
}