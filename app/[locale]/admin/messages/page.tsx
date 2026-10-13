import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/i18n/routing";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { removeMessage } from "../actions";

export const metadata = {
  title: "Contact messages",
  robots: { index: false, follow: false },
};

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale);
  const messages = db()
    .prepare(
      "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY id DESC LIMIT 200",
    )
    .all() as {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }[];
  return (
    <main className="flex-1 py-12">
      <Container className="max-w-3xl">
        <Link href={`/${locale}/admin`} className="text-accent underline">
          ← Editor
        </Link>
        <h1 className="mt-5 text-4xl text-heading">Contact messages</h1>
        <ul className="mt-8 space-y-5">
          {messages.map((message) => (
            <li
              key={message.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-xl text-heading">{message.name}</h2>
                <time className="text-sm text-muted-foreground">
                  {message.created_at}
                </time>
              </div>
              <a
                href={`mailto:${message.email}`}
                className="mt-2 inline-block break-all text-accent underline"
              >
                {message.email}
              </a>
              <p className="mt-4 whitespace-pre-line leading-relaxed">
                {message.message}
              </p>
              <form action={removeMessage} className="mt-4">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={message.id} />
                <button
                  type="submit"
                  className="min-h-11 text-primary-hover underline"
                >
                  Delete message
                </button>
              </form>
            </li>
          ))}
        </ul>
        {!messages.length && <p className="mt-6">No messages yet.</p>}
      </Container>
    </main>
  );
}
