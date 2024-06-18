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


        const { content, date, blogId } = await req.json();
        if (!content || !date || !blogId) {
            console.log("missing fields");
        }

        const newPost = await prisma.comment.create({
            data: {
                authorId: user.email,
                content,
                date,
                postId: blogId,
                likes: 0,
            },
        });
        return NextResponse.json(newPost, { status: 200 });



    } catch (error) {
        NextResponse.json({ error: "something went wrong" }, { status: 500 });
    }
}   