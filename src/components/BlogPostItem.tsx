"use server";
import Post from "@/types/post";
import Link from "next/link";

interface BlogPostItemProps {
    postItem: Post;
    }
const handleBody = (body: string) => {
    if (body.length > 200) {
      return `${body.substring(0, 200)}...`;
    }
    return body;
  }

function BlogPostItem(postItem: BlogPostItemProps) {
  return (
    
    <article className="float-start m-5 mb-8 w-[600px] text-left  ">
        <Link href={`/${postItem.postItem.title.replace(' ','-')}`}>
            <h3 className="w-full">{postItem.postItem.author}</h3>
            <h2 className="text-xl text-left">{postItem.postItem.title}</h2>
            <p className="w-full">{handleBody(postItem.postItem.body)}</p>
        </Link>
    </article>
  );
}

export default BlogPostItem;
