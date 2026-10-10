import { FaFacebookF, FaInstagram } from "react-icons/fa6";

type Props = { instagram: string; facebook: string; label: string };

const linkClass = "flex size-11 items-center justify-center rounded-full border border-border text-heading transition-colors hover:border-primary-hover hover:text-primary-hover";

export function SocialLinks({ instagram, facebook, label }: Props) {
  return (
    <div>
      <p className="text-sm font-semibold text-heading">{label}</p>
      <ul className="mt-2 flex flex-wrap gap-3" aria-label={label}>
        <li>
          <a href={instagram} aria-label="Instagram" className={linkClass}>
            <FaInstagram size={22} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href={facebook} aria-label="Facebook" className={linkClass}>
            <FaFacebookF size={22} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  );
}
