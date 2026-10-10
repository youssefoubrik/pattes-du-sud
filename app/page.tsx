import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        {siteContent.name}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {siteContent.description}
      </p>
    </main>
  );
}
