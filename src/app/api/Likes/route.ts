import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    ////async function updateLikes(liked: boolean, userID: string, commentID: string) {
    const { liked, userID, commentID } = await req.json();
    const addValue = (liked) ? -1 : 1;
    try {

        if (liked) {
            console.log("unlike");
            const delId = await prisma.commentlikes.findFirst({
                select: {
                    id: true,
                },
                where: {
                    commentId: commentID,
                    userId: userID,
                },
            });

            await prisma.commentlikes.delete({
                where: {
                    id: delId?.id,
                },
            });
        } else {
            console.log("like");
            await prisma.commentlikes.create({
                data: {
                    commentId: commentID,
                    userId: userID,
                },
            });
        }

        const responceComment =  await prisma.comment.findFirst({
            select:{
                likes:true
            },
            where:{
                id:commentID
            }
        })

        if (responceComment){

            await prisma.comment.update({
                where:{
                    id:commentID
                },
                data:{
                    likes:(responceComment?.likes+addValue)
                }
            })
        }else{
            return NextResponse.json({error:"responce not found"} , {status:400})
        }

        
        return NextResponse.json({ userID, liked, commentID }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}