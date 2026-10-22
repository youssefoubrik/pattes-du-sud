import { redirect } from "next/navigation";
import { localizedRoute, routePaths } from "@/lib/routes";

export default async function AdminAnimalsAlias({
  params,
}: PageProps<"/[locale]/admin/animals">) {
  const { locale } = await params;
  redirect(`${localizedRoute(locale, routePaths.adminCompanions)}`);
}
