import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  preload?: boolean;
  objectPosition?: string;
};

export function SectionImage({ src, alt, preload = false, objectPosition = "center" }: Props) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-secondary lg:aspect-5/4">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 576px, (min-width: 1024px) calc((100vw - 128px) / 2), calc(100vw - 48px)"
        preload={preload}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
