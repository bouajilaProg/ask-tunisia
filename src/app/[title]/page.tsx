import React, { FC } from "react";
import Comments from "@/components/Comments";
import CommentAdder from "@/components/commentAdder";
import prisma from "@/lib/db";
import LikesCount from "@/components/LikesCount";
import { getCurrentUser } from "@/lib/session";

interface BlogPageProps {
  params: {
    title: string;
  };
}


async function getLiked(title: string,userid : string|undefined|null) {
    const responce = await prisma.postLikes.findFirst({
        where: {
            postId: title,
            userId: userid
        }
    })

    return (responce?.id)?true:false;
}

const BlogPage:FC<BlogPageProps> = async ({ params }) => {


  const post = await prisma.post.findFirst({
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      createdAt: true,
      User: {
        select: {
          name: true,
        },
      },
    },
    where: {
      title: params.title
    },
  });
  const user = await getCurrentUser();
  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-3xl font-bold"> {post?.title.replaceAll("-"," ")}</h1>
      <h2 className="text-xl">{post?.subtitle}</h2>
      <p>written by {post?.User?.name}</p>
      <p>{post?.createdAt.toString()}</p>
      <div className="mt-4">
        {post?.content}
      </div>
      <LikesCount blogID={post?.id} userId={user?.email} likedProp={await getLiked(params.title,user?.email)} />
      <CommentAdder blogid={post?.id} />
      <Comments blogID={post?.id} />
    </div>
  );
}

export default BlogPage;
