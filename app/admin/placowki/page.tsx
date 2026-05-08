import { prisma } from "@/src/lib/prisma";
import { FacilitiesManager } from "@/src/components/admin/facilities-manager";

export default async function PlacowkiPage() {
  const facilities = await prisma.facility.findMany({
    orderBy: { city: "asc" },
  });

  const serialized = facilities.map((f) => ({
    id: f.id,
    name: f.name,
    address: f.address,
    postalCode: f.postalCode,
    city: f.city,
    phone: f.phone,
    hours: f.hours,
    lat: f.lat,
    lng: f.lng,
    notes: f.notes,
    active: f.active,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Placówki</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Zarządzaj placówkami pobrań krwi</p>
      </div>
      <FacilitiesManager facilities={serialized} />
    </div>
  );
}
