import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const response = NextResponse.json({ messsage: "Cookie Deleted"})
    response.cookies.delete("cartProducts")
    return response
}