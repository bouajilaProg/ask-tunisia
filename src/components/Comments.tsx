import Comment from "@/components/comment";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { comment } from "postcss";
import React, { useState } from "react";

interface t_commentsProp {
  blogID: string | undefined;
}

async function Comments({ blogID }: t_commentsProp) {
  const user = await getCurrentUser();
  //liked
  const commentsItemLiked = await prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      date: true,

      author: {
        select: {
          name: true,
        },
      },
      likedBy: {
        select: {
          userId: true,
        },
      },
    },
    where: {
      post: {
        id: blogID,
      },
      likedBy: {
        some: {
          userId: user?.email,
        },
      },
    },
    orderBy: {
      likes: "desc",
    },
  });

  const commentsItem = await prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      date: true,

      author: {
        select: {
          name: true,
        },
      },
      likedBy: {
        select: {
          userId: true,
        },
      },
    },
    where: {
      post: {
        id: blogID,
      },
    },
    orderBy: {
      likes: "desc",
    },
  });


  const likedCommentsIDS:string[]=[];
  commentsItemLiked.forEach(comment => {
    likedCommentsIDS.push(comment.id);
  });

  
  const comments = commentsItem.map((comment) => ({
    id: comment.id,
    content: comment.content,
    likes: comment.likes,
    date: comment.date,
    author: comment.author.name,
    liked: false,
  }));

  if (likedCommentsIDS.length > 0){

    comments.forEach(comment => {
      if (likedCommentsIDS.indexOf(comment.id) != -1) {
        comment.liked = true;
      }
    });
  }
  
  

  return (
    <div>
      <br />
      <h1 className="text-3xl font-bold">{comments.length} Comments</h1>
      {comments.map((commentData) => (
        <Comment
          key={commentData.id}
          userId={user?.email}
          commentID={commentData.id}
          author={commentData?.author}
          content={commentData.content}
          date={commentData.date}
          likesProp={commentData.likes.toString()}
          likedProp={commentData.liked}
        />
      ))}
    </div>
  );
}

export default Comments;
