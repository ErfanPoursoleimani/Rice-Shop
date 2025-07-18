import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest){
    const users = await prisma.user.findMany({
        include: {
            order: true,
            reviews: true
        }
    })
    return NextResponse.json(users)
}
