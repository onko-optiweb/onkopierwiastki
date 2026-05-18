'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqQuestions } from '@/src/data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mb-12 text-center">
          Najczęściej zadawane pytania
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {faqQuestions.map((item, i) => (
            <div key={i} className="bg-[#FAFAFD] rounded-xl border border-neutral-100 overflow-hidden self-start">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h3 className="font-medium text-[#122056] text-sm pr-4">{item.q}</h3>
                <ChevronDown
                  size={20}
                  className={`text-[#8a8fa6] flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#8a8fa6] text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
