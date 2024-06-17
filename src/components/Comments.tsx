import Comment from "@/components/comment";
import prisma from "@/lib/db";
import React from "react";

interface t_commentsProp {
  blogID: string;
}


async function Comments({ blogID} : t_commentsProp) {
  prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      date: true,
    },
    where: {
      post: {
        id: blogID
      }
    }
  })
  return (
    <div>
      <br />
      <h1 className="text-3xl font-bold">1 Comments</h1>
      {/*<Comment />*/}
    </div>
  );
}

export default Comments;
