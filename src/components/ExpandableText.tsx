'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ExpandableText({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-neutral-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors"
      >
        <span className="font-[family-name:var(--font-funnel)] font-bold text-[#122056] text-base">{title}</span>
        <ChevronDown
          size={20}
          className={`text-[#8a8fa6] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 prose prose-base max-w-none prose-p:text-[#4a4f65] prose-p:text-[15px] prose-p:leading-relaxed prose-headings:text-[#122056] prose-headings:font-[family-name:var(--font-funnel)] prose-strong:text-[#122056] prose-li:text-[#4a4f65] prose-li:text-[15px] prose-a:text-[#5B65DC]">
          {children}
        </div>
      )}
    </div>
  );
}
