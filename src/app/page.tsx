"use server";
import React from "react";
import { getCurrentUser } from "@/lib/session";
import BlogPostList from "@/components/BlogPostList";


export  default async function Home() {
  return (
    <main>
      <BlogPostList search={""}/>
    </main>
  );
}
