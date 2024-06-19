"use client";

import React, { ReactEventHandler } from "react";
import { useState } from "react";
import t_comment from "@/types/comment";
import axios from "axios";
import {useRouter} from "next/navigation"

interface Comment {
  blogid: string | undefined;
}

interface t_CommentSendedData {
  content: string | undefined;
  date: string | undefined;
  blogId: string | undefined;
}

function CommentAdder(commentProp: Comment) {
  const router = useRouter();
  const date = new Date();
  const [comment, setcomment] = useState<t_comment>({
    id: 0,
    body: "",
    author: "John Doe",
    date: date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear(),
    likes: 0,
    idBlog: Number(commentProp.blogid),
  });

  const reset = () => {
    setcomment({
      id: 0,
      body: "",
      author: "weld mohsen",
      date: date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear(),
      likes: 0,
      idBlog: Number(commentProp.blogid),
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ApiData: t_CommentSendedData = {
      content: comment.body,
      date: comment.date,
      blogId: commentProp.blogid,
    };


    function testComment(ApiData:t_CommentSendedData):string{
      if (ApiData == undefined) return "error";
      
      if ((!ApiData.content) || (ApiData.content.length < 5)) {
        return "comment too short";
      }
      
      if (ApiData.content.length > 200) return "comment too long";
      
      if (!/^[a-zA-Z0-9- ]*$/.test(ApiData.content)) {
        return "comment must be alphanumeric";
      }
      return "ok";
    }

    if (testComment(ApiData) == "ok") {
    try {
      
      const response = await axios.post("/api/commentAdd", ApiData);
      reset();
      router.refresh();
      
      
    } catch (error: any) {
      console.error(error.response.data);
      console.warn(error);
    }}else{
      alert(testComment(ApiData));
    }
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setcomment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };


  return (
    <form onSubmit={handleSubmit} >
      <hr className="mt-5" />
      <textarea
        placeholder="add comment"
        name="body"
        value={comment.body}
        onChange={(e) => {
          handleChange(e);
          autoResize(e);
        }}
        className=" textarea textarea-bordered  w-full max-w-6xl resize-none h-[36px] hide-scrollbar mt-5"
      ></textarea>
      <div className="w-full">
        <button className="btn btn-outline mr-3">add</button>
        <button type="button" className="btn btn-outline" onClick={reset}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default CommentAdder;
