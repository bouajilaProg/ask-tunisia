import Link from "next/link";
import  BlogPostItemProps  from "@/types/BlogPostItemProps";


const handleBody = (body: string) => {
    if (body.length > 200) {
      return `${body.substring(0, 400)}...`;
    }
    return body;
  }

function BlogPostItem(postItem: BlogPostItemProps) {

  if (!postItem) {
    return <div>Loading...</div>;
  }

  if (!postItem.title) {
    return <div>Post not found</div>;
  }
  return (
    
    <article className="md:w-1/5 w-[300px] float-start m-5 mb-8  text-left  ">
        <Link href={`/${postItem.title.replace(' ','-')}`}>
            <h3 className="w-full">{postItem.author}</h3>
            <h2 className="text-2xl text-left">{postItem.title}</h2>
            <h2 className="text-xl text-left">{postItem.subtitle}</h2>
            
        </Link>
    </article>
  );
}

export default BlogPostItem;
