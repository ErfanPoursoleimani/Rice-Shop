import { userLoginSchema } from '@/validation/validationSchemas';
import axios from "axios";
import { SignJWT } from 'jose';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: {params: Promise<{lang: string}> }) {
    const body = await request.json()
    const lang = (await params).lang

    const validation = userLoginSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    
    try {
        const { data } = await axios.post(`http://localhost:3000/${lang}/api/users`, body)
        const userId = data.user.id
        const user = data.user

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
        const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)

        const response = NextResponse.json({ user });
        (await cookies()).set("auth-token", token)
        return response
        
    } catch (error) {
        console.error('Login API Error:', error)
        return NextResponse.json(
            { error: 'Login failed' }, 
            { status: 500 }
        )
    }
}