import React from "react";
import BlogPostItem from "./BlogPostItem";
import Post from "@/types/post";
import post from "@/data/posts";

function BlogPostList() {
  return (
    <div className="flex flex-col w-full justify-start">
    
      {post.map((postItem: Post) => (
        <div key={postItem.id} >
          <BlogPostItem  postItem={postItem} />
          <br className="h-2 bg-white"/>
        </div>
      ))}
    </div>
  );
}

export default BlogPostList;
