import { FlaskConical, FileText, Hospital } from 'lucide-react';

const items = [
  { icon: FlaskConical, value: '1 badanie', label: 'Z krwi lub surowicy' },
  { icon: FileText, value: '15 dni roboczych', label: 'Wynik PDF z zaleceniami' },
  { icon: Hospital, value: '100%', label: 'Tylko w certyfikowanych placówkach' },
];

export default function TrustBar() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.label} className="bg-[#EEEFFD]/50 rounded-2xl p-6 flex items-start justify-between border border-[#EEEFFD]">
              <div>
                <span className="font-[family-name:var(--font-funnel)] font-bold text-3xl text-black">{item.value}</span>
                <p className="text-[#8a8fa6] text-sm mt-2">{item.label}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EEEFFD] flex items-center justify-center">
                <item.icon size={18} className="text-[#5B65DC]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
