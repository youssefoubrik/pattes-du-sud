export function whatsappUrl(number: string, message?: string): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}
