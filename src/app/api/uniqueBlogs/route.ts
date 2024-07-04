import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { PostTitle } = await req.json();


        const unique = await prisma.post.findFirst({
            where: {
                title: PostTitle.replaceAll(" ", "-"),
            },
        });
        if (unique == null) {
            return NextResponse.json({ unique: true }, { status: 200 })
        }
        return NextResponse.json({ unique:false}, { status: 200 })
    }
    catch (error) {
        console.log(error)
    }
}