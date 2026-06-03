export type Product = {
  slug: string;
  name: string;
  panelType: 'profilaktyka' | 'onkologiczny';
  panelTier: 'podstawowy' | 'rozszerzony';
  price: number;
  priceGrosze: number;
  material: string;
  elements: string;
  description: string;
  features: string[];
  popular?: boolean;
  orderUrl: string;
};

export const products: Product[] = [
  {
    slug: 'profilaktyczny-podstawowy',
    name: 'Profilaktyczny Podstawowy',
    panelType: 'profilaktyka',
    panelTier: 'podstawowy',
    price: 200,
    priceGrosze: 20000,
    material: 'Krew pełna',
    elements: '1–3 pierwiastki do wyboru (As, Zn, Cd, Pb, Se, Cu)',
    description: 'Panel profilaktyczny pozwalający zbadać wybrane onkopierwiastki z krwi pełnej. Idealne rozwiązanie, gdy chcesz sprawdzić poziom konkretnych pierwiastków śladowych.',
    features: [
      '1–3 pierwiastki do wyboru',
      'As, Zn, Cd, Pb, Se lub Cu',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Bez skierowania lekarskiego',
    ],
    orderUrl: '/zamow?typ=profilaktyka&wariant=podstawowy',
  },
  {
    slug: 'profilaktyczny-rozszerzony',
    name: 'Profilaktyczny Rozszerzony',
    panelType: 'profilaktyka',
    panelTier: 'rozszerzony',
    price: 230,
    priceGrosze: 23000,
    material: 'Krew pełna',
    elements: 'Wszystkie 6 pierwiastków (As, Se, Zn, Cu, Cd, Pb)',
    description: 'Pełny panel profilaktyczny obejmujący wszystkie 6 onkopierwiastków z krwi pełnej. Najczęściej wybierany — daje kompleksowy obraz ryzyka nowotworowego.',
    features: [
      'Wszystkie 6 pierwiastków',
      'As, Se, Zn, Cu, Cd, Pb',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Bez skierowania lekarskiego',
      'Kompleksowy obraz ryzyka',
    ],
    popular: true,
    orderUrl: '/zamow?typ=profilaktyka&wariant=rozszerzony',
  },
  {
    slug: 'onkologiczny-podstawowy',
    name: 'Onkologiczny Podstawowy',
    panelType: 'onkologiczny',
    panelTier: 'podstawowy',
    price: 200,
    priceGrosze: 20000,
    material: 'Surowica',
    elements: 'Se, Zn, Mn, Cu z surowicy',
    description: 'Panel monitorujący dla osób z chorobą nowotworową. Badanie kluczowych pierwiastków z surowicy krwi, wspierające monitoring ryzyka kolejnego nowotworu.',
    features: [
      'Se, Zn, Mn, Cu z surowicy',
      'Opcjonalnie: As, Cd, Pb z krwi',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Monitoring ryzyka kolejnego nowotworu',
    ],
    orderUrl: '/zamow?typ=onkologiczny&wariant=podstawowy',
  },
  {
    slug: 'onkologiczny-rozszerzony',
    name: 'Onkologiczny Rozszerzony',
    panelType: 'onkologiczny',
    panelTier: 'rozszerzony',
    price: 230,
    priceGrosze: 23000,
    material: 'Surowica + krew pełna',
    elements: 'Pełny zestaw z surowicy + As, Cd, Pb z krwi',
    description: 'Pełny panel onkologiczny łączący badanie surowicy i krwi pełnej. Kompleksowy monitoring onkopierwiastków dla osób z chorobą nowotworową.',
    features: [
      'Pełny zestaw z surowicy',
      'Dodatkowe As, Cd, Pb z krwi',
      'Wynik PDF z zaleceniami',
      'Czas realizacji: do 15 dni',
      'Kompleksowy monitoring',
      'Bez skierowania lekarskiego',
    ],
    popular: true,
    orderUrl: '/zamow?typ=onkologiczny&wariant=rozszerzony',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProducts(slug: string): Product[] {
  return products.filter((p) => p.slug !== slug);
}

export function getSlugForPanel(panelType: string, panelTier: string): string {
  const type = panelType === 'onkologiczny' ? 'onkologiczny' : 'profilaktyczny';
  return `${type}-${panelTier}`;
}
