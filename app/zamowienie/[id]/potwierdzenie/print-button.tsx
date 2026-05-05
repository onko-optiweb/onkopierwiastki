'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#5B65DC] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#4a53c7] transition-colors"
    >
      Drukuj / Zapisz PDF
    </button>
  );
}
