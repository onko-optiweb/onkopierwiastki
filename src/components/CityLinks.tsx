import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cities } from '@/src/data/cities';

export default function CityLinks() {
  if (cities.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl text-black mb-3">
            Badanie onkopierwiastków w Twoim mieście
          </h2>
          <p className="text-[#8a8fa6] text-sm max-w-xl mx-auto">
            Znajdź certyfikowaną placówkę, w której wykonasz badanie onkopierwiastków.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/miasto/${city.slug}`}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-200 bg-[#FAFAFD] text-sm font-medium text-[#122056] hover:border-[#5B65DC] hover:bg-[#EEEFFD]/50 transition-all"
            >
              <MapPin size={14} className="text-[#5B65DC] flex-shrink-0" />
              Onkopierwiastki {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
