import React, { FC } from "react";
import Comments from "@/components/Comments";
import CommentAdder from "@/components/commentAdder";
import prisma from "@/lib/db";

interface BlogPageProps {
  params: {
    title: string;
  };
}


const BlogPage:FC<BlogPageProps> = async ({ params }) => {


  console.log(params);
  const post = await prisma.post.findFirst({
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
    where: {
      title: params.title
    },
  });
  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-3xl font-bold"> {post?.title.replaceAll("-"," ")}</h1>
      <h2 className="text-xl">{post?.subtitle}</h2>
      <p>written by {post?.User?.name}</p>
      <p>posted on 12/12/2021</p>
      <div className="mt-4">
        {post?.content}
        
      </div>
      <CommentAdder blogid={'1'} />
      <Comments />
    </div>
  );
}

export default BlogPage;
