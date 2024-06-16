import React from "react";
import BlogPostItem from "./BlogPostItem";
import BlogPostItemProps from "@/types/BlogPostItemProps";
import prisma from "@/lib/db";


async function BlogPostList() {
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      content: true,
      User: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      title: "desc",
    },    
  });

  const formattedBlogs:BlogPostItemProps[] =  blogs.map(blog => ({
    id: blog.id, // Assuming id is of type number, convert it to string
    author: blog?.User?.name,
    title: blog.title,
    subtitle: blog.subtitle,
  }));

  


  console.log(blogs);
  return (
    <div className="flex flex-col  justify-start ">
      {formattedBlogs.map((postItem) => (
        <div key={postItem.id}>
          <BlogPostItem {...postItem}/>
          <br className="h-2 bg-white" />
        </div>
      ))}
    </div>
  );
}

export default BlogPostList;
