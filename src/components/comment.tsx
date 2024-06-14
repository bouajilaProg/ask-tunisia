"use client";

import React, { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";


function Comment() {

    const [liked, setliked] = useState(false);
  return (
    <div className="p-4 rounded-md">
      <div className="w-full inline-flex ">
        <span className="font-bold mr-3">John Doe</span>
        <span className="inline mr-3">12/12/2021</span>
        <button className="inline mb-1  " onClick={() => setliked(!liked)}>
            {liked ?    < BsHandThumbsUpFill />: <BsHandThumbsUp  />}
          
        </button>
        <span>7 </span>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores soluta
        neque recusandae repellendus vero deserunt facilis sint repellat culpa
        et. Quisquam, quidem. Quisquam, quidem. Quisquam, quidem. Quisquam,
      </p>
    </div>
  );
}

export default Comment;
