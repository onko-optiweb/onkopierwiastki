'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FacilityCarousel({ children, count }: { children: ReactNode; count: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  // Detect mobile vs desktop
  useEffect(() => {
    const check = () => setPerPage(window.innerWidth < 640 ? 1 : 3);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pageCount = Math.ceil(count / perPage);

  const goToPage = (page: number) => {
    if (page < 0 || page >= pageCount) return;
    const el = scrollRef.current;
    if (!el) return;
    const firstCardIndex = page * perPage;
    const cards = el.querySelectorAll('[data-facility-card]');
    const card = cards[firstCardIndex] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
    setActivePage(page);
  };

  // Sync dots with manual swipe on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;
    const handleScrollEnd = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const cards = el.querySelectorAll('[data-facility-card]');
        const scrollLeft = el.scrollLeft + el.offsetLeft;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((child, i) => {
          const dist = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActivePage(Math.min(Math.floor(closest / perPage), pageCount - 1));
      }, 150);
    };

    el.addEventListener('scrollend', handleScrollEnd, { passive: true });
    // Fallback for browsers without scrollend
    el.addEventListener('touchend', () => setTimeout(handleScrollEnd, 100), { passive: true });
    return () => {
      el.removeEventListener('scrollend', handleScrollEnd);
      clearTimeout(timeout);
    };
  }, [perPage, pageCount]);

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 px-4 sm:px-0 sm:[scroll-snap-type:none] no-scrollbar"
      >
        {children}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => goToPage(activePage - 1)}
            disabled={activePage === 0}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-[#122056] hover:border-[#5B65DC] hover:text-[#5B65DC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Poprzednia"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === activePage
                    ? 'w-6 h-2.5 bg-[#5B65DC]'
                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Strona ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(activePage + 1)}
            disabled={activePage === pageCount - 1}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-[#122056] hover:border-[#5B65DC] hover:text-[#5B65DC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Następna"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
