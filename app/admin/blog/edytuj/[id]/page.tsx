import { prisma } from "@/src/lib/prisma";
import { BlogEditor } from "@/src/components/admin/blog-editor";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const serialized = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    published: post.published,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    tags: post.tags,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Edytuj wpis</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Edytuj wpis &ldquo;{post.title}&rdquo;</p>
      </div>
      <BlogEditor post={serialized} />
    </div>
  );
}
