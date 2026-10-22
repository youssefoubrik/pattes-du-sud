import { redirect } from "next/navigation";
import { localizedRoute, routePaths } from "@/lib/routes";

export default function AdminSettingsAlias() {
  redirect(localizedRoute("en", routePaths.adminSettings));
}
