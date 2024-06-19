import Comment from "@/components/comment";
import prisma from "@/lib/db";
import React from "react";

interface t_commentsProp {
  blogID: string|undefined;
}







async function Comments({ blogID} : t_commentsProp) {
  
  const commentsItem = await prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      likes: true,
      date: true,
      
      author: {
        select: {
          name: true
        }
      }
    },
    where: {
      post: {
        id: blogID
      }
    }
  })


  
  const comments = commentsItem.map(comment => ({ 
    id: comment.id,
    content: comment.content,
    likes: comment.likes,
    date: comment.date,
    author: comment.author.name
  }));
  


  
  return (
    <div>
      <br />
      <h1 className="text-3xl font-bold">{comments.length} Comments</h1>
      {comments.map((commentData) => (
        <Comment key={commentData.id} author={commentData?.author} content={commentData.content} date={commentData.date} likes={commentData.likes.toString()} />
      ))}
    </div>
  );
}

export default Comments;
