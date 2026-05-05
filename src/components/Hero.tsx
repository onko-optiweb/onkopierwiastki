'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

function AnimatedCount({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
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

  return <span ref={ref}>{count.toLocaleString('pl-PL')}</span>;
}

export default function Hero() {
  return (
    <section className="pt-16 bg-white">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-12">

        {/* Cards wrapper */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-4">

            {/* LEFT CARD — mask only on lg+ */}
            <div className="relative bg-[#EEEFFD] rounded-2xl lg:rounded-none p-8 sm:p-10 lg:p-14 flex flex-col justify-center items-center min-h-[400px] lg:min-h-[85vh] card-mask-left">
              <div className="flex flex-col items-center text-center">
                {/* Heading */}
                <h1 className="font-[family-name:var(--font-funnel)] font-bold text-[2.2rem] sm:text-4xl lg:text-[3.2rem] leading-[1.1] tracking-tight text-black mb-2">
                  Zbadaj onkopierwiastki
                </h1>
                <p className="font-[family-name:var(--font-funnel)] font-bold text-xl sm:text-2xl lg:text-[1.8rem] leading-[1.2] text-black italic mb-5">
                  Poznaj swoje ryzyko, zanim pojawią się objawy.
                </p>

                {/* Description */}
                <p className="text-[#8a8fa6] text-[13px] lg:text-sm leading-relaxed mb-8 max-w-lg">
                  Badania z krwi z <span className="text-[#122056] font-semibold">normami opracowanymi dla populacji polskiej</span> oparte na ponad 40 publikacjach w piśmiennictwie międzynarodowym oraz ponad 100 przyznanych lub zgłoszonych patentach. Sprawdza stężenie 6 pierwiastków, które badania naukowe wiążą ze zwiększonym ryzykiem nowotworów złośliwych oraz zgonów w młodszym wieku. Jedno pobranie. Wynik z <span className="text-[#122056] font-semibold">konkretnymi zaleceniami w 15 dni roboczych</span>.
                </p>

                {/* CTA */}
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="#placowki" className="group inline-flex items-center gap-2.5 bg-white/80 text-black font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-all text-sm">
                    <MapPin size={16} className="text-[#122056] group-hover:rotate-[360deg] transition-transform duration-500" />
                    Znajdź placówkę
                  </a>
                  <a href="#cennik" className="group inline-flex items-center gap-2.5 bg-black text-white font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-[#122056] transition-all text-sm">
                    Zamów badanie
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight size={14} className="group-hover:rotate-[360deg] transition-transform duration-500" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-10 w-full max-w-md">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                  <p className="text-[#122056] font-bold text-sm">Zaufało nam już ponad <AnimatedCount target={15000} /> pacjentów</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-3.5 h-3.5 text-[#5B65DC] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[#8a8fa6] text-[11px] ml-1">5.0 / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD — mask only on lg+ */}
            <div className="relative rounded-2xl lg:rounded-none overflow-hidden lg:overflow-visible min-h-[350px] lg:min-h-[85vh] card-mask-right">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-2xl lg:rounded-none"
              >
                <source src="/videos/loop-dna.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#122056]/40 via-transparent to-transparent rounded-2xl lg:rounded-none" />

              {/* Top left — 20+ lat badań */}
              <div className="absolute top-5 left-5 bg-white/70 backdrop-blur-xl rounded-2xl p-4 max-w-[240px] border border-white/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {['bg-[#5B65DC]', 'bg-[#7a82e5]', 'bg-[#122056]'].map((bg, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                        {['JL', 'PU', 'MC'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#EEEFFD] flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#122056]" />
                  </div>
                </div>
                <p className="text-[#122056] font-semibold text-xs">20+ lat badań naukowych</p>
                <p className="text-[#122056]/50 text-[11px]">READ-GENE S.A. &bull; PUM Szczecin</p>
              </div>

              {/* Scattered element symbols */}
              <div className="absolute top-[12%] right-[15%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float">
                <span className="text-[#122056] font-bold text-[11px]">As</span>
                <span className="text-[#122056]/50 text-[11px]">Arsen</span>
              </div>
              <div className="absolute top-[28%] right-[5%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float-delayed">
                <span className="text-[#122056] font-bold text-[11px]">Se</span>
                <span className="text-[#122056]/50 text-[11px]">Selen</span>
              </div>
              <div className="absolute top-[42%] right-[20%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float-slow">
                <span className="text-[#122056] font-bold text-[11px]">Zn</span>
                <span className="text-[#122056]/50 text-[11px]">Cynk</span>
              </div>
              <div className="absolute top-[55%] right-[8%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float">
                <span className="text-[#122056] font-bold text-[11px]">Cu</span>
                <span className="text-[#122056]/50 text-[11px]">Miedź</span>
              </div>
              <div className="absolute top-[68%] right-[22%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float-delayed">
                <span className="text-[#122056] font-bold text-[11px]">Cd</span>
                <span className="text-[#122056]/50 text-[11px]">Kadm</span>
              </div>
              <div className="absolute top-[80%] right-[12%] bg-white/70 backdrop-blur-xl rounded-full px-3.5 py-1.5 border border-white/40 flex items-center gap-2 animate-float-slow">
                <span className="text-[#122056] font-bold text-[11px]">Pb</span>
                <span className="text-[#122056]/50 text-[11px]">Ołów</span>
              </div>


            </div>
          </div>

          {/* Mouse scroll — hidden on mobile */}
          <div className="hidden lg:flex absolute -bottom-2 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
              className="block"
            >
              <div className="w-7 h-11 rounded-full border-2 border-black/25 flex justify-center pt-2">
                <div className="w-1 h-2.5 rounded-full bg-black animate-bounce" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
