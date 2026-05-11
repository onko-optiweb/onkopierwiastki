import { prisma } from "@/src/lib/prisma";
import { BlogManager } from "@/src/components/admin/blog-manager";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    published: p.published,
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Blog</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Zarządzaj wpisami na blogu</p>
      </div>
      <BlogManager posts={serialized} />
    </div>
  );
}
