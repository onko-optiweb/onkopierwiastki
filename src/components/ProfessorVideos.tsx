export default function ProfessorVideos() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-funnel)] font-bold text-3xl sm:text-4xl text-black mb-4">
            Zobacz filmy z udziałem prof. Jana Lubińskiego
          </h2>
          <p className="text-[#8a8fa6] text-sm lg:text-base max-w-2xl mx-auto">
            Dowiedz się więcej o badaniach nad pierwiastkami i ich wpływie na profilaktykę nowotworów.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-[#EEEFFD] bg-white">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Un6oPSYWvl8"
                title="Prof. Jan Lubiński — film 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#EEEFFD] bg-white">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/cKBgUyKI-X4"
                title="Prof. Jan Lubiński — film 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
