type Props = {
  title: string;
  facts: { label: string; value: string }[];
};

export function CompanionProfileFacts({ title, facts }: Props) {
  return (
    <section className="mt-6 rounded-sm border-b border-border bg-secondary px-4 py-5 sm:px-6">
      <h2 className="text-2xl text-heading">{title}</h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {facts.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-bold leading-snug text-heading">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
