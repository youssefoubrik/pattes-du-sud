import { FaFacebookF, FaInstagram } from "react-icons/fa6";

type Props = { instagram: string | null; facebook: string | null; label: string };

const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-heading transition-colors hover:text-primary-hover hover:underline hover:underline-offset-4";

export function SocialLinks({ instagram, facebook, label }: Props) {
  if (!instagram && !facebook) return null;

  return (
    <div>
      <p className="text-base font-semibold text-heading">{label}</p>
      <ul className="mt-2 flex flex-col items-start" aria-label={label}>
        {instagram && (
          <li>
            <a href={instagram} className={linkClass}>
              <FaInstagram size={22} className="shrink-0 text-primary-hover" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </li>
        )}
        {facebook && (
          <li>
            <a href={facebook} className={linkClass}>
              <FaFacebookF size={22} className="shrink-0 text-primary-hover" aria-hidden="true" />
              <span>Facebook</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
