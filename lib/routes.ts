export const routePaths = {
  home: "",
  about: "/about",
  companions: "/companions",
  companion: (id: number | string) => `/companions/${id}`,
  adopt: "/adopt",
  donate: "/donate",
  donateThankYou: "/donate/thank-you",
  mirleft: "/mirleft",
  contact: "/contact",
  volunteer: "/volunteer",
  privacy: "/privacy",
  admin: "/admin",
  adminLogin: "/admin/login",
  adminCompanions: "/admin/companions",
  adminSettings: "/admin/settings",
  adminContent: "/admin/content",
  adminMedia: "/admin/media",
  adminSupporters: "/admin/supporters",
} as const;

export function localizedRoute(locale: string, path: string): string {
  return `/${locale}${path}`;
}
