import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    ////async function updateLikes(liked: boolean, userId: string, postId: string) {
    const { liked, userId, postId } = await req.json();
    const addValue = (liked) ? -1 : 1;
    try {


        const delId = await prisma.postLikes.findFirst({
            select: {
                id: true,
            },
            where: {
                postId: postId,
                userId: userId,
            },
        });
        
        if (delId) {

            await prisma.postLikes.delete({
                where: {
                    id: delId?.id,
                },
            });
        } else {
            await prisma.postLikes.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
            console.log("like");
        }

        const responceComment = await prisma.post.findFirst({
            select: {
                likes: true
            },
            where: {
                id: postId
            }
        })

        if (responceComment) {

            await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likes: (responceComment?.likes + addValue)
                }
            })
        } else {
            return NextResponse.json({ error: "responce not found" }, { status: 400 })
        }


        return NextResponse.json({ userId, liked: liked, postId }, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}