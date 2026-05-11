import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();

  // Generate slug from title if not provided
  const slug = data.slug || data.title
    .toLowerCase()
    .replace(/[ąà]/g, 'a').replace(/[ćč]/g, 'c').replace(/[ęè]/g, 'e')
    .replace(/[łl]/g, 'l').replace(/[ńñ]/g, 'n').replace(/[óò]/g, 'o')
    .replace(/[śš]/g, 's').replace(/[źżž]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt || '',
      content: data.content || '',
      coverImage: data.coverImage || '',
      published: data.published || false,
      publishedAt: data.published ? new Date() : null,
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      tags: data.tags || '',
    },
  });

  return NextResponse.json({ success: true, data: post });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await request.json();

  // If publishing for the first time, set publishedAt
  if (data.published) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing && !existing.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  await prisma.blogPost.update({
    where: { id },
    data,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
