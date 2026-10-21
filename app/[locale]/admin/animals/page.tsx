import { redirect } from "next/navigation";

export default async function AdminAnimalsAlias({
  params,
}: PageProps<"/[locale]/admin/animals">) {
  const { locale } = await params;
  redirect(`/${locale}/admin/companions`);
}
