import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest){

    const cookieStore = await cookies()
    const token = cookieStore.get('jwt')?.value!
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
        const userId = decoded.userId
        return NextResponse.json(userId)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 404 })
    }

}