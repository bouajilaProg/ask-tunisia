"use client";

import React from "react";
import { useState } from "react";
import t_comment from "@/types/comment";

interface Comment {
  blogid: string;
}

function CommentAdder(commentProp: Comment) {
  const date = new Date();
  const [comment, setcomment] = useState<t_comment>({
    id: 0,
    body: "",
    author: "John Doe",
    date: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear(),
    likes: 0,
    idBlog: Number(commentProp.blogid),
  });

  function autoResize(e: any) {
    const minHeight = 46;
    console.log(e.target.scrollHeight);
    if (e.target.scrollHeight <= minHeight) {
      e.target.style.height = `${minHeight}px`;
      return;
    }
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    comment.body = value;
    setcomment({ ...comment });
  };
  return (
    <>
    <hr className="mt-5" />
      <textarea
        placeholder="add comment"
        name="body"
        value={comment.body}
        onInput={(e) => {
          handleChange(e);
          autoResize(e);
        }}
        className=" textarea textarea-bordered  w-full max-w-6xl resize-none h-[36px] hide-scrollbar mt-5"
      ></textarea>
      <div className="w-full">

      <button className="btn btn-outline mr-3">add</button>
      <button className="btn btn-outline">cancel</button>
      </div>
    </>
  );
}

export default CommentAdder;
