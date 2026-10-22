import { redirect } from "next/navigation";
import { localizedRoute, routePaths } from "@/lib/routes";

export default function AdminAnimalsAlias() {
  redirect(localizedRoute("en", routePaths.adminCompanions));
}
