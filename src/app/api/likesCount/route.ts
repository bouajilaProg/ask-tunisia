import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {

        const {commentID,userId} = await req.json();

        const LikeCountResponce = await prisma.comment.findFirst({
            where:{
                id:commentID
            }
        })

        const isLiked = await prisma.commentlikes.findFirst({
            where:{
                commentId:commentID,
                userId:userId
            }
        })

        return NextResponse.json({count:LikeCountResponce?.likes,isLiked:isLiked},{status:200})
    } catch (error) {
        console.log(error)
    }
}