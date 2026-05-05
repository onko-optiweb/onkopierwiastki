import { getSettingsFresh } from "@/src/lib/get-settings";
import { EmailTemplatesForm } from "@/src/components/admin/email-templates-form";

export default async function SzablonyEmailPage() {
  const settings = await getSettingsFresh();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Szablony e-mail</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Personalizuj treści emaili wysyłanych do klientów</p>
      </div>
      <EmailTemplatesForm settings={settings} />
    </div>
  );
}
