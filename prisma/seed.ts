import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const facilities = [
  { name: 'Centrum Medyczne PUM', address: 'ul. Unii Lubelskiej 1, 71-252 Szczecin', phone: '+48 91 425 04 02', hours: 'Pon-Pt: 7:30-15:00', city: 'Szczecin', lat: 53.4285, lng: 14.5528 },
  { name: 'Punkt Pobrań Warszawa Centrum', address: 'ul. Marszałkowska 24, 00-576 Warszawa', phone: '+48 22 123 45 67', hours: 'Pon-Pt: 7:00-16:00', city: 'Warszawa', lat: 52.2297, lng: 21.0122 },
  { name: 'Laboratorium Kraków', address: 'ul. Mogilska 43, 31-545 Kraków', phone: '+48 12 345 67 89', hours: 'Pon-Pt: 8:00-14:00', city: 'Kraków', lat: 50.0647, lng: 19.945 },
  { name: 'Punkt Pobrań Gdańsk', address: 'ul. Dębinki 7, 80-211 Gdańsk', phone: '+48 58 349 10 00', hours: 'Pon-Pt: 7:30-15:00', city: 'Gdańsk', lat: 54.352, lng: 18.6466 },
  { name: 'Punkt Pobrań Wrocław', address: 'ul. Borowska 213, 50-556 Wrocław', phone: '+48 71 733 11 00', hours: 'Pon-Pt: 7:00-15:00', city: 'Wrocław', lat: 51.0923, lng: 17.019 },
  { name: 'Punkt Pobrań Poznań', address: 'ul. Przybyszewskiego 49, 60-355 Poznań', phone: '+48 61 869 10 00', hours: 'Pon-Pt: 7:30-14:30', city: 'Poznań', lat: 52.4064, lng: 16.9252 },
];

async function main() {
  console.log('Seeding facilities...');
  for (const f of facilities) {
    await prisma.facility.upsert({
      where: { id: facilities.indexOf(f) + 1 },
      update: f,
      create: f,
    });
  }
  console.log(`Seeded ${facilities.length} facilities`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
