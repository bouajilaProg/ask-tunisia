"use client";

import t_postFormData from "@/types/postFormData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

function autoResize(e: any) {
  const minHeight = 416;
  if (e.target.scrollHeight < minHeight) {
    e.target.style.height = `${minHeight}px`;
    return;
  }
  e.target.style.height = "inherit";
  e.target.style.height = `${e.target.scrollHeight}px`;
}

function NewPostForm() {
  const router = useRouter();
  const { data } = useSession();
  const date = new Date();
  
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setpost({
      ...post,
      [name]: value,
    });
  };

  const [post, setpost] = useState<t_postFormData>({
    title: "",
    subtitle: "",
    content: "",
    date:  date.getDate()+"/"+ (date.getMonth() + 1) + "/" + date.getFullYear()
  });

  function TestForm(post: t_postFormData): string {
    if (!post.title || !post.subtitle || !post.content) {
      return "missing fields";
    }

    if (post.title.length > 40) return "title too long";
    if (post.subtitle.length > 80) return "subtitle too long";

    if (!/^[a-zA-Z0-9- ]*$/.test(post.title)) {
      return "title must be alphanumeric";
    }

    if (!/^[a-zA-Z0-9- ]*$/.test(post.subtitle)) {
      return "subtitle must be alphanumeric";
    }

    if (!/^[a-zA-Z0-9- ]*$/.test(post.content)) {
      return "the article must be alphanumeric";
    }

    if (post.title.trim().length < 5) return "title too short";
    if (post.subtitle.trim().length < 5) return "subtitle too short";
    if (post.content.trim().length < 40) return "content too short";

    return "ok";
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    if (TestForm(post) == "ok") {
      try {
        const response = await axios.post("/api/posts", post);
        if (response.status === 200) {
          router.push(`/${response.data.title.replaceAll(" ", "-")}`);
        }
      } catch (error: any) {
        console.warn(error);
      }
      
      setpost({
        title: "",
        subtitle: "",
        content: "",
        date:  date.getDate()+"/"+ (date.getMonth() + 1) + "/" + date.getFullYear(),
      });
    } else {
      alert(TestForm(post));
    }
  };


  const buttonState = data ? false : true;
  
  return (
    <form
      className="flex justify-center items-center flex-col bg-gradient-to-t from-base-200 to-base-300"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl text-center mt-6">new post</h1>
      <div className="flex my-16 px-8 w-full flex-col items-center">
        <input
          name="title"
          value={post.title}
          onInput={handleChange}
          type="text"
          placeholder="title"
          className=" m-auto input input-bordered w-full max-w-6xl mb-5"
        />
        <input
          name="subtitle"
          value={post.subtitle}
          onInput={handleChange}
          type="text"
          placeholder="subtitle"
          className=" m-auto input input-bordered w-full max-w-6xl"
        />
        <textarea
          name="content"
          value={post.content}
          onInput={(e) => {
            handleChange(e);
            autoResize(e);
          }}
          className=" my-5 textarea textarea-bordered  textarea-lg w-full max-w-6xl resize-none h-[416px] hide-scrollbar"
        ></textarea>
        <button
          id="submitPostButton"
          className="btn btn-outline w-full max-w-6xl "
          disabled={buttonState}
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default NewPostForm;
