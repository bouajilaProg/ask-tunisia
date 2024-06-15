import React from "react";
import BlogPostList from "@/components/BlogPostList";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <main>
      <BlogPostList />
    </main>
  );
}
