"use client";

import React, { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";

interface t_commentProp {
  likes: string | null;
  author: string | null;
  content: string| null;
  date: string| null;
}

function Comment({ likes, author, content, date}: t_commentProp) {
  const [liked, setliked] = useState(false);
  return (
    <div className="p-4 rounded-md">
      <div className="w-full inline-flex ">
        <span className="font-bold mr-3">{author}</span>
        <span className="inline mr-3">{date}</span>
        <button className="inline mb-1  " onClick={() => setliked(!liked)}>
          {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </button>
        <span>{likes} </span>
      </div>
      <p>
        {content}
      </p>
    </div>
  );
}

export default Comment;
