"use client";

import { getCurrentUser } from "@/lib/session";
import axios from "axios";
import React, { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

interface LikesCountProp {
  blogID: string | undefined | null;
  userId: string | undefined | null;
  likedProp: boolean;
}

async function updateLikes(
  liked: boolean,
  blogID: string,
  userID: string,
  setlikes: any,
  setliked: any
) {
  const apiBody = { liked: liked, userId: userID, postId: blogID };
  try {
    const responce = await axios.post("/api/PostLikes/Likes", apiBody);
    if (responce.status == 200) {
      const responce = await axios.post("/api/PostLikes/likesCount", apiBody);
      setlikes(responce.data.count);
      setliked(responce.data.isLiked);
    }
  } catch (error) {
    console.error(error);
  }
}

async function SlowStartUpdateLikes(
  blogID: string | undefined,
  setlikes: any,
  setLiked: any,
  liked: boolean,
  userID: string
) {
  const apiBody = { liked: liked, userId: userID, postId: blogID };

  if (userID) {
    const responce = await axios.post("/api/PostLikes/likesCount", apiBody);
    if (responce.status == 200) {
      setlikes(responce.data.count);
      setLiked(responce.data.isLiked);
    }
  }
}

function LikesCount({ blogID, userId, likedProp }: LikesCountProp) {
  const [liked, setliked] = useState(likedProp);
  const [likes, setLikes] = useState(0);
  const [start, setstart] = useState(0);

  if (start == 0) {
    setstart(1);
    if (userId != null && blogID != null) {
      SlowStartUpdateLikes(blogID, setLikes, setliked, liked, userId);
    }
  }
  return (
    <div className="inline-flex w-full mt-3 ">
      {" "}
      <button
        className="inline mb-1"
        onClick={() => {
          if (blogID != null && userId != null) {
            updateLikes(liked, blogID, userId, setLikes, setliked);
          }
        }}
      >
        {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
      </button>
      <span className="mb-1">{likes} likes</span>
    </div>
  );
}

export default LikesCount;
