  "use client";

import t_postFormData from "@/types/postFormData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import React, { ChangeEvent, use, useState } from "react";

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
  const {data} = useSession();
  const router = useRouter();
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
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await axios.post("/api/posts", post);
      console.log(response);
      if (response.status === 200) {
        alert("Post created");
        router.push(`/${response.data.title.replaceAll(" ", "-")}`);
      }

    }catch(error){
      alert("something went wrong")
      console.error(error);
    }
    setpost({
      title: "",
      subtitle: "",
      content: "",
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
        <button className="btn btn-outline w-full max-w-6xl ">Send</button>
      </div>
    </form>
  );
}

export default NewPostForm;
