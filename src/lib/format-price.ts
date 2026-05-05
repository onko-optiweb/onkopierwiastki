export function formatPrice(grosze: number): string {
  const zloty = grosze / 100;
  const formatted = zloty.toLocaleString("pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${formatted} zł`;
}
