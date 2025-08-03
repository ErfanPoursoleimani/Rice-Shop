import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value!
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
        const userId = decoded.userId
        const cartId = decoded.cartId
        const role = decoded.role
        return NextResponse.json({ userId, cartId, role })
    } catch (error) {
        return NextResponse.json({ userId: null, cartId: null, role: null })
    }
}


