
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request){
    const cookieStore = await cookies()
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')!
    const value = JSON.parse(cookieStore.get(key)!.value)

    if(!cookieStore.get(key)){
      return NextResponse.json({error: "Cookie does not exist"}, {status: 400})
    } 
    return NextResponse.json(value)
}

export async function POST(req: Request){
    const cookieStore = await cookies()
    const { key, value } = await req.json()
    
    cookieStore.set(key, value)

    return NextResponse.json({ message: "Cookie Set" }, { status: 201 })
}