const photos = [
  { src: '/images/people/253.webp', alt: 'Pacjentka po badaniu pierwiastków' },
  { src: '/images/people/2396.webp', alt: 'Pacjent zadowolony z wyniku badania' },
  { src: '/images/people/14786.webp', alt: 'Kobieta dbająca o profilaktykę nowotworową' },
  { src: '/images/people/46911.webp', alt: 'Mężczyzna po badaniu pierwiastków we krwi' },
];

export default function PeopleCTA() {
  return (
    <section className="py-16 lg:py-20 bg-[#EEEFFD]/50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photos */}
        <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-12">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`w-32 sm:w-40 lg:w-48 rounded-2xl overflow-hidden shadow-md shadow-black/5 ${
                i === 1 || i === 2 ? '-translate-y-3' : 'translate-y-1'
              } ${i === 0 || i === 3 ? 'hidden sm:block opacity-60' : ''}`}
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-auto" />
            </div>
          ))}
        </div>

        {/* Text + CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-2xl sm:text-3xl lg:text-[42px] lg:leading-tight text-black mb-5">
            Dołącz do tysięcy osób, które zbadały swoje pierwiastki
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base mb-8 max-w-2xl mx-auto">
            Profilaktyka to nie luksus — to świadoma decyzja. Jedno badanie krwi może zmienić Twoje podejście do zdrowia.
          </p>
          <a
            href="/zamow"
            className="inline-flex items-center justify-center bg-[#122056] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#1a2d6e] transition-colors text-sm"
          >
            Zamów badanie
          </a>
        </div>
      </div>
    </section>
  );
}
