import { Metadata } from 'next';
import { KnowledgeBase } from '@/src/components/admin/knowledge-base';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Baza wiedzy</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">
          Instrukcje i szablony do pracy z serwisem onkopierwiastki.pl
        </p>
      </div>
      <KnowledgeBase />
    </div>
  );
}
