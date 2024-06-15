import React from "react";
import Comments from "@/components/Comments";
import CommentAdder from "@/components/commentAdder";

function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 ">
      <h1 className="text-3xl font-bold"> Post title</h1>
      <h2 className="text-xl">subtitle</h2>
      <p>written by john doe</p>
      <p>posted on 12/12/2021</p>
      <div className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores soluta
        neque recusandae repellendus vero deserunt facilis sint repellat culpa
        et. Quisquam, quidem. Quisquam, quidem. Quisquam, quidem. Quisquam,
      </div>
      <CommentAdder blogid={1} />
      <Comments />
    </div>
  );
}

export default BlogPage;
