'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    value: '30', suffix: 'x',
    label: 'mniejsze ryzyko zgonu',
    desc: 'u mężczyzn z rakiem prostaty przy optymalnym stężeniu miedzi',
  },
  {
    value: '8', suffix: 'x',
    label: 'mniejsze ryzyko zachorowania',
    desc: 'na raka u mężczyzn przy optymalnym stężeniu ołowiu',
  },
  {
    value: '20', suffix: '+',
    label: 'patentów UP RP',
    desc: 'chroniących zakresy referencyjne dla populacji polskiej',
  },
  {
    value: '30', suffix: '+',
    label: 'publikacji PubMed',
    desc: 'potwierdzających skuteczność w recenzowanych czasopismach',
  },
];

function AnimatedNum({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-funnel)] font-bold text-5xl lg:text-6xl text-white">
      {count}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-16 lg:py-24 bg-[#122056] relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/53430.webp" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#122056]/60" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
            Liczby, które potwierdzają wagę badania
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            Wyniki badań naukowych PUM w Szczecinie
          </p>
        </div>

        {/* 4 stats in a row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#122056] p-6 lg:p-8 text-center">
              <AnimatedNum target={parseInt(stat.value)} suffix={stat.suffix} />
              <p className="text-white/90 text-sm font-semibold mt-3">{stat.label}</p>
              <p className="text-white/35 text-xs mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-white/25 text-[11px] text-center mt-8">
          Dane pochodzą z badań Międzynarodowego Centrum Nowotworów Dziedzicznych PUM w Szczecinie. Indywidualne wyniki mogą się różnić.
        </p>
      </div>
    </section>
  );
}
