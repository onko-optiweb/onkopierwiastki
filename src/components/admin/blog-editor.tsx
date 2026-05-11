'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  tags: string;
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  published: false,
  metaTitle: '',
  metaDescription: '',
  tags: '',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[ąà]/g, 'a').replace(/[ćč]/g, 'c').replace(/[ęè]/g, 'e')
    .replace(/[łl]/g, 'l').replace(/[ńñ]/g, 'n').replace(/[óò]/g, 'o')
    .replace(/[śš]/g, 's').replace(/[źżž]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function BlogEditor({ post }: { post?: BlogPostData }) {
  const [form, setForm] = useState(post || emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [slugManual, setSlugManual] = useState(!!post);
  const router = useRouter();

  const isEdit = !!post;

  const updateField = (field: string, value: string | boolean) => {
    if (field === 'title' && !slugManual) {
      setForm((prev) => ({ ...prev, title: value as string, slug: slugify(value as string) }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }) as typeof prev);
    }
  };

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim()) {
      setMessage('Tytuł jest wymagany');
      return;
    }

    setLoading(true);
    setMessage('');

    const body = {
      ...(isEdit ? { id: post.id } : {}),
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      published: publish !== undefined ? publish : form.published,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      tags: form.tags,
    };

    try {
      const res = await fetch('/api/admin/blog', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage(err.error || 'Wystąpił błąd');
        setLoading(false);
        return;
      }

      if (isEdit) {
        setMessage('Zapisano');
        router.refresh();
      } else {
        router.push('/admin/blog');
      }
    } catch {
      setMessage('Błąd połączenia');
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-[#5B65DC] focus:ring-1 focus:ring-[#5B65DC]/20 transition-colors";
  const labelClass = "block text-sm font-medium text-[#122056] mb-1";

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-[#8a8fa6] hover:text-[#122056] transition-colors">
          <ArrowLeft size={16} />
          Powrót do listy
        </Link>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-sm ${message === 'Zapisano' ? 'text-emerald-600' : 'text-red-500'}`}>
              {message}
            </span>
          )}
          <button
            onClick={() => handleSave(!form.published)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 text-sm font-medium text-[#122056] rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            {form.published ? <EyeOff size={16} /> : <Eye size={16} />}
            {form.published ? 'Cofnij do szkicu' : 'Opublikuj'}
          </button>
          <button
            onClick={() => handleSave()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B65DC] text-white text-sm font-medium rounded-lg hover:bg-[#4a53c7] transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? 'Zapisywanie...' : 'Zapisz'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content — left 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div>
              <label className={labelClass}>Tytuł</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Tytuł wpisu"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Slug (URL)
                {!slugManual && <span className="text-[#8a8fa6] font-normal ml-1">— generowany automatycznie</span>}
              </label>
              <div className="flex gap-2">
                <div className="flex items-center text-sm text-[#8a8fa6] shrink-0">/blog/</div>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    setForm((prev) => ({ ...prev, slug: e.target.value }));
                  }}
                  placeholder="slug-wpisu"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Treść (HTML)</label>
              <textarea
                value={form.content}
                onChange={(e) => updateField('content', e.target.value)}
                placeholder="<p>Treść wpisu...</p>"
                rows={20}
                className={`${inputClass} font-mono text-xs`}
              />
            </div>
          </div>
        </div>

        {/* Sidebar — right 1/3 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[#122056] text-sm">Ustawienia</h3>

            <div>
              <label className={labelClass}>Zajawka</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Krótki opis widoczny na liście wpisów"
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Obrazek wyróżniający (URL)</label>
              <input
                type="text"
                value={form.coverImage}
                onChange={(e) => updateField('coverImage', e.target.value)}
                placeholder="/images/blog/obrazek.jpg"
                className={inputClass}
              />
              {form.coverImage && (
                <img src={form.coverImage} alt="" className="mt-2 rounded-lg w-full h-32 object-cover" />
              )}
            </div>

            <div>
              <label className={labelClass}>Tagi</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder="profilaktyka, selen, badania"
                className={inputClass}
              />
              <p className="text-xs text-[#8a8fa6] mt-1">Oddzielone przecinkami</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[#122056] text-sm">SEO</h3>

            <div>
              <label className={labelClass}>Meta tytuł</label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => updateField('metaTitle', e.target.value)}
                placeholder={form.title || 'Zostaw puste = użyje tytułu'}
                className={inputClass}
              />
              <p className="text-xs text-[#8a8fa6] mt-1">
                {(form.metaTitle || form.title).length}/60 znaków
              </p>
            </div>

            <div>
              <label className={labelClass}>Meta opis</label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                placeholder={form.excerpt || 'Zostaw puste = użyje zajawki'}
                rows={3}
                className={inputClass}
              />
              <p className="text-xs text-[#8a8fa6] mt-1">
                {(form.metaDescription || form.excerpt).length}/160 znaków
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
