"use server";
import React from "react";
import BlogPostList from "@/components/BlogPostList";

interface BlogPageProps {
    params: {
      search: string;
    };
  }
  
  

export  default async function page(BlogPageProps: BlogPageProps) {
  
  return (
    <main>
      <BlogPostList search={BlogPageProps.params.search}/>
    </main>
  );
}
