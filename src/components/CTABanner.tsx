'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function CTABanner({ text = 'Jedna kropla krwi. Sześć odpowiedzi. Twój pierwszy krok w profilaktyce nowotworowej.' }: { text?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty('--mouse-x', `${x}%`);
      section.style.setProperty('--mouse-y', `${y}%`);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden cursor-default"
      style={{
        background: `
          radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(122, 130, 229, 0.4) 0%, transparent 70%),
          linear-gradient(135deg, #4a53c7 0%, #5B65DC 30%, #7a82e5 60%, #9b8ec4 100%)
        `,
      }}
    >
      {/* DNA background */}
      <img
        src="/images/f48ee1cf-b5a2-4219-85de-5b5f29392b48.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#122056]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-10">
          {text}
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/zamow"
            className="group inline-flex items-center gap-3 bg-white text-[#122056] font-semibold pl-7 pr-2.5 py-3 rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all text-sm"
          >
            Zamów badanie
            <span className="w-9 h-9 rounded-full bg-[#5B65DC] flex items-center justify-center">
              <ArrowRight size={16} className="text-white group-hover:rotate-[360deg] transition-transform duration-500" />
            </span>
          </a>
          <a
            href="#placowki"
            className="group inline-flex items-center gap-3 bg-white/10 text-white font-semibold pl-7 pr-2.5 py-3 rounded-full hover:bg-white/20 transition-all text-sm border border-white/20 backdrop-blur-sm"
          >
            Sprawdź placówkę
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <MapPin size={16} className="group-hover:rotate-[360deg] transition-transform duration-500" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
