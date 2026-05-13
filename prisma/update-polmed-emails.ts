import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const emailMap: Record<string, string> = {
  'ul. Grzybowska 61': 'recepcja.grzybowska@polmed.pl',
  'ul. Targowa 24': 'recepcja.targowa@polmed.pl',
  'ul. Twarda 18': 'recepcja.twarda@polmed.pl',
  'ul. Wołoska 16': 'recepcja.woloska@polmed.pl',
  'ul. Puławska 410a': 'recepcja.pulawska@polmed.pl',
  'ul. Górecka 1': 'recepcja.poznan@polmed.pl',
  'os. Mikołaja Kopernika': 'recepcja2.starogard@polmed.pl',
  'ul. 10 Lutego 11': 'gdynia@polmed.pl',
  'ul. Grunwaldzka 82': 'recepcja.manhattan@polmed.pl',
  'ul. Startowa 1': 'recepcja.startowa@polmed.pl',
  'Galeria Kociewska, ul. Pomorska 1': 'recepcja.tczew@polmed.pl',
  'ul. Lubicz 23a': 'recepcja.krakow@polmed.pl',
  'ul. Grabiszyńska 208': 'recepcja.wroclaw@polmed.pl',
  'ul. Dąbrówki 10': 'recepcja.katowice@polmed.pl',
  'ul. Modrzejowska 32B': 'recepcja.sosnowiec@polmed.pl',
  'ul. Wyszyńskiego 5B': 'recepcja.olsztyn@polmed.pl',
  'ul. Tuwima 32/33': 'recepcja.slupsk@polmed.pl',
};

async function main() {
  console.log('Updating POLMED facility emails...');

  for (const [address, email] of Object.entries(emailMap)) {
    const result = await prisma.facility.updateMany({
      where: { address, name: 'Centrum Medyczne Polmed' },
      data: { email },
    });

    if (result.count > 0) {
      console.log(`  [OK] ${address} → ${email}`);
    } else {
      console.log(`  [!]  ${address} — not found`);
    }
  }

  console.log('\nDone!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
