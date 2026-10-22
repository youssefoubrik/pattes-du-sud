import { redirect } from "next/navigation";
import { localizedRoute, routePaths } from "@/lib/routes";

export default function AdminAlias() {
  redirect(localizedRoute("en", routePaths.admin));
}
