import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import axios from "axios";

export async function GET(req: NextRequest){
    const users = await prisma.user.findMany({
        include: {
            order: true,
            reviews: true
        }
    })
    return NextResponse.json(users)
}
export async function POST(req: NextRequest, { params }: { params: Promise<{ lang :string }> }){
    try {
        const body = await req.json()
        const isPhoneNumber = !((/[^0-9+]/g).test(body.emailOrPhone))
        
        let filteredBody: {phoneNumber: string | undefined, email: string | undefined} = {
            phoneNumber: isPhoneNumber ? body.emailOrPhone : undefined,
            email: !isPhoneNumber ? body.emailOrPhone : undefined,
        }
        
        const user = await prisma.user.findUnique({
            where: 
            isPhoneNumber 
            ? { phoneNumber: filteredBody.phoneNumber }
            : { email: filteredBody.email }
        })
        
        if(user){
            return NextResponse.json({ user })
        }
        
        let newUser = await prisma.user.create({
            data: {
                phoneNumber: filteredBody.phoneNumber,
                email: filteredBody.email,
            }
        })
        
        const lang = (await params).lang
        const { data: { cart: { id: cartId } } } = await axios.post(`http://localhost:3000/${lang}/api/carts`, { userId: newUser.id })

        newUser = await prisma.user.update({
            where: {
                id: newUser.id
            },
            data: {
                cartId
            }
        })

        return NextResponse.json({ user: newUser })
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}