'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function CollapsibleContent({ title, children, collapsedLines = 6 }: {
  title: string;
  children: React.ReactNode;
  collapsedLines?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-[#122056] mb-6">
        {title}
      </h2>
      <div className="relative">
        <div
          className={`prose prose-base max-w-none prose-p:text-[#4a4f65] prose-p:text-[15px] prose-p:leading-relaxed prose-headings:text-[#122056] prose-headings:font-[family-name:var(--font-funnel)] prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-[#122056] prose-li:text-[#4a4f65] prose-li:text-[15px] prose-a:text-[#5B65DC] overflow-hidden transition-all duration-300 ${
            expanded ? '' : 'max-h-[9.5rem]'
          }`}
        >
          {children}
        </div>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAFAFD] to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 inline-flex items-center gap-1.5 text-[#5B65DC] text-sm font-semibold hover:underline"
      >
        {expanded ? 'Zwiń' : 'Rozwiń pełną treść'}
        <ChevronDown size={16} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
