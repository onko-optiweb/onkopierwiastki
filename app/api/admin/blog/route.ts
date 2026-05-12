import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { sanitizeHtml } from "@/src/lib/sanitize";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().max(200).optional(),
  excerpt: z.string().max(500).default(""),
  content: z.string().min(1),
  coverImage: z.string().max(500).default(""),
  published: z.boolean().default(false),
  metaTitle: z.string().max(70).default(""),
  metaDescription: z.string().max(170).default(""),
  tags: z.string().max(300).default(""),
});

const blogPostUpdateSchema = blogPostSchema.partial();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[ąà]/g, "a").replace(/[ćč]/g, "c").replace(/[ęè]/g, "e")
    .replace(/[łl]/g, "l").replace(/[ńñ]/g, "n").replace(/[óò]/g, "o")
    .replace(/[śš]/g, "s").replace(/[źżž]/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const raw = await request.json();
  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug || generateSlug(data.title);

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: sanitizeHtml(data.content),
      coverImage: data.coverImage,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      tags: data.tags,
    },
  });

  return NextResponse.json({ success: true, data: post });
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id, ...raw } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Brak ID wpisu" }, { status: 400 });
  }

  const parsed = blogPostUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Błąd walidacji" }, { status: 400 });
  }

  const data = { ...parsed.data };

  // Sanitize content if provided
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }

  // If publishing for the first time, set publishedAt
  if (data.published) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing && !existing.publishedAt) {
      (data as Record<string, unknown>).publishedAt = new Date();
    }
  }

  await prisma.blogPost.update({ where: { id }, data });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Brak ID wpisu" }, { status: 400 });
  }

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
