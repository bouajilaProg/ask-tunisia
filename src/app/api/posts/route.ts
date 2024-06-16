import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("weslet");
    const user = await getCurrentUser();
    try {
        if (!user?.email) {
            return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
        }
        const { title, subtitle, content } = await req.json();
        if (!title || !subtitle || !content) {
            console.log("missing fields");
        }
        const newPost = await prisma.post.create({
            data: {
                UserId: user.email,
                title,
                subtitle,
                content,
            },
        });

        return NextResponse.json(newPost, { status: 200 });

    } catch (error) {
        NextResponse.json({ error: "something went wrong" }, { status: 500 });
    }
}   