import React, { useContext } from "react";
import BlogPostItem from "./BlogPostItem";
import BlogPostItemProps from "@/types/BlogPostItemProps";
import { toSearchContext } from "./MainApp";
import axios from "axios";
import prisma from "@/lib/db";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

function filter(blog: BlogPostItemProps, search: string | null | undefined) {
  if (!search) return true;
  if (!blog.title || !blog.subtitle) return false;
  return blog.title.includes(search) || blog.subtitle.includes(search);
}

interface t_blogs{
  title: string;
  id: string;
  content: string;
  User: {
      name: string | null;
  } | null;
  subtitle: string;
};


interface BlogPostListProps {
  search: string | null | undefined;
}


async function BlogPostList(tosearchProp: BlogPostListProps) {
  
  
  const blogs:t_blogs[] = (await axios.get("http://localhost:3000/api/GetBlogs")).data.blogs;
  
  const toSearch  = tosearchProp.search;
  console.log(toSearch)

  const formattedBlogs: BlogPostItemProps[] = blogs.map((blog) => ({
    id: blog.id,
    author: blog?.User?.name,
    title: blog.title,
    subtitle: blog.subtitle,
  }));

  return (
    <div className="flex flex-col  justify-start ">
      {formattedBlogs
        .filter((blog) => filter(blog, toSearch))
        .map((postItem) => (
          <div key={postItem.id}>
            <BlogPostItem {...postItem} />
            <br className="h-2 bg-white" />
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
  const  search  = context.query;
  console.log('context.query:', context.query);
  return {props: { search }};
}; 

export default BlogPostList;

