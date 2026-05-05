import { getSettingsFresh } from "@/src/lib/get-settings";
import { SettingsForm } from "@/src/components/admin/settings-form";

export default async function UstawieniaPage() {
  const settings = await getSettingsFresh();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Ustawienia</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Dane firmy, integracje, klucze API</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
