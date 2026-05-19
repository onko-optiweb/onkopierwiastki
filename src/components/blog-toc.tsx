'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function BlogTableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('[data-blog-content]');
    if (!article) return;

    const elements = article.querySelectorAll('h2');
    const items: TocItem[] = [];

    elements.forEach((el, index) => {
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[ąà]/g, 'a').replace(/[ćč]/g, 'c').replace(/[ęè]/g, 'e')
          .replace(/[łl]/g, 'l').replace(/[ńñ]/g, 'n').replace(/[óò]/g, 'o')
          .replace(/[śš]/g, 's').replace(/[źżž]/g, 'z')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `heading-${index}`;
      }

      items.push({
        id: el.id,
        text: el.textContent || '',
        level: 2,
      });
    });

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const tocList = (
    <ul className="space-y-1 border-l-2 border-neutral-200">
      {headings.map((h) => (
        <li key={h.id}>
          <button
            onClick={() => scrollTo(h.id)}
            className={`block w-full text-left text-[13px] leading-snug transition-colors duration-150 border-l-2 -ml-[2px] pl-4 py-1.5 ${
              activeId === h.id
                ? 'border-[#5B65DC] text-[#5B65DC] font-medium'
                : 'border-transparent text-[#8a8fa6] hover:text-[#122056] hover:border-neutral-300'
            }`}
          >
            {h.text}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile — accordion above article */}
      <div className="xl:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between bg-white rounded-xl px-5 py-3.5 border border-neutral-200 text-sm font-semibold text-[#122056]"
        >
          Spis treści
          <ChevronDown size={16} className={`text-[#8a8fa6] transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && (
          <div className="bg-white rounded-b-xl border border-t-0 border-neutral-200 px-5 py-4 -mt-1">
            {tocList}
          </div>
        )}
      </div>

      {/* Desktop — sidebar sticky */}
      <aside className="hidden xl:block" aria-label="Spis treści">
        <nav className="sticky top-24">
          <p className="text-xs font-semibold text-[#122056] uppercase tracking-wider mb-3">
            Spis treści
          </p>
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            {tocList}
          </div>
        </nav>
      </aside>
    </>
  );
}
