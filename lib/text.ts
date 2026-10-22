export function splitParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).filter(Boolean);
}
