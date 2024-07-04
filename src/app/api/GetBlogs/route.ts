import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  // Get all blogs
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      User: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      likes: "desc",
    },
  });
  return NextResponse.json({blogs}, { status: 200 })
}
        