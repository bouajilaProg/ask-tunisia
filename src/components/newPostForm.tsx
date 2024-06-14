"use client";
import  Post  from "@/types/post";
import React, { ChangeEvent, useState } from "react";

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
  const [post, setpost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    author: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setpost({
      id: post.id + 1,
      title: "",
      body: "",
      author: "",
      date: "",
    });
  };

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
          className=" m-auto input input-bordered w-full max-w-6xl"
        />
        <textarea
          name="body"
          value={post.body}
          onInput={(e) => {
            handleChange(e);
            autoResize(e);
          }}
          className=" my-5 textarea textarea-bordered  textarea-lg w-full max-w-6xl resize-none h-[416px] hide-scrollbar"
        ></textarea>
        <button className="btn btn-outline w-full max-w-6xl ">Send</button>
      </div>
    </form>
  );
}

export default NewPostForm;
