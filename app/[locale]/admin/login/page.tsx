import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/i18n/routing";
import { login } from "../actions";

export const metadata = {
  title: "Editor sign in",
  robots: { index: false, follow: false },
};

export default async function Login({
  params,
  searchParams,
}: PageProps<"/[locale]/admin/login">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const query = await searchParams;
  return (
    <main className="flex-1 py-16">
      <Container className="max-w-lg">
        <h1 className="text-4xl text-heading">Editor sign in</h1>
        {query.error && (
          <p role="alert" className="mt-5 rounded-xl bg-secondary p-4">
            Incorrect password.
          </p>
        )}
        <form action={login} className="mt-8 space-y-5">
          <input type="hidden" name="locale" value={locale} />
          <label className="block font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="min-h-12 w-full rounded-xl border border-border bg-surface px-4"
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover"
          >
            Sign in
          </button>
        </form>
      </Container>
    </main>
  );
}
