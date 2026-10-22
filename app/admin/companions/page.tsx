import { redirect } from "next/navigation";
import { localizedRoute, routePaths } from "@/lib/routes";

export default function AdminCompanionsAlias() {
  redirect(localizedRoute("en", routePaths.adminCompanions));
}
