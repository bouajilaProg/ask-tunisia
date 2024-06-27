import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const {postId, userId } = await req.json();
        

        const LikeCountResponce = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })


        const isLiked = await prisma.postLikes.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        })

        
        
        if (isLiked == null) {
            return NextResponse.json({ count: LikeCountResponce?.likes, isLiked: false }, { status: 200 })
        } else {
            return NextResponse.json({ count: LikeCountResponce?.likes, isLiked: true}, { status: 200 })
        }

    } catch (error) {
        console.log(error)
    }
}