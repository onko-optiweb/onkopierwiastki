'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function BlogManager({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = posts.filter((p) => {
    if (filter === 'published') return p.published;
    if (filter === 'draft') return !p.published;
    return true;
  });

  const togglePublish = async (post: BlogPost) => {
    await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten wpis?')) return;
    setDeleting(id);
    await fetch('/api/admin/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setDeleting(null);
    router.refresh();
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#122056] text-white'
                  : 'bg-white text-[#8a8fa6] hover:bg-neutral-50'
              }`}
            >
              {f === 'all' ? `Wszystkie (${posts.length})` : f === 'published' ? `Opublikowane (${posts.filter((p) => p.published).length})` : `Szkice (${posts.filter((p) => !p.published).length})`}
            </button>
          ))}
        </div>
        <Link
          href="/admin/blog/nowy"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B65DC] text-white text-sm font-medium rounded-lg hover:bg-[#4a53c7] transition-colors"
        >
          <Plus size={16} />
          Nowy wpis
        </Link>
      </div>

      {/* Posts list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-[#8a8fa6]">Brak wpisów</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {filtered.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/edytuj/${post.id}`}
                      className="text-sm font-semibold text-[#122056] hover:text-[#5B65DC] transition-colors truncate"
                    >
                      {post.title}
                    </Link>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      post.published
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {post.published ? 'Opublikowany' : 'Szkic'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#8a8fa6]">
                    <span>/{post.slug}</span>
                    <span>Utworzony: {formatDate(post.createdAt)}</span>
                    {post.publishedAt && <span>Opublikowany: {formatDate(post.publishedAt)}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-4">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[#8a8fa6] hover:text-[#122056] hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Zobacz na stronie"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => togglePublish(post)}
                    className="p-2 text-[#8a8fa6] hover:text-[#122056] hover:bg-neutral-100 rounded-lg transition-colors"
                    title={post.published ? 'Cofnij publikację' : 'Opublikuj'}
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link
                    href={`/admin/blog/edytuj/${post.id}`}
                    className="p-2 text-[#8a8fa6] hover:text-[#122056] hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Edytuj"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="p-2 text-[#8a8fa6] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Usuń"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
