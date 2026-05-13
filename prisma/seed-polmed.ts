import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const polmedFacilities = [
  // Warszawa
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Grzybowska 61',
    postalCode: '00-844',
    city: 'Warszawa',
    phone: '22 417 43 00',
    hours: '',
    lat: 52.2350,
    lng: 20.9850,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Targowa 24',
    postalCode: '03-733',
    city: 'Warszawa',
    phone: '22 100 63 78',
    hours: '',
    lat: 52.2530,
    lng: 21.0440,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Twarda 18',
    postalCode: '00-105',
    city: 'Warszawa',
    phone: '22 210 10 10',
    hours: '',
    lat: 52.2340,
    lng: 20.9930,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Wołoska 16',
    postalCode: '02-675',
    city: 'Warszawa',
    phone: '22 278 71 20',
    hours: '',
    lat: 52.1960,
    lng: 20.9960,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Puławska 410a',
    postalCode: '02-843',
    city: 'Warszawa',
    phone: '22 646 18 96',
    hours: '',
    lat: 52.1680,
    lng: 21.0190,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Poznań
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Górecka 1',
    postalCode: '60-201',
    city: 'Poznań',
    phone: '61 639 73 71',
    hours: '',
    lat: 52.3980,
    lng: 16.8860,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Starogard Gdański
  {
    name: 'Centrum Medyczne Polmed',
    address: 'os. Mikołaja Kopernika',
    postalCode: '83-200',
    city: 'Starogard Gdański',
    phone: '78 505 91 62',
    hours: '',
    lat: 53.9690,
    lng: 18.5310,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Gdynia
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. 10 Lutego 11',
    postalCode: '81-366',
    city: 'Gdynia',
    phone: '58 770 28 20',
    hours: '',
    lat: 54.5189,
    lng: 18.5305,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Gdańsk - Grunwaldzka
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Grunwaldzka 82',
    postalCode: '80-244',
    city: 'Gdańsk',
    phone: '58 077 896 00',
    hours: '',
    lat: 54.3810,
    lng: 18.5960,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Gdańsk - Startowa
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Startowa 1',
    postalCode: '80-461',
    city: 'Gdańsk',
    phone: '58 769 37 60',
    hours: '',
    lat: 54.3770,
    lng: 18.4670,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Tczew
  {
    name: 'Centrum Medyczne Polmed',
    address: 'Galeria Kociewska, ul. Pomorska 1',
    postalCode: '83-110',
    city: 'Tczew',
    phone: '58 771 97 70',
    hours: '',
    lat: 54.0930,
    lng: 18.7870,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Kraków
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Lubicz 23a',
    postalCode: '31-503',
    city: 'Kraków',
    phone: '12 298 47 40',
    hours: '',
    lat: 50.0670,
    lng: 19.9490,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Wrocław
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Grabiszyńska 208',
    postalCode: '53-235',
    city: 'Wrocław',
    phone: '71 723 07 85',
    hours: '',
    lat: 51.0920,
    lng: 16.9840,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Katowice
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Dąbrówki 10',
    postalCode: '40-081',
    city: 'Katowice',
    phone: '58 775 95 99',
    hours: '',
    lat: 50.2590,
    lng: 19.0200,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Sosnowiec
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Modrzejowska 32B',
    postalCode: '41-200',
    city: 'Sosnowiec',
    phone: '58 775 95 99',
    hours: '',
    lat: 50.2860,
    lng: 19.1270,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Olsztyn
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Wyszyńskiego 5B',
    postalCode: '10-457',
    city: 'Olsztyn',
    phone: '89 526 04 88',
    hours: '',
    lat: 53.7760,
    lng: 20.4890,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
  // Słupsk
  {
    name: 'Centrum Medyczne Polmed',
    address: 'ul. Tuwima 32/33',
    postalCode: '76-200',
    city: 'Słupsk',
    phone: '58 771 98 80',
    hours: '',
    lat: 54.4641,
    lng: 17.0285,
    notes: '',
    supportsBlood: true,
    supportsSerum: false,
  },
];

async function main() {
  console.log('Adding POLMED facilities...');

  for (const facility of polmedFacilities) {
    // Check if facility with same name and address already exists
    const existing = await prisma.facility.findFirst({
      where: {
        name: facility.name,
        address: facility.address,
        city: facility.city,
      },
    });

    if (existing) {
      console.log(`  [SKIP] ${facility.city} - ${facility.address} (already exists)`);
      continue;
    }

    await prisma.facility.create({ data: facility });
    console.log(`  [ADD]  ${facility.city} - ${facility.address}`);
  }

  const total = await prisma.facility.count();
  console.log(`\nDone! Total facilities in database: ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
