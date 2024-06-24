"use client";

import axios from "axios";
import React, { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { start } from "repl";

interface t_commentProp {
  likesProp: string | null;
  author: string | null;
  content: string | null;
  date: string | null;
  likedProp: boolean;
  userId: string | undefined | null;
  commentID: string;
}
async function updateLikes(
  liked: boolean,
  userID: string,
  commentID: string,
  setlikes: any
) {
  const apiBody = { liked: liked, userID: userID, commentID: commentID };
  try {
    const responce = await axios.post("/api/Likes", apiBody);
    if (responce.status == 200) {
      console.log(liked);
      const responce = await axios.post("/api/likesCount", { commentID });
      setlikes(responce.data.count);
    }
  } catch (error) {
    console.error(error);
  }
}

async function LowStartUpdateLikes(
  userId: String,
  commentID: string,
  setlikes: any,
  setLiked:any
) {
  const responce = await axios.post("/api/likesCount", { commentID, userId });
  if (responce.status == 200) {
    setlikes(responce.data.count);
    setLiked(responce.data.isLiked);
  }
}

function Comment({
  commentID,
  likesProp,
  author,
  content,
  date,
  likedProp,
  userId,
}: t_commentProp) {
  const [Start, setStart] = useState(0);
  const [liked, setliked] = useState(likedProp);
  const [likes, setLikes] = useState(likesProp);

  if (userId) {
    if (Start == 0) {
      setStart(1);
      LowStartUpdateLikes(userId, commentID, setLikes,setliked);
    }
  }

  if (Start != 0) {
    return (
      <div className="p-4 rounded-md">
        <div className="w-full inline-flex ">
          <span className="font-bold mr-3">{author}</span>
          <span className="inline mr-3">{date}</span>
          <button
            className="inline mb-1"
            onClick={() => {
              if (userId != null) {
                updateLikes(liked, userId, commentID, setLikes);
                setliked(!liked);
              }
            }}
          >
            {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
          </button>
          <span>{likes} </span>
        </div>
        <p>{content}</p>
      </div>
    );
  }
}

export default Comment;
