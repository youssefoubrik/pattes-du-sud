type Props = {
  title: string;
  paragraphs: string[];
};

export function CompanionProfileStory({ title, paragraphs }: Props) {
  if (!paragraphs.length) return null;

  return (
    <section className="mt-7">
      <h2 className="text-2xl text-heading">{title}</h2>
      <div className="mt-3 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
