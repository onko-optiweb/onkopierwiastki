'use client';

import { useState } from 'react';

export function FacilityDescription({ teaser, full }: { teaser: string; full: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4 text-sm text-[#4a4f65] leading-relaxed">
      <p>{teaser}</p>
      {expanded && <p className="mt-2">{full}</p>}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-[#5B65DC] text-xs font-semibold hover:underline focus:outline-none"
      >
        {expanded ? 'Zwiń ▲' : 'Czytaj więcej ▼'}
      </button>
    </div>
  );
}
